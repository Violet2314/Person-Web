<style scoped>
.drop-card {
    display: flex;
    flex-direction: row;
    width: 255px;
    height: 180px;
    padding: 0.5rem;
    background: rgba(198, 198, 198, 0.34);
    border-radius: 8px;
    backdrop-filter: blur(5px);
    border-bottom: 3px solid rgba(255, 255, 255, 0.440);
    border-left: 2px rgba(255, 255, 255, 0.545) outset;
    box-shadow: -40px 50px 30px rgba(0, 0, 0, 0.280);
    transform: skewX(10deg);
    transition: .4s;
    overflow: hidden;
    color: white;
}

.drop-card:hover {
    height: 180px;
    width: 550px;
    transform: skew(0deg);
}

.align {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-self: flex-start;
}

.red {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ff605c;
    box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.yellow {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffbd44;
    box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.green {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #00ca4e;
    box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.280);
}

.drop-card h1 {
    text-align: center;
    margin: 1.3rem;
    color: rgb(218, 244, 237);
    text-shadow: -10px 5px 10px rgba(0, 0, 0, 0.573);
}

.drop-card p{
    color: rgba(0, 0, 0, 0.542);
}

.left-thing{
    display: flex;
    flex-direction: column;
}
</style>

<template>
    <div class="drop-card">
        <div class="left-thing">
            <div class="align">
                <span class="red"></span>
                <span class="yellow"></span>
                <span class="green"></span>
            </div>
            <h1>StarryCoding</h1>
        </div>
        <p>
            My project team is responsible for the development of StarryCoding oj. Based on Vue3 framework, I completed the development of four front-end pages and passed strict code review
        </p>
    </div>
</template>
