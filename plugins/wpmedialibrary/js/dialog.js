tinyMCEPopup.requireLangPack();

var wpmedialibrary = {
	init : function() {
		moreInit();
		var f = document.forms[0];
try{
		// Get the selected contents as text and place it in the input
		f.someval.value = tinyMCEPopup.editor.selection.getContent({format : 'text'});
		f.somearg.value = tinyMCEPopup.getWindowArg('some_custom_arg');
}catch(e){}
	},

	insert : function() {
		var the_return = process();
		// Insert the contents from the input into the document
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, the_return);
		tinyMCEPopup.close();
	}
};

the_link = function(url, img, title){
	return '<a href="'+url+'" title="'+title+'">'+img+'</a>';
};

the_image = function(src, width, alt){
	return '<img src="'+src+'" width="'+width+'" alt="'+alt+'"/>';
};

the_p = function(txt){
	return '<p>'+txt+'</p>';
};

tinyMCEPopup.onInit.add(wpmedialibrary.init, wpmedialibrary);
var imagegrouplist, prev, next;
var set = 0;
var currentLimit = 42;
var cmax = 42;
var offset = 0;

moreInit = function(){
	imagegrouplist = jQuery("#imagegrouplist");
	next = jQuery("#next");
	prev = jQuery("#prev");
	theAjaxCall();
	
	prev.click(function(){
		var selected = jQuery('.ui-selected', imagegrouplist).size();
		currentLimit -= selected;
		offset -= cmax - selected;
		theAjaxCall();
		set--;
		return false;
	});
	
	next.click(function(){
		var selected = jQuery('.ui-selected', imagegrouplist).size();
		currentLimit -= selected;
		offset += cmax - selected;
		theAjaxCall();
		set++;
		return false;
	});
	
	jQuery('#col4').css('opacity',0);
	
	jQuery('input[name=insertFormat]')
	.click(function(){
		var v = jQuery(this).val();
		if( v == 'allWTableLink' || v == 'allWTable' ){
			jQuery('#col4').css('opacity',100);
		}
		else{
			jQuery('#col4').css('opacity',0);
		};
	});
};

theAjaxCall = function(){
	jQuery('#loading').show();
	jQuery.ajax({
		url : masterUrl,
		data : {browse:1, limit:currentLimit, offset: offset},
		dataType : 'json',
		success : function(data){
			if ( data.length == 0 ){
				jQuery("#loading").text('No more photos');
				next.attr('disabled','disabled');
				offset -= cmax;
				setTimeout(function(){
					jQuery("#loading").fadeOut().text('Loading...');			
				}, 3000);
				return false;
			};
			jQuery('li:not(.ui-selected)',imagegrouplist).remove();
			jQuery.each(data, function(i){
				var li = jQuery('<li>').appendTo(imagegrouplist)
				.click(function(){jQuery(this).toggleClass("ui-selected");});
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
			jQuery('#loading').hide();
			
			if( set == 0 ){
				prev.attr('disabled','disabled');
			}
			else{
				prev.removeAttr('disabled'); 
			}
		}
	});
};

process = function(){
		var insertFormat = jQuery('input[name=insertFormat]').filter(":checked").val();
		var insertSize = jQuery('input[name=insertSize]').filter(":checked").val();
		var insertStructure = jQuery('input[name=insertStructure]').filter(":checked").val();
		var insertCols = jQuery('input[name=insertCols]').filter(":checked").val();
		insertCols = parseInt(insertCols);
		var selected = jQuery('#imagegrouplist li.ui-selected');
		var the_return = '';
		
		switch( insertFormat ){
			case "single":
				switch( parseInt(insertStructure) ){
					case 0:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							the_return += the_p(el.post_title);
							the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
							the_return += the_p(el.post_excerpt);
						});
						break;
					case 1:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							the_return += the_p(el.post_title);
							the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
							the_return += the_p(el.post_content);
						});
						break;
					case 2:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							the_return += the_p(el.post_title);
							the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
						});
						break;
					case 3:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							the_return += the_image(el[insertSize][0],el[insertSize][1],el.post_title);
						});
						break;
				};
				break;
			case "singleWLink": 
				switch( parseInt(insertStructure) ){
					case 0:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							the_return += the_p(el.post_title);
							var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
							the_return += the_link(el.url, tmp, el.post_title);
							the_return += the_p(el.post_excerpt);
						});
						break;
					case 1:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							the_return += the_p(el.post_title);
							var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
							the_return += the_link(el.url, tmp, el.post_title);
							the_return += the_p(el.post_content);
						});
						break;
					case 2:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							the_return += the_p(el.post_title);
							var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
							the_return += the_link(el.url, tmp, el.post_title);
						});
						break;
					case 3:
						selected.each(function(){
							var jel = jQuery(this);
							var el = jel.get(0);
							var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
							the_return += the_link(el.url, tmp, el.post_title);
						});
						break;
					};
				break;
			case "allWTable": 
					var j = 1;
					$tr = '';
					the_return += '<table border="0" cellspacing="0" cellpadding="0">';
					$i = 1;
					$cols = insertCols;
					$total = selected.size();
					selected.each(function(){
						var jel = jQuery(this);
						var el = jel.get(0);

						if(($i % $cols) == 1){
							the_return += "<tr>";
						};
						
						the_return += "<td>";
						switch( parseInt(insertStructure) ){
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
						};
						the_return += "</td>";
			
						if(($i % $cols) == 0){
							the_return += "</tr>";
						}
						else if($i == $total){
							//echo $cols-($total%$cols);
							for($j = 1; $j <= ($cols-($total%$cols)); $j++){
								the_return += "<td>&nbsp;</td>";
							};
							the_return += "</tr>";			
						};
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
					selected.each(function(){
						var jel = jQuery(this);
						var el = jel.get(0);

						if(($i % $cols) == 1){
							the_return += "<tr>";
						};
						
						the_return += "<td>";
						switch( parseInt(insertStructure) ){
							case 0:
								the_return += the_p(el.post_title);
								var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
								the_return += the_link(el.url, tmp, el.post_title);
								the_return += the_p(el.post_excerpt);
								break;
							case 1:
								the_return += the_p(el.post_title);
								var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
								the_return += the_link(el.url, tmp, el.post_title);
								the_return += the_p(el.post_content);
								break;
							case 2:
								the_return += the_p(el.post_title);
								var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
								the_return += the_link(el.url, tmp, el.post_title);
								break;
							case 3:
								var tmp = the_image(el[insertSize][0],el[insertSize][1],el.post_title);
								the_return += the_link(el.url, tmp, el.post_title);
								break;
						};
						the_return += "</td>";
			
						if(($i % $cols) == 0){
							the_return += "</tr>";
						}
						else if($i == $total){
							//echo $cols-($total%$cols);
							for($j = 1; $j <= ($cols-($total%$cols)); $j++){
								the_return += "<td>&nbsp;</td>";
							};
							the_return += "</tr>";			
						};
						$i++;
					});
					the_return += '</table>';
				break;
		};
		
		return the_return;
};