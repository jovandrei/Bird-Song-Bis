<div>
	<label class="desc2" id="title16" for="Field16">
		Vegetation 1
	</label>

	<span>
		<input id="average_density0" name="average_density0" type="text" class="field text addr" value="" size="20" tabindex="10" />
		<label for="Field2">Average density</label>
	</span>

	<span>
		<input id="projected_cover0" name="projected_cover0" type="text" class="field text addr" value="" size="20" tabindex="11" />
		<label for="Field2">Projected cover</label>
	</span>

	<span >
		<input id="average_height0" name="average_height0" type="text" class="field text addr" value="" size="20" tabindex="12" />
		<label for="Field2">Average height</label>
	</span>

</div>
	<?php 
		include('/php_sections/speciesSection.php');
	?>

<div id="camposExtras">
</div>

<INPUT TYPE=BUTTON OnClick="AddVegetation();" VALUE="+1 Add one" class="right small boton">