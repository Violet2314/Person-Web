<style scoped>
.light-button button.bt {
    position: relative;
    height: 200px;
    display: flex;
    align-items: flex-end;
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
}

.light-button button.bt .button-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100px;
    background-color: #0a0a0a;
    border-radius: 5px;
    color: #0f0f0f;
    font-weight: 700;
    transition: 300ms;
    outline: #0f0f0f 2px solid;
    outline-offset: 20;
}

.light-button button.bt .button-holder svg {
    height: 50px;
    fill: #0f0f0f;
    transition: 300ms;
}

.light-button button.bt .light-holder {
    position: absolute;
    height: 200px;
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.light-button button.bt .light-holder .dot {
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    background-color: #0a0a0a;
    border-radius: 10px;
    z-index: 2;
}

.light-button button.bt .light-holder .light {
    position: absolute;
    top: 0;
    width: 200px;
    height: 200px;
    clip-path: polygon(50% 0%, 25% 100%, 75% 100%);
    background: transparent;
}

.light-button button.bt:hover .button-holder svg {
    fill: rgba(88, 101, 242, 1);
}

.light-button button.bt:hover .button-holder {
    color: rgba(88, 101, 242, 1);
    outline: rgba(88, 101, 242, 1) 2px solid;
    outline-offset: 2px;
}

.light-button button.bt:hover .light-holder .light {
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg,
            rgba(88, 101, 242, 1) 0%,
            rgba(255, 255, 255, 0) 75%,
            rgba(255, 255, 255, 0) 100%);
}
</style>

<template>
    <div class="light-button">
        <button class="bt">
            <div class="light-holder">
                <div class="dot"></div>
                <div class="light"></div>
            </div>
            <div class="button-holder">
                <p>Discord</p>
            </div>
        </button>
    </div>
</template>
