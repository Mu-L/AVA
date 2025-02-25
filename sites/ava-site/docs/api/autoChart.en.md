---
title: AutoChart
order: 1
---

<playground path="auto-chart/demo/basic.jsx"></playground>

## Data

### data

<description>**optional** _any[]_</description>

Row data array. If empty, mock panel is available.

### fields

<description>**optional** _string[]_</description>

The fields for chart recommendations.


## Container

### title

<description>**optional** _string_</description>

Chart title.

### description

<description>**optional** _string_</description>

Chart description.

### width

<description>**optional** _React.CSSProperties['width']_ _default:_ `"100%"`</description>

Container width.

### height

<description>**optional** _React.CSSProperties['height']_ _default:_ `"100%"`</description>

Container height.

### className

<description>**optional** _string_</description>

Container className.

### language

<description>**optional** _"zh-CN" | "en-US"_ _default:_ `"zh-CN"`</description>

Internationalization.

## Configuration

### purpose

<description>**optional** _Purpose_</description>

The purpose of visualization.

### showRanking

<description>**optional** _boolean_ _default:_ `true`</description>

Whether to display the recommended ranking, it can be used to switch chart type.

### configurable

<description>**optional** _boolean_ _default:_ `true`</description>

Whether show config panel.

### noDataContent

<description>**optional** _React.ReactNode_</description>

To render content without data. 
