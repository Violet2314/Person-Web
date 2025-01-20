<template>
    <div class="blog-mainhome">
        <div class="blog-home">
            <div class="blog-left">
                <nav class="nav-menu">
                    <ul>
                        <li>
                            <router-link to="/">
                                <div>homepage</div>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/blog">
                                <div>Blog Home</div>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="blog-content">
                <router-view :blogPosts=blogPosts @content-updated="handleContentUpdated"></router-view>
            </div>
            <div class="blog-right">
                <div class="blog-right-image">
                    <img src="../../public/blog/image/showme.png" alt="" class="showme" />
                </div>
                <transition name="fade" mode="out-in">
                    <div class="blog-right-home" v-if="shouldShowBlogRightHome">
                        <div class="archive-widget">
                            <div class="archive-widget-num">
                                <h3>Archives Total:</h3>
                                <div class="archive-count">{{ blognum }}</div>
                            </div>
                            <div class="archive-stats">
                                <p>Tags: 3 Categories: 3</p>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade" mode="out-in">
                    <BlogContentNav :renderedMarkdown="currentContent" v-if="shouldShowBlogContentNav" />
                </transition>
                <div class="to-top"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { blogItem } from '@/generatedRoutes';
import BlogContentNav from '@/components/blog/BlogContentNav.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const currentContent = ref('');

const handleContentUpdated = (content) => {
    currentContent.value = content;
};

// 使用 ref 来定义响应式数据
const blogPosts = ref(blogItem.map(item => ({
    path: item.path,
    title: item.title,
    category: item.category,
    date: item.date,
    excerpt: item.excerpt,
    image: item.image,
})));
const blognum = ref(blogPosts.value.length);

const shouldShowBlogContentNav = computed(() => route.meta.showContentNav);
const shouldShowBlogRightHome = computed(() => route.meta.showRightHome);
</script>

<style scoped>
.fade-enter-active,
.fade-enter-leave{
    transition: opacity 0.5s ease;
    transition-delay: 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.showme {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 8%;
}

.archive-widget-num {
    position: relative;
    width: 100%;
    border-left: 5px solid var(--theme-black);
}

.archive-widget-num::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: var(--theme-highlight);
    transition: width 0.5s ease;
    transition-delay: 0.0s;
    z-index: -1;
}

.archive-widget-num:hover::before {
    width: calc(100% - 5px);
}

.archive-widget-num:hover h3 {
    color: var(--theme-highlight);
}

.to-top {
    position: absolute;
    bottom: 20px;
    left: -20px;
    padding: 20px;
}

.blog-mainhome {
    max-height: 100%;
    overflow: hidden;
    z-index: 1;
}

.blog-mainhome::after {
    content: "";
    /* 伪元素必须要有内容 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../public//blog/image/background.png") no-repeat center center;
    background-size: cover;
    filter: blur(3px) brightness(0.7);
    /* 添加滤镜 */
    z-index: -1;
    /* 让伪元素在内容后面 */
}

.no-underline {
    text-decoration: none;
}

.blog-home {
    overflow-y: scroll;
    position: relative;
    display: flex;
    height: calc(100vh - 40px);
    /* 添加垂直滚动条 */
    padding: 20px;
    gap: 20px;
    /* 确保内容在伪元素之上 */
}

/* Firefox 滚动条样式 */
.blog-home {
    scrollbar-width: thin;
    scrollbar-color: var(--theme-bar-color-0) transparent;
}

/* 隐藏滚动条上下箭头按钮 */
.blog-home::-webkit-scrollbar-button {
    display: none;
}

.blog-left {
    width: 15%;
    height: calc(100% - 25px);
    min-width: 180px;
    flex-shrink: 0;
    /* 保持固定宽度 */
    position: sticky;
    /* 使用粘性定位 */
    top: 20px;
    /* 距离顶部的距离 */
    align-self: flex-start;
    /* 避免 flex 拉伸 */
    z-index: 1;
    /* 确保在其他元素之上 */
}

.blog-content {
    flex: 1;
}

.blog-right {
    width: 18%;
    height: calc(100% - 25px);
    min-width: 190px;
    flex-shrink: 0;
    /* 保持固定宽度 */
    position: sticky;
    /* 使用粘性定位 */
    top: 20px;
    /* 距离顶部的距离 */
    align-self: flex-start;
    /* 避免 flex 拉伸 */
    z-index: 1;
    /* 确保在其他元素之上 */
}

/* Navigation styles */
.nav-menu {
    margin-top: 20vh;
    padding: 20px;
    border-radius: 8px;
}

.nav-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-menu li {
    position: relative;
    border-left: 7px solid var(--theme-black);
    margin: 10px;
    padding: 10px;
    transition: all 0.3s;
}

.nav-menu li::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: var(--theme-highlight);
    /* 过渡的背景色 */
    transition: width 0.5s ease;
    /* 设置动画 */
    transition-delay: 0.0s;
    z-index: -1;
    /* 确保它在文本下方 */
}

.nav-menu li:hover::before {
    width: 100%;
    /* 鼠标悬停时宽度为100%，实现从左到右的过渡 */
}

.nav-menu router-link {
    display: flex;
    justify-content: flex-end;
}

.nav-menu a {
    text-align: right;
    font-weight: 500;
    font-family: "Oswald", serif;
    color: var(--theme-black);
    text-decoration: none;
    font-size: 24px;
    transition: all 0.3s;
}

.nav-menu li:hover a {
    color: var(--theme-text-rev);
}

/* Archive widget styles */
.archive-widget {
    width: 75%;
    margin: 0 auto;
    font-family: "Oswald", serif;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.archive-widget h3 {
    margin: 0;
    margin-left: 3%;
    font-size: 36px;
    color: #0f172a;
    transition: color 0.3s;
}

.archive-stats {
    padding: 1% 5%;
    display: flex;
    justify-content: space-between;
    font-size: 25px;
    color: #64748b;
}

.archive-stats p {
    margin: 0;
}

.archive-count {
    font-size: 40px;
    font-weight: bold;
    color: #0369a1;
    margin: 0;
    margin-left: 8%;
}


/* Responsive design */
@media (max-width: 768px) {
    .blog-home {
        flex-direction: column;
    }

    .blog-left,
    .blog-right {
        width: 100%;
    }
}
</style>