<template>
    <div class="catalog-container">
        <div class="catalog-header">
            <span class="catalog-title">Catalog</span>
        </div>
        <div class="catalog-content">
            <div v-for="(item, index) in catalogItems" :key="index" class="catalog-item" :class="{
                'level-1': item.level === 1,
                'level-2': item.level === 2,
                'level-3': item.level === 3
            }" @click="scrollToSection(item.id)">
                {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch,defineProps} from 'vue';

const props = defineProps({
    renderedMarkdown: {
        type: String,
        required: true
    }
});

const catalogItems = ref([]);

// 解析渲染后的 markdown 内容，提取标题
const parseCatalog = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3');

    return Array.from(headings).map((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent;
        const id = `heading-${index}`;
        heading.id = id; // 为标题添加 id

        return {
            id,
            level,
            text
        };
    });
};

// 监听 markdown 内容变化
watch(() => props.renderedMarkdown, (newContent) => {
    if (newContent) {
        console.log("wok")
        catalogItems.value = parseCatalog(newContent);
    }
}, { immediate: true });

// 滚动到对应章节
const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<style scoped>
.catalog-container {
    width: 70%;
    height: 200px;
    overflow: auto;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 16px;
}

.catalog-header {
    padding-bottom: 12px;
    border-bottom: 2px solid #eee;
    margin-bottom: 12px;
}

.catalog-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #2c3e50;
}

.catalog-item {
    padding: 8px 0;
    cursor: pointer;
    color: #666;
    transition: all 0.3s;
    font-size: 0.9rem;
}

.catalog-item:hover {
    color: #409EFF;
    background: rgba(64, 158, 255, 0.1);
    border-radius: 4px;
}

.level-1 {
    padding-left: 0;
    font-weight: bold;
}

.level-2 {
    padding-left: 1.5em;
}

.level-3 {
    padding-left: 3em;
    font-size: 0.85rem;
}
</style>