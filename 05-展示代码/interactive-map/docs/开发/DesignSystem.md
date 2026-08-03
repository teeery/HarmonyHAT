很好，这一步非常重要。

我会把它当成真正产品团队里的 **Design System 1.0** 来设计，而不是简单配色。

目标：

> **让10个人同时用 AI 开发，也能保持像同一个高级科技产品。**

参考方向：

* Apple 官网：克制、留白、叙事
* 华为开发者大会：科技、未来、生态
* Google Arts & Culture：探索、沉浸
* Vision Pro：空间、透明、深度

项目关键词：

> **深空 · 连接 · 智慧 · 未来城市 · 青年探索**

---

# 鸿蒙未来城市探索馆

# Design System 1.0

Version：v1.0
Style：Future Digital Exhibition
Theme：Harmony Future City

---

# 0. 核心视觉理念

## 一句话：

> 在深邃城市夜空中，用光连接人与万物。

视觉语言：

```
黑色空间
    +
蓝紫光源
    +
玻璃材质
    +
数据流动
    +
微弱粒子
```

避免：

❌ 五颜六色
❌ 游戏UI感
❌ 赛博朋克过度
❌ 大量霓虹边框

目标：

像 Apple 发布会：

“高级科技”

而不是：

“电竞页面”。

---

# 1. Color System 色彩系统

## 1.1 基础背景色

### Space Black（宇宙黑）

主背景：

```css
--space-950:#030712;
```

用途：

* 首页
* 大场景
* 未来城市

视觉：

不是纯黑。

带一点蓝。

---

### Deep Space

```css
--space-900:#07111F;
```

用途：

卡片背景。

---

### Glass Surface

```css
--glass-800:
rgba(255,255,255,0.08);
```

用途：

玻璃面板。

---

# 1.2 核心品牌色

## Harmony Blue（鸿蒙蓝）

主色：

```
#0A59F7
```

用途：

* 连接线
* 高亮
* CTA

感觉：

科技、信任。

---

## Future Purple（未来紫）

```
#7C3CE0
```

用途：

* AI
* 未来
* 创新

---

## Aurora Cyan（极光青）

```
#42D1E3
```

用途：

数据流。

---

## Quantum Pink（量子紫红）

```
#8A2BE2
```

少量使用。

用途：

强调未来感。

---



---

# 3. Typography 字体系统

## 中文字体

推荐：

优先：

```
HarmonyOS Sans SC
```

备用：

```
PingFang SC
Microsoft YaHei
```

---

## 英文：

```
Inter
SF Pro Display
```

---

# 字体层级

## Hero标题

72px

Weight:

700

用途：

首页：

“一座城市，每天产生……”

---

## Section标题

48px

700

例如：

未来南城2035

---

## Card标题

24px

600

---

## 正文

16px

400

---

## Caption

14px

400

---

# 4. Layout System 布局规范

## 最大宽度

所有页面：

```css
max-width:

1280px;
```

不要铺满。

Apple官网大量留白。

---

## Grid

标准：

12列。

例如：

地图页：

```
地图
8列

信息卡
4列
```

---

# 5. Glassmorphism Design 玻璃系统

这是整个网站核心。

## Glass Card

参数：

```
background:
rgba(255,255,255,0.06)

backdrop-filter:
blur(24px)

border:
1px solid rgba(255,255,255,0.12)

radius:
24px
```

效果：

像未来HUD。

---

## Card Hover

鼠标经过：

变化：

```
translateY(-8px)

border亮度增加

shadow增强
```

---

# 6. Radius 圆角系统

统一：

```css
--radius-sm:12px;

--radius-md:20px;

--radius-lg:32px;

--radius-xl:48px;
```

使用：

按钮：

20px

卡片：

24px

大模块：

32px

---

# 7. Shadow 光效系统

## Blue Glow

```css
0 0 40px
rgba(79,140,255,.35)
```

用途：

科技按钮。

---

## Purple Glow

```css
0 0 60px
rgba(168,85,247,.35)
```

用途：

AI。

---

## City Glow

```css
0 0 120px
rgba(34,211,238,.25)
```

用途：

地图节点。

---

# 8. Components 组件规范

---

# 8.1 GlassCard

所有信息卡统一：

例如：

地图探索目的。

结构：

```
GlassCard

标题

内容

按钮
```

---

# 8.2 GlowButton

首页按钮：

样式：

```
background:
gradient

radius:
999px


shadow:
blue glow
```

状态：

Normal:

蓝紫渐变

Hover:

扩大5%

---

# 8.3 SectionTitle

统一：

```
小标签

大标题

描述
```

例如：

```
CITY OBSERVATION

城市观察

从真实场景中发现问题
```

---

# 8.4 DataCard

数据驾驶舱：

结构：

```
数字

单位

说明
```

例如：

```
37

份有效访谈

Based on field research
```

---

# 8.5 Timeline Node

调研旅程：

统一：

圆点：

蓝紫发光。

---

# 8.6 AI Chat Card

AI助手：

特点：

* 半透明
* 圆角
* 微光

---

# 9. Animation System 动画规范

核心原则：

> 不追求炫，而追求“自然”。

---

# Fade Up

所有模块出现：

时间：

800ms

```text
opacity 0→1

translateY 40→0
```

---

# Float

漂浮：

地图节点。

周期：

4s

---

# Glow Pulse

光点：

周期：

2s

---

# Data Flow

数据线：

速度：

20s

---

# Page Transition

页面切换：

不要瞬间跳。

使用：

```
fade

+

scale

+
blur
```

---

# 10. Icon System

风格：

线性图标。

推荐：

Lucide Icons

不用：

emoji。

例如：

❌ 🏢

✅ Building2

---

# 11. Image Style 图片规范

所有AI图片：

统一：

## 参数：

```
cinematic

dark

blue purple

soft light

minimal

apple keynote style
```

禁止：

❌ 过度赛博朋克

❌ 红绿灯光

❌ 游戏风

---

# 12. 页面级视觉规则

## 首页

关键词：

“震撼”

允许：

最大字体

最大图片

---

## 地图页

关键词：

“探索”

重点：

空间感。

---

## 调研页

关键词：

“真实”

照片比例增加。

---

## 数据页

关键词：

“专业”

减少装饰。

---

## AI页

关键词：

“智能”

紫色增强。

---

## 2035页

关键词：

“希望”

增加光。

---

# 13. 给AI开发者的规则文件

建议保存：

```
DESIGN_SYSTEM.md
```

内容：

```md
项目：

鸿蒙未来城市探索馆


视觉：

Future Digital Exhibition


禁止：

纯白背景

默认组件

普通按钮

彩色乱用


必须：

深色背景

蓝紫渐变

玻璃卡片

Framer Motion动画

高级留白

```

---

# 最终视觉关键词

以后所有AI生成：

统一追加：

> premium futuristic digital exhibition, Apple keynote style, dark space background, glassmorphism UI, blue purple gradient, elegant minimal technology aesthetic

