<?php
/**
	Plugin Name: Image Browser Extender
	Plugin URI: http://benjaminsterling.com/wordpress-plugins/wordpress-image-browser-extender/
	Description: Extends the features of the rich text editor for Wordpress by adding a new button that will allow you to easily browse all you image attachments
	Author: Benjamin Sterling
	Version: 0.3
	Author URI: http://benjaminsterling.com
*/

/**
 *	Load WP-Config File If This File Is Called Directly
 */
if (!function_exists('add_action')) {
	require_once('../../../wp-load.php');
	require_once('../../../wp-admin/includes/media.php');
} //  end : if (!function_exists('add_action'))

if( isset( $_GET['browse'] ) && !empty( $_GET['browse'] ) ){
	include_once("JSON.php");
	$json = new JSON;
	
	$offset = ($_GET['offset']) ? $_GET['offset'] : 0;
	$max_per_page = ($_GET['limit']) ? $_GET['limit'] : 42;
	$limit_args = sprintf("LIMIT %d, %d", $offset, $max_per_page);
	$sql = "SELECT 
				post_title, post_excerpt, 
				post_content, ID, 
				post_name 
			FROM $wpdb->posts 
			WHERE post_type = 'attachment' 
			AND post_mime_type LIKE '%image/%' 
			$limit_args";

	$attachment_posts = $wpdb->get_results($sql, OBJECT);

	if( $attachment_posts ){
		foreach ($attachment_posts as $a => $v ){
			$thumbnail = wp_get_attachment_image_src($v->ID, 'thumbnail', false, true);
			$attachment_posts[$a]->thumbnail = $thumbnail;
			$intermediate = wp_get_attachment_image_src($v->ID, 'medium', false, true);
			$attachment_posts[$a]->intermediate = $intermediate;
			$attachment_posts[$a]->url = wp_get_attachment_url($v->ID);
		}
		echo $json->serialize($attachment_posts);
	}
	else{
		echo '[]';
	}
	exit(0);
}

// grab the blogs url once
$blogsurl = get_bloginfo('wpurl') . '/wp-content/plugins/' . basename(dirname(__FILE__)) . '/plugins';
$serverpath = dirname(__FILE__) . '\plugins';

global $ee_plugins, $ibe_plugins_lang, $ee_buttons_3;
$ibe_plugins = array(
	'wpmedialibrary' => $blogsurl . '/wpmedialibrary/editor_plugin_src.js'
);

$ibe_plugins_lang = array(
	'wpmedialibrary'  => $serverpath . '/wpmedialibrary/langs/lang.php'
);

$ibe_buttons_3 = array(
	'wpmedialibrary'
);

function ibe_mce_external_plugins($array = array()){
	global $ibe_plugins;
	return array_merge($array, $ibe_plugins);
}
add_filter('mce_external_plugins', 'ibe_mce_external_plugins', 1, 1);


function ibe_mce_external_languages($array = array()){
	global $ibe_plugins_lang;
	return array_merge($array, $ibe_plugins_lang);
}
add_filter('mce_external_languages', 'ibe_mce_external_languages', 10, 1);


function ibe_mce_buttons_3($array = array()){
	global $ibe_buttons_3;
	return array_merge($array, $ibe_buttons_3);
}
add_filter('mce_buttons', 'ibe_mce_buttons_3', 1, 1);
?>