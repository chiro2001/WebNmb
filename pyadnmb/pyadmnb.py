import requests
import json
from pyadnmb.data import *


class Admnb:
    def __init__(self, userhash=None):
        self.host = 'https://adnmb2.com'
        self.apis = {
            'getForumList': self.host + '/Api/getForumList',
            'showf': self.host + '/Api/showf',
            'thread': self.host + '/Api/thread',
            'search': self.host + '/Api/Search'
        }
        self.userhash = userhash
        if self.userhash is None:
            self.userhash = 'r%EB3%94%0F%18%5B%82%BF%A2%EC%0ER%26DY_%06I%04%9F%DB%14%DC'
        # self.headers = {
        #     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0',
        #     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        #     'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        #     'Accept-Encoding': 'gzip, deflate, br',
        #     'Connection': 'keep-alive',
        #     # Cookie: Hm_lvt_e6d1419842221a8d451e9a89cabbcba6=1588232421; _ga=GA1.2.670637381.1585193945; __dtsu=6BB6E72D5D35818C71A30E574A6DA502; userhash=r%EB3%94%0F%18%5B%82%BF%A2%EC%0ER%26DY_%06I%04%9F%DB%14%DC; PHPSESSID=9c2ocltt8epu3uugumd79tvc87; Hm_lpvt_e6d1419842221a8d451e9a89cabbcba6=1588237252; _gid=GA1.2.1580724335.1588232422
        #     'Upgrade-Insecure-Requests': '1',
        #     'Cache-Control': 'max-age=0',
        #     'TE': 'Trailers'
        # }
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cookie': 'userhash=%s' % self.userhash,
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
            'TE': 'Trailers',
        }
        self.imgcdn = 'https://nmbimg.fastmirror.org/image/'
        self.thumbcdn = 'https://nmbimg.fastmirror.org/thumb/'

        self.parts = Parts()
        self.getForums()

    def getImageUrl(self, reply):
        return "%s%s.%s" % (self.imgcdn, reply.img, reply.ext)

    def getThumbUrl(self, reply):
        return "%s%s.%s" % (self.thumbcdn, reply.img, reply.ext)

    def getForums(self):
        resp = requests.get(self.apis['getForumList'], headers=self.headers)
        self.parts.load(json.loads(resp.content))

    def getForumThreads(self, fid=0, fname='', page=0):
        # 优先使用fid查找
        if len(fname) > 0 and fid == 0:
            # 找找有没有fid
            found = False
            for part in self.parts.parts:
                for forum in part.forums:
                    if fname == forum.name:
                        fid = int(forum.id)
                        # print('found', fid)
                        found = True
                        break
                if found:
                    break
            if not found:
                print('err: no fid found')
                return []
        if fid == 0 and len(fname) == 0:
            return []
        # print('try: fid=', fid)

        resp = requests.get(self.apis['showf'] + '/?id=%d&page=%s' % (fid, page), headers=self.headers)
        data = json.loads(resp.content)
        if type(data) is str:
            return []
        threads = []
        for t in data:
            threads.append(Thread(t))
        return threads

    def getThread(self, tid, page=0):
        resp = requests.get(self.apis['thread'] + '/?id=%s&page=%s' % (tid, page), headers=self.headers)
        thread = Thread(json.loads(resp.content))
        return thread

    # args: pageSize, pageNo(start from 1), q, cd(?)
    def search(self, q, page_no=1, page_size=20):
        resp = requests.get(self.apis['search'] + '/?pageSize=%s&pageNo=%s&cd=1&q=%s' % (
            page_size, page_no, q
        ), headers=self.headers)
        data = json.loads(resp.content)
        if type(data) is str:
            return []
        hits = []
        for hit in data['hits']['hits']:
            hits.append(SearchHit(hit))
        hits.sort(key=lambda x: x.sort)
        # print(hits)
        return hits


if __name__ == '__main__':
    ad = Admnb()
    # print(ad.parts)
    # print(ad.search('A岛'))
    print(ad.getForumThreads(fname='综合版1')[0].content.content)
