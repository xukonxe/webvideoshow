/**
 * 定义一个场景的结构
 */
export interface Scene {
  target: 'style-editor' | 'content-editor'; // 目标编辑器
  code: string; // 要输入的代码
  delay?: number; // 完成后延迟多久进入下一场景
}

/**
 * 整个视频的剧本
 */
export const script: Scene[] = [
  {
    target: 'style-editor',
    code: `/*
 * 大家好，我是 [你的B站ID]
 * 
 * 今天，我决定用我的人生
 * 来做一场社会实验...
 */

`,
    delay: 2000,
  },
  {
    target: 'style-editor',
    code: `/* 首先，来点基础样式 */
html {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: #282c34;
}

`,
    delay: 1500,
  },
  {
    target: 'content-editor',
    code: `<div class="content"></div>`,
    delay: 1000,
  },
  {
    target: 'style-editor',
    code: `.content {
  color: #abb2bf;
  text-align: center;
  padding: 2rem;
  border: 1px solid #abb2bf;
  margin: 2rem;
}

`,
    delay: 2000,
  },
  {
    target: 'content-editor',
    code: `<div class="content">
  <h1 class="title">一个程序员的社会实验</h1>
</div>`,
    delay: 1500,
  },
  {
    target: 'style-editor',
    code: `.title {
  color: #61afef;
  font-size: 2.5em;
  text-shadow: 0 0 10px #61afef44;
}

`,
    delay: 2000,
  },
  {
    target: 'content-editor',
    code: `<div class="content">
  <h1 class="title">一个程序员的社会实验</h1>
  <p class="subtitle">代码全免费，靠打赏能活下去吗？</p>
</div>`,
    delay: 1500,
  },
  {
    target: 'style-editor',
    code: `.subtitle {
  color: #e5c07b;
  font-size: 1.2em;
  margin-top: 1rem;
}
`,
    delay: 2000,
  },
];

import type { Scene } from './script';

// 回调函数接口
export interface PlayerCallbacks {
  onStyleUpdate?: (newCode: string) => void;
  onContentUpdate?: (newCode: string) => void;
}

/**
 * @param script 要播放的剧本
 * @param callbacks 可选的回调函数
 */
export async function playScript(script: Scene[], callbacks?: PlayerCallbacks) {
  for (const scene of script) {
    const { target, code, delay = 1000 } = scene;
    const targetEditor = document.getElementById(target);

    if (targetEditor) {
      await type(targetEditor, code);

      if (target === 'style-editor') {
        callbacks?.onStyleUpdate?.(targetEditor.innerText);
      } else if (target === 'content-editor') {
        callbacks?.onContentUpdate?.(targetEditor.innerText);
      }

      await sleep(delay);
    }
  }
} 