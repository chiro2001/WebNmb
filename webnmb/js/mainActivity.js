loadings = ["友谊魔法加载中","WTMSB","( 察ω觉)","(　^ω^)那你好棒棒哦","劲爆大象部落","hafu hafu","人，是会思考的芦苇——帕斯卡，《思想录》","开放包容，理性客观，有事说事，就事论事","我赵日天并不服！","【版规】晒妹会被SAGE哟，晒姐酌情","来杯淡定红茶（ ´_ゝ`）","诸君→朱军→董卿","仙客来根雕","保安！病栋里的病人跑出来了！","小刘，6床加大用药量","刘星打完夏东海，满头大汉","不要误会，我不是针对你，我是说……","旅馆大酬宾","Duang的一下，就加载出来了","没时间解释了！快上车！","你不能让我加载，我就马上加载","想歪的自重，这是芦苇！","UCCU等待加载的样子真是丑陋 ﾟ∀ﾟ)σ","【版规】带上家人的嘴臭会被碎饼干哟","食我大雕辣(つд⊂)","总有一天你们会看着我画的东西撸！","听说,下雨天三文鱼和叉烧酱更配哦","冷漠得肥宅","我淡淡地说，这是信仰","这里是独裁岛，不爽不要玩(＾o＾)ﾉ","可是朱云心里明白","是在下输了（抱拳）","小姐，请问有没有卖半岛鸡盒","服务员，来一份手撕逼","今天岛上没有智障","人生最好的五年，我都干什么了啊！","为二次元献出心脏！","三管不过冈","事到如今就别再给我装什么正义人士了","你们整天鉴婊鉴婊能找到媳妇吗","为我们的友谊干杯","在下弗了（抱拳）","注意（白）字多义","为了照顾智商不如蟑螂的虫族选手","当你刷A岛很卡时，你很火大","貳叁叁叁","齐齐蛤尔σ`∀´)（注意“蛤”字多义）","我是理性的机器","天下尴共十尬，君独占八尬","这个月A岛多了26只白羊，你有什么头猪吗？","实际上上一周我都在外地并且","我坠入黑暗，没有了光","君日本语本当上手","真是自私的神啊","A岛土著 八辈渔民 大海血脉","领导夹菜我转桌","重生之我在等待加载","微信公众号“芦苇娘的胖次”欢迎关注~","人类的本质是复读机","在A岛，只有bog在抓bog","我狗比酱今日便是要打爆你喵喵酱的狗头","人民群众喜闻乐见，你算老几","你走了地球不转了怎么办呀","【版规】禁止发表商业广告、推广链接和宣传QQ群","【版规】使用本网站是一种特权而不是权利","【版规】管理员有权片面决定删除或保留留言","【版规】禁止一切涉政涉黄涉毒涉黑等违法内容","Don't come here","光来！","早安的说！","大臭猪来咯！","妈传菜赚了50","zbzywcnm","硅基猿猴会大闹电子天宫吗","举高高(ノﾟ∀ﾟ)ノ","呐呐呐","如果想找个平和的地方取取暖，就试着光临下围炉版吧(*´ω`*)"]

loading = $('.nmb-loading');
loading_box = $('.nmb-loading-box');
loading_box2 = $('.nmb-loading-box2');
footer = $('.nmb-footer');
footer_text = $('.nmb-footer-text');
footer.hide();

function loadingShow(mloading) {
    if (!mloading)
        mloading = loading_box;
    loading.text(loadings[Math.round(Math.random() * loadings.length)]);
    mloading.show();
    mdui.mutation();
}
function loadingHide(mloading) {
    if (!mloading)
        mloading = loading_box;
    mloading.hide();
}

function isAtBottom() {
	return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1);
}

function mainActivity() {
    // 绑定打开drawer的事件
    $('.nmb-btn-drawer').click(function() {
//        new parent.window.mdui.Drawer('#main-drawer').toggle();
        parent.window.drawerOpen();
    });
    
    $('.nmb-icon-search').click(function() {
        parent.window.iframeNew('activity_search.html', 'search');
    });
    
    // 点击刷新
    $('.nmb-toolbar').click(function() {
        thread_list.empty();
        page_now = 0;
        threadGetNew();
    });
    
    $(document).ready(function() {
        loadingShow();
    });
    
    window.onscroll = function () {
        if (isAtBottom()) {
            threadGetNew();
        }
    }
}

