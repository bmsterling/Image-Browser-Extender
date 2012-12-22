<?php
	/**
	 *	Load WP-Config File If This File Is Called Directly
	 */
	if (!function_exists('add_action')) {
		require_once('../../../../../wp-config.php');
	} //  end : if (!function_exists('add_action'))
	$path_arr = explode(DIRECTORY_SEPARATOR, dirname(__FILE__));
	$blogsurl = get_bloginfo('wpurl') . '/wp-content/plugins/' . $path_arr[count($path_arr)-3] . '/image-browser-extender.php';

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>{#wpmedialibrary_dlg.title}</title>
    <script type="text/javascript">
    var masterUrl = "<?php echo $blogsurl;?>";
    </script>
    <script type="text/javascript" src="../../../../../wp-includes/js/tinymce/tiny_mce_popup.js"></script>
    <script type="text/javascript" src="../../../../../wp-includes/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui-personalized-1.5.min.js"></script>
    <script type="text/javascript" src="js/jquery.metadata.pack.js"></script>
    <script type="text/javascript" src="js/dialog.js"></script>
    <link rel="stylesheet" type="text/css" href="css/wpmedialibrary.css" media="all"/>
</head>
<body>

<form onsubmit="ExampleDialog.insert();return false;" action="#">
	<input type="hidden" name="currentGroup" id="currentGroup" value="0"/>
	<input type="hidden" name="currentGroup" id="currentLimit" value="20"/>
	<fieldset>
		<legend>Insert Controls </legend>
		<table width="100%" border="0" cellpadding="0" cellspacing="3">
			<tr>
				<td valign="top" width="25%">
					<h3>Type</h3>
					<ul>
						<li><label><input type="radio" name="insertFormat" checked="checked" value="single"/> Image w/o link</label></li>
						<li><label><input type="radio" name="insertFormat" value="singleWLink"/> Image w/ link</label></li>
						<li><label><input type="radio" name="insertFormat" value="allWTable"/> Table/gallery w/o</label></li>
						<li><label><input type="radio" name="insertFormat" value="allWTableLink"/> Table/gallery w/ link</label></li>
					</ul>
				</td>
				<td valign="top" width="25%">
					<h3>Size</h3>
					<ul>
<?php
$sizes = apply_filters( 'image_size_names_choose', array(
    'thumbnail' => __('Thumbnail'),
    'medium'    => __('Medium'),
    'large'     => __('Large'),
    'full'      => __('Full Size'),
) );

foreach ( $sizes as $value => $name ) :
    echo "<li><label><input type=\"radio\" name=\"insertSize\" checked=\"checked\" value=\"$value\"/> $name</label></li>";
endforeach; ?>
					</ul>
				</td>
				<td valign="top" width="25%">
					<h3>Structure</h3>
					<ul>
						<li><label><input type="radio" name="insertStructure" checked="checked" value="0"/> Title / Image / Caption</label></li>
						<li><label><input type="radio" name="insertStructure" value="1"/> Title / Image / Description</label></li>
						<li><label><input type="radio" name="insertStructure" value="2"/> Title / Image </label></li>
						<li><label><input type="radio" name="insertStructure" value="3"/> Image </label></li>
					</ul>
				</td>
				<td id="col4" valign="top" width="25%">
					<h3>Columns for table</h3>
					<ul>
						<li><input type="radio" name="insertCols" value="1"/> 1 </li>
						<li><input type="radio" name="insertCols" value="2"/> 2</li>
						<li><input type="radio" name="insertCols" checked="checked" value="3"/> 3</li>
						<li><input type="radio" name="insertCols" value="4"/> 4 </li>
						<li><input type="radio" name="insertCols" value="5"/> 5 </li>
					</ul>
				</td>
			</tr>
		</table>
		<div class="mceActionPanel">
			<div style="float: right">
				<input type="button" id="insert" name="insert" value="{#insert}" onclick="wpmedialibrary.insert();" />
			</div>
	
			<div style="float: right">
				<input type="button" id="cancel" name="cancel" value="{#cancel}" onclick="tinyMCEPopup.close();" />
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend>Browse Controls</legend>
		<input type="button" id="prev" name="prev" class="mceButton" value="{#wpmedialibrary_dlg.prev}" disabled="disabled"/>
		<input type="button" id="next" name="next" class="mceButton" value="{#wpmedialibrary_dlg.next}"/>
		<small>{#wpmedialibrary_dlg.note}</small>
		<div>Tips: click and drap to select mutliple or hold down ctrl + click to select multiple</div>
	</fieldset>
	<div id="imagegroup">
		<ul id="imagegrouplist"></ul>
		<div id="loading" class="loading">Images Loading...</div>
	</div>
</form>

</body>
</html>
