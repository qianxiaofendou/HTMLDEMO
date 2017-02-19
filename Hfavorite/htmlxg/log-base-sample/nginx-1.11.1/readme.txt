1、启动：

F:\workspaceforhtml\HTMLDEMO\favorite\log-base-sample\nginx-1.11.1>start nginx

或

F:\workspaceforhtml\HTMLDEMO\favorite\log-base-sample\nginx-1.11.1>nginx.exe

注：建议使用第一种，第二种会使你的cmd窗口一直处于执行中，不能进行其他命令操作。

2、停止：

F:\workspaceforhtml\HTMLDEMO\favorite\log-base-sample\nginx-1.11.1>nginx.exe -s stop

或

F:\workspaceforhtml\HTMLDEMO\favorite\log-base-sample\nginx-1.11.1>nginx.exe -s quit


注：stop是快速停止nginx，可能并不保存相关信息；quit是完整有序的停止nginx，并保存相关信息。

3、重新载入Nginx：

F:\workspaceforhtml\HTMLDEMO\favorite\log-base-sample\nginx-1.11.1>nginx.exe -s reload

当配置信息修改，需要重新载入这些配置时使用此命令。

4、重新打开日志文件：

F:\workspaceforhtml\HTMLDEMO\favorite\log-base-sample\nginx-1.11.1>nginx.exe -s reopen

5、查看Nginx版本：

F:\workspaceforhtml\HTMLDEMO\favorite\log-base-sample\nginx-1.11.1>nginx -v