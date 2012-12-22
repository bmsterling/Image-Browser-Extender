(function ($, tinyMCEPopup) {
    tinyMCEPopup.requireLangPack();
    
    var
    imagegrouplist, prev, next,
    set             = 0,
    currentLimit    = 42,
    cmax            = 42,
    offset          = 0,
    editor          = tinyMCEPopup.editor,
    wpmedialibrary  = {
        init : function () {
            moreInit();
            var f = document.forms[0];
            try{
                // Get the selected contents as text and place it in the input
                f.someval.value = editor.selection.getContent({format : 'text'});
                f.somearg.value = tinyMCEPopup.getWindowArg('some_custom_arg');
            }catch(e) {}
        },

        insert : function () {
            var the_return = process();
            // Insert the contents from the input into the document
            editor.execCommand('mceInsertContent', false, the_return);
            tinyMCEPopup.close();
        }
    },

    the_link = function (url, img, title) {
        return '<a href="' + url + '" title="' + title + '">' + img + '</a>';
    },

    the_image = function (src, width, alt) {
        return '<img src="' + src + '" width="' + width + '" alt="' + alt + '"/>';
    },

    the_p = function (txt) {
        return '<p>' + txt + '</p>';
    },
    
    process = function () {
        var 
            insertFormat    = $('input[name=insertFormat]').filter(":checked").val(),
            insertSize      = $('input[name=insertSize]').filter(":checked").val(),
            insertStructure = $('input[name=insertStructure]').filter(":checked").val(),
            insertCols      = $('input[name=insertCols]').filter(":checked").val(),
            selected        = $('#imagegrouplist li.ui-selected'),
            the_return      = '';
        
        insertCols = parseInt(insertCols,10);
        
        switch (insertFormat) {
            case "single":
                switch (parseInt(insertStructure,10)) {
                    case 0:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            the_return += the_p(el.post_title);
                            the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                            the_return += the_p(el.post_excerpt);
                        });
                        break;
                    case 1:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            the_return += the_p(el.post_title);
                            the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                            the_return += the_p(el.post_content);
                        });
                        break;
                    case 2:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            the_return += the_p(el.post_title);
                            the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                        });
                        break;
                    case 3:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                        });
                        break;
                }
                break;
            case "singleWLink": 
                switch( parseInt(insertStructure,10) ) {
                    case 0:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            the_return += the_p(el.post_title);
                            var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                            the_return += the_link(el.url, tmp, el.post_title);
                            the_return += the_p(el.post_excerpt);
                        });
                        break;
                    case 1:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            the_return += the_p(el.post_title);
                            var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                            the_return += the_link(el.url, tmp, el.post_title);
                            the_return += the_p(el.post_content);
                        });
                        break;
                    case 2:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            the_return += the_p(el.post_title);
                            var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                            the_return += the_link(el.url, tmp, el.post_title);
                        });
                        break;
                    case 3:
                        selected.each(function () {
                            var jel = $(this);
                            var el = jel.get(0);
                            var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                            the_return += the_link(el.url, tmp, el.post_title);
                        });
                        break;
                    }
                break;
            case "allWTable": 
                    var j = 1;
                    $tr = '';
                    the_return += '<table border="0" cellspacing="0" cellpadding="0">';
                    $i = 1;
                    $cols = insertCols;
                    $total = selected.size();
                    selected.each(function () {
                        var jel = $(this);
                        var el = jel.get(0);

                        if (($i % $cols) === 1) {
                            the_return += "<tr>";
                        }
                        
                        the_return += "<td>";
                        switch( parseInt(insertStructure,10) ) {
                            case 0:
                                the_return += the_p(el.post_title);
                                the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                                the_return += the_p(el.post_excerpt);
                                break;
                            case 1:
                                the_return += the_p(el.post_title);
                                the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                                the_return += the_p(el.post_content);
                                break;
                            case 2:
                                the_return += the_p(el.post_title);
                                the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                                break;
                            case 3:
                                the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
                                break;
                        }
                        the_return += "</td>";
            
                        if (($i % $cols) === 0) {
                            the_return += "</tr>";
                        }
                        else if ($i == $total) {
                            //echo $cols-($total%$cols);
                            for ($j = 1; $j <= ($cols-($total%$cols)); $j++) {
                                the_return += "<td>&nbsp;</td>";
                            }
                            the_return += "</tr>";			
                        }
                        $i++;
                    });
                    the_return += '</table>';
                break;
            case "allWTableLink": 
                    var j = 1;
                    $tr = '';
                    the_return += '<table border="0" cellspacing="0" cellpadding="0">';
                    $i = 1;
                    $cols = insertCols;
                    $total = selected.size();
                    selected.each(function () {
                        var 
                            el  = this,
                            jel = $(this),
                            tmp;

                        if (($i % $cols) === 1) {
                            the_return += "<tr>";
                        }
                        
                        the_return += "<td>";
                        switch (parseInt(insertStructure,10)) {
                            case 0:
                                the_return += the_p(el.post_title);
                                tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                                the_return += the_link(el.url, tmp, el.post_title);
                                the_return += the_p(el.post_excerpt);
                                break;
                            case 1:
                                the_return += the_p(el.post_title);
                                tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                                the_return += the_link(el.url, tmp, el.post_title);
                                the_return += the_p(el.post_content);
                                break;
                            case 2:
                                the_return += the_p(el.post_title);
                                tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                                the_return += the_link(el.url, tmp, el.post_title);
                                break;
                            case 3:
                                tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);

                                the_return += the_link(el.url, tmp, el.post_title);
                                break;
                        }
                        the_return += "</td>";
            
                        if (($i % $cols) === 0) {
                            the_return += "</tr>";
                        }
                        else if ($i == $total) {
                            //echo $cols-($total%$cols);
                            for ($j = 1; $j <= ($cols-($total%$cols)); $j++) {
                                the_return += "<td>&nbsp;</td>";
                            }
                            the_return += "</tr>";
                        }
                        $i++;
                    });
                    the_return += '</table>';
                break;
        }
        
        return the_return;
    },
    
    theAjaxCall = function () {
        $('#loading').show();
        $.ajax({
            url : "/wp-admin/admin-ajax.php",// ajaxurl, 
            data : {browse:1, limit:currentLimit, offset: offset, action : 'ibe_action'},
            dataType : 'json',
            success : function(data) {
                if ( data.length === 0 ) {
                    $("#loading").text('No more photos');
                    next.attr('disabled','disabled');
                    offset -= cmax;
                    setTimeout(function () {
                        $("#loading").fadeOut().text('Loading...');			
                    }, 3000);
                    return false;
                }
                $('li:not(.ui-selected)',imagegrouplist).remove();
                $.each(data, function(i) {
                    var li = $('<li>').appendTo(imagegrouplist)
                    .click(function () {$(this).toggleClass("ui-selected");});
                    li.append('<img src="'+data[i]['thumbnail'][0]+'"/>');

                    var thisLi = li.get(0);
                    thisLi.post_title = data[i].post_title;
                    thisLi.post_excerpt = data[i].post_excerpt;
                    thisLi.post_content = data[i].post_content;
                    thisLi.ID = data[i].ID;
                    thisLi.post_name = data[i].post_name;
                    thisLi.thumbnail = data[i].thumbnail;
                    thisLi.intermediate = data[i].intermediate;
                    thisLi.url = data[i].url;
                    thisLi.full = Array(data[i].url);
                });
                imagegrouplist.selectable({distance:1});
                $('#loading').hide();
                
                if ( set === 0 ) {
                    prev.attr('disabled','disabled');
                }
                else{
                    prev.removeAttr('disabled'); 
                }
            }
        });
    },

    moreInit = function () {
        imagegrouplist = $("#imagegrouplist");
        next = $("#next");
        prev = $("#prev");
        theAjaxCall();
        
        prev.click(function () {
            var selected = $('.ui-selected', imagegrouplist).size();
            currentLimit -= selected;
            offset -= cmax - selected;
            theAjaxCall();
            set--;
            return false;
        });
        
        next.click(function () {
            var selected = $('.ui-selected', imagegrouplist).size();
            currentLimit -= selected;
            offset += cmax - selected;
            theAjaxCall();
            set++;
            return false;
        });
        
        $('#col4').css('opacity',0);
        
        $('input[name=insertFormat]')
        .click(function () {
            var v = $(this).val();
            if ( v === 'allWTableLink' || v === 'allWTable' ) {
                $('#col4').css('opacity',100);
            }
            else{
                $('#col4').css('opacity',0);
            }
        });
    };
    
    tinyMCEPopup.onInit.add(wpmedialibrary.init, wpmedialibrary);
    
    window.wpmedialibrary = wpmedialibrary;
})(jQuery, tinyMCEPopup);