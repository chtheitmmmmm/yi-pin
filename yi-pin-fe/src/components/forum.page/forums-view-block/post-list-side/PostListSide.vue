<script setup lang="ts">

import PostsList from "@/components/forum.page/forums-view-block/post-list-side/post-list/PostsList.vue";
import SearchFrame from "@/components/forum.page/forums-view-block/post-list-side/SearchFrame.vue";
import {nextTick, provide, ref, watch} from "vue";
import ForumView from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumView.vue";
import BackBrowseButton from "@/components/forum.page/BackBrowseButton.vue";
import ForumViewLoading from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewLoading.vue";
import PostsListLoading from "@/components/forum.page/forums-view-block/post-list-side/post-list/PostsListLoading.vue";

provide('ftr', ref(''))

const selection = ref<string | null>(null)
const postsList = ref<typeof PostsList | null>(null)
const showList = ref(true)

function onView(fid: string) {
  selection.value = fid;
}

function onBackView() {
  selection.value = null;
}

const forumType = ref(0)
provide('forumType', forumType)

function onRefresh() {
  showList.value = false;
  nextTick(() => {
    showList.value = true;
  })
}

function onInteract(fid: string, type: string, ifDo: boolean) {
  onRefresh() // 目前简单实现一下
}

watch(
  () => forumType.value,
  () => {
    onRefresh()
  }
)

</script>

<template>
<div class="flex relative p-0 m-0">
  <div class="p-0 m-0 post-list-side-ctn absolute flex w-full h-full overflow-x-hidden">
    <div class="post-list-side-list-ctn flex flex-col w-full h-full relative flex-shrink-0 right-0 transition-all duration-200" :class="{'right-full': selection}">
      <SearchFrame class="m-1"></SearchFrame>
      <div class="w-full relative flex align-items-center justify-content-center">
        <div class="flex align-self-center w-1/2 justify-content-evenly forum-type-switch">
          <div class="cursor-pointer flex-grow text-center" :data-checked="forumType === 0" @click="forumType = 0">
            论坛
          </div>
          <div class="cursor-pointer flex-grow text-center" :data-checked="forumType === 1" @click="forumType = 1">
            咨询
          </div>
          <div class="absolute right-5 cursor-pointer -rotate-180 hover:rotate-180 transition-all duration-500 active:scale-90" title="刷新" @click="onRefresh">
            <svg class="-rotate-180" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
              <path d="M938.336973 255.26894c-16.685369-6.020494-35.090879 2.752226-40.939358 19.437594l-24.770032 69.493701c-29.070385-65.537376-74.998152-123.162103-133.48295-166.337645-185.947253-137.611288-450.848984-100.112212-590.180413 83.942886C81.534688 350.908785 52.980346 460.653788 68.805644 570.742819c15.825298 110.605073 74.48211 208.481102 164.789518 275.394591 75.686209 55.904586 164.273476 83.082815 252.172686 83.082815 128.494541 0 255.26894-57.624727 338.007727-166.853687 36.639006-48.335965 61.581052-102.348396 74.48211-160.833193 3.78431-17.373425-7.224593-34.402822-24.426004-38.187133-17.201411-3.78431-34.402822 7.052579-38.187133 24.426004-10.836889 49.36805-31.994625 95.123803-62.957164 135.891147-118.173694 156.016798-342.996136 187.839409-500.90509 70.869814-76.546279-56.592642-126.086343-139.33143-139.503444-232.907106-13.417101-93.059634 10.664875-185.775239 67.77356-261.11742C318.05409 144.491853 542.704519 112.497228 700.785486 229.466823c57.280699 42.315471 100.112212 100.972283 123.334117 167.197715l-110.261045-43.003528c-16.513355-6.364522-35.090879 1.720141-41.627415 18.233496-6.536536 16.513355 1.720141 35.090879 18.233496 41.627415l162.38132 63.473207c3.78431 1.548127 7.740635 2.236183 11.69696 2.236183 0.516042 0 1.032085-0.172014 1.548127-0.172014 1.204099 0.172014 2.408198 0.688056 3.612296 0.688056 13.245087 0 25.630102-8.256677 30.274483-21.32975l57.796741-161.693264C963.623047 279.694944 955.022342 261.289434 938.336973 255.26894z"
                    fill="#575B66">
              </path>
            </svg>
          </div>
        </div>
      </div>
      <div class="flex-grow-1 overflow-y-auto">
        <template v-if="showList">
          <Suspense>
            <PostsList :type="forumType" class="h-full" @view="onView" ref="postsList"/>
            <template #fallback>
              <PostsListLoading></PostsListLoading>
            </template>
          </Suspense>
        </template>
      </div>
    </div>
    <div class="relative h-full w-full flex-shrink-0 right-0 transition-all duration-200 flex flex-col" :class="{'right-full': selection}">
      <div class="w-11/12 m-2">
        <BackBrowseButton @click="onBackView"></BackBrowseButton>
      </div>
      <div class="flex-grow-1">
        <div class="h-full w-5/6 m-auto">
          <Suspense v-if="selection">
            <ForumView :fid="selection" class="w-full h-full overflow-y-auto" @interact="onInteract"></ForumView>
            <template #fallback>
              <ForumViewLoading></ForumViewLoading>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/app";

.forum-type-switch {

  > div {
    color: $primary;
    font-size: 1.2em;
    border-bottom: solid transparent;
    &[data-checked=true] {
      border-bottom-color: $secondary;
    }
  }
}
</style>