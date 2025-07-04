<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  htmlCode: string;
  styleCode: string;
  isPlaying: boolean;
}>();

const wrapperRef = ref<HTMLDivElement | null>(null);

watchEffect(() => {
  if (wrapperRef.value) {
    const shadowRoot = wrapperRef.value.shadowRoot || wrapperRef.value.attachShadow({ mode: 'open' });
    
    // 添加基本样式和Font Awesome CDN
    shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      <style>
        :host {
          display: block;
          height: 100%;
          width: 100%;
        }
        .shadow-wrapper {
          position: relative;
          background-color: #f9f9f9;
          padding: 1.5rem;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow: auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          transition: all 0.5s ease;
        }
        /* 基础元素样式 */
        h1, h2, h3, h4, h5, h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        p {
          margin-bottom: 1em;
          transition: opacity 0.5s, transform 0.5s;
        }
        /* 添加美观的基础样式 */
        .highlight {
          display: inline-block;
          position: relative;
          padding: 0 4px;
          transition: all 0.3s;
        }
        .highlight::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: currentColor;
          transition: all 0.3s;
        }
        .highlight:hover::after {
          height: 10%;
          opacity: 0.3;
        }
        /* 添加图标样式 */
        i.icon {
          margin: 0 5px;
          vertical-align: middle;
        }
        /* 添加卡片样式 */
        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          padding: 16px;
          margin: 16px 0;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        /* 添加装饰元素 */
        .divider {
          display: flex;
          align-items: center;
          margin: 20px 0;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #ddd;
        }
        .divider::before {
          margin-right: 10px;
        }
        .divider::after {
          margin-left: 10px;
        }
        /* 视觉指示箭头 */
        .flow-arrow {
          text-align: center;
          margin: 20px 0;
          color: #61afef;
          font-size: 24px;
        }
        /* 动画效果 */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animated {
          animation: fadeIn 0.5s ease-out forwards;
        }
        /* 自定义颜色 */
        .text-primary { color: #61afef; }
        .text-success { color: #98c379; }
        .text-warning { color: #d19a66; }
        .text-danger { color: #e06c75; }
        .text-info { color: #56b6c2; }
        .bg-light { background-color: #f1f1f1; }
        /* 自定义用户样式 */
        ${props.styleCode}
      </style>
      <div class="shadow-wrapper">
        ${injectIcons(props.htmlCode)}
      </div>
    `;

    // --- NEW AUTO-SCROLL LOGIC ---
    if (props.isPlaying) {
      const shadowWrapper = shadowRoot.querySelector('.shadow-wrapper');
      if (shadowWrapper) {
        shadowWrapper.scrollTop = shadowWrapper.scrollHeight;
      }
    }
  }
});

// 辅助函数：向HTML中注入图标
function injectIcons(html: string): string {
  // 替换特定关键词为图标
  return html
    // 段落开头的关键词替换
    .replace(/<p>我是一个大学生/g, '<p><i class="fas fa-user-graduate text-primary icon"></i> 我是一个大学生')
    .replace(/<p>在这四年里/g, '<p><i class="fas fa-laptop-code text-success icon"></i> 在这四年里')
    .replace(/<p>等我休学结束/g, '<p><i class="fas fa-school text-warning icon"></i> 等我休学结束')
    .replace(/<p>我家是中产/g, '<p><i class="fas fa-home text-info icon"></i> 我家是中产')
    .replace(/<p>然而，我从小/g, '<p><i class="fas fa-star text-primary icon"></i> 然而，我从小')
    .replace(/<p>我曾经尝试去找工作/g, '<p><i class="fas fa-briefcase text-warning icon"></i> 我曾经尝试去找工作')
    .replace(/<p>然后我尝试创业/g, '<p><i class="fas fa-rocket text-danger icon"></i> 然后我尝试创业')
    .replace(/<p>我不相信我必须/g, '<p><i class="fas fa-lightbulb text-warning icon"></i> 我不相信我必须')
    .replace(/<p>所以，我决定/g, '<p><i class="fas fa-arrow-right text-success icon"></i> 所以，我决定')
    .replace(/<p>马克思主义说/g, '<p><i class="fas fa-book text-primary icon"></i> 马克思主义说')
    .replace(/<p>我觉得，挣钱/g, '<p><i class="fas fa-dollar-sign text-success icon"></i> 我觉得，挣钱')
    .replace(/<p>你提供了服务/g, '<p><i class="fas fa-handshake text-info icon"></i> 你提供了服务')
    .replace(/<p>所以，我相信/g, '<p><i class="fas fa-heart text-danger icon"></i> 所以，我相信')
    .replace(/<p>而有心人/g, '<p><i class="fas fa-users text-primary icon"></i> 而有心人')
    .replace(/<h2>所以，我决定：<\/h2>/g, '<div class="divider"><i class="fas fa-arrow-down text-primary"></i></div><h2><i class="fas fa-check-circle text-success icon"></i> 所以，我决定：</h2>')
    .replace(/<p>从今天开始/g, '<div class="card"><p><i class="fas fa-gift text-success icon"></i> 从今天开始')
    .replace(/<h2>你可能会问...<\/h2>/g, '<div class="divider"><i class="fas fa-question-circle text-warning"></i></div><h2><i class="fas fa-question text-warning icon"></i> 你可能会问...</h2>')
    .replace(/<p>我提供服务，服务器/g, '<p><i class="fas fa-server text-warning icon"></i> 我提供服务，服务器')
    .replace(/<p>我相信，现在已经/g, '<p><i class="fas fa-thumbs-up text-success icon"></i> 我相信，现在已经')
    .replace(/<h2>所以，这是一个社会实验/g, '<div class="divider"><i class="fas fa-flask text-primary"></i></div><h2><i class="fas fa-flask text-primary icon"></i> 所以，这是一个社会实验')
    .replace(/<p>这是一个赌上我的人生/g, '<p><i class="fas fa-dice text-danger icon"></i> 这是一个赌上我的人生')
    .replace(/<p>这也是我建政多年/g, '<p><i class="fas fa-flag text-success icon"></i> 这也是我建政多年')
    .replace(/<p>谢谢大家。<\/p>/g, '<div class="divider"><i class="fas fa-heart text-danger"></i></div><p><i class="fas fa-hands-helping text-primary icon"></i> 谢谢大家。</p>')
    // 可以根据需要继续添加更多替换规则
    // 添加可视化的流程箭头
    .replace(/<\/p>\s*<p>/g, '</p><div class="flow-arrow"><i class="fas fa-long-arrow-alt-down"></i></div><p>');
}
</script>

<template>
  <div class="live-preview-container">
    <div class="preview-header">
      <i class="fas fa-laptop-code"></i>
      <span>实时预览</span>
    </div>
    <div class="live-preview" ref="wrapperRef"></div>
  </div>
</template>

<style scoped>
.live-preview-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.preview-header {
  padding: 10px;
  background: #21252b;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #3a3f4b;
  flex-shrink: 0;
}

.live-preview {
  flex: 1;
  width: 100%;
  border: none;
  position: relative;
  overflow: hidden; /*
   *
   * 确保宿主元素不会意外滚动
   *
   */
}
</style> 