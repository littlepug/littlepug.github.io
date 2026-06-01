---
title: Elasticsearch 滚动重启
categories: study
tags: [study]
keywords: elasticsearch
excerpt: Elasticsearch 滚动重启
date: 2021-01-29
---

## 滚动重启

> elasticsearch版本升级、或者服务器自身的维护操作，都需要滚动重启。
>
> 滚动重启支持Elasticsearch一次重启一个节点，因此重启不会中断服务。
>
> 建议重启时讲集群的节点分为两个组，并按顺序升级组：
>
> ```shell
> #符合master资格的节点
> curl -X GET "localhost:9200/nodes/master:true?pretty"
> #不符合master资格的节点，即其余节点
> curl -X GET "localhost:9200/nodes/master:false?pretty"
> ```

## 重启

### 1.禁用分片分配

> 当关闭节点时，分配过程将等待```index.unassigned.node_left.delayed_timeout```分钟（默认是1分钟），然后再开始将该节点的分片复制到集群的其他节点，这kennel会涉及大量IO。由于该节点将不久后重启，因此该IO是不必要的。重启节点之前禁用副本分配：
>
> ```shell
> #transient和persistent两种方式
> #transient 临时：这些设置在集群重启之前一直会生效。一旦整个集群重启，这些设置就被清除
> #persistent 永久：这些设置永久保存，除非再次被手动修改。是将修改持久化到文件中，重启之后也不影响。
> curl -X PUT "localhost:9200/_cluster/settings?pretty" -H 'Content-Type: application/json' -d'
> {
>   "persistent": {
>     "cluster.routing.allocation.enable": "primaries"
>   }
> }
> '
>
>
> ```
>
> - all -（默认）允许为所有类型的分片分配分片。
> - primaries -仅允许为主要分片分配分片。
> - new_primaries -仅允许为新索引的主碎片分配碎片。
> - none -不允许为任何索引分配任何类型的分片。
>
> 重新启动节点时，此设置不会影响本地主分片的恢复。
>
> 重新启动的节点，具有未分配的主分片副本的将立即恢复该主节点，前提是其分配ID与集群状态下的活跃分配ID之一匹配。

### 2.停止索引编制并执行同步刷新

> 可能的话，停止索引新数据。可以帮助提高恢复速度

```shell
curl -X POST "localhost:9200/_flush/synced?pretty"
#执行同步刷新时，请检查响应以确保没有失败。尽管请求本身仍返回200 OK状态，但响应主体中列出了由于挂起索引操作而失败的同步刷新操作。如果失败，请重新发出请求。
#将在8.0中将其删除
```

### 3.关闭单个节点

```shell
kill ${cat pid}
```

### 4.执行任何需要的更改

### 5.启动单个节点

```shell
nohup ./bin/elasticsearch &
```

```shell
#确认节点是否加入集群
curl -X GET "localhost:9200/_cat/health?pretty"
curl -X GET "localhost:9200/_cat/nodes?pretty"

```

### 6.重新启用分片分配

> 节点加入集群之后，删除```cluster.routing.allocation.enable```设置以启动分片分配并开始使用节点。
>
> ```shell
> curl -X PUT "localhost:9200/_cluster/settings?pretty" -H 'Content-Type: application/json' -d'
> {
>   "persistent": {
>     "cluster.routing.allocation.enable": null
>   }
> }
> '
>
> ```

### 7.等待节点恢复

> 在重启下一个节点之前，请等待集群完成分片分配
>
> ```shell
> #检查恢复进度
> #等待status列切换到green。一旦该节点为green，就已经分配了所有主要和副本碎片。
> curl -X GET "localhost:9200/_cat/health?v=true&pretty"
>
> #通过提交_cat/recovery请求来监视各个分片的恢复状态：
> curl -X GET "localhost:9200/_cat/health?pretty"
> curl -X GET "localhost:9200/_cat/recovery?pretty"
>
> ```

### 8.重复

> 当节点已经恢复并且稳定后，对需要重启的节点重复这些步骤。

