尽管Docker为容器化的应用程序提供了开放标准，但随着容器越来越多出现了一系列新问题：

- 如何协调和调度这些容器？
- 如何在升级应用程序时不会中断服务？
- 如何监视应用程序的运行状况？
- 如何批量重新启动容器里的程序？


一个成熟的容器编排系统需要具备以下能力：

- 处理大量的容器和用户

- 负载均衡

- 鉴权和安全性

- 管理服务通信

- 多平台部署

![](./1.awebp)

Kubernetes 集群由代表控制平面的组件和一组称为节点的机器组成。

当你部署完 Kubernetes, 即拥有了一个完整的集群。


## Controller Manager，即控制平面，用于调度程序以及节点状态检测。

控制平面的组件对集群做出全局决策(比如调度)，以及检测和响应集群事件（例如，当不满足部署的 replicas 字段时，启动新的 pod）。

控制平面组件可以在集群中的任何节点上运行。 然而，为了简单起见，设置脚本通常会在同一个计算机上启动所有控制平面组件， 并且不会在此计算机上运行用户容器。 请参阅使用 kubeadm 构建高可用性集群 中关于跨多机器控制平面设置的示例。

### kube-apiserver
API 服务器是 Kubernetes 控制面的组件， 该组件公开了 Kubernetes API。 API 服务器是 Kubernetes 控制面的前端。

Kubernetes API 服务器的主要实现是 kube-apiserver。 kube-apiserver 设计上考虑了水平伸缩，也就是说，它可通过部署多个实例进行伸缩。 你可以运行 kube-apiserver 的多个实例，并在这些实例之间平衡流量。

### etcd
etcd 是兼具一致性和高可用性的键值数据库，可以作为保存 Kubernetes 所有集群数据的后台数据库。

您的 Kubernetes 集群的 etcd 数据库通常需要有个备份计划。

要了解 etcd 更深层次的信息，请参考 etcd 文档。

### kube-scheduler
控制平面组件，负责监视新创建的、未指定运行节点（node）的 Pods，选择节点让 Pod 在上面运行。

调度决策考虑的因素包括单个 Pod 和 Pod 集合的资源需求、硬件/软件/策略约束、亲和性和反亲和性规范、数据位置、工作负载间的干扰和最后时限。

### kube-controller-manager
运行控制器进程的控制平面组件。

从逻辑上讲，每个控制器都是一个单独的进程， 但是为了降低复杂性，它们都被编译到同一个可执行文件，并在一个进程中运行。

这些控制器包括:

- 节点控制器（Node Controller）: 负责在节点出现故障时进 行通知和响应
- 任务控制器（Job controller）: 监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成
- 端点控制器（Endpoints Controller）: 填充端点(Endpoints)对象(即加入 Service 与 Pod)
- 服务帐户和令牌控制器（Service Account & Token Controllers）: 为新的命名空间创建默认帐户和 API 访问令牌


## Node 组件 
节点组件在每个节点上运行，维护运行的 Pod 并提供 Kubernetes 运行环境。
Nodes，构成了Kubernetes集群的集体计算能力，实际部署容器运行的地方。

Pods，Kubernetes集群中资源的最小单位。

### kubelet
一个在集群中每个节点（node）上运行的代理。 它保证容器（containers）都 运行在 Pod 中。

kubelet 接收一组通过各类机制提供给它的 PodSpecs，确保这些 PodSpecs 中描述的容器处于运行状态且健康。 kubelet 不会管理不是由 Kubernetes 创建的容器。

### kube-proxy
kube-proxy 是集群中每个节点上运行的网络代理， 实现 Kubernetes 服务（Service） 概念的一部分。

kube-proxy 维护节点上的网络规则。这些网络规则允许从集群内部或外部的网络会话与 Pod 进行网络通信。

如果操作系统提供了数据包过滤层并可用的话，kube-proxy 会通过它来实现网络规则。否则， kube-proxy 仅转发流量本身。

### 容器运行时（Container Runtime） 
容器运行环境是负责运行容器的软件。

Kubernetes 支持容器运行时，例如 Docker、 containerd、CRI-O 以及 Kubernetes CRI (容器运行环境接口) 的其他任何实现。

### 优势
- 自动修复
k8s 会自动重新启动失败的容器、替换容器、杀死不响应用户定义的运行状况检查的容器，并且这些都是在用户无感知的情况下进行的（副本数量需要大于1且有正常运行的容器）。

要想介绍k8s的自动修复，必须要介绍存活探针，k8s正是利用存活探针来检查容器是否还在运行，如果探测失败，k8s将自动重启该容器。

k8s有三种探针机制:

HTTP GET: 针对容器的IP地址，端口以及路径，执行HTTP GET请求，如果收到的返回状态码为2xx或者3xx，则认为探测成功
TCP: 针对Socket通信进行探测，尝试与指定端口建立TCP连接，如果连接成功则探测成功。
Exec: 在容器内执行指定的命令，并检查命令的退出状态码，如果状态码为0，则探测成功。

- 服务发现
k8s的服务发现分为两种，集群内部访问和集群外部访问
  - 集群内部
    - 通过DNS访问服务在k8s内部，借助CoreDNS,一旦一个服务创建好，我们可以用hostname.namespace.svc.cluster.local这个域名来获取到服务的IP地址，如果应用和服务同一个集群内部，甚至在同一个命名空间下，我就可以直接用hostname访问该服务
  - 集群外部
    - NodePort
NodePort的原理是，在所有Node节点上监听一个端口（所有node节点端口相同），并将传入的数据转发到对应的服务上。
    - ingress
  功能在k8s默认集群里没有提供，需要手动安装开启。ingress可以让应用在http层暴露给外部，通过配置不同的host来指向不同的服务 