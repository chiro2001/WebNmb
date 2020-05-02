//NMB_HOST = '/adnmb';
NMB_HOST = 'https://cors-anywhere.herokuapp.com/https://adnmb2.com/Api';

SETTINGS = {
    HOST : NMB_HOST,
    API_GET_FORUM_LIST : NMB_HOST + '/getForumList/',
    API_THREAD : NMB_HOST + '/thread/',
    API_SHOWF : NMB_HOST + '/showf/',
    API_SEARCH : NMB_HOST + '/Search/',
    CDN_IMG : 'https://nmbimg.fastmirror.org/image/',
    CDN_THUMB : 'https://nmbimg.fastmirror.org/thumb/'
};

forums = []
forum_list = $('.nmb-forum-list');

function nmbSetup(data) {
    SETTINGS = data;
}

// 在main.html才有效果
function nmbSetForumList(data) {
//    console.log(data);
    forums = []
    data.sort((a, b) => {
        return a.sort > b.sort;
    });
    for (p of data) {
        p.forums.sort((a, b) => {
            return a.sort > b.sort;
        });
        forums = forums.concat(p.forums);
    }
//    console.log(forums);
    forum_list.empty();
    forum_dom_t = $('<li class="mdui-list-item mdui-ripple"><div class="mdui-list-item-content nmb-forum-content"></div></li>');
    for (var i in forums) {
        var forum = forums[i];
        var forum_dom = $(forum_dom_t).clone(false, true);
        var target = forum.showName;
        if (!target)
            target = forum.name;
        $('.nmb-forum-content', forum_dom).html(target);
        $('.nmb-forum-content', forum_dom).attr('forum', JSON.stringify(forum));
        $('.nmb-forum-content', forum_dom).click(function() {
            console.log('click forum:', $(this));
            var mforum = JSON.parse($(this).attr('forum'));
            window.frames[0].fid = mforum.id;
            window.frames[0].page_now = 1;
            window.frames[0].thread_list.empty();
            nmbGetThreadList(mforum.id).then(d => {
                $('.nmb-tag-' + window.frames[0].name).contents().find('.nmb-subtitle').text(mforum.name);
                nmbSetThreadList(d);
            });
        });
        forum_list.append(forum_dom);
    }
}

function nmbGetForumList() {
    return $.ajax({
        url: SETTINGS.API_GET_FORUM_LIST,
        dataType: 'JSON'
    });
}

function nmbSetThreadList(data) {
    // mainActivity在stack的最下面
    var iframe = iframe_stack.data[0];
    window.frames[0].threadListLoad(data);
}

function nmbGetThreadList(fid, page=1) {
    return $.ajax({
        url: SETTINGS.API_SHOWF + '?id=' + fid + '&page=' + page,
        dataType: 'JSON'
    });
}

function nmbGetTheard(tid, page=1) {
    return $.ajax({
        url: SETTINGS.API_THREAD + '?id=' + tid + '&page=' + page,
        dataType: 'JSON'
    });
}