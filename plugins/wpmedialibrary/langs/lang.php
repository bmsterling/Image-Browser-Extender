<?php
// escape text only if it needs translating
if( !function_exists('ee_mce_escape') ){
	function ee_mce_escape($text) {
		global $language;
		
		if ( 'en' == $language ) return $text;
		else return js_escape($text);
	}
}
$strings = 'tinyMCE.addI18n("' . $mce_locale . '.wpmedialibrary_dlg",{
	title : "Insert Multiple Images",
	prev : "Previous set",
	next : "Next Set",
	note : "Note: You will not loose your selected images by browsing next set or previous set"
});

tinyMCE.addI18n("' . $mce_locale . '.wpmedialibrary",{
	desc : "Advanced Image Insert"
});

';
?>
