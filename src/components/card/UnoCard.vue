<template>
    <div class="uno-card">
        <div class="card-inner">
            <div class="front">
                <div class="front-bg"></div>
            </div>
            <div class="back">
                <div class="back-bg">
                    <p class="uno">UNO</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.uno-card {
    background-color: transparent;
    width: 190px;
    height: 260px;
    perspective: 1000px;
    transform-origin: top left;
    border-radius: 15px;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 1.1s;
    transform-style: preserve-3d;
    border-radius: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.uno-card:hover .card-inner {
    transform: rotateY(180deg) rotate(25deg);
}

.front,
.back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.front {
    background-color: #fff;
    color: black;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.front::after {
    content: "1";
    color: #C90522;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    font-weight: 900;
    width: 170px;
    height: 180px;
    background-color: #ffffff;
    border: 5px solid white;
    border-radius: 850px 150px 850px 150px;
    position: absolute;
    text-shadow: -1px 1px 0 #191F1F, -2px 2px 0 #191F1F, -3px 3px 0 #191F1F, -4px 4px 0 #191F1F, -5px 5px 0 #191F1F, -6px 6px 0 #191F1F, -7px 7px 0 #191F1F, -8px 8px 0 #191F1F, -9px 9px 0 #191F1F;
}

.front-bg {
    width: 90%;
    height: 90%;
    background: #C90522;
    border-radius: 15px;
}

.front-bg::after {
    content: "1";
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 2em;
    color: white;
    font-weight: 900;
    text-shadow: -1px 1px 0 #191F1F, -2px 2px 0 #191F1F, -3px 3px 0 #191F1F, -4px 4px 0 #191F1F, -5px 5px 0 #191F1F;
}

.front-bg::before {
    content: "1";
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 2em;
    color: white;
    font-weight: 900;
    text-shadow: -1px 1px 0 #191F1F, -2px 2px 0 #191F1F, -3px 3px 0 #191F1F, -4px 4px 0 #191F1F, -5px 5px 0 #191F1F;
}

.back {
    background-color: #fff;
    color: white;
    transform: rotateY(180deg);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.back-bg::before {
    content: "";
    width: 170px;
    height: 180px;
    background-color: #C90522;
    border-radius: 850px 150px 850px 150px;
    position: absolute;
}

.back-bg {
    width: 90%;
    height: 90%;
    background: #191F1F;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.uno {
    color: #E5CA22;
    font-size: 5em;
    font-weight: 900;
    letter-spacing: -5px;
    transform: rotate(-25deg);
    text-shadow: -1px 1px 0 #191F1F, -2px 2px 0 #191F1F, -3px 3px 0 #191F1F, -4px 4px 0 #191F1F, -5px 5px 0 #191F1F, -6px 6px 0 #191F1F, -7px 7px 0 #191F1F, -8px 8px 0 #191F1F, -9px 9px 0 #191F1F, -10px 10px 0 #fff, -11px 11px 0 #fff;
}
</style>