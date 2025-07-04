<script setup lang="ts">
import { ref } from 'vue';
import CodePlayer from './components/CodePlayer.vue';
import LivePreview from './components/LivePreview.vue';

const styleCode = ref('');
const htmlCode = ref('');

function handleStyleUpdate(code: string) {
  styleCode.value = code;
}

function handleContentUpdate(code: string) {
  htmlCode.value = code;
}
</script>

<template>
  <main class="main-container">
    <div class="code-container">
      <CodePlayer 
        @update:style="handleStyleUpdate" 
        @update:content="handleContentUpdate" 
      />
    </div>
    <div class="preview-container">
      <LivePreview :styleCode="styleCode" :htmlCode="htmlCode" />
    </div>
  </main>
</template>

<style>
/* 基础样式重置 */
body {
  margin: 0;
  font-family: sans-serif;
}

/* 主容器布局 */
.main-container {
  display: flex;
  height: 100vh;
}

/* 左右区域样式 */
.code-container,
.preview-container {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
}

.code-container {
  background-color: #1e1e1e;
  color: #d4d4d4;
  overflow-y: auto;
}

.preview-container {
  background-color: #ffffff;
  border-left: 1px solid #ccc;
  overflow-y: auto;
}
</style>
