<!--
用户帖子编辑器
-->

<script setup lang="ts">
import {onMounted, ref, watch, watchEffect} from "vue";
import {
  marked
} from "marked";

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const preview = ref<HTMLDivElement | null>(null)
const editor = ref<HTMLTextAreaElement | null>(null)

const previewDoc = ref('')

function onEdit(e: Event) {
  previewDoc.value = marked.parse(editor.value!.value)
  // @ts-ignore
  emits('update:modelValue', e.target!.value)
}

watch(
  () => props.modelValue,
  () => {
    editor.value!.value = props.modelValue
    previewDoc.value = marked.parse(editor.value!.value)
  }
)

onMounted(() => {
  previewDoc.value = "<!doctype html>"
})

</script>

<template>
<div class="form-editor flex">
  <div class="w-1/2 p-2 border-2 flex flex-col">
    <div class="form-editor-side-title text-center text-primary mb-2">编辑</div>
    <textarea value="" class="editor w-100 flex-grow-1" ref="editor" placeholder="支持markdown格式，请输入友善内容哦，长度在10000字以内" maxlength="10000" @input="onEdit">
    </textarea>
  </div>

  <div class="w-1/2 p-2" ref="preview">
    <div class="form-editor-side-title text-center text-secondary mb-2">预览</div>
    <iframe :srcdoc="previewDoc" sandbox="" class="w-full"></iframe>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "@/assets/app";

.form-editor {
  height: 100%;
  .form-editor-side-title {
    font-size: 1.3em;
    font-family: sans-serif;
    border-bottom: {
      style: solid;
      width: 2px;
    }
    &[class*="text-primary"] {
      border-bottom-color: $primary;
    }
    &[class*="text-secondary"] {
      border-bottom-color: $secondary;
    }
  }
  .editor {
    resize: none;
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
}
</style>