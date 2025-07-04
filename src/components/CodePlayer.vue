<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { script, type Scene } from '../core/script';

const emit = defineEmits<{
  (e: 'update:style', code: string): void;
  (e: 'update:content', code: string): void;
}>();

const styleEditorRef = ref<HTMLPreElement | null>(null);
const contentEditorRef = ref<HTMLPreElement | null>(null);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function type(element: HTMLElement, text: string, speed: number = 20) {
  let currentContent = element.textContent || '';
  for (const char of text) {
    currentContent += char;
    element.textContent = currentContent;
    element.scrollTop = element.scrollHeight;
    await sleep(speed);
  }
}

async function play() {
  for (const scene of script) {
    const { target, code, delay = 1000 } = scene;
    
    const editorRef = target === 'style-editor' 
      ? styleEditorRef.value
      : contentEditorRef.value;

    if (editorRef) {
      await type(editorRef, code);

      if (target === 'style-editor') {
        emit('update:style', editorRef.textContent || '');
      } else {
        emit('update:content', editorRef.textContent || '');
      }

      await sleep(delay);
    }
  }
}

onMounted(() => {
  play();
});
</script>

<template>
  <div class="code-player">
    <pre ref="styleEditorRef"></pre>
    <pre ref="contentEditorRef"></pre>
  </div>
</template>

<style scoped>
.code-player {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.code-player pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  flex: 1;
  min-height: 50%;
  overflow-y: auto;
}
</style> 