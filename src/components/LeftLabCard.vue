<template>
    <div class="movie-container">
        <div class="menu-lab">
            <p>My Lab</p>
        </div>
        <div class="movie-list">
            <div v-for="movie in movies" :key="movie.id" class="movie-item"
                @mousemove="handleMouseMove($event, movie.id)" @mouseenter="handleMouseEnter(movie.id)"
                @click="selectMovie(movie.id)" @mouseleave="handleMouseLeave"
                :class="{ 'hovered': hoveredMovie === movie.id , 'selected': selectedMovie === movie.id}">
                <h2 class="movie-title" :class="{ 'hovered': hoveredMovie === movie.id , 'selected': selectedMovie === movie.id}">
                    {{ movie.title }}
                </h2>
                <p class="movie-subtitle" :class="{ 'hovered': hoveredMovie === movie.id , 'selected': selectedMovie === movie.id}">
                    >> {{ movie.subtitle }} >>
                </p>
                <span class="movie-date" :class="{ 'hovered': hoveredMovie === movie.id , 'selected': selectedMovie === movie.id}">
                    {{ movie.date }}
                </span>

                <Transition name="movie-image">
                    <img v-if="hoveredMovie === movie.id && selectedMovie != movie.id" :src="movie.image" :alt="movie.title" class="movie-image"
                        :style="imageStyle" />
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const hoveredMovie = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)
const selectedMovie = computed(() => store.getters.getSelectedMovie)

const handleMouseMove = (event, movieId) => {
    if (hoveredMovie.value === movieId && selectedMovie.value !== movieId) {
        const rect = event.currentTarget.getBoundingClientRect()
        mouseX.value = event.clientX - rect.left
        mouseY.value = event.clientY - rect.top
    }
}

const selectMovie = (movieId) => {
    store.commit('setSelectedMovie', movieId)
}

const handleMouseEnter = (movieId) => {
    hoveredMovie.value = movieId
}

const handleMouseLeave = () => {
    hoveredMovie.value = null
}

const imageStyle = computed(() => {
    const imageWidth = 300
    const imageHeight = 200
    const offsetX = -imageWidth * 0.2 // 20% of image width
    const offsetY = -imageHeight - 20// 20% of image height

    return {
        transform: `translate(${mouseX.value + offsetX}px, ${mouseY.value + offsetY}px) rotate(-15deg)`,
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
    }
})

const movies = [
    {
        id: 1,
        title: 'Network difficult cloud music player',
        subtitle: 'QT',
        date: '2024.5',
        image: require('../photos/LabPhotos/QT2.png')
    },
    {
        id: 2,
        title: "Personal Website",
        subtitle: 'VUE',
        date: '2024.10',
        image: require('../photos/LabPhotos/QT2.png')
    },
    {
        id: 3,
        title: 'Books Management System',
        subtitle: 'VUE + JAVA',
        date: '2024.10',
        image: require('../photos/LabPhotos/BMS2.png')
    },
    {
        id: 4,
        title: 'GO Lab',
        subtitle: 'GO',
        date: 'none',
        image: require('../photos/LabPhotos/QT2.png')
    }
]
</script>

<style scoped>
.movie-container {
    width: 40%;
    flex-grow: 1;
    max-width: 650px;
    padding-bottom: 8%;
}

.movie-list {
    display: flex;
    flex-direction: column;
}

.movie-item {
    border-bottom: 2px solid rgba(255, 255, 255, 0.892);
    position: relative;
    padding: 1rem;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
}

.movie-item.hovered {
    background-color: rgba(255, 255, 255, 0.724);
}

.movie-title.hovered {
    color: #00ff00b1;
}

.movie-subtitle.hovered {
    color: #2d3748;
}

.movie-item.selected {
    background-color: white;
}

.movie-title.selected {
    color: #00ff00;
}

.movie-subtitle.selected {
    color: #2d3748;
}

.movie-title {
    font-family: eng;
    font-size: 30px;
    font-weight: bold;
    line-height: 1.2;
    letter-spacing: 0.05em;
    transition: color 0.3s ease-in-out;
    color: white;
}

.movie-subtitle {
    font-size: 1.125rem;
    margin-top: 0.5rem;
    transition: color 0.3s ease-in-out;
    color: #a0aec0;
}

.movie-date {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.25rem;
    transition: color 0.3s ease-in-out;
    color: #00ff00c0;
}

.movie-image {
    position: absolute;
    z-index: 10;
    border-radius: 0.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    pointer-events: none;
    object-fit: cover;
    /* 保持宽高比，同时填充整个容器 */
    object-position: center left;
    /* 图片在容器中的位置 */
    border: #00ff0060 solid 2px;
}

.menu-lab {
    border-bottom: 2px solid rgba(255, 255, 255, 0.892);
    font-size: 32px;
    font-family: eng;
    font-size: 30px;
    font-weight: bold;
    color: #82C0CC;
}

.menu-lab p {
    margin: 0;
    padding-left: 5%;
    padding-top: 5%;
    padding-bottom: 7%;
}

/* 进入动画 */
.movie-image-enter-active {
    transition: opacity 0.2s ease-out;
}

.movie-image-enter-from {
    opacity: 0;
    transform: scale(1) rotate(15deg);
}

.movie-image-enter-to {
    opacity: 1;
    transform: scale(1) rotate(30deg);
}

/* 离开动画 */
.movie-image-leave-active {
    transition: all 0.2s ease-in;
}

.movie-image-leave-from {
    opacity: 1;
    transform: scale(1) rotate(30deg);
}

.movie-image-leave-to {
    opacity: 0;
    transform: scale(0.75) rotate(15deg);
}
</style>