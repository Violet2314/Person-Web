<template>
    <div class="navbar">
        <div class="navbar-content">
            <div class="logo">Abstract chips</div>
            <div class="nav">
                <div class="menu">
                    <a v-for="item in menuItems" :key="item.id" @click="scrollToSection(item.id, $event)"
                        :class="{ active: activeSection === item.id }">
                        {{ item.title }}
                    </a>
                </div>
                <div class="icons">
                    <a href="" class="icon-github"></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from 'vue';

const menuItems = [
    { id: 'experience', title: 'Experience' },
    { id: 'stack', title: 'Stack' },
    { id: 'lab', title: 'Lab' },
    { id: 'favorites', title: 'Favorites' },
    { id: 'time', title: 'Time' },
    { id: 'aesthetic', title: 'Aesthetic' },
];

const activeSection = ref('');

const emit = defineEmits(['scroll-to']);

const scrollToSection = (id, event) => {
    event.preventDefault(); // 阻止默认行为
    console.log(id);
    activeSection.value = id;
    emit('scroll-to', id); // 发出事件
};

// 暴露一个方法来更新活动部分
const updateActiveSection = (id) => {
    activeSection.value = id;
};

// 暴露方法给父组件
defineExpose({ updateActiveSection });
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.navbar-content {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 8%;
    padding-right: 8%;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
}

.nav {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu {
    display: flex;
    margin-left: 3%;
}

.menu a {
    margin: 0 15px;
    color: #333;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;
    cursor: pointer;
}

.menu a:hover{
    color: var(--accent-colour);
}

.icons a {
    margin-left: 15px;
    color: #333;
    font-size: 20px;
    transition: color 0.3s;
}

.icons a:hover {
    color: #007bff;
}

.icons a.icon-github {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url('../assets/github-mark.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
