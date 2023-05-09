<script setup lang="ts">

import {ref, defineProps, defineEmits, reactive, onMounted, watch} from 'vue'
import {Modal} from "bootstrap";

const modalElem = ref<HTMLDivElement | null>(null)
let modal = reactive<Modal>({} as unknown as Modal)

function show() {
  modal.show()
}

defineExpose<{
  show: typeof show
}>({
  show
})

onMounted(() => {
  modal = new Modal(modalElem.value!)
})

</script>


<template>
<div class="modal fade inset-0" ref="modalElem">
  <div class="modal-dialog flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
    <div class="modal-content inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="modal-body">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-5">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
            Success!
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              你的帖子已经发布
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6 modal-footer">
        <button data-bs-dismiss="modal" type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
          好
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
</style>
