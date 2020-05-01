drawer = new mdui.Drawer('#main-drawer');
function main() {
    window.onresize = iframes_resize;
    $(document).ready(iframes_resize);
    
    iframeNew('activity_main.html', 'main');
    
    $('.nmb-game-icon').click(() => {
        iframeNew('activity_game.html', 'game');
        new mdui.Drawer('#main-drawer').close();
    })
}
