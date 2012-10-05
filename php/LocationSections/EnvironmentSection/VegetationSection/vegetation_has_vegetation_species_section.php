<li class="complex notranslate">

	<h4 class='compressed'><label class="desc2" for="vegetation_has_vegetation_species_<?php echo $index?>_id">VEGETATION HAS VEGETATION SPECIES <?php echo $index+1?></label></h4>
	<?php echo options_section_in2("VEGETATION_HAS_VEGETATION_SPECIES", $index); ?>
	
	<div class="more-content-in">
		<span>
			<input id="average_density_<?php echo $index?>_id" name="average_density_<?php echo $index?>" type="text" 
			class="field text addr" value="" size="15" />
			<label for="average_density_<?php echo $index?>_id">average density</label>
		</span>
	
		<span>
			<input id="projected_cover_<?php echo $index?>_id" name="projected_cover_<?php echo $index?>" type="text" 
			class="field text addr" value="" size="18"/>
			<label for="projected_cover_<?php echo $index?>_id">projected cover</label>
		</span>
	
		<span>
			<input id="average_height_<?php echo $index?>_id" name="average_height_<?php echo $index?>" type="text" 
			class="field text addr" value="" size="20"  />
			<label for="average_height_<?php echo $index?>_id">average height</label>
		</span>
		
	</div>
	
	<div class="more-content-in">
		<?php include('php/LocationSections/EnvironmentSection/VegetationSection/Vegetation_Species/vegetation_speciesSection.php'); ?>
	</div>
	
		
</li>