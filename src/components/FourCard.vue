<template>
    <div class="skill-card" @mouseenter="animateIn" @mouseleave="animateOut" ref="cardRef">
        <div class="skill-card-front">
            <div class="skill-card-front-content">
                <h3 class="skill-title">{{ title }}</h3>
                <div class="skill-bar">
                    <div class="skill-bar-progress" :style="{ width: `${grade}%` }"></div>
                </div>
                <div v-if="logos && logos.length > 0" class="logo-container">
                    <!-- 使用 v-for 动态渲染 logo 图片 -->
                    <img v-for="(logo, index) in logos" :key="index" :src="logo" :alt="`Logo ${index + 1}`"
                        class="logo-image" />
                </div>
            </div>
        </div>
        <div class="skill-card-back" ref="overlayRef">
            <div class="scroll-container">
                <div class="skill-description">
                    <slot name="description"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import { gsap } from 'gsap'

defineProps({
    title: {
        type: String,
        required: true
    },
    grade: {
        type: Number, // 使用 Number 而不是 integer
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    logos: {
        type: Array,
    }
})


const cardRef = ref(null)
const overlayRef = ref(null)

onMounted(() => {
    gsap.set(overlayRef.value, {
        yPercent: 100,
        xPercent: 100,
        opacity: 0,
        scale: 0.8,
        borderRadius: '50%'
    })
})

const animateIn = () => {
    gsap.to(overlayRef.value, {
        yPercent: 0,
        xPercent: 0,
        opacity: 1,
        scale: 1,
        borderRadius: '16px',
        duration: 0.5,
        ease: 'power3.out'
    })
}

const animateOut = () => {
    gsap.to(overlayRef.value, {
        yPercent: 100,
        xPercent: 100,
        opacity: 0,
        scale: 0.8,
        borderRadius: '50%',
        duration: 0.5,
        ease: 'power3.in'
    })
}
</script>

<style scoped>
.skill-card-front-content {
    width: 70%;
    height: 60%;
    position: absolute;
    z-index: 2;
}

.skill-card {
    opacity: 0.99;
    position: relative;
    width: 23%;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.skill-card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0);
    box-shadow: inset 120px 100px 250px rgba(255, 255, 255, 0.723), inset -120px -100px 250px #6e6d6d3d;
    transition: box-shadow 0.5s ease;
}

.skill-card-front {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 1;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.skill-title {
    font-family: Arial, sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
}

.skill-bar {
    width: 40%;
    height: 8px;
    background-color: #e2e8f0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

/* 进度条的动态覆盖部分 */
.skill-bar-progress {
    height: 100%;
    background-color: #939393;
    /* 进度条颜色 */
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
}

.skill-card-back {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(46, 55, 72);
    border-radius: 16px;
    overflow: hidden;
    z-index: 3;
    /* Prevent content from spilling out */
}

.scroll-container {
    height: 80%;
    padding: 24px;
    overflow-y: auto;
    white-space: normal;
    /* 确保正常换行 */
    word-wrap: break-word;
    /* 强制长文本换行 */
    display: flex;
    flex-direction: column;
}

/* 隐藏滚动条 */
.scroll-container::-webkit-scrollbar {
    display: none;
}

.scroll-container {
    -ms-overflow-style: none;
    /* IE 和 Edge */
    scrollbar-width: none;
    /* Firefox */
}

.skill-description {
    font-size: 16px;
    line-height: 1.5;
    color: white;
    margin: 0;
    word-wrap: break-word;
}

.logo-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end; /* 将子元素靠右对齐 */
    position: absolute;
    bottom: -15%;
}

.logo-image {
    width: 30%;
    max-width: 65px;
    min-width: 50px;
}
</style>