<li class="complex notranslate">

	<label class="desc2" for="Marker_id">HAS MARKER</label>
	<?php echo options_section_in2("Marker", $index); ?>
	
	<div class='more-content-in'>
		<span>
			<label class ="nojump" for="markerName<?php echo "_".$index?>_id">Name</label>
			<input id="markerName<?php echo "_".$index?>_id" name="markerName" type="text" class="field text addr" value="" size="32" />
		</span>
		
		<span>
			<textarea id="markerDescription<?php echo "_".$index?>_id"  name="markerDescription" class="field select addr" spellcheck="true" rows="1" 
			cols="65" onkeyup=""></textarea>
			<label for="markerDescription<?php echo "_".$index?>_id">Description</label>
		</span>
		
	</div>
	
	<?php include('/php/LocationSections/RelativeSection/AreaSection.php'); ?>
</li>