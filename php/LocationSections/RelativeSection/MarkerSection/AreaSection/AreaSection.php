<li class="complex notranslate">

	<label class="desc2" for="Area_<?php echo $index?>_id">IN AREA</label>
	<?php echo options_section_in2("Area", $index); ?>
		
	<div class='more-content-in'>
		<span>
			<label class ="nojump" for="areaName<?php echo "_".$index?>_id">Name</label>
			<input id="areaName<?php echo "_".$index?>_id" name="areaName<?php echo "_".$index?>" type="text" class="field text addr" value="" size="32" />
		</span>
		
		<span>
			<textarea id="areaDescription<?php echo "_".$index?>_id"  name="areaDescription<?php echo "_".$index?>" class="field select addr" spellcheck="true" rows="1" 
			cols="55" onkeyup=""></textarea>
			<label for="areaDescription<?php echo "_".$index?>_id">Description</label>
		</span>
		
	</div>
	
	<?php include('/php/LocationSections/RelativeSection/MarkerSection/AreaSection/RegionSection/RegionSection.php'); ?>
</li>
