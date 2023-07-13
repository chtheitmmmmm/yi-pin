# 奕品教育

全栈项目分为前端和后端。

## 启动后端服务器

进入 `yi-pin-be` 文件夹，确保你的电脑上有 mysql 环境。

在linux上运行

```shell
systemctl status mysql
```

如果显示 mysql 服务器 running 的输出，则一切正常。

在 MacOS上运行
```shell
launchctl list | grep mysql
```
如果有输出，则说明 mysql 服务器正在运行。

接下来尝试登陆mysql服务器。

运行
```shell
mysql -u root
```

如果能登陆成功，则可以启动本项目后端服务器。否则请将你的mysql的root用户密码改为空密码。

```shell
cd yi-pin-be && pnpm i && pnpm start
```

## 启动前端开发服务器

```shell
cd yi-pin-fe && pnpm i && pnpm dev
```

即可启动前端开发服务器。

注意：本项目node环境为v18，请切换到该版本，其他版本未做测试。

