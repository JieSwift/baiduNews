/*
 * @Author: HMJ
 * @Date:   2016-10-12 16:36:20
 * @Last Modified by:   HMJ
 * @Last Modified time: 2016-10-14 22:47:32
 */
$(document).ready(
    function() {
        var $tbody = $('#news-table tbody');
        refreshNews();
        showHome();

        function showHome(){
            $('.addNews').click(function(event) {
                $('.newsEdit').removeClass('hidden');
                $('.newsContent').addClass('hidden');
            });
            $('.home').click(function(event) {
                 $('.newsContent').removeClass('hidden');
                $('.newsEdit').addClass('hidden');
            });
        }

        $('#submit-news')
            .click(
                function(e) {
                    e.preventDefault();
                    // 判断表单是否填写
                    if ($('#newsTitle').val() === "" || $('#newsType').val() === "" || $('#newsSrc').val() === "" || $('#newsTime').val() === "" || $('#newsImg').val() === "") {
                        if ($('#newsTitle').val() === "") {
                            $('#newsTitle').parent().addClass(
                                'has-error');
                        } else {
                            $('#newsTitle').parent().removeClass(
                                'has-error');
                        }
                        if ($('#newsType').val() === "") {
                            $('#newsType').parent().addClass(
                                'has-error');
                        } else {
                            $('#newsType').parent().removeClass(
                                'has-error');
                        }
                        if ($('#newsSrc').val() === "") {
                            $('#newsSrc').parent().addClass(
                                'has-error');
                        } else {
                            $('#newsSrc').parent().removeClass(
                                'has-error');
                        }
                        if ($('#newsTime').val() === "") {
                            $('#newsTime').parent().addClass(
                                'has-error');
                        } else {
                            $('#newsTime').parent().removeClass(
                                'has-error');
                        }
                        if ($('#newsImg').val() === "") {
                            $('#newsImg').parent().addClass(
                                'has-error');
                        } else {
                            $('#newsImg').parent().removeClass(
                                'has-error');
                        }
                    } else {
                        var jsonNews = {
                            newsTitle: $('#newsTitle').val(),
                            newsType: $('#newsType').val(),
                            newsSrc: $('#newsSrc').val(),
                            newsTime: $('#newsTime').val(),
                            newsImg: $('#newsImg').val(),
                        };
                        $.ajax({
                            url: './newsAddServlet',
                            type: 'post',
                            data: {
                                'jsonNews': JSON
                                    .stringify(jsonNews)
                            },
                            dataType: 'json',
                            success: function(data) {
                                refreshNews();
                            }
                        });
                    }
                });

        var deleteId = null;
        $tbody.on('click', '.btndelete', function() {
            $('#deleteModal').modal('show');
            deleteId = $(this).next('.inputId').val();
            // deleteId = $(this).parent().prevAll().eq(5).html();
        });

        $('#deleteModal #confirmDelete').click(function(e) {
            if (deleteId) {
                $.ajax({
                    url: './newsDeleteServlet',
                    type: 'get',
                    dataType: 'text',
                    data: {
                        'newsId': deleteId
                    },
                    success: function(data) {
                        $('#deleteModal').modal('hide');
                        refreshNews();
                    }
                });
            }

        });

        var updateId = null;
        $tbody.on('click', '.btnupdate', function() {
            updateId = $(this).nextAll().eq(1).val();
            $('#updateModal').modal('show');
            $.ajax({
                url: './newsQueryByIdServlet',
                type: 'get',
                dataType: 'json',
                data: {
                    'newsId': updateId
                },
                success: function(data) {
                    $('#unewsTitle').val(data.newsTitle);
                    $('#unewsType').val(data.newsType);
                    $('#unewsSrc').val(data.newsSrc);
                    $('#unewsImg').val(data.newsImg);
                    $('#unewsTime').val(data.newsTime);
                }
            });
        });
        //更新新闻
        $('#updateModal #confirmUpdate').click(function(e) {
            if (updateId) {
                var ujsonNews = {
                    newsTitle: $('#unewsTitle').val(),
                    newsType: $('#unewsType').val(),
                    newsSrc: $('#unewsSrc').val(),
                    newsTime: $('#unewsTime').val(),
                    newsImg: $('#unewsImg').val(),
                    id: updateId
                };
                $.ajax({
                    url: './newsUpdateServlet',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'ujsonNews': JSON
                            .stringify(ujsonNews)
                    },
                    success: function(data) {
                        $('#updateModal').modal('hide');
                        refreshNews();
                    }
                });
            }

        });

        function refreshNews() {
            $tbody.empty();
            $.ajax({
                url: './newsIndexServlet',
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    var id = 1;
                    $.each(data, function(index, item) {
                        var $tid = $('<td>').html(id++);
                        var $ttitle = $('<td>').html(item.newsTitle);
                        var $ttype = $('<td>').html(item.newsType);
                        var $tsrc = $('<td>').html(item.newsSrc);
                        var $ttime = $('<td>').html(item.newsTime);
                        var $timg = $('<td>').html(item.newsImg);
                        var $inputId = $('<input>').val(item.id).hide()
                            .addClass('inputId');
                        var $td = $('<td>');
                        var $btnupdate = $('<button>').addClass(
                            'btn btn-primary btn-xs btnupdate').html(
                            '修改');
                        var $btndelete = $('<button>').addClass(
                            'btn btn-danger btn-xs btndelete').html(
                            '删除');
                        $td.append($btnupdate, $btndelete, $inputId);
                        var $tRow = $('<tr>');
                        $tRow.append($tid, $ttitle, $ttype, $tsrc, $ttime,
                            $timg, $td);
                        $tbody.append($tRow);
                    });
                }
            });
        }
    });
