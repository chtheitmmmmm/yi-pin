<script setup lang="ts">

import PostsList from "@/components/forum.page/forums-view-block/post-list-side/post-list/PostsList.vue";
import SearchFrame from "@/components/forum.page/forums-view-block/post-list-side/SearchFrame.vue";
import {inject, nextTick, provide,type Ref, ref, watch} from "vue";
import BackBrowseButton from "@/components/forum.page/BackBrowseButton.vue";
import ForumViewLoading from "@/components/forum.page/forums-view-block/post-list-side/forum-view/ForumViewLoading.vue";
import PostsListLoading from "@/components/forum.page/forums-view-block/post-list-side/post-list/PostsListLoading.vue";
import RefreshButton from "@/components/forum.page/forums-view-block/RefreshButton.vue";
import {useSessionStore} from "@/stores/session";

provide('ftr', ref(''))

const selection = inject<Ref<string | null>>('selection')!;
const postsList = ref<typeof PostsList | null>(null)
const showList = ref(true)
const forumView = ref<HTMLDivElement | null>(null)
const ctn = ref<HTMLDivElement | null>(null)

function onView(fid: string) {
  selection.value = fid;
}

function onBackView() {
  selection.value = null;
}

const forumType = ref(0)
provide('forumType', forumType)
const session = useSessionStore();

function onRefreshList() {
  showList.value = false;
  nextTick(() => {
    showList.value = true;
  })
}

function onRefreshView() {
  const oldSelection = selection.value;
  selection.value = ''
  nextTick(() => {
    selection.value = oldSelection;
  })
}

export type InteractType = 'like' | 'collection' | 'comment'

function onInteract(fid: string, type: InteractType, ifDo: boolean) {
  switch (type) {
    case "like":
      break;
    case "collection":
      break;
    case "comment":
      if (ifDo) {
        onRefreshView();
      } else {
        forumView.value?.scroll(0, forumView.value.offsetHeight / 2)
      }
      break;
  }
  onRefreshList() // 目前简单实现一下
}

watch(
  () => forumType.value,
  () => {
    onRefreshList()
  }
)

session.$subscribe(() => {
    onRefreshList()
}, {
    immediate: true
})

const theWindow = window;

</script>

<template>
<div class="flex relative p-0 m-0" ref="ctn">
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
          <RefreshButton class="absolute right-5" @refresh="onRefreshList"/>
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
        <BackBrowseButton @click="onBackView" />
      </div>
      <div class="flex-grow-1 flex justify-content-center overflow-y-auto scrollbar-hidden relative" ref="forumView" id="forumView">
        <div class="h-full w-5/6 m-auto">
          <RefreshButton class="absolute right-5" @refresh="onRefreshView"/>
          <Suspense v-if="selection" class="h-full">
            <ForumView :fid="selection" class="w-full h-full" @interact="onInteract"></ForumView>
            <template #fallback>
              <ForumViewLoading />
            </template>
          </Suspense>
        </div>
      </div>
      <el-backtop
          :right="theWindow.innerWidth - ctn!?.getBoundingClientRect().right + 30"
          :bottom="theWindow.innerHeight - ctn!?.getBoundingClientRect().bottom + 30"
          :visibility-height="forumView!?.offsetHeight * 1.5"
          target="#forumView"
        >
          <div class="btn btn-outline-primary
                      flex flex-col align-items-stretch">
            <div>
              &#x2191;
            </div>
          </div>
        </el-backtop>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@use "@/assets/app" as *;

.forum-type-switch {
  > div {
    color: primary_color();
    font-size: 1.2em;
    border-bottom: solid transparent;
    &[data-checked=true] {
      border-bottom-color: secondary_color();
    }
  }
}
</style>