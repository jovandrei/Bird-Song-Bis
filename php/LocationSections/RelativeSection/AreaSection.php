<li class="complex notranslate">

	<label class="desc2" for="Area_id">IN AREA</label>
	<?php echo options_section_in2("Area", $index); ?>
		
	<div class='more-content-in'>
		<span>
			<label class ="nojump" for="areaName<?php echo "_".$index?>_id">Name</label>
			<input id="areaName<?php echo "_".$index?>_id" name="areaName" type="text" class="field text addr" value="" size="32" />
		</span>
		
		<span>
			<textarea id="areaDescription<?php echo "_".$index?>_id"  name="areaDescription" class="field select addr" spellcheck="true" rows="1" 
			cols="65" onkeyup=""></textarea>
			<label for="areaDescription<?php echo "_".$index?>_id">Description</label>
		</span>
		
	</div>
	
	<?php include('/php/LocationSections/RelativeSection/RegionSection.php'); ?>
</li>
