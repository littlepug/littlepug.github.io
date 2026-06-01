---
title: Kafka与Zookeeper集群搭建
categories: study
tags: [kafka, bigdata]
keywords: bigdata
excerpt: Zookeeper 三节点集群与 Kafka 多 Broker 安装配置、myid 与 server 映射及启动验证。
cover: /images/covers/kafka-zookeeper.svg
date: 2020-09-11
---

## Zookeeper集群
### 一、环境要求

> centos 7 64位

> Jdk 1.8+

### 二、配置

```text
tar -zxvf zookeeper-3.4.13.tar.gz
cd zookeeper-3.4.13
cd conf
#抄下zoo_sample.cfg
cp zoo_sample.cfg zoo.cfg

```



#### 1.配置zoo.cfg

```yaml
#客户端与服务器或者服务器与服务器之间维持心跳，也就是每个tickTime时间就会发送一次心跳
tickTime=2000
#集群中的follower服务器(F)与leader服务器(L)之间初始连接时能容忍的最多心跳数（tickTime的数量）
initLimit=10
#集群中flower服务器（F）跟leader（L）服务器之间的请求和答应最多能容忍的心跳数。
syncLimit=5
#用来存放myid信息跟一些版本，日志，跟服务器唯一的ID信息等
dataDir=/app/data/zookeeper/data
#用于配置服务器存储事务日志文件的目录，有默认值dataDir,但是建议将两个目录分别配置，防止磁盘的并发读写，影响服务器性能
dataLogDir=/app/data/zookeeper/logs
#用于配置当前服务器对客户端暴露的端口，一般配置为2181,无默认值
clientPort=2181
#server.id=host:port:port:用于配置组成zookeeper集群的机器列表，其中id为serverId,与myid文件中的值对应。第一个端口用于指定Leader服务器和Follewer服务器进行运行时通信和数据同步所使用的端口，第二个端口用于进行Leader选举过程中的投票通信
server.71=20.201.35.71:2888:3888
server.131=20.201.35.131:2888:3888
server.132=20.201.35.132:2888:3888
```


#### 2.添加myid文件

> 到此位置，`zoo.cfg`就已经配置完成了，还需要在`dataDir`中填写对应`myid`，即`server.id`中的id值
分别登录每台机器，运行下列命令

```text
echo “71” > /app/data/zookeeper/data/myid
echo “131” > /app/data/zookeeper/data/myid
echo “132” > /app/data/zookeeper/data/myid
```


### 三、启动与验证

> 进入每台机器的对应zookeeper目录

> `bin/zkServer.sh start`

![jps 验证 Zookeeper 进程](/images/posts/2020/kafka/kafka01.svg)

> 启动后使用 `jps` 查看，出现 **QuorumPeerMain** 即表示 Zookeeper 启动成功。

> 其他验证方式：

> `bin/zkServer.sh status`

> 会返回该节点是`leader`还是`follower`

## Kafka集群搭建
### 一、配置

```text
tar -zxvf kafka_2.12-2.2.0.tgz
cd kafka_2.12-2.2.0
cd config

vim server.properties
```

#### 1.修改配置

