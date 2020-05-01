# pyadnmb

一个adnmb的爬虫。另有大用

## 用法

导入：`from pyadnmb.pyadmnb import *`
使用：`ad = Admnb(userhash="...")`
**方法**：
- 搜索：`ad.search('搜索内容')`。这个要登录。
- 获取版块列表：`ad.getForums()`
- 获取串：`ad.getForumThreads(fid, page=0)`
- 获取串内容：`ad.getThread(tid, page=0)`

## 设计目标

给我的WebNmb做数据支持。

## API

*参考*：https://www.zybuluo.com/ovear/note/151481
/Api/getCookie
/Api/getForumList

*Thread Obj*:
```
{
    "id": "6467841",
    "img": "",
    "ext": "",
    "now": "2015-08-12(三)16:08:00",
    "userid": "F0zz1FP",
    "name": "无名氏",
    "email": "",
    "title": "无标题",
    "content": "尼玛本来我如果说个好的,知道了.这个运维工作就到手了,我多了几句嘴,然后对方就我说的提了几个问题我半天答不上来,结果到手的offer飞了.尼玛,真够郁闷的(;´Д`)",
    "admin": "0",
    "replyCount": "7",
    "replys": [
        {
            "id": "6467854",
            "img": "",
            "ext": "",
            "now": "2015-08-12(三)16:13:05",
            "userid": "30ru124",
            "name": "无名氏",
            "email": "",
            "title": "无标题",
            "content": "嘴欠得肥宅",
            "admin": "0"
        }
    ]
}
```
/Api/feed
/Api/addFeed
/Api/delFeed

## WorkFlow

- [x]可行性验证
	- [x]能不能跨域...失败。
- [x]验证api
- [x]建立数据结构
- [x]操作
	- [x]登录...导入userhash
- [ ]写写文档
