<script setup lang="ts">

import {inject, reactive, type Ref, ref} from "vue";
import ProfileWLCTab from "@/components/forum.page/forums-view-block/profile-side/profile-wlc-tabs/ProfileWLCTab.vue";
import {useSessionStore} from "@/stores/session";

const session = useSessionStore()

const tabs = reactive([{
  label: '作品',
  name: 'work',
  link: `forum/user/work/${session.user!.uid}`
}, {
  label: '点赞',
  name: 'like',
  link: `forum/user/like/${session.user!.uid}`
}, {
  label: '收藏',
  name: 'collection',
  link: `forum/user/collection/${session.user!.uid}`
}, {
  label: '评论',
  name: 'comment',
  link: `forum/user/comment/${session.user!.uid}`
}])

const activeTab = ref(tabs[0].name);
const refresh = inject<Ref<boolean>>('refresh');

</script>

<template>
<div>
    <el-tabs v-model="activeTab"
            :stretch="true">
        <el-tab-pane v-for="tab of tabs"
                     :key="tab.name"
                     :label="tab.label"
                     :name="tab.name"
        >
            <el-scrollbar>
                <Suspense v-if="refresh">
                    <ProfileWLCTab :source-link="tab.link"/>
                    <template #fallback>
                      <el-skeleton :rows="5" #default/>
                    </template>
                </Suspense>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<style scoped lang="scss">

</style>