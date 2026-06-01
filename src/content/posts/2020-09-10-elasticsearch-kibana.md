---
title: Elasticsearch集群搭建与Kibana安装
categories: study
tags: [elasticsearch, bigdata]
keywords: elasticsearch
excerpt: CentOS 7 上 Elasticsearch 集群部署、JVM 与系统参数调优，以及 Kibana 安装与验证步骤。
cover: /images/covers/elasticsearch-kibana.svg
date: 2020-09-10
---

## Elasticsearch集群搭建
### 一、环境要求
> centos 7 64位

> Jdk 1.8+

### 二、资源配置
> 用于安装ES的集群，都要进行资源配置，确保有足够资原启动ES。

#### 1、修改（没有做新增）`/etc/security/limits.conf`
```text
* soft nofile 65536
* hard nofile 131072
* soft nproc 65536
* hard nproc 131072
```

#### 2、修改（没有做新增）`/etc/sysctl.conf`
```properties
vm.max_map_count=262144
```
> 然后运行 `sysctl -p`  命令使得修改生效
#### 3.设置用户资源参数

> 设置elk用户参数（在该文件下面添加一行）`/etc/security/limits.d/20-nproc.conf`

```text
elasticsearch    soft    nproc     65536
```



### 三、配置文件详解

> 解压tar包，并进行配置

```text
tar -zxvf elasticsearch-7.2.0-linux-x86_64.tar.gz
cd elasticsearch-7.2.0
vim ./config/elasticsearch.yml
```

> 然后就可以对配置文件进行修改了

```yaml
## 这里指定的是集群名称
cluster.name: my-cluster
#节点名称
node.name: node-1
#数据目录
path.data: /app/data/elasticsearch/data
path.logs: /app/data/elasticsearch/logs

#ES的监听地址，这样别的机器也可以访问
network.host: 0.0.0.0
http.port: 9200

#集群发现（在写的时候要写成自己的IP）
discovery.seed_hosts: ["20.201.35.73:9300","20.201.35.134:9300","20.201.35.133:9300"]
#设置一系列符合主节点条件的节点的主机名或 IP 地址来引导启动集群
cluster.initial_master_nodes: ["10.25.1.114:9300","10.25.1.116:9300","10.25.1.117:9300"]


#elasticsearch官网建议生产环境需要设置为true，提高性能
#需要修改/etc/security/limits.conf
#elasticsearch soft memlock unlimited
#elasticsearch hard memlock unlimited
#修改：/etc/sysctl.conf
#vm.swappiness=0
#之后重启机器
bootstrap.memory_lock: false


#网关信息
gateway.recover_after_nodes: 2
gateway.recover_after_time: 5m
gateway.expected_nodes: 3

bootstrap.system_call_filter: false
http.cors.enabled: true
http.cors.allow-origin: "*"
http.max_content_length: 100mb

#tcp端口
transport.tcp.port: 9300
transport.tcp.compress: true
#声明是master节点
node.master: true
#声明是数据节点
node.data: true
```


### 四、集群启动

> 上述步骤在集群的每一台机器上都进行配置之后，接下来就是启动运行集群了。

> Elasticsearch集群启动无法使用root用户启动，需要新建一个用户来启动elasticsearch。

#### 1.创建新用户
```text
useradd elasticsearch         #创建用户elk
groupadd elasticsearch        #创建组elk
useradd elasticsearch -g elasticsearch  #将用户添加到组
```

#### 2.创建数据目录和赋权
```text
mkdir -pv /app/data/elasticsearch/{data,logs} # 创建数据和日志目录(上述配置文件中配置的)
```
```text
# 修改文件所有者
chown -R elasticsearch:elasticsearch /app/data/elasticsearch/

chown -R elasticsearch:elasticsearch /app/soft/ elasticsearch-7.2.0/
```

#### 3.启动集群

> 进入elastic search目录，使用nohup一台机器一台机器的启动elastic search。

```text
su elasticsearch
cd elasticsearch-7.2.0
nohup ./bin/elasticsearch &
```


#### 4.验证是否启动成功

> 进入其中一台机器，访问：

```text
curl localhost:9200/_cat/health?pretty
```

> 返回：

```text
1599458694 06：04：54 my-cluster green 3 3 76 38 0 0 0 0 - 100.0%
#代表集群状态为green，有三个节点
```


### 五、集群动态添加节点

> 配置文件中有两个配置：

```yaml
discovery.seed_hosts:
cluster.initial_master_nodes:
```

> 这两个配置，是为了集群集中的节点可以相互发现和并选择主节点。

> 前者的配置是为了提供服务发现，发现集群，并加入他们；后者是设置一系列符合主节点条件的节点的主机名或 IP 地址来引导启动集群。

> 例如，现在存在一个主节点，`20.201.35.73 `

> 现在需要动态添加一个节点，

> `discovery.seed_hosts` 需要设置成`20.201.35.73`

> `cluster.initial_master_nodes`则需要设置成集群的多个ip

> 那么，新的节点就回自动的添加进来


> 在向集群添加新的符合主节点条件的节点时不再需要任何特殊的仪式，只需配置新节点，让它们可以发现已有集群，并启动它们。当有新节点加入时，集群将会自动地调整选举配置。只要你没有同时停止一半或更多符合主节点条件的节点，即使移除节点也是安全的。如果你需要停止一半或更多符合主节点条件的节点，或者你有更复杂的伸缩和编排需求，可以使用 API 直接调整选举配置。

### 六、集群节点说明及部署建议

> 默认情况下，elasticsearch集群中每个节点都有成为主节点的资格，也都存储数据，还可以提供查询服务。

> 但是在生产中，如果不修改elasticsearch节点的角色信息，在高数据量，高并发的场景下集群容易出现脑裂等问题。

> `node.master：`这个属性表示节点是否具有成为主节点的资格

> `node.data：`这个属性表示节点是否存储数据。

> 一个节点可以对应的，有四种配置，决定是否存储数据，是否有成为主节点的资格。

> 建议：

> 默认情况下`【node.master: true node.data: true】`，每个节点都有成为主节点的资格，也会存储数据，还会处理客户端的请求。

> 建议集群中设置3台以上的节点作为master节点`【node.master: true node.data: false】`，这些节点只负责成为主节点，维护整个集群的状态。

> 再根据数据量设置一批data节点`【node.master: false node.data: true】`，这些节点只负责存储数据，后期提供建立索引和查询索引的服务，这样的话如果用户请求比较频繁，这些节点的压力也会比较大。

> 所以在集群中建议再设置一批client节点`【node.master: false  node.data: false】`，这些节点只负责处理用户请求，实现请求转发，负载均衡等功能。

## Kibana 搭建

### 一、配置

```text
tar -zxvf kibana-7.2.0-linux-x86_64.tar.gz
cd  kibana-7.2.0-linux-x86_64
vim ./config/kibana.yml
```

```yaml
#修改或者添加下列参数
server.port: 5601
#kibana本机ip
server.host: "20.201.35.73"
#es集群ip
elasticsearch.hosts: ["http://20.201.35.73:9200","http://20.201.35.134:9200","http://20.201.35.133:9200"]
#默认往es添加索引".kibana"
kibana.index: ".kibana"

```


### 二、启动

> 与ES一样，`kibana`无法用root用户启动

```text
su elasticsearch
nohup ./bin/kibana &
```

> 验证下是否启动成功

> 浏览器访问  20.201.35.73:5601

> 出现页面就是启动成功了
