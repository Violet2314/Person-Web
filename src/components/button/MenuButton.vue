<template>
    <input id="burger-checkbox" type="checkbox" />
    <label class="burger" for="burger-checkbox">
        <span></span>
        <span></span>
        <span></span>
    </label>

</template>

<script setup>

</script>

<style>
.burger {
    display: inline-block;
    cursor: pointer;
    z-index: 1000;
}

.burger span {
    display: block;
    width: 30px;
    height: 3px;
    background: #333;
    margin: 6px 0;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
        opacity 0.3s ease;
}

#burger-checkbox {
    display: none;
}

#burger-checkbox:checked+.burger span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

#burger-checkbox:checked+.burger span:nth-child(2) {
    opacity: 0;
    transform: translateX(-20px);
}

#burger-checkbox:checked+.burger span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}
</style>