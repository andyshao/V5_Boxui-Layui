/**
 * Created by lauxinyi on 2017/11/3.
 */
/*!
碎片管理
*/
jQuery.fn.Blocker = function (options) {
    var init = function () {
        //$("a").attr('href', '#');
        //$("a").click(function (event) {
        //    event.preventDefault();
        //});
        $("input").attr('onclick', '');
        $(".blocker").each(function () {
            var $warp = $('<div class="blocker-iframe"></div>');
            me = $(this);
            var golab_html = "";
            me.mousemove(function () {
                if ($warp.html() == "") {
                    var htmlContent, blockerid, blockername, blockerdesc;
                    blockerid = $(this).attr("blockerid");
                    blockername = $(this).attr("blockername");
                    blockerdesc = $(this).attr("blockerdesc");
                    if (blockerid == undefined || blockerid == "undefined" || blockerid == null) {
                        blockerid = "碎片ID为空!";
                    }
                    if (blockername == undefined || blockername == "undefined" || blockername == null) {
                        blockername = "碎片名称为空!";
                    }
                    if (blockerdesc == undefined || blockerdesc == "undefined" || blockerdesc == null) {
                        blockerdesc = "碎片说明为空!";
                    }
                    //htmlContent = "【模块ID为】" + blockerid;
                    //htmlContent += "<br/>【模块名称】" + blockername;
                    htmlContent = "【模块名称】" + blockername;
                    htmlContent += "<br/>【模块描述】" + blockerdesc;
                    var height = $(this).height();
                    var width = $(this).width();
                    var top = $(this).offset().top;
                    var left = $(this).offset().left;
                    $(this).css("z-index", "99");
                    var zindex = 100;
                    $warp.css("height", height).css("width", width).css("left", left).css("top", top).css("z-index", zindex).css("position", "absolute").css("opacity", "0.7").click(function () {
                        OpenEditor(blockerid);
                    }).mouseleave(function () {
                        $warp.remove();
                        $warp.html("");
                    }).addClass("blockeriframe").html(htmlContent);
                    $(document.body).append($warp);
                }
            });
        });
    };
    var OpenEditor = function (blockerid) {
        var editPage = request.QueryString("editpage");
        var $dialog = $("<div class='jquery-dialog'></div>");
        var params = $.param({
            action: "edit_blocker",
            blockerid: blockerid,
            editPage: editPage
        });
        $dialog.dialog({
            height: 500,
            width: 900,
            modal: true,
            resizable: false,
            title: "模块编辑",
            open: function (a, b) {
                $(this).html("<iframe id='center' src='/admin/blocker/admin_blockeredit.aspx?" + params + "' scrolling='no' frameborder='0' width='100%' height='100%'></iframe>");
            }
        });
    };
    return this.each(function () {
        var _init = init();
    });
};

function CloseEditor(BlockerID) {
    if ($(".jquery-dialog") != undefined) {
        $(".jquery-dialog").dialog("close");
        $(".jquery-dialog").remove();
    }
}

var request = {
    QueryString: function (val) {
        var uri = window.location.search;
        var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
    },
    QueryStrings: function () {
        var uri = window.location.search;
        var re = /\w*\=([^\&\?]*)/ig;
        var retval = [];
        while ((arr = re.exec(uri)) != null)
            retval.push(arr[0]);
        return retval;
    },
    setQuery: function (val1, val2) {
        var a = this.QueryStrings();
        var retval = "";
        var seted = false;
        var re = new RegExp("^" + val1 + "\=([^\&\?]*)$", "ig");
        for (var i = 0; i < a.length; i++) {
            if (re.test(a[i])) {
                seted = true;
                a[i] = val1 + "=" + val2;
            }
        }
        retval = a.join("&");
        return "?" + retval + (seted ? "" : (retval ? "&" : "") + val1 + "=" + val2);
    }
};