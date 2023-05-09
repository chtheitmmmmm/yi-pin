<script setup lang="ts">

import PostsList from "@/components/forum.page/forums-view-block/post-list-side/post-list/PostsList.vue";
import SearchFrame from "@/components/forum.page/forums-view-block/post-list-side/SearchFrame.vue";
import {ref} from "vue";
import ForumView from "@/components/forum.page/forums-view-block/post-list-side/ForumView.vue";

const viewing = ref(false)
const selection = ref('')

function onView(fid: string) {
  selection.value = fid;
  viewing.value = true
}

function onBackView() {
  viewing.value = false;
}

</script>

<template>
<div class="flex relative p-0 m-0">
  <div class="p-0 m-0 post-list-side-ctn absolute flex w-full h-full overflow-x-hidden">
    <div class="post-list-side-list-ctn flex flex-col w-full h-full relative flex-shrink-0 right-0 transition-all duration-200" :class="{'right-full': viewing}">
      <SearchFrame class="m-1"></SearchFrame>
      <div class="flex-grow-1 overflow-y-scroll">
        <PostsList class="max-h-full" @view="onView"/>
      </div>
    </div>
    <div class="relative h-full w-full flex-shrink-0 right-0 transition-all duration-200 flex flex-col" :class="{'right-full': viewing}">
      <div class="w-11/12 m-2">
          <button type="button" class="btn btn-primary flex" @click="onBackView">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l-5-5 5-5v3h8v4h-8v3z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
               返回浏览
          </button>
      </div>
      <div class="flex-grow-1">
        <div class="flex justify-content-center h-full">
          <ForumView :fid="selection" class="w-5/6 shadow p-3"></ForumView>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.post-list-side-list-ctn {

}
</style>