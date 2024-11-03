<template>
    <div class="card-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="orbit-path outer"></div>
        <div class="orbit-path inner"></div>
        <div class="floating-card" ref="card">
            <div class="card-content">
                <h2>My name is:</h2>
                <div class="name-text">
                    <transition-group name="main-name" tag="div" class="main-name-wrapper">
                        <div v-if="currentName" :key="currentName" class="main-name" ref="nameElement">{{ currentName }}
                        </div>
                    </transition-group>
                </div>
                <h3>I'm a:</h3>
                <ul>
                    <li>CCPC Bronze Medalist</li>
                    <li>Gduef Sophomore</li>
                    <li>Front Developer</li>
                    <li>Cpp Developer</li>
                </ul>
            </div>
            <div class="orange-ball"></div>
        </div>
        <div v-for="(icon, index) in icons" :key="index" class="floating-icon" :class="icon.orbit"
            :ref="el => { if (el) orbitingIcons[index] = el }">
            <img :src="icon.src" :alt="icon.alt" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

const container = ref(null)
const card = ref(null)
const orbitingIcons = ref([])

const icons = [
    { src: require('../assets/profile-photo.jpg'), alt: 'Orange circle', orbit: 'outer' },
    { src: require('../assets/Microsoft_Edge_logo_(2019).svg'), alt: 'Edge logo', orbit: 'inner' },
    { src: require('../assets/cpp-svgrepo-com.svg'), alt: 'Cpp logo', orbit: 'inner' }
]

const names = ['Abstract Chips','Gduef Silly Student']
const currentName = ref(names[0])
let currentIndex = 0

// 切换名字的函数
const changeName = () => {
    // 更新名字
    currentIndex = (currentIndex + 1) % names.length;
    currentName.value = names[currentIndex];
}

// 每 2 秒切换一次名字
let nameInterval
onMounted(() => {
    nameInterval = setInterval(changeName, 3000)
})

onUnmounted(() => {
    if (nameInterval) clearInterval(nameInterval)
})

let tiltAnimation
let orbitAnimations = []

const handleMouseMove = (e) => {
    if (!container.value || !card.value) return

    const rect = container.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const tiltY = (mouseX / rect.width) * 30
    const tiltX = (mouseY / rect.height) * 30

    if (tiltAnimation) tiltAnimation.kill()
    tiltAnimation = gsap.to(card.value, {
        rotateX: -tiltX,
        rotateY: tiltY,
        duration: 0.5,
        ease: 'power2.out'
    })
}

const handleMouseLeave = () => {
    if (tiltAnimation) tiltAnimation.kill()
    tiltAnimation = gsap.to(card.value, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
    })
}

onMounted(() => {
    // Orbiting animation for icons
    orbitingIcons.value.forEach((icon, index) => {
        const isOuter = index === 0;
        const radius = isOuter ? 320 : 280; // 外圈轨道和内圈轨道的半径
        const duration = isOuter ? 7 : 12; // 外圈轨道动画速度较慢
        const startOffset = index / icons.length; // 均匀分布比例，0 到 1 之间

        gsap.set(icon, {
            x: radius,
            y: 0,
            xPercent: -50,
            yPercent: -50,

        });

        orbitAnimations.push(gsap.to(icon, {
            motionPath: {
                path: `M${radius},0a${radius},${radius} 0 1,1 0,0.1`,
                start: startOffset, // 设置轨迹上的起始位置
                end: startOffset + 1, // 一圈的结束点
                autoRotate: false,
                align: "self",
                alignOrigin: [0.5, 0.5],
            },
            duration: duration,
            repeat: -1,
            ease: "none",
        }));
    });
})

onUnmounted(() => {
    if (tiltAnimation) tiltAnimation.kill()
    orbitAnimations.forEach(animation => animation.kill())
})
</script>

<style scoped>
.card-container {
    position: relative;
    width: 500px;
    height: 600px;
    perspective: 1000px;
    margin: 120px auto;
}

.orbit-path {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

.orbit-path.outer {
    width: 600px;
    height: 600px;
    border: 2.5px dashed rgba(0, 0, 0, 0.1);
}

.orbit-path.inner {
    width: 520px;
    height: 520px;
    border: 2.5px dashed rgba(0, 0, 0, 0.2);
}

.floating-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 400px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transform-style: preserve-3d;
    z-index: 2;
}

.floating-card::after{
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

.card-content {
    position: relative;
    padding: 20px;
    text-align: center;
    z-index: 2;
}

h2,
h3 {
    margin: 10px 0;
    color: #333;
}

.card-content h2 {
    text-align: left;
}

.card-content h3 {
    text-align: left;
    margin-top: 30px;
}

.name-text{
    padding-top: 68px;
    border-bottom: 2px solid var(--primary-black);
}

.main-name {
    top: 67px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    font-size: 36px;
    color: var(--accent-colour);
    font-family: Anton;
    margin: 0;
    padding-bottom: 10px;
    opacity: 1;
    white-space: nowrap; /* 防止换行 */
}


ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: right;
}

li {
    margin: 5px 0;
    color: #666;
}

.floating-icon {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    z-index: 0;
}

.floating-icon.outer {
    left: -480px;
    /* 外圈图标的位置调整 */
    top: 35%;
    z-index: 1;
}

.floating-icon.inner {
    left: -312px;
    /* 内圈图标的位置调整 */
}

.floating-icon.outer img {
    width: 200px;
}

.floating-icon img {
    width: 70px;
    object-fit: contain;
    border-radius: 50%;
}

.orange-ball{
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    left: -26px;
    bottom: -26px;
    background: #E47362;
    z-index: 2;
}

/* 进入动画 */
.main-name-enter-active {
    transition: opacity 1s ease, transform 1s ease;
}

.main-name-enter-from {
    opacity: 0;
    transform: translateY(50px);
    filter: blur(10px);
}

.main-name-enter-to {
    opacity: 1;
    transform: translateY(0);
    transform: translateX(-50%);
    filter: blur(0px);
}

/* 离开动画 */
.main-name-leave-active {
    transition: opacity 1s ease, transform 1s ease;
}

.main-name-leave-from {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
}

.main-name-leave-to {
    opacity: 0;
    transform: translateY(-50px);
    filter: blur(10px);
}


</style>