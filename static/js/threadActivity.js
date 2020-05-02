loadings = ["友谊魔法加载中","WTMSB","( 察ω觉)","(　^ω^)那你好棒棒哦","劲爆大象部落","hafu hafu","人，是会思考的芦苇——帕斯卡，《思想录》","开放包容，理性客观，有事说事，就事论事","我赵日天并不服！","【版规】晒妹会被SAGE哟，晒姐酌情","来杯淡定红茶（ ´_ゝ`）","诸君→朱军→董卿","仙客来根雕","保安！病栋里的病人跑出来了！","小刘，6床加大用药量","刘星打完夏东海，满头大汉","不要误会，我不是针对你，我是说……","旅馆大酬宾","Duang的一下，就加载出来了","没时间解释了！快上车！","你不能让我加载，我就马上加载","想歪的自重，这是芦苇！","UCCU等待加载的样子真是丑陋 ﾟ∀ﾟ)σ","【版规】带上家人的嘴臭会被碎饼干哟","食我大雕辣(つд⊂)","总有一天你们会看着我画的东西撸！","听说,下雨天三文鱼和叉烧酱更配哦","冷漠得肥宅","我淡淡地说，这是信仰","这里是独裁岛，不爽不要玩(＾o＾)ﾉ","可是朱云心里明白","是在下输了（抱拳）","小姐，请问有没有卖半岛鸡盒","服务员，来一份手撕逼","今天岛上没有智障","人生最好的五年，我都干什么了啊！","为二次元献出心脏！","三管不过冈","事到如今就别再给我装什么正义人士了","你们整天鉴婊鉴婊能找到媳妇吗","为我们的友谊干杯","在下弗了（抱拳）","注意（白）字多义","为了照顾智商不如蟑螂的虫族选手","当你刷A岛很卡时，你很火大","貳叁叁叁","齐齐蛤尔σ`∀´)（注意“蛤”字多义）","我是理性的机器","天下尴共十尬，君独占八尬","这个月A岛多了26只白羊，你有什么头猪吗？","实际上上一周我都在外地并且","我坠入黑暗，没有了光","君日本语本当上手","真是自私的神啊","A岛土著 八辈渔民 大海血脉","领导夹菜我转桌","重生之我在等待加载","微信公众号“芦苇娘的胖次”欢迎关注~","人类的本质是复读机","在A岛，只有bog在抓bog","我狗比酱今日便是要打爆你喵喵酱的狗头","人民群众喜闻乐见，你算老几","你走了地球不转了怎么办呀","【版规】禁止发表商业广告、推广链接和宣传QQ群","【版规】使用本网站是一种特权而不是权利","【版规】管理员有权片面决定删除或保留留言","【版规】禁止一切涉政涉黄涉毒涉黑等违法内容","Don't come here","光来！","早安的说！","大臭猪来咯！","妈传菜赚了50","zbzywcnm","硅基猿猴会大闹电子天宫吗","举高高(ノﾟ∀ﾟ)ノ","呐呐呐","如果想找个平和的地方取取暖，就试着光临下围炉版吧(*´ω`*)"]

loading = $('.nmb-loading');
loading_box = $('.nmb-loading-box');
loading_box2 = $('.nmb-loading-box2');
footer = $('.nmb-footer');
footer_text = $('.nmb-footer-text');
footer.hide();

function threadLoadingShow(mloading) {
    if (!mloading)
        mloading = loading_box;
    loading.text(loadings[Math.round(Math.random() * loadings.length)]);
    mloading.show();
    mdui.mutation();
}
function threadLoadingHide(mloading) {
    if (!mloading)
        mloading = loading_box;
    mloading.hide();
}

tid = 0;
page_now = 1;
page_total = 1;

function isAtBottom() {
	return (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 1);
}

float_footer = $('.nmb-footer-float');