```yaml
#每一个broker在集群中的唯一表示，要求是正数。当该服务器的IP地址发生改变时，broker.id没有变化，则不会影响consumers的消息情况
broker.id=1
# Socket Server Settings
listeners=PLAINTEXT://:9092
#broker server服务端口
port=9092
#broker的主机地址，若是设置了，那么会绑定到这个地址上，若是没有，会绑定到所有的接口上，并将其中之一发送到ZK，一般不设置
host.name
#broker处理消息的最大线程数，一般情况下不需要去修改
num.network.threads=3
#broker处理磁盘IO的线程数，数值应该大于你的硬盘数
num.io.threads=8
#socket的发送缓冲区，socket的调优参数SO_SNDBUFF
socket.send.buffer.bytes=102400
#socket的接受缓冲区，socket的调优参数SO_RCVBUFF
socket.receive.buffer.bytes=102400
#socket请求的最大数值，防止serverOOM，message.max.bytes必然要小于socket.request.max.bytes，会被topic创建时的指定参数覆盖
socket.request.max.bytes=104857600
#表示消息体的最大大小，单位是字节
message.max.byte=5242880

#数据存储的目录
#kafka数据的存放地址，多个地址的话用逗号分割 /data/kafka-logs-1，/data/kafka-logs-
log.dirs=/app/data/kafka/kafkalogs/
#每个topic的分区个数，若是在topic创建时候没有指定的话会被topic创建时的指定参数覆盖
num.partitions=3
#  默认是1，配置的线程池来处理日志片段；线程数量=log.dirs 的数量乘以该数字
num.recovery.threads.per.data.dir=1

#topic的offset的备份份数。建议设置更高的数字保证更高的可用性
offsets.topic.replication.factor=1

#Log Retention Policy
#168小时后删除
log.retention.hours=168

#topic每个分区的最大文件大小，一个topic的大小限制 = 分区数* log.retention.bytes。-1没有大小限制
log.retention.bytes=-1
#文件大小检查的周期时间，是否触发 log.cleanup.policy中设置的策略
log.retention.check.interval.ms=300000
#其他说明：log.retention.bytes和log.retention.minutes任意一个达到要求，都会执行删除，会被topic创建时的指定参数覆盖；log.retention.bytes和log.retention.minutes任意一个达到要求，都会执行删除，会被topic创建时的指定参数覆盖


#是否允许自动创建topic，若是false，就需要通过命令创建topic
auto.create.topics.enable =true
#默认备份份数，仅指自动创建的topics
default.replication.factor=2
#replicas每次获取数据的最大大小
replica.fetch.max.bytes=5242880
#topic的分区是以一堆segment文件存储的，这个控制每个segment的大小，会被topic创建时的指定参数覆盖
log.segment.bytes=1073741824

############################# Zookeeper #############################
#连接的zookeeper集群地址
#zookeeper集群的地址
zookeeper.connect=20.201.35.71:2181,20.201.35.132:2181,20.201.35.131:2181
#ZooKeeper的最大超时时间，就是心跳的间隔，若是没有反映，那么认为已经死了，不易过大
zookeeper.connection.timeout.ms=6000

# Group Coordinator Settings
#在执行第一次再平衡之前，group协调员将等待更多消费者加入group的时间。 延迟时间越长意味着重新平衡的可能性越小，但是等待处理开始的时间增加。
group.initial.rebalance.delay.ms=0
#启用删除主题。 如果此配置已关闭，则通过管理工具删除主题将不起作用。删除topic是影响注册在/admin/delete_topics的监听
delete.topic.enable=true
```


### 二、启动验证

#### 1.启动

> 在部署集群的时候，要注意区分每台机器配置中的`broker.id`要不一样。

> 集群每台机器，重复如下操作：

> 创建日志目录：`mkdir  -pv  /app/data/kafka/kafkalogs/ `

> 进入kafka目录：`cd /app/soft/kafka_2.12-2.2.0`

>使用nohup命令启动程序（也可以使用全路径来启动）：
`nohup ./bin/kafka-server-start.sh ./config/server.properties & `

#### 2.验证

> 查看`nohup.out`日志，没有报错则启动成功。

> 运行`jps`命令，有`kafka`进程，则表示运行正常

> 进入zookeeper，查看运行的kafka节点：

```text
cd zookeeper-3.4.13
./bin/zkCli.sh
ls /brokers/ids
```

> 返回 [1, 2, 3] 则说明注册在zookeeper的kafka集群有三个节点

#### 3.命令行

> 创建topic

> `bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test`

>说明：
>   --topic 定义 topic 名
>   --replication-factor  定义副本数
>   --partitions  定义分区数

> 查看topic

`bin/kafka-topics.sh --list --bootstrap-server localhost:9092`

> 发送消息

`bin/kafka-console-producer.sh --broker-listlocalhost:9092 --topic test`

> 消费消息

`bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning`
