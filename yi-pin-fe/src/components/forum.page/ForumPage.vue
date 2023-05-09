<script setup lang="ts">

import type {Session} from "@/entities/session";
import {inject, ref} from "vue";
import ForumsViewBlock from "@/components/forum.page/forums-view-block/ForumsViewBlock.vue";
import ForumEditBlock from "@/components/forum.page/forum-edit-block/ForumEditBlock.vue";
import PublicSuccessModal from "@/components/forum.page/PublicSuccessModal.vue";

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
<div class="h-full forum-page flex relative p-5" :class="{'editing': ifEditing}">
   <div class="w-full flex align-items-center justify-content-center transition-all duration-500 relative" >
       <ForumsViewBlock @editing="onEditing" class="w-11/12 max-h-full"></ForumsViewBlock>
   </div>
    <div class="w-full transition-all duration-500 flex flex-col justify-content-center align-items-center absolute">

      <div class="w-11/12 m-2">
          <button type="button" class="btn btn-primary flex" @click="onEditing">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 17l-5-5 5-5v3h8v4h-8v3z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
               返回浏览
          </button>
      </div>
      <ForumEditBlock class="w-11/12" @public="onPublic"></ForumEditBlock>
      <PublicSuccessModal ref="modal"></PublicSuccessModal>
    </div>
</div>

</template>

<style scoped lang="scss">


.forum-page {
  overflow-x: hidden;
  > div:nth-of-type(1) {
    left: 0;
  }
  > div:nth-of-type(2) {
    left: 100%;
  }

  &.editing {
    > div:nth-of-type(1) {
      left: -100%;
    }
    > div:nth-of-type(2) {
      left: 0;
    }
  }
}


</style>