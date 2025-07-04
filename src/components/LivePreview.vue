<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';

const props = defineProps<{
  htmlCode: string;
  styleCode: string;
}>();

const wrapperRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (wrapperRef.value) {
    const shadowRoot = wrapperRef.value.attachShadow({ mode: 'open' });
    
    const style = document.createElement('style');
    shadowRoot.appendChild(style);

    const content = document.createElement('div');
    shadowRoot.appendChild(content);

    watchEffect(() => {
      style.textContent = props.styleCode;
      content.innerHTML = props.htmlCode;
    });
  }
});
</script>

<template>
  <div class="live-preview" ref="wrapperRef"></div>
</template>

<style scoped>
.live-preview {
  height: 100%;
  width: 100%;
}
</style> 