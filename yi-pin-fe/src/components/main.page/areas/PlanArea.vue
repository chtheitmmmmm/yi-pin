<script setup lang="ts">

import Paragraph from "@/components/Paragraph.vue";
</script>

<template>
<div>
    <div class="ctn container">
        <div class="text-center">
            <a class="link-info text-3xl underline" href="https://www.zxgj.cn/g/holland2">霍兰德测试</a>
        </div>
        <div>
            <Paragraph class="text-xl lh-1">
                想知道更多专属职业规划，请点击这里：
                <router-link
                    :to="{path: '/forum', query: { forumType: 1 }}"
                    class="underline text-primary ">
                    咨询
                </router-link>
            </Paragraph>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">

</style>