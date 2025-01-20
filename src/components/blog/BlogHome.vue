<template>
    <div class="blog-list">
        <router-link v-for="post in blogPosts" :key="post.fileName" :to="post.path" class="no-underline">
            <div class="blog-post">
                <div class="post-meta">
                    <span class="category">{{ post.category }}</span>
                    <span class="date">{{ post.date }}</span>
                </div>
                <div class="divider"></div>
                <h2>{{ post.title }}</h2>
                <p>{{ post.excerpt }}</p>
                <div v-if="post.image && post.image !== 'none'" class="imageBox">
                    <div class="divider2"></div>
                    <img :src="post.image" alt="blog image" class="blogimage" />
                </div>
                <span class="read-more">READ MORE +</span>
            </div>
        </router-link>
        <div class="blog-list-bottom"></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    blogPosts: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
@import '../../css/BlogPost.css';
.blog-list {
    flex: 1;
    position: relative;
    min-width: 0;
    /* Prevent flex item from overflowing */
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.blog-list-bottom {
    position: absolute;
    padding: 20px;
}
</style>