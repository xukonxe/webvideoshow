<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { script } from '../core/script';
import Prism from 'prismjs';

const emit = defineEmits<{
  (e: 'update:style', code: string): void;
  (e: 'update:content', code: string): void;
  (e: 'update:playing', playing: boolean): void;
}>();

const styleEditorRef = ref<HTMLPreElement | null>(null);
const contentEditorRef = ref<HTMLPreElement | null>(null);
const currentSceneIndex = ref<number>(0);
const isPlaying = ref<boolean>(false);
const progress = ref<number>(0);
const playbackSpeed = ref<number>(1);

// 增加两个状态变量来保存当前完整的代码
const fullStyleCode = ref<string>('');
const fullHtmlCode = ref<string>('');

// [修改] 定义不同代码类型的基础延时 (ms)
const styleTypingSpeed = ref<number>(5);  // CSS打字更快
const htmlTypingSpeed = ref<number>(30); // HTML打字更慢

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms * (1 / playbackSpeed.value)));

// 用于暂停/继续的控制
let playPromiseResolve: (() => void) | null = null;
const pausePromise = ref<Promise<void> | null>(null);

async function waitIfPaused() {
  if (!isPlaying.value) {
    pausePromise.value = new Promise(resolve => {
      playPromiseResolve = resolve;
    });
    await pausePromise.value;
  }
}

function pause() {
  isPlaying.value = false;
}

function resume() {
  isPlaying.value = true;
  if (playPromiseResolve) {
    playPromiseResolve();
    playPromiseResolve = null;
  }
}

