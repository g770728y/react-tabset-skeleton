# react-tabset-skeleton

> tabset(多标签页)组件骨架, 不含 ui

[![NPM](https://img.shields.io/npm/v/react-tabset-skeleton.svg)](https://www.npmjs.com/package/react-tabset-skeleton) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# 简述

在 github 里搜到的 tabset 组件均带 ui 界面, 与项目 ui 风格差距甚远
让人郁闷的是: 这类组件通常需要提供 style 进行定制, 不能适应复杂需求
因此提供了此骨架组件

## Install

```bash
npm install --save react-tabset-skeleton
```

## Usage

与同类组件不同, 此组件只是一个骨架, 渲染成什么样子, 完成取决于你  
我已经尽可能添加了必备参数, 需要你提供以下参数:

- defaultActiveKey: 缺省 tab

- tabGap: 两个 tab 标签标题的间隔

- rootContainerRenderer  
  整个 tabset 组件的容器。如果不提供, 则直接使用`div`包装  
  将自动附加`display:flex, flexDirection:?`

- tabsContainerRenderer
  必须提供。用于包装 tabset 组件的 title 行(列)  
  将自动附加`display:flex, flexDirection:?`

- tabRenderer  
  必须提供。用于渲染单个 tab 的 title  
  未提供任何假设, 完全由你确定

- panelContainerRenderer  
  必须提供。用于渲染 panel 的容器  
  未提供任何假设, 完全由你确定

具体使用方法, 请参见 example 目录

## License

MIT © [g770728y](https://github.com/g770728y)
