/*
 * @Author: HMJ
 * @Date:   2016-10-12 12:41:50
 * @Last Modified by:   HMJ
 * @Last Modified time: 2016-10-12 16:39:59
 */
$(document).ready(function() {
    refreshNews();
});

function refreshNews() {
    $.ajax({
        url: './newsIndexServlet',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            $.each(data, function(index, item) {
                var $article = $('article');
                var $lists = $('<ul></ul>').addClass('news-lists').prependTo(
                    $article);
                $lists.empty();

                var $list = $('<li></li>').addClass('news-list').prependTo(
                    $lists);
                var $newsImg = $('<div></div>').addClass('newsimg').appendTo(
                    $list);
                var $img = $('<img>').attr({
                    'src': item.newsImg,
                }).appendTo($newsImg);
                var $newsContent = $('<div></div>').addClass('newscontent')
                    .appendTo($list);
                var $h1 = $('<h1></h1>').html(item.newsTitle).appendTo(
                    $newsContent);
                var $p = $('<p></p>').appendTo($newsContent);
                var $newsTime = $('<span></span>').addClass('newstime').html(
                    item.newsTime).appendTo($p);
                var $newsSrc = $('<span></span>').addClass('newssrc').html(
                    item.newsSrc).appendTo($p);
            })
        }
    });
}
