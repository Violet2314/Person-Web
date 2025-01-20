<template>
    <div class="blog-content2">
        <div v-html="renderedMarkdown" class="markdown-content"></div>
    </div>
    <div class="blog-item-content"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits} from 'vue';
import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import markdownItAnchor from 'markdown-it-anchor';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 选择你喜欢的主题
import 'katex/dist/katex.min.css'; // 引入 KaTeX 样式

// Props
const props = defineProps({
    fileName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['contentUpdated']);
// Reactive data
const renderedMarkdown = ref('');

const removeFrontMatter = (content) => {
    const frontMatterRegex = /^---[\s\S]*?---\n/; // 匹配从开头到第一个 "---" 结束的部分
    return content.replace(frontMatterRegex, '');
};

// Method to load and render markdown
const loadMarkdown = async () => {
    const md = new MarkdownIt({
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (err) {
                    console.error(err);
                }
            }
            return ''; // 处理不支持的语言
        }
    })
        .use(markdownItKatex)
        .use(markdownItAnchor);

    md.renderer.rules.heading_open = (tokens, idx) => {
        const token = tokens[idx];
        const level = token.tag;
        if (level === 'h1') {
            return `<h1 class="section-title">`;
        }
        return `<${level} class="section-title">`;
    };

    md.renderer.rules.heading_close = (tokens, idx) => {
        const token = tokens[idx];
        return `</${token.tag}><div class="cut-off-rule"></div>`;
    };

    try {
        const response = await fetch(`/blog/${props.fileName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let content = await response.text();

        // 手动移除 front matter 部分
        content = removeFrontMatter(content);
        // 通知父组件更新内容
        renderedMarkdown.value = md.render(content);
        emit('contentUpdated', renderedMarkdown.value);
    } catch (error) {
        console.error('Error fetching the markdown file:', error);
    }
};

// Call loadMarkdown when component is mounted
onMounted(loadMarkdown);
</script>

<style>
.blog-item-content {
    padding: 20px;
}

.markdown-content {
    width: 100%;
}

.markdown-content img{
    width: 90%;
}

.blog-content2 {
    padding: 20px;
    flex: 1;
    position: relative;
    min-width: 0;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-bottom: 4px solid var(--theme-bar-color-0);
}

.markdown-content pre {
    font-size: 1rem;
    width: calc(100% - 30px);
    max-width: 100%;
    background: #f8f9fa80;
    border-radius: 4px;
    overflow-x: auto;
    padding: 1rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
}

.markdown-content code {
    font-family: "JetBrains Mono", serif;
}

.markdown-content a {
    text-decoration: none;
    color: var(--theme-highlight);
    transition: all 0.3s;
}

.markdown-content a:hover {
    background: var(--theme-highlight);
    color: #000000;
}

.markdown-content h1 {
    font-size: 2rem;
    font-weight: 800;
}

.markdown-content h2 {
    font-size: 1.6rem;
    font-weight: 700;
}

.markdown-content h3 {
    font-size: 1.3rem;
    font-weight: 600;
}

.markdown-content h4 {
    font-size: 1.1rem;
    font-weight: 500;
}

.markdown-content h5 {
    font-size: 1rem;
    font-weight: 400;
}

.markdown-content .section-title {
    position: relative;
    padding-left: 1rem;
    color: #2c3e50;
}

.markdown-content .section-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--theme-bar-color-h1);
    border-radius: 4px;
}

.cut-off-rule {
    width: 100%;
    border-top: 2px solid #11182718;
}
</style>