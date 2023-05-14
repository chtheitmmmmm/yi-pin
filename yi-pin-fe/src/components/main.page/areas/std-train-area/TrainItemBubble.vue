<script setup lang="ts">
import {onMounted, ref} from "vue";

const ctn = ref<HTMLDivElement | null>(null)

onMounted(() => {
    ctn.value!.style.animationDelay = `${Math.random()}s`
})

</script>

<template>
<div class="ctn" ref="ctn">
    <slot></slot>
</div>
</template>

<style scoped lang="scss">
@use "bootstrap/scss/bootstrap" as *;
$max_transform: 3%;
$radius_delta: 10%;
@keyframes float {
    from {
        transform: translate(0, 0);
        border-radius: 50%;
    }
    20% {
        transform: translate($max_transform, calc($max_transform / 2));
        border: {
            bottom: {
                left-radius: calc(50% - $radius_delta);
                right-radius: calc(50% + $radius_delta / 2.3);
            }
            top: {
                left-radius: calc(50% + $radius_delta);
                right-radius: calc(50% - $radius_delta / 2);
            }
        }
    }
    40% {
        transform: translate(-$max_transform, - calc($max_transform / 2));
        border: {
            bottom: {
                left-radius: calc(50% - $radius_delta / 1.1);
                right-radius: calc(50% + $radius_delta / 2);
            }
            top: {
                left-radius: calc(50% + $radius_delta);
                right-radius: calc(50% - $radius_delta / 2);
            }
        }
    }
    60% {
        transform: translate(- calc($max_transform / 2), calc($max_transform));
        border: {
            bottom: {
                left-radius: calc(50% + $radius_delta / 2);
                right-radius: calc(50% - $radius_delta);
            }
            top: {
                left-radius: calc(50% - $radius_delta / 2);
                right-radius: calc(50% + $radius_delta);
            }
        }
    }
    80% {
      transform: translate($max_transform, - calc($max_transform / 2));
        border: {
            bottom: {
                left-radius: calc(50% - $radius_delta / 3);
                right-radius: calc(50% + $radius_delta / 2);
            }
            top: {
                left-radius: calc(50% + $radius_delta / 1.3);
                right-radius: calc(50% - $radius_delta / 2);
            }
        }
    }
    75% {
        transform: translate(-$max_transform, - calc($max_transform / 2));
        border: {
            bottom: {
                left-radius: calc(50% + $radius_delta);
                right-radius: calc(50% - $radius_delta / 2);
            }
            top: {
                left-radius: calc(50% - $radius_delta);
                right-radius: calc(50% + $radius_delta / 2);
            }
        }
    }
    to {
        transform: translate(0, 0);
        border-radius: 50%;
    }
}

.ctn {
    background-color: primary_color();
    animation: float 10s infinite ease-in;
    transform: translate(0, 0);
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        animation: none;
    }
}

</style>