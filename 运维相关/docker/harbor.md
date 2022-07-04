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

假设我们将 Harbor 部署在主机名为 registry.abcdocker.com 的虚机上。用户通过 docker login 命令向这个 Harbor 服务发起登录请求:docker login registry.abcdocker.com当用户输入所需信息并点击回车后，Docker 客户端会向地址“registry.abcdocker.com/v2/” 发出 HTTP GET 请求。 


### 准备安装
离线安装包里包含了基本我们所需要的内容，解压缩后的内容如下：
```
tar xvf harbor-offline-installer-v2.0.0.tgz

harbor/harbor.v2.0.0.tar.gz
harbor/prepare
harbor/LICENSE
harbor/install.sh
harbor/common.sh
harbor/harbor.yml.tmpl

```

### 编辑配置文件
复制默认模版文件 harbor.yml.tmpl 并重命名为 harbor.yml，并按照自己需求更新该配置文件。
```
cp harbor.yml.tmpl harbor.yml

vim harbor.yml
```

一般情况下，我们最少需要配置的内容如下：

hostname 需要配置为 127.0.0.1 之外的内容，以提供外部访问，本例中我配置为: docker.soulteary.com
https 的配置需要同时配置证书，生产环境中，如果使用 SLB 或者使用其他应用统一提供 SSL 接入，则可以删除。
harbor_admin_password 默认密码即可，但是初次使用登陆后台后需要修改密码。
data_volume 根据自己实际情况修改宿主机的文件储存地址


### 执行安装
