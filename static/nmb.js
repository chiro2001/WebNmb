SETTINGS = {
    HOST : 'http://localhost',
    API_GET_FORUM_LIST : HOST + '/getForumList/',
    API_THREAD : HOST + '/thread/',
    API_SHOWF : HOST + '/showf/',
    API_SEARCH : HOST + '/Search/'
};

function nmbSetup(data) {
    SETTINGS = data;
}

function nmbSetForumList(data) {
    console.log(data);
}

function nmbForumList() {
    $.ajax({
        url: SETTINGS.API_GET_FORUM_LIST
    }).then(d => {
        try {
            var data = JSON.parse(d);
        } catch (e) {
            console.log(e);
        }
        nmbSetForumList(data);
    })
}