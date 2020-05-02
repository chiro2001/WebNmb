drawer = new mdui.Drawer('#main-drawer');

function drawerClose() {drawer.close();}
function drawerOpen() {drawer.open();}

function main() {
    window.onresize = iframes_resize;
    $(document).ready(iframes_resize);
    
    iframeNew('activity_main.html', 'main');
    
    $('.nmb-icon-game').click(() => {
        iframeNew('activity_game.html', 'game');
        drawerClose();
    });
    
    $('iframe.nmb-tag-main').ready(function() {
        // 加载forums列表
        nmbGetForumList().then(d => {
            nmbSetForumList(d);
        }).then(function() {
            // 找最上面的（时间线）
            if (forums.length == 0)
                return;
//            window.frames[0].dataSet(forums[1].id, 1);
            window.frames[0].fid = forums[1].id;
            window.frames[0].page_now = 1;
            nmbGetThreadList(forums[1].id).then(d => {
                $('.nmb-tag-' + window.frames[0].name).contents().find('.nmb-subtitle').text(forums[1].name);
                nmbSetThreadList(d);
            });
        });
    });
}
