<template>
    <div class="slide-card">StarryCoding</div>
</template>

<script setup>

</script>

<style>
/* From Uiverse.io by eslam-hany */
.slide-card {
    font-family: 'Microsoft Sans Serif', Verdana, sans-serif;
    position: relative;
    width: 72%;
    height: 45%;
    background: mediumturquoise;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    border-radius: 15px;
    cursor: pointer;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}


.slide-card::before,
.slide-card::after {
    position: absolute;
    content: "";
    width: 20%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: bold;
    background-color: lightblue;
    transition: all 0.5s;
}

.slide-card::before {
    top: 0;
    right: 0;
    border-radius: 0 15px 0 100%;
}

.slide-card::after {
    bottom: 0;
    left: 0;
    border-radius: 0 100% 0 15px;
}

.slide-card:hover::before,
.slide-card:hover:after {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: all 0.5s;
}

.slide-card:hover:after {
    content: "Based on Vue3 framework, completed the development of 4 front-end pages, and passed the strict code audit";
    font-size: 18px;
}
</style>