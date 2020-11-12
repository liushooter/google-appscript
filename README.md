# google-appscript

## 演示视频

https://www.bilibili.com/video/av66399654

## Web3 Daily 小应用

本人用 google sheet 作为 https://daily.rebase.network/ 的数据源，还用了 https://sheet.best/ ，它提供更好的 RESTful api 的方式访问 google sheet 数据

## Api 文档

### google sheet

https://developers.google.com/apps-script/api/concepts/

```
=IMPORTHTML("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)","table",3)
```

### steinhq

https://docs.steinhq.com/create-api

### sheet.best

https://docs.sheet.best/

### seatable

https://docs.seatable.cn/published/seatable-api/home.md

https://seatable.github.io/seatable-scripts-cn/python/

### 黑帕云

https://hipacloud.com/features/api/

## api 集成工具

https://sheet.best/ 提供更好的 RESTful api 的方式访问 google sheet 数据，不需要特别了解 google sheet 的 api

https://steinhq.com/ 与 https://sheet.best/ 很相似

https://mixedanalytics.com/api-connector/ 浏览器插件，通过外部 api 把数据导入到 sheet

## 访问数据

https://sheet.best/api/sheets/c904c7be-955d-429e-9c29-376f4e31ecca/tabs/Summary/0

https://sheet.best/api/sheets/c904c7be-955d-429e-9c29-376f4e31ecca/tabs/Summary?_limit=5&_offset=2

https://api.steinhq.com/v1/storages/5e73b903b88d3d04ae0815bb/Summary?limit=5&offset=2

## 产品

https://airtable.com/ Airtable 是新型的表格制作工具，可以把文字、图片、链接、文档等各种资料聚合在一起，成为我们的私人定制资料库。可以这么说 Airtable 是更高级的 google sheet。

https://table2site.com/ 通过设定 Airtable 数据生成一个定制化的网站

https://www.sheet2site.com/ 通过设定 google sheet 数据生成一个定制化的网站，类似 https://table2site.com/

### 国内产品

SeaTable https://seatable.cn/

SeaTable 和 Airtable 是同一类产品。SeaTable 有中文界面，产品上对 Airtable 做了简化，比如去掉了卡片视图、看板视图、日历视图这些不常用的视图，只保留核心的表格视图。卡片、看板、日历在 SeaTable 中作为插件实现，有需要的时候再安装。
SeaTable 对用户的限制也更少，比如 Airtable 中高级搜索、统计模块都是要付费的。SeaTable 这些都是作为基本的功能，不需要付费。

黑帕云 https://hipacloud.com/

新一代数据协作平台 用户可在黑帕云平台上设置数据维度、字段名称、数据逻辑等，使日常中需要人工约束的数据流程，变成使用软件自动约束的数据流程，从而实现更好的数据管理。

## 例子

[导入网页数据到 Google Sheet](https://www.cnblogs.com/Wayou/p/7039698.html)

[将 coinmarketcap 导入到 Google Sheet](https://mixedanalytics.com/knowledge-base/import-coinmarketcap-data-to-google-sheets/)

[将 Google Sheet 数据导入到 stitchdata](https://www.stitchdata.com/blog/how-to-replicate-google-sheets-to-your-data-warehouse/)

[Airtable 3 分钟菜鸟入门](https://sspai.com/post/44746)

[基于 Airtable 实现小微企业的简单信息化](https://zhuanlan.zhihu.com/p/104322461)

[用 AirTable 打造自己的个人数据库](https://zhuanlan.zhihu.com/p/273350851)