function threadActivity() {
    $('.nmb-btn-back').click(function() {
        parent.window.iframeClose();
    });
    
    $(document).ready(function() {
        tid = window.location.search.slice(1);
        threadLoadingShow();
        page_now = 0;
        replysGetNew();
    });
    
    $('.nmb-toolbar').click(function() {
        page_now -= 1;
        $(replys_dom).empty();
        replysGetNew();
    });
    
    
    height_last = $(document).scrollTop();
    
    window.onscroll = function () {
        if (isAtBottom()) {
            replysGetNew();
        }
        var height_now = $(document).scrollTop();
        if (height_now > height_last) {
            // 下滑
            float_footer.hide();
        }
        if (height_now < height_last) {
            // 上滑
            float_footer.show();
        }
        height_last = height_now;
    }
}

reply_dom_t = $('\
<div class="nmb-reply" style="padding: 10px">\
    <div class="" style="display: flex; display: -webkit-flex; width: 100%; flex-wrap: nowrap; justify-content: space-between;">\
        <div>\
            <div class="nmb-card-userid mdui-typo-body-1" style="display: inline-block;">ATM</div>\
            <div class="nmb-card-time mdui-typo-caption-opacity" style="display: inline-block;">4/20 12:11:21</div>\
        </div>\
        <div class="nmb-card-reply-rid mdui-typo-caption-opacity">N0.99991</div>\
    </div>\
    <br/>\
    <div class="nmb-card-content-box">\
        <div class="nmb-card-content-img" style="float: left; margin: 2%"><img class="nmb-card-img" src="" style="max-width: 200px; display: none;"></div>\
        <div class="nmb-card-content-text mdui-typo-body-1-opacity" align="left"></div>\
    </div>\
</div>\
<div class="mdui-divider" style="width: 100%"></div>');
replys_dom = $('.nmb-replys');
thread_userid = '';

// 直接把串传进来也行
function replyMakeDom(reply) {
    var reply_dom = $(reply_dom_t).clone(false, true);
    $('.nmb-card-userid', reply_dom).html(reply.userid);
    if (reply.userid == thread_userid)
        $('.nmb-card-userid', reply_dom).css('font-weight', '600');
    if (reply.admin != 0)
        $('.nmb-card-userid', reply_dom).css('color', 'red');
    $('.nmb-card-time', reply_dom).html(reply.now);
    $('.nmb-card-reply-rid', reply_dom).html('No.' + reply.id);
    $('.nmb-card-content-text', reply_dom).html(reply.content);
    if (reply.img) {
        var url_img = SETTINGS.CDN_THUMB + reply.img + reply.ext;
        $('.nmb-card-img', reply_dom).attr('src', url_img);
        $('.nmb-card-img', reply_dom).click(function() {
            parent.window.iframeNew('static/activity_image.html?' + SETTINGS.CDN_IMG + reply.img + reply.ext, 'img-' + reply.img.slice(reply.img.indexOf('/')+1));
        });
        $('.nmb-card-img', reply_dom).show();
        $('.nmb-card-img', reply_dom).load(function() {
            $('.nmb-card-content-box', reply_dom).css('min-height', $('.nmb-card-content-img', reply_dom).height() * 1.1);
        });
    }
    return reply_dom;
}

function fillThread(thread, hide_head) {
    page_total = Math.floor(thread.replyCount/20)+1;
    if (!hide_head)
        $(replys_dom).append(replyMakeDom(thread));
    for (var reply of thread.replys) {
        if (reply.id == '9999999')
            continue;
        $(replys_dom).append(replyMakeDom(reply));
    }
}

function replysGetNew() {
    if (page_now == page_total) {
        footer_text.text('已是最后一页');
        return;
    }
    page_now += 1;
    parent.window.nmbGetTheard(tid, page_now).then(d => {
        thread_userid = d.userid;
        $('.nmb-subtitle').text('>>No.' + tid);
        if (page_now == 1)
            fillThread(d, false);
        else
            fillThread(d, true);
        threadLoadingHide();
        footer.show();
    });
}