async function play() {
  isPlaying.value = true;
  currentSceneIndex.value = 0;
  progress.value = 0;

  // 清空编辑器内容和状态变量
  fullStyleCode.value = '';
  fullHtmlCode.value = '';
  
  if (styleEditorRef.value) styleEditorRef.value.innerHTML = '';
  if (contentEditorRef.value) contentEditorRef.value.innerHTML = '';
  
  // 重置发射的代码
  emit('update:style', '');
  emit('update:content', '');

  for (let i = 0; i < script.length; i++) {
    currentSceneIndex.value = i;
    progress.value = Math.round((i / script.length) * 100);
    
    const scene = script[i];
    const { target, code, delay = 100, replace = false, appendTo } = scene;
    
    await waitIfPaused();

    const isStyleEditor = target === 'style-editor';
    const editorRef = isStyleEditor ? styleEditorRef.value : contentEditorRef.value;
    if (!editorRef) continue;

    let codeBeforeTyping = isStyleEditor ? fullStyleCode.value : fullHtmlCode.value;

    if (replace) {
      codeBeforeTyping = '';
    }

    let insertionPoint = codeBeforeTyping.length;
    if (appendTo) {
      const containerTag = appendTo.split(/[.#]/)[1];
      const closingTag = `</${containerTag}>`;
      const index = codeBeforeTyping.lastIndexOf(closingTag);
      if (index !== -1) {
        insertionPoint = index;
      }
    }

    const beforeSlice = codeBeforeTyping.slice(0, insertionPoint);
    const afterSlice = codeBeforeTyping.slice(insertionPoint);

    let typedText = '';
    for (const char of code) {
      await waitIfPaused();
      
      // [修改] 根据目标编辑器类型，应用不同的打字速度
      const typingSpeed = isStyleEditor ? styleTypingSpeed.value : htmlTypingSpeed.value;
      const randomJitter = Math.random() * 10 - 5; // 增加一点随机抖动，更自然
      
      typedText += char;

      const newFullCode = beforeSlice + typedText + afterSlice;

      if (isStyleEditor) {
        fullStyleCode.value = newFullCode;
      } else {
        fullHtmlCode.value = newFullCode;
      }

      editorRef.innerHTML = Prism.highlight(
        newFullCode,
        isStyleEditor ? Prism.languages.css : Prism.languages.markup,
        isStyleEditor ? 'css' : 'markup'
      );
      editorRef.scrollTop = editorRef.scrollHeight;
      
      if (isStyleEditor) {
        emit('update:style', newFullCode);
      } else {
        emit('update:content', newFullCode);
      }

      await sleep(typingSpeed + randomJitter);
    }
    
    await sleep(delay);
  }
  
  // 播放结束后，设置进度为100%
  progress.value = 100;
  isPlaying.value = false;
}

function restart() {
  play();
}

onMounted(() => {
  if (styleEditorRef.value && contentEditorRef.value) {
    // 自动开始播放
    play();
  }
});

watch(isPlaying, (newValue) => {
  emit('update:playing', newValue);
});
</script>

<template>
  <div class="code-player">
    <div class="controls">
      <button class="control-btn" @click="isPlaying ? pause() : resume()">
        <i :class="['fas', isPlaying ? 'fa-pause' : 'fa-play']"></i>
        {{ isPlaying ? '暂停' : '继续' }}
      </button>
      <button class="control-btn" @click="restart">
        <i class="fas fa-redo"></i>
        重新开始
      </button>
      <div class="speed-control">
        <i class="fas fa-cog"></i>
        <span>速度:</span>
        <input type="range" v-model="playbackSpeed" min="0.5" max="10" step="0.1" />
        <span>{{ playbackSpeed }}x</span>
      </div>
    </div>
    
    <div class="progress-bar">
      <div class="progress" :style="{width: `${progress}%`}"></div>
    </div>
    
    <div class="editor-header css-header">
      <i class="fas fa-code"></i> CSS
    </div>
    <pre ref="styleEditorRef" class="editor line-numbers language-css"></pre>
    
    <div class="editor-header html-header">
      <i class="fas fa-code"></i> HTML
    </div>
    <pre ref="contentEditorRef" class="editor line-numbers language-markup"></pre>
  </div>
</template>

<style scoped>
.code-player {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #282c34;
  color: #abb2bf;
  position: relative;
}

.controls {
  background: #21252b;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #3a3f4b;
}

.control-btn {
  background: #444b5a;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.3s;
}

.control-btn:hover {
  background: #5a6377;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.progress-bar {
  height: 4px;
  background: #3a3f4b;
  width: 100%;
}

.progress {
  height: 100%;
  background: #61afef;
  transition: width 0.3s ease;
}

.editor-header {
  padding: 5px 10px;
  font-size: 0.9em;
  font-weight: bold;
  border-bottom: 1px solid #3a3f4b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.css-header {
  background: #2c313c;
  color: #61afef;
}

.html-header {
  background: #2c313c;
  color: #98c379;
  margin-top: 1px;
}

.editor {
  flex: 1;
  min-height: 40%;
  overflow-y: auto;
  padding: 1rem;
  margin: 0;
  border-bottom: 1px solid #3a3f4b;
  font-family: 'Fira Code', monospace, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono';
  line-height: 1.5;
}

.editor:last-child {
  border-bottom: none;
}

/* 确保在这个作用域内应用Prism的样式 */
:deep(.token.comment) { color: #7d8799; }
:deep(.token.punctuation) { color: #7d8799; }
:deep(.token.property),
:deep(.token.tag),
:deep(.token.constant),
:deep(.token.symbol) { color: #e06c75; }
:deep(.token.boolean),
:deep(.token.number) { color: #d19a66; }
:deep(.token.selector),
:deep(.token.string) { color: #98c379; }
:deep(.token.attr-name),
:deep(.token.char),
:deep(.token.builtin) { color: #61afef; }
:deep(.token.operator),
:deep(.token.entity),
:deep(.token.url),
:deep(.language-css .token.string),
:deep(.style .token.string) { color: #c678dd; }
:deep(.token.atrule),
:deep(.token.attr-value) { color: #98c379; }
:deep(.token.keyword) { color: #c678dd; }
:deep(.token.function) { color: #61afef; }
:deep(.token.important) { font-weight: bold; }

/* 行号样式 */
:deep(.line-numbers .line-numbers-rows) {
  border-right: 1px solid #3a3f4b;
}
:deep(.line-numbers-rows > span:before) {
  color: #5c6370;
}
</style> 