// 等待main加载完就开始加载数据
// 设置threadList
thread_dom_t = $(
'<div class="mdui-card mdui-ripple" style="padding: 10px">\
<div class="nmb-thread">\
    <div class="nmb-card-head mdui-typo-caption-opacity" style="display: flex; display: -webkit-flex; width: 100%; flex-wrap: nowrap; justify-content: space-between;">\
        <div>\
            <div class="nmb-card-userid" style="display: inline-block">ATM</div>\
            <div class="nmb-card-time" style="display: inline-block; margin-left: 5px">4/20 12:11:21</div>\
        </div>\
        <div class="nmb-card-reply-count">0</div>\
    </div>\
    <br/>\
    <div class="nmb-card-content-box">\
        <div class="nmb-card-content-img" style="float: left; margin: 2%"><img class="nmb-card-img" src="" style="max-width: 200px; display: none;"></div>\
        <div class="nmb-card-content-text mdui-typo-body-1-opacity"></div>\
    </div>\
</div>\
</div><br/>'
);
thread_list = $('.nmb-forum-threads');

function threadMakeDom(thread) {
    var thread_dom = thread_dom_t.clone();
    $('.nmb-card-userid', thread_dom).html(thread.userid);
    if (thread.admin != 0)
        $('.nmb-card-userid', thread_dom).css('color', 'red');
    $('.nmb-card-time', thread_dom).html(thread.now);
    $('.nmb-card-reply-count', thread_dom).html(thread.replyCount);
    $('.nmb-card-content-text', thread_dom).html(thread.content);
    if (thread.img) {
        var url_img = SETTINGS.CDN_THUMB + thread.img + thread.ext;
        $('.nmb-card-img', thread_dom).attr('src', url_img);
        $('.nmb-card-img', thread_dom).click(function() {
//            console.log('click img:', thread.img);
            $('.nmb-thread', thread_dom).unbind('click');
            parent.window.iframeNew('activity_image.html?' + SETTINGS.CDN_IMG + thread.img + thread.ext, 'img-' + thread.img.slice(thread.img.indexOf('/')+1));
            setTimeout(function() {
                $('.nmb-thread', thread_dom).click(function() {
                    console.log('(img)click:', thread);
                    parent.window.iframeNew('activity_thread.html?' + thread.id, 'thread-' + thread.id);
                });
            }, 200);
        });
        $('.nmb-card-img', thread_dom).show();
        $('.nmb-card-img', thread_dom).load(function() {
            $('.nmb-card-content-box', thread_dom).css('min-height', $('.nmb-card-content-img', thread_dom).height() * 1.1);
            $('.nmb-thread', thread_dom).css('min-height', $('.nmb-card-content-img', thread_dom).height() * 1.1);
        });
    }
//    $('.mdui-card', thread_dom).click(function() {
    
    $('.nmb-thread', thread_dom).height($('.mdui-card', thread_dom) - 20);
    $('.nmb-thread', thread_dom).click(function() {
        console.log('click:', thread);
        parent.window.iframeNew('activity_thread.html?' + thread.id, 'thread-' + thread.id);
    });
    
    return thread_dom;
}

function threadListLoad(data) {
//    console.log(data);
    loadingHide();
    for (thread of data) {
        thread_list.append(threadMakeDom(thread));
    }
    footer.show();
}

if (typeof fid == 'undefined')
    fid = -1;
if (typeof page_now == 'undefined')
    page_now = 1;
thread_list.empty();

function dataSet(mfid, mpage) {
    fid = mfid;
    page_now = mpage;
}

function threadGetNew() {
    page_now += 1;
    footer.hide();
    loadingShow(loading_box2);
    parent.window.nmbGetThreadList(fid, page_now).then(d => {
        threadListLoad(d);
        footer.show();
        loadingHide(loading_box2);
    });
}