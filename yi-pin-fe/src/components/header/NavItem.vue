<script setup lang='ts'>

import FillRouterLink from "@/components/FillRouterLink.vue";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";

export interface NavItemArea {
  phrase: string,
  path: string,
  hashList: string[],
}

const props = defineProps<NavItemArea>()
const ifLIst = props.hashList.length > 0;

</script>

<template>
  <div class="nav-item" style="position: relative">
    <Popover v-if="ifLIst" class="relative">
      <PopoverButton>
        <span class="phrase">{{phrase}}</span>
      </PopoverButton>
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
        <PopoverPanel class="absolute left-1/2 z-10 flex-column w-screen max-w-max -translate-x-1/2 px-4 bg-light border">
          <div v-for="hash of hashList">
            <router-link :to="`${path}/#${hash}`">{{ hash }}</router-link>
          </div>
        </PopoverPanel>
      </transition>

    </Popover>
    <div v-else class="position-relative">
      <router-link :to="path" class="phrase">{{phrase}}</router-link>
    </div>
  </div>
</template>

<style scoped lang='scss'>
$phrase-color: #4dd8ab;
.nav-item {
  .nav-link {
    font-size: 1.7em;
    text-decoration: none;
    color: $phrase-color;
    z-index: 10000;
    &:hover {
      color: white;
    }

  }

}
.phrase {
  color: lighten($phrase-color, 2);
  font-size: 1.4em;
}
</style>