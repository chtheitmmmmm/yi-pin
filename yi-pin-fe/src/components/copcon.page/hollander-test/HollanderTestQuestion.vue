<script setup lang="ts">

import {reactive} from "vue";

export interface HLDQuestionInfo {
    name: string,
    content: string,
    options: [],
    multi: number // 最多选择的项数，multi 为 1 则为单选题，否则为多选提，若为 0 则为
}
const selections = reactive([]) // 所有已选项

const props = defineProps<HLDQuestionInfo>()
defineExpose([selections])    // 暴露所有已选项



</script>

<template>
<div class="container">
    <div class="q-name">
        {{content}}
    </div>
    <div class="container">
        <ol>
            <li class="q-option" v-for="option of options">
                <input :type="multi === 1 ? 'radio' : 'checkbox'"  :name="name" />
            </li>
        </ol>
    </div>
</div>
</template>

<style scoped lang="scss">
.q-option {
  list-style-type: upper-alpha;
}
</style>