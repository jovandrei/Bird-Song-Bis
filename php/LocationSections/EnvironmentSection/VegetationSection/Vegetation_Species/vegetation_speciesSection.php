<li class="complex notranslate">

	<label class="desc2" for="vegetation_species_<?php echo $index?>_id">HAS VEGETATION SPECIES</label>
	<?php echo options_section_in2("VEGETATION_SPECIES", $index); ?>
	
	<div class='more-content-in'>
		<span class="left">
			<input id="common_name_<?php echo $index?>_id" name="common_name_<?php echo $index?>" type="text" 
			class="field text addr" value="" />
			<label for="common_name_<?php echo $index?>_id">Common name</label>
		</span>
		
		<span class="right">
			<input id="scientific_name_<?php echo $index?>_id" name="scientific_name_<?php echo $index?>" type="text" 
			class="field text addr" value="" />
			<label for="scientific_name_<?php echo $index?>_id">Scientific name</label>
		</span>
	</div>
	
</li>
