import json
import requests


class SearchHit:
    def __init__(self, data=None):
        self.tid = ''
        self.source = SearchResultSource()
        self.sort = 0
        if data is not None:
            self.load(data)

    def load(self, data):
        self.tid = data['_id']
        self.sort = data['sort'][0]
        self.source.load(data['_source'])

    def __str__(self):
        return json.dumps({
            'tid': self.tid,
            'source': str(self.source)
        })


class SearchResultSource:
    def __init__(self, data=None):
        self.now = ''
        self.time = 0
        self.resto = ''
        self.userid = ''
        self.email = ''
        self.content = ''
        if data is not None:
            self.load(data)

    def load(self, data):
        self.now = data['now']
        self.time = data['time']
        self.resto = data['resto']
        self.userid = data['userid']
        self.email = data['email']
        self.content = data['content']

    def __str__(self):
        return json.dumps({
            'now': self.now,
            'time': self.time,
            'resto': self.resto,
            'userid': self.userid,
            'email': self.email,
            'content': self.content
        })


class Parts:
    def __init__(self, data=None):
        self.parts = []
        if data is not None:
            self.load(data)

    def load(self, data):
        for p in data:
            self.parts.append(Part(p))


class Part:
    def __init__(self, data=None):
        self.id = '0'
        self.sort = '-1'
        self.name = 'New Part'
        self.status = 'n'
        self.forums = []
        if data is not None:
            self.load(data)

    def load(self, data):
        self.id = data['id']
        self.sort = data['sort']
        self.name = data['name']
        self.status = data['status']
        for f in data['forums']:
            self.forums.append(Forum(f))


class Forum:
    def __init__(self, data=None):
        self.id = 0
        self.fgroup = 0
        self.sort = 0
        self.name = '版块1'
        self.showName = ''
        self.msg = ''
        self.interval = ''
        self.createdAt = ''
        self.updateAt = ''
        self.status = ''
        if data is not None:
            self.load(data)

    def load(self, data):
        self.id = data['id']
        self.fgroup = data.get('fgroup', '')
        self.sort = data.get('sort', 0)
        self.name = data['name']
        self.showName = data.get('showName', data['name'])
        self.msg = data['msg']
        self.interval = data.get('interval', '')
        self.createdAt = data.get('createdAt', '')
        self.updateAt = data.get('updatedAt', '')
        self.status = data.get('status', '')


class Reply:
    def __init__(self, data=None):
        self.id = ''
        self.img = ''
        self.ext = 'jpg'
        self.now = ''
        self.userid = ''
        self.name = ''
        self.email = ''
        self.title = ''
        self.content = ''
        self.admin = '0'
        if data is not None:
            self.load(data)

    def load(self, data):
        self.id = data['id']
        self.img = data['img']
        self.ext = data['ext']
        self.now = data['now']
        self.userid = data['userid']
        self.name = data.get('name', '芦苇')
        self.email = data['email']
        self.title = data['title']
        self.content = data['content']
        self.admin = data['admin']


class Thread:
    def __init__(self, data=None):
        self.content = Reply()
        self.replyCount = '0'
        self.replys = []
        if data is not None:
            self.load(data)

    def load(self, data):
        self.content.load(data)
        self.replyCount = data['replyCount']
        for r in data['replys']:
            self.replys.append(Reply(r))


if __name__ == '__main__':
    data1 = json.loads(requests.get('https://adnmb2.com/Api/getForumList').content)
    z = Parts(data1)
    print(z)
    data2 = json.loads(requests.get('https://adnmb2.com/Api/thread/?id=25439915').content)
    t = Thread(data2)
    print(t)