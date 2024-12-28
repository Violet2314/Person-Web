<template>
    <div class="macbook-container">
        <div class="macbook-frame">
            <div class="screen-bezel">
                <div class="screen">
                    <Transition name="blur-fade" mode="out-in">
                        <img :src="currentImage" :alt="alt" class="screen-content" :key="currentImage" />
                    </Transition>
                </div>
            </div>
            <div class="bottom-part">
                <span class="macbook-text">MacBook Air</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const selectedMovie = computed(() => store.getters.getSelectedMovie)

const photos = [
    {
        id: 1,
        images: [
            { image: require('../photos/LabPhotos/QT2.png') },
            { image: require('../photos/LabPhotos/QT1.png') }
        ]
    },
    {
        id: 2,
        images: [
            { image: require('../photos/LabPhotos/pes1.png') },
            { image: require('../photos/LabPhotos/pes2.png') }
        ]
    },
    {
        id: 3,
        images: [
            { image: require('../photos/LabPhotos/BMS1.png') },
            { image: require('../photos/LabPhotos/BMS2.png') }
        ]
    },
    {
        id: 4,
        images: [
            { image: require('../photos/LabPhotos/other1.jpg') },
            { image: require('../photos/LabPhotos/other2.jpg') }
        ]
    }
]

// 预加载图片
const preloadImages = () => {
    photos.forEach(photo => {
        photo.images.forEach(img => {
            const image = new Image()
            image.src = img.image
        })
    })
}

// 当前图片索引
const imageIndex = ref(0)

// 根据 selectedMovie 动态获取对应的图片数组
const currentImages = computed(() => {
    const selected = photos.find(photo => photo.id === selectedMovie.value)
    return selected ? selected.images : []
})

// 当前显示的图片 URL
const currentImage = computed(() => currentImages.value[imageIndex.value]?.image || '')

// 切换图片函数
const changeImage = () => {
    imageIndex.value = (imageIndex.value + 1) % currentImages.value.length
}

// 定时器
let interval
const setTimer = () => {
    clearInterval(interval)
    interval = setInterval(changeImage, 5000) // 每 5 秒切换一次图片
}

watch(selectedMovie, () => {
    imageIndex.value = 0 // 重置为第一张图片
    setTimer() // 重置定时器
})

onMounted(() => {
    preloadImages() // 预加载图片
    setTimer()
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>


<style scoped>
.macbook-container {
    width: 1000px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    perspective: 1000px;
}

.macbook-frame {
    position: relative;
    width: 100%;
    padding-bottom: 62%;
    /* Adjust this for desired aspect ratio */
    background: #f1f1f1;
    border-radius: 30px;
    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(0, 0, 0, 0.1);
}

.screen-bezel {
    position: absolute;
    top: 2%;
    left: 1%;
    right: 1%;
    height: 92%;
    background: #000;
    border-radius: 20px;
    overflow: hidden;
}

.screen {
    position: absolute;
    top: 1.5%;
    left: 1.2%;
    right: 1.2%;
    bottom: 1.5%;
    background: #000;
    overflow: hidden;
}

.screen-content {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.bottom-part {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3%;
    background: #f1f1f1;
    border-radius: 0 0 30px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

.keyboard-area {
    width: 95%;
    height: 60%;
    background: linear-gradient(to bottom, #e1e1e1, #d1d1d1);
    border-radius: 5px;
}

.touchpad {
    width: 40%;
    height: 20%;
    background: #d1d1d1;
    border-radius: 3px;
    margin-top: 5px;
}

.macbook-text {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 12px;
    color: #666;
    font-weight: 400;
    letter-spacing: 0.05em;
    margin-top: 5px;
}

/* Add realistic laptop bottom curve */
.macbook-frame::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: #d1d1d1;
    border-radius: 0 0 30px 30px;
}

/* Add subtle inner shadow to screen */
.screen::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    pointer-events: none;
}

/* Transition 效果 */
.blur-fade-enter-active, .blur-fade-leave-active {
    transition: opacity 1s ease, filter 1s ease;
}

.blur-fade-enter-from, .blur-fade-leave-to {
    opacity: 0;
    filter: blur(10px);
}

.blur-fade-enter-to, .blur-fade-leave-from {
    opacity: 1;
    filter: blur(0);
}
</style>