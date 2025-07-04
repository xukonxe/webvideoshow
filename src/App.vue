<script setup lang="ts">
import { ref } from 'vue';
import CodePlayer from './components/CodePlayer.vue';
import LivePreview from './components/LivePreview.vue';

const styleCode = ref('');
const htmlCode = ref('');
const darkMode = ref(true);
const isPlaying = ref(false);

function handleStyleUpdate(code: string) {
  styleCode.value = code;
}

function handleContentUpdate(code: string) {
  htmlCode.value = code;
}

function handlePlayingUpdate(playing: boolean) {
  isPlaying.value = playing;
}

function toggleTheme() {
  darkMode.value = !darkMode.value;
}
</script>

<template>
  <div class="app-container" :class="{ 'dark-mode': darkMode }">
    <header class="app-header">
      <div class="logo">
        <i class="fas fa-code"></i>
        <span>Web Video Show</span>
      </div>
      <div class="header-actions">
        <button class="theme-toggle" @click="toggleTheme">
          <i :class="['fas', darkMode ? 'fa-sun' : 'fa-moon']"></i>
          {{ darkMode ? '浅色模式' : '深色模式' }}
        </button>
      </div>
    </header>
    
    <main class="main-container">
      <div class="code-container">
        <CodePlayer 
          @update:style="handleStyleUpdate" 
          @update:content="handleContentUpdate" 
          @update:playing="handlePlayingUpdate"
        />
      </div>
      <div class="preview-container">
        <LivePreview 
          :styleCode="styleCode" 
          :htmlCode="htmlCode" 
          :is-playing="isPlaying"
        />
      </div>
    </main>
    
    <footer class="app-footer">
      <p>
        <i class="fas fa-heart heart-icon"></i>
        以代码的形式展现你的创意
      </p>
    </footer>
  </div>
</template>

<style>
/* 基础样式重置 */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #1a1a1a; /*
   * 默认背景色，避免切换主题时闪烁 
   */
}

html, body, #app {
  height: 100%;
}

/* 应用容器 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
}

/* 深色模式 */
.app-container.dark-mode {
  background-color: #1a1a1a;
  color: #eee;
}

/* 应用头部 */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 3rem;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /*
   * 防止头部被压缩 
   */
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.logo .fas {
  margin-right: 8px;
  color: #42b983;
}

.header-actions button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

.header-actions button:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 主容器布局 */
.main-container {
  display: flex;
  flex: 1;
  overflow: hidden; /*
   * 这是关键：让主容器处理溢出 
   */
}

/* 左右区域样式 */
.code-container,
.preview-container {
  width: 50%;
  height: 100%; /* 确保子元素占满高度 */
  box-sizing: border-box;
  position: relative;
  transition: width 0.3s;
  overflow-y: auto; /* 为每个面板添加独立的垂直滚动条 */
}

/* 深色模式下特定样式 */
.dark-mode .code-container {
  background-color: #282c34;
  color: #d4d4d4;
}

.dark-mode .preview-container {
  border-left: 1px solid #3a3f4b;
}

/* 非深色模式下特定样式 */
.code-container {
  background-color: #f8f8f8;
  color: #333;
}

.preview-container {
  border-left: 1px solid #ddd;
  overflow-y: hidden; /*
   *
   * 核心修复：移除外层滚动，交由子组件内部处理
   *
   */
}

/* 页脚样式 */
.app-footer {
  padding: 0.5rem 1rem;
  background: #2c3e50;
  color: white;
  text-align: center;
  font-size: 0.9rem;
  flex-shrink: 0; /*
   * 防止页脚被压缩 
   */
}

.heart-icon {
  color: #e25555;
  animation: heartbeat 1.5s ease-in-out infinite;
  margin: 0 5px;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
  
  .code-container,
  .preview-container {
    width: 100%;
    height: 50%;
  }
  
  .preview-container {
    border-left: none;
    border-top: 1px solid #ddd;
  }
  
  .dark-mode .preview-container {
    border-top: 1px solid #3a3f4b;
    border-left: none;
  }
}
</style>
