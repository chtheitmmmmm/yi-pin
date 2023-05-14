<script setup lang="ts">

import axios from "axios";
import {useSessionStore} from "@/stores/session";
import type {ForumProfile, ForumProfileDto} from "@/entities/forum";
import {forumProfileTransform} from "@/entities/forum";
import {inject, nextTick, type Ref} from "vue";

const props = defineProps<{
  sourceLink: string
}>()

const session = useSessionStore();
const selection = inject<Ref<string | null>>('selection')!;

function onSelection(fid: string) {
    selection.value = null;
    nextTick(() => {
        selection.value = fid;
    })
}

const source: ForumProfile[] = Array.from(
    new Map(
        (await axios.get(props.sourceLink)).data.data
            .map((forumProfileDto: ForumProfileDto) => forumProfileTransform(forumProfileDto))
            .map((forumProfile: ForumProfile) => [forumProfile.id, forumProfile])
    ).values()
) as any

source.sort((fp1, fp2) => fp1.createTime.diff(fp2.createTime))

</script>

<template>
<div>
  <ul v-if="source.length > 0" class="list-group">
    <li v-for="forum of source" class="list-group-item">
      <div class="w-11/12 flex justify-content-between align-items-center">
        <span class="cursor-pointer hover:text-green-200 transition-all duration-200" @click="onSelection(forum.id)">{{forum.title}}</span>
        <div>
            {{forum.like.num}} / {{forum.commentNum}} / {{forum.collection.num}}
        </div>
      </div>
    </li>
  </ul>
  <el-empty v-else description="这里空空如也" />
</div>

</template>

<style scoped lang="scss">

</style>