iframes_resize = function() {
    $('#nmb-iframes').height($('html').height() - 3);
};
iframes_box = $('#nmb-iframes');

//储存iframes，单个iframe储存结构：tag, selector, status
iframe_stack = new Stack();

function iframesUpdateStatus() {
    // 显示队头
    for (iframe of iframe_stack.data)
        iframe.selector.hide();
    if (iframe_stack.isempty())
        return;
//    iframe_stack.top().selector.show();
    iframe_stack.top().selector.fadeIn('fast');
}

function iframeShow(iframe) {
    iframe_stack.push(iframe);
    iframesUpdateStatus();
}

function iframeNew(url, tag) {
    // 必须要tag参数。
    if (!tag)
        return;
    var html_iframe = $('<iframe name="' + tag + '" class="nmb-iframe nmb-tag-' + tag + '" src=' + url + ' style="width: 100%; height: 100%; border: 0px">')
    iframes_box.append(html_iframe);
    
    iframe = {
        'tag': tag,
        'selector': $('.nmb-tag-' + tag, $('#nmb-iframes')),
    };
    iframeShow(iframe);
    
    mdui.mutation();
}

function iframeClose(tag) {
    if (iframe_stack.isempty())
        return false;
    var iframe = iframe_stack.top();
    iframe.selector.fadeOut('fast');
    iframe.selector.remove();
    iframe_stack.pop();
    iframesUpdateStatus();
    if (iframe_stack.isempty())
        return true;
    return true;
}
