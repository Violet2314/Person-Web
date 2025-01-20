<template>
    <div v-html="renderedMarkdown" class="markdown-content"></div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 选择你喜欢的主题
import 'katex/dist/katex.min.css'; // 引入 KaTeX 样式

export default {
    props: {
        fileName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            renderedMarkdown: ''
        };
    },
    created() {
        this.loadMarkdown();
    },
    methods: {
        loadMarkdown() {
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
            }).use(markdownItKatex); // 使用 markdown-it-katex 插件

            fetch(`/blog/${this.fileName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(content => {
                    this.renderedMarkdown = md.render(content);
                })
                .catch(error => {
                    console.error('Error fetching the markdown file:', error);
                });
        }
    }
};
</script>

<style scoped></style>