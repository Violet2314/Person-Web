<template>
    <div class="book-wrapper">
        <div class="stage" @mouseover="hover = true" @mouseleave="hover = false">
            <div class="cube" :class="{ 'hover': hover }">
                <figure class="back" :style="{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundPosition: 'center top',
                    backgroundSize: 'cover'
                }"></figure>
                <figure class="top" :style="topStyle"></figure>
                <figure class="bottom" :style="bottomStyle"></figure>
                <figure class="left" :style="{ width: `${width}px` }"></figure>
                <figure class="right" :style="rightStyle"></figure>
                <figure class="front" :style="{
                    backgroundImage: `url(${imgUrl})`,
                    backgroundPosition: 'center top',
                    backgroundSize: 'cover'
                }" ref="cuberef"></figure>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, computed, onMounted, onUnmounted } from 'vue';
const props = defineProps({
    imgUrl: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    }
});
const hover = ref(false);
const cuberef = ref(null);
const cubeWidth = ref(null);

const updateCubeWidth = () => {
    console.log(cubeWidth.value)
    if (cuberef.value) {
        cubeWidth.value = cuberef.value.clientWidth;
    }
};

const topBottomHeight = computed(() => {
    cubeWidth.value
    return `${cuberef.value ? cuberef.value.clientWidth * 0.98 : 0}px`;
});
const topBottomZ = computed(() => {
    cubeWidth.value
    return `${cuberef.value ? cuberef.value.clientWidth * 0.47 : 0}px`;
})
const topStyle = computed(() => {
    cubeWidth.value
    const width = cuberef.value ? cuberef.value.clientWidth : 0; // 确保在访问 width 前检查 cuberef
    return {
        width: `${props.width}px`,
        height: topBottomHeight.value,
        transform: `rotateX(90deg) rotateZ(90deg) translateZ(${width * 0.492}px) translateY(-${topBottomZ.value}) translateZ(-2px)`,
    };
})
const bottomStyle = computed(() => {
    cubeWidth.value
    const width = cuberef.value ? cuberef.value.clientWidth : 0;
    return {
        width: `${props.width}px`,
        height: topBottomHeight.value,
        transform: `rotateX(-90deg) rotateZ(90deg) translateZ(${width * 0.81}px) translateY(-${topBottomZ.value})`,
    }
})
const rightStyle = computed(() => {
    cubeWidth.value
    return {
        width: `${props.width}px`,
        transform: `rotateY(90deg) translateZ(${topBottomHeight.value}) translateZ(-4px)`
    }
})
// 监听窗口 resize 事件
const onResize = () => {
    updateCubeWidth();
};

onMounted(() => {
    window.addEventListener('resize', onResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
/* 3D Book Cube Styles */
.book-wrapper {
    width: 100%;
    height: 100%;
}

.stage {
    width: 100%;
    aspect-ratio: 1 / 1.3;
    /* 设置宽高比为 1:1.3 */
    perspective: 1000px;
    perspective-origin: center center;
    margin: 3%;
    float: left;
}

figure {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ddd;
}

.cube {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateY(-15deg) translateX(-30px);
    /* 初始状态略微左斜 */
    transition: transform 0.5s ease;
    /* 添加平滑过渡效果 */
}

.hover {
    transform: rotateX(-30deg) rotateY(-30deg);
}

.front {
    transform: translateZ(9.1px);
    background-size: auto 100%;
    aspect-ratio: 1 / 1.3;
}

.back {
    transform: rotateY(180deg) translateZ(9.1px);
    background-size: auto 100%;
    aspect-ratio: 1 / 1.3;
}

.top {
    background: #fafafa;
}

.bottom {
    background: #ccc;
    filter: drop-shadow(0 0 26px rgba(0, 0, 0, 0.75));
}

.left {
    transform: rotateY(-90deg) translateZ(9.1px);
    background: gray;
    background-size: auto 100%;
    height: 100%;
}

.right {
    background: linear-gradient(to right, #ddd, #bbb, #ddd);
    background-size: auto 100%;
}
</style>
