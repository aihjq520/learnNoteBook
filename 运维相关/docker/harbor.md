## 一、介绍
Docker容器应用的开发和运行路不开可靠的镜像管理，虽然Docker官方也提供了公共的镜像仓库，但是从安全和效率等方面考虑，部署我们私有环境的Registry也是非常必要的。 Harbor是由VMware公司开源的企业级的Docker Registry管理项目，它包括权限管理(RBAC)、LDAP、日志审核、管理界面、自我注册、镜像复制和中文支持等功能。


## 二、组件
Harbor 由 5 个容器组成：
proxy：由 Nginx 服务器构成的反向代理。
registry：由 Docker 官方的开源 registry 镜像构成的容器实例。
ui：即架构中的 core services, 构成此容器的代码是 Harbor 项目的主体。
mysql：由官方 MySql 镜像构成的数据库容器。
log: 运行着 rsyslogd 的容器，通过 log-driver 的形式收集其他容器的日志。这几个容器通过 Docker link 的形式连接在一起，这样，在容器之间可以通过容器名字互相访问。对终端用户而言，只需要暴露 proxy (即 Nginx)的服务端口。

## 三、工作原理

假设我们将 Harbor 部署在主机名为 registry.abcdocker.com 的虚机上。用户通过 docker login 命令向这个 Harbor 服务发起登录请求:docker login registry.abcdocker.com当用户输入所需信息并点击回车后，Docker 客户端会向地址“registry.abcdocker.com/v2/” 发出 HTTP GET 请求。 Harbor 的各个容器会通过以下步骤处理：
