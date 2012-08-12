<li class="complex notranslate">

	<label class="desc2" for="vegetation_<?php echo $index?>_id">HAS VEGETATION</label>
	<?php echo options_section_in2("vegetation", $index);?>
	
	<div class='more-content-in'>
		<span>
			<input id="vegetationType_<?php echo $index?>_id" name="vegetationType_<?php echo $index?>" type="text" 
			class="field text addr" value="" size="45" />
			<label for="vegetationType_<?php echo $index?>_id">Vegetation type</label>
		</span>		
	</div>
	
	<div>
		<h5>
			<INPUT TYPE=BUTTON OnClick="AddElement('nextVegetationSpecies', '#extraVegetationSpecies', 
				'/php/LocationSections/EnvironmentSection/VegetationSection/_AddVegetationSpeciesSection.php');" 
				VALUE="+1 Add one Veg Spec" class="left small boton">
		</h5>
	</div>
	
	<div id="extraVegetationSpecies">

	</div>
	
</li>