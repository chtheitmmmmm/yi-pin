<script setup lang="ts">

import ForumEditor from "@/components/forum.page/forum-edit-block/ForumEditor.vue";
import {inject, reactive, ref} from "vue";
import axios from "axios";
import type {Session} from "@/entities/session";

const emits = defineEmits<{
  (e: "public"): void
}>()

const submitting = ref(false)

const session = inject<Session>('session')!

const formData = reactive({
  type: 0,
  content: "",
  title: ""
})

const forumEditor = ref<typeof ForumEditor | null>(null)

let errMessages = reactive([])

function onSubmit() {
  submitting.value = true
  axios.post("forum/public", formData, {
    headers: {
      Authorization: session.user!.uid
    }
  }).then(value => {
    console.log(value)
    formData.content = ""
    formData.title = ""
    emits('public')
  }).catch(err => {
    console.log(err)
    if (err.response.status === 400) {
      errMessages = err.response.data.message!;
    }
  })
  //@ts-ignore
    .finally(() => {
      submitting.value = false
    })
}

</script>

<template>
<form @submit.prevent="onSubmit">
  <div class="text-center">
    <div class="w-1/2 flex align-items-center h-20">
      <label for="forum-title" class="text-gray-700 font-medium h3">标题：</label>
      <input v-model="formData.title" type="text" id="forum-title" name="forum-title" class="border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="帖子标题">
    </div>
  </div>
  <ForumEditor v-model="formData.content" class="shadow" ref="forumEditor"></ForumEditor>
  <div class="forum-type flex align-items-center">
    <div class="p-3">发布类型</div>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="forum" id="forum-type-forum" autocomplete="off" checked @change="formData.type = 0">
      <label class="btn btn-outline-primary" for="forum-type-forum">论坛</label>

      <input type="radio" class="btn-check" name="forum" id="forum-type-consult" autocomplete="off" @change="formData.type = 1">
      <label class="btn btn-outline-primary" for="forum-type-consult">咨询</label>
    </div>
  </div>
  <div class="container flex justify-content-center align-items-center">
    <div v-if="errMessages.length > 0" class="list-group w-5/6">
      <div class="list-group-item-light" v-for="msg of errMessages">
        <span class="text-danger">*</span>
        <span class="text-decoration-underline">{{msg}}</span>
      </div>
    </div>
  </div>
  <div class="flex align-items-center justify-content-end">
    <div class="spinner-border text-primary m-2" role="status" v-if="submitting"></div>
    <button type="submit" class="btn btn-primary">
      发布帖子
    </button>
  </div>
</form>

</template>

<style scoped lang="scss">
.forum-type {
  height: 5em;
}
</style>