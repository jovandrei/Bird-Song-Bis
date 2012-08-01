<div >
	<?php echo options_section("Location"); ?>

	<div id="extraAbsoluteLocation"></div>
	
	<INPUT TYPE=BUTTON OnClick=
		"AddElement('nextRelativeLocation', '#extraRelativeLocation', 
		'/php/LocationSections/RelativeSection/_AddRelativeSection.php');" 
		VALUE="+1 Add one" class="right small boton">
	<div id="extraRelativeLocation"></div>
	
	<div id="extraEnvironment"></div>
	
	<div class='more-info'>
		<h4 class='compressed'>Upload Files</h4>
		<?php echo options_section("upload_files"); ?>
				
		<div class='more-content'>
			<div>
				
			</div>
			<a href="#"> ------------------------------------------------------ </a>
		</div>
	</div>
	
</div>