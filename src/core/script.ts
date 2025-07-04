/**
 * 定义一个场景的结构
 */
export interface Scene {
  target: 'style-editor' | 'content-editor'; // 目标编辑器
  code: string; // 要输入的代码
  delay?: number; // 完成后延迟多久进入下一场景
  replace?: boolean; // 是否替换编辑器内容而不是附加
  appendTo?: string; // [新增] 指定一个选择器，将代码附加到该元素的内部
}

/**
 * 整个视频的剧本
 */
export const script: Scene[] = [
  // --- ACT 1: The Declaration ---
  {
    target: 'style-editor',
    code: `/*
* 大家好，我是UP主。
* 今天，我想用代码来讲述我的故事和理念。
*/

body {
  font-family: sans-serif;
  background-color: #fdf6e3; /* A warm beige base */
  background-image:
    linear-gradient(rgba(135, 122, 102, 0.2) .1em, transparent .1em),
    linear-gradient(90deg, rgba(135, 122, 102, 0.2) .1em, transparent .1em);
  background-size: 2em 2em;
  color: #333; /* 在浅色背景下，使用深色文字 */
}

/* [新增] 为深色模式下的body单独设置样式 */
body.dark-mode {
  background-color: #222; /* 深色背景 */
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.07) .1em, transparent .1em),
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) .1em, transparent .1em);
  background-size: 2.5em 2.5em;
  color: #ccc; /* 浅色文字 */
}

#main-title {
  color: #555;
  font-size: 3em;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 1s;
}`,
    replace: true,
  },
  {
    target: 'content-editor',
    code: `<h1 id="main-title">用我的人生，验证我的理念</h1>
<div id="story-container"></div>`,
    replace: true,
    delay: 1500,
  },

  // --- ACT 2: The Backstory ---
  {
    target: 'style-editor',
    code: `
/*
* 故事要从我大学时说起...
*/

#main-title {
  font-size: 1.5em; /* 缩小标题 */
  text-align: left;
  top: 1rem; /* 移动到左上角 */
  left: 1rem;
  transform: translate(0, 0);
}

#story-container {
  color: #444; /* 在浅色背景下使用更深的文字颜色 */
  font-size: 1.3em; /* [修改] 增大字体 */
  line-height: 1.7; /* [修改] 增加行高以匹配新字体大小 */
  position: absolute;
  top: 6rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  overflow: auto;
  padding-right: 1rem; /* for scrollbar */
}`,
    replace: true,
    delay: 1000,
  },
  {
    target: 'content-editor',
    code: `
  <p>我是一个大学生，我自学了四年编程。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>在这四年里，我学了全栈c#, 全栈nodejs, python, unity游戏编程等等。我做了一些游戏项目，我还做了几个商业项目。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>等我休学结束，回到大学后，发现很多老师的编程水平还不如我，所以我发生了对整个社会，以及对我整个人生的思考。</p>`,
    appendTo: '#story-container',
    delay: 1000,
  },
  {
    target: 'content-editor',
    code: `
  <p>我家是中产，过去三十年有还可以的积累，足够我吃喝不愁。我完全可以按过去几十年的惯性，找工作，结婚，生子，过着<span class="normal-life">【正常的生活】</span>。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'style-editor',
    code: `
.normal-life { 
  color: #d19a66; 
  font-weight: bold; 
}`,
    delay: 500,
  },
  {
    target: 'content-editor',
    code: `
  <p>然而，我从小就有一颗不甘平凡，而且嫉恶如仇的心。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>我曾经尝试去找工作应聘，但是后来发现员工会被限制在自己的一亩三分地里，无法看到更大的景色。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>然后我尝试创业，和几个朋友一起干，基本算是成功了，能挣到一些钱养活自己。但是我又发现，我不得不遵守资本逻辑，用看起来并不太干净的，包含一些<span class="dirty-way">压榨、欺骗</span>的方式来获得利润率。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'style-editor',
    code: `
.dirty-way { 
  color: #e06c75; 
  text-decoration: underline; 
}`,
    delay: 1500,
  },

  // --- ACT 3: The Manifesto (Smooth Transition) ---
  {
    target: 'style-editor',
    code: `
/*
* 我不甘心。
* 我不相信世界必须如此。
* 所以，我决定...
*
* 让我们用一个分割线来开启新的篇章
*/

.divider {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(204, 204, 204, 0), rgba(204, 204, 204, 0.75), rgba(204, 204, 204, 0));
  margin: 2rem 0;
}
`
  },
  {
      target: 'content-editor',
      code: `
  <hr class="divider" />`,
      appendTo: '#story-container'
  },
  {
    target: 'content-editor',
    code: `
  <p>我不相信我必须按照我讨厌的方式和社会产生关系。我希望我和社会是相互帮助的，而不是相互斗争的。</p>
  <p>所以，我决定，尝试迎风而上，试试看，能不能对现状有所改变。</p>`,
    appendTo: '#story-container',
    delay: 1000,
  },
  {
    target: 'content-editor',
    code: `
  <p>马克思主义说，人是一切社会关系的总和。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>我觉得，挣钱是挣什么？无非就是别人对你的<span class="highlight">需要</span>和别人对你的<span class="highlight">赞赏</span>。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'style-editor',
    code: `
.highlight { color: #98c379; }`,
  },
  {
    target: 'content-editor',
    code: `
  <p>你提供了服务，别人觉得好，用钱投票，支持你继续扩大服务。</p>`,
    appendTo: '#story-container',
    delay: 2000,
  },
  {
    target: 'content-editor',
    code: `
  <p>所以，我相信，用我的技术，一定可以对别人造成帮助。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>而有心人，真正收到我的帮助的人，一定不愿意看到我无法给养自己，导致饿死路边。</p>`,
    appendTo: '#story-container',
    delay: 2000,
  },
  {
    target: 'content-editor',
    code: `
  <h2>所以，我决定：</h2>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>从今天开始，我会将我开发的程序、软件功能<span class="free">免费公开</span>，所有个人都可以<span class="free">免费使用</span>。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'style-editor',
    code: `
.free { color: #61afef; font-weight: bold; text-shadow: 0 0 10px #61afef88; }`,
    delay: 2500,
  },
  {
    target: 'content-editor',
    code: `
  <h2>你可能会问...</h2>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>我提供服务，服务器的费用是有成本的，怎么支出？</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>我相信，现在已经到了可以实现这一点的时间了：如果你愿意<span class="highlight">支持我</span>，请你给我<span class="highlight">打赏费用</span>，一切服务器费用都从打赏里支出。</p>`,
    appendTo: '#story-container',
    delay: 2500,
  },
  {
    target: 'content-editor',
    code: `
  <h2>所以，这是一个社会实验，也是一个赌博。</h2>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>这是一个赌上我的人生未来的实验，我赌现在的年轻人，会用脚投票，支持我的技术和社会工作。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>这也是我建政多年以来，给我光说不做的时代打上一个最好的句号。</p>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <p>谢谢大家。</p>`,
    appendTo: '#story-container',
    delay: 3000,
  },

  // --- ACT 4: The Invitation ---
  {
    target: 'style-editor',
    code: `
/*
* 故事讲完了。
* 最后，让我介绍一下我正在做的事情，
* 以及如何参与进来。
*/
`
  },
  {
      target: 'content-editor',
      code: `
  <hr class="divider" />
  <h2>我的项目 & 欢迎加入</h2>`,
      appendTo: '#story-container'
  },
  {
    target: 'content-editor',
    code: `
  <div class="project-card">
    <h3><i class="fas fa-rocket"></i> 正在运行：深维AI审核</h3>
    <p>一个完全免费的AI审核服务，可以深度理解语义，并使用自然语言设定审核规则。欢迎各位免费尝试。</p>
  </div>`,
    appendTo: '#story-container',
  },
    {
    target: 'content-editor',
    code: `
  <div class="project-card">
    <h3><i class="fas fa-code-branch"></i> 开源项目：auto-tree-map</h3>
    <p>一个自动将文章转化为逻辑树的AI项目。开源地址在：<a href="https://github.com/xukonxe/auto-tree-map" target="_blank">GitHub</a></p>
  </div>`,
    appendTo: '#story-container',
  },
  {
    target: 'content-editor',
    code: `
  <div class="project-card">
    <h3><i class="fas fa-robot"></i> 正在开发：QQ群机器人</h3>
    <p>如果你对我将要开发的项目有任何建议或者想要的功能，请你可以加我的qq群来一起交流讨论。</p>
  </div>`,
    appendTo: '#story-container',
    delay: 1000,
  },
  {
    target: 'style-editor',
    code: `
.project-card {
  background: #2c313a;
  border-left: 4px solid #61afef;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 4px;
  transition: all 0.3s;
}
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.project-card h3 {
  margin-top: 0;
  color: #268bd2; /* [修改] 在浅色模式下换一个更和谐的颜色 */
  display: flex;
  align-items: center;
  gap: 10px;
}
.project-card a {
  color: #d33682; /* [修改] 调整链接颜色 */
  text-decoration: none;
  font-weight: bold;
}
.project-card a:hover {
  text-decoration: underline;
}
`
  },
  {
    target: 'content-editor',
    code: `
  <h2 class="call-to-action">期待你的加入，我们【加群一起开发】！</h2>`,
    appendTo: '#story-container',
  },
    {
    target: 'style-editor',
    code: `
.call-to-action {
  text-align: center;
  color: #cb4b16; /* [修改] 调整颜色 */
  font-size: 1.8em;
  margin-top: 2rem;
  padding: 1rem;
  border: 2px dashed #cb4b16; /* [修改] 调整颜色 */
  border-radius: 10px;
  text-shadow: 0 0 15px #cb4b1688; /* [修改] 调整颜色 */
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(203, 75, 22, 0.7); /* [修改] 调整颜色 */
  }
  70% {
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1); /* [修改] 调整阴影 */
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(203, 75, 22, 0); /* [修改] 调整颜色 */
  }
}
`
  },
  {
    target: 'content-editor',
    code: `
  <div class="contact-info">
    <p>点击链接加入我的交流群：<a href="https://qm.qq.com/q/Ht3Mt0rsiI" target="_blank">https://qm.qq.com/q/Ht3Mt0rsiI</a></p>
    <img src="/qq-group-qr.png" alt="QQ群二维码" class="qr-code" />
  </div>`,
    appendTo: '#story-container',
  },
  {
    target: 'style-editor',
    code: `
.contact-info {
  text-align: center;
  margin-top: 2.5rem;
  padding-bottom: 2rem;
}
.contact-info p {
  font-size: 1.1em;
}
.contact-info a {
  color: #2aa198; /* [修改] 调整颜色 */
}
.qr-code {
  max-width: 200px;
  margin-top: 1rem;
  border-radius: 12px;
  border: 4px solid #eee; /* [修改] 调整边框颜色 */
  background: white; /* 给二维码一个白色背景，确保可扫描 */
  padding: 0.5rem;
}
`
  },
  {
    target: 'style-editor',
    code: `
body.dark-mode .project-card {
  background: #2c313a;
  border-left-color: #61afef;
}
body.dark-mode .project-card h3 {
  color: #98c379;
}
body.dark-mode .project-card a {
  color: #c678dd;
}
body.dark-mode .call-to-action {
  color: #e5c07b;
  border-color: #e5c07b;
  text-shadow: 0 0 15px #e5c07b88;
}
body.dark-mode .contact-info a {
  color: #61afef;
}
body.dark-mode .qr-code {
  border-color: #444b5a;
}
`
  }
]; 