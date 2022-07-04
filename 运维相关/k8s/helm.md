## 一、 基本概念
helm 类似于Linux系统下的包管理器，如yum/apt等，可以方便快捷的将之前打包好的yaml文件快速部署进kubernetes内，方便管理维护。

- helm：一个命令行下客户端工具，主要用于kubernetes应用chart的创建/打包/发布已经创建和管理和远程Chart仓库。
- Tiller：helm的服务端，部署于kubernetes内，Tiller接受helm的请求，并根据chart生成kubernetes部署文件（helm称为release），然后提交给 Kubernetes 创建应用。Tiller 还提供了 Release 的升级、删除、回滚等一系列功能。
- Chart： helm的软件包，采用tar格式，其中包含运行一个应用所需的所有镜像/依赖/资源定义等，还可能包含kubernetes集群中服务定义
- Release：在kubernetes中集群中运行的一个Chart实例，在同一个集群上，一个Chart可以安装多次，每次安装均会生成一个新的release。
- Repository：用于发布和存储Chart的仓库

简单来说：

helm的作用：像centos7中的yum命令一样，管理软件包，只不过helm这儿管理的是在k8s上安装的各种容器。
tiller的作用：像centos7的软件仓库一样，简单说类似于/etc/yum.repos.d目录下的xxx.repo。


![](./helm1.awebp)