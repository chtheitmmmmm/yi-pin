<script setup lang='ts'>

import {Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import {onMounted, ref} from "vue";

export interface NavItemArea {
  phrase: string,
  paths: string | [string, string][]
}

const props = defineProps<NavItemArea>()
const ifList = Array.isArray(props.paths)
const popover = ref<HTMLButtonElement | null>(null)
onMounted(() => {
    if (popover.value) {
        popover.value.dataset.hoverOn = "false";
    }

    popover.value?.addEventListener('pointerenter', () => {
        if (popover.value!.dataset.hoverOn === "false") {
            popover.value!.dispatchEvent(new Event('click', {
              bubbles: true
          }))
        }
    })
    popover.value?.addEventListener('pointerout', e => {
        if (popover.value!.dataset.hoverOn === "true") {
            const rect = popover.value!.getBoundingClientRect()
            if (e.clientY < rect.bottom) {
                popover.value!.dispatchEvent(new Event('click', {
                  bubbles: true
              }))
            }
        }
    })
    popover.value?.addEventListener('click', () => {
        if (popover.value!.dataset.hoverOn === "true") {
            popover.value!.dataset.hoverOn = "false"
        } else {
            popover.value!.dataset.hoverOn = "true"
        }

    })
})

</script>

<template>
  <div class="nav-item" style="position: relative">
    <Popover v-if="ifList" class="relative">
      <PopoverButton class="hover:border-none">
        <span class="phrase" ref="popover" :data-hover-on="false">{{phrase}}</span>
      </PopoverButton>
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <PopoverPanel class="absolute left-1/2 z-10 flex-column w-screen max-w-max -translate-x-1/2 px-4 bg-light border">
          <div v-for="path of paths" :key="path[0]">
            <router-link :to="path[0]">{{ path[1] }}</router-link>
          </div>
        </PopoverPanel>
      </transition>

    </Popover>
    <div v-else class="position-relative">
      <router-link :to="paths as any" class="phrase">{{phrase}}</router-link>
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