<script setup lang="ts">

import type {Session} from "@/entities/session";
import {inject, ref} from "vue";
import ForumsViewBlock from "@/components/forum.page/forums-view-block/ForumsViewBlock.vue";
import ForumEditBlock from "@/components/forum.page/forum-edit-block/ForumEditBlock.vue";
import PublicSuccessModal from "@/components/forum.page/PublicSuccessModal.vue";
import BackBrowseButton from "@/components/forum.page/BackBrowseButton.vue";

const session = inject<Session>("session")!
const ifEditing = ref(false)
const modal = ref<typeof PublicSuccessModal | null>(null)

function onEditing() {
  ifEditing.value = !ifEditing.value
}

function onPublic() {
  modal.value!.show()
}

</script>

<template>
<div class="relative w-full h-full">
  <div class="h-full w-full forum-page flex absolute justify-items-center overflow-x-hidden" :class="{'editing': ifEditing}">
    <div class="right-0 p-5 w-full h-full flex align-items-start justify-content-center flex-shrink-0 relative transition-all duration-500 " >
      <ForumsViewBlock @editing="onEditing" class="w-11/12 max-h-full"></ForumsViewBlock>
    </div>
    <div class="right-0 p-5 w-full h-full flex flex-col justify-content-start align-items-center flex-shrink-0 flex-fill relative transition-all duration-500 ">
      <div class="align-self-start">
        <BackBrowseButton class="w-11/12 m-2" @click="onEditing"></BackBrowseButton>
      </div>
      <ForumEditBlock class="w-11/12" @public="onPublic"></ForumEditBlock>
      <PublicSuccessModal ref="modal"></PublicSuccessModal>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

.forum-page {
  overflow-x: hidden;

  &.editing {
    > div {
      right: 100%;
    }
  }
}


</style>