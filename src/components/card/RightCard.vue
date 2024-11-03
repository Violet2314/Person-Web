<template>
    <div class="right-skill-card" @mouseenter="animateIn" @mouseleave="animateOut" ref="cardRef">
        <div class="right-skill-card-front">
            <div class="right-skill-card-front-content">
                <Transition name="fade">
                    <h3 class="right-skill-title" :key="selectedCard?.title">{{ selectedCard?.title || '' }}</h3>
                </Transition>
                <Transition name="fade">
                    <p :key="selectedCard?.Stack">{{ selectedCard?.Stack || '' }}</p>
                </Transition>
            </div>
        </div>
        <div class="right-skill-card-back" ref="overlayRef">
            <div class="right-scroll-container">
                <Transition name="fade">
                    <div class="right-skill-description" :key="selectedCard?.description">
                        <p>{{ selectedCard?.description || '' }}</p>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { gsap } from 'gsap'

const store = useStore()
const selectedMovie = computed(() => store.getters.getSelectedMovie)

const passenge = [
    {
        id: 1,
        title: "Network difficult cloud music player",
        Stack: "QT(CPP)",
        description: "My network difficult cloud music player is based on QT(CPP) development, to achieve the functions of login, registration, music playback, sound adjustment, song list function, red heart function (my favorite music)"
    },
    {
        id: 2,
        title: "Personal Website",
        Stack: "VUE",
        description: "I developed a personal website based on VUE to develop, mainly interactive design implementation, as you can see, showing their own cards, experiences, LABS, hobbies"
    },
    {
        id: 3,
        title: "Books Management System",
        Stack: "VUE + JAVA",
        description: "The library management system I developed is the same old cybertrash"
    },
    {
        id: 4,
        title: "GO Lab",
        Stack: "GO",
        description: "I haven't done it yet"
    }
]

// 动态获取当前选中卡片的数据
const selectedCard = computed(() => passenge.find(card => card.id === selectedMovie.value) || {})

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
.right-skill-card-front-content {
    width: 70%;
    position: absolute;
    z-index: 2;
}

.right-skill-card-front-content p{
    position: absolute;
    top: 70px;
}

.right-skill-card {
    opacity: 0.99;
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.right-skill-card::after {
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

.right-skill-card-front {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.right-skill-title {
    position: absolute;
    font-family: Arial, sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
}

.right-skill-bar {
    width: 40%;
    height: 8px;
    background-color: #e2e8f0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

/* 进度条的动态覆盖部分 */
.right-skill-bar-progress {
    height: 100%;
    background-color: #939393;
    /* 进度条颜色 */
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
}

.right-skill-card-back {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    border-radius: 16px;
    overflow: hidden;
    z-index: 3;
    /* Prevent content from spilling out */
}

.right-scroll-container {
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
.right-scroll-container::-webkit-scrollbar {
    display: none;
}

.right-scroll-container {
    -ms-overflow-style: none;
    /* IE 和 Edge */
    scrollbar-width: none;
    /* Firefox */
}

.right-skill-description {
    font-size: 16px;
    line-height: 1.5;
    color: white;
    margin: 0;
    word-wrap: break-word;
}

/* Fade transition effect */
.fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>