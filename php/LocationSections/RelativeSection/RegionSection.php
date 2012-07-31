<li class="complex notranslate">

	<label class="desc2" for="Region_id">IN REGION</label>
	<?php echo options_section_in2("Region", $index); ?>
	
	<div class='more-content-in'>
		<span>
			<label class ="nojump" for="regionName<?php echo "_".$index?>_id">Name</label>
			<input id="regionName<?php echo "_".$index?>_id" name="regionName<?php echo "_".$index?>" type="text" class="field text addr" value="" size="32" />
		</span>
	</div>
	<div class='more-content-in'>
		<span class="right state">
			<input id="state_or_province<?php echo "_".$index?>_id" name="state_or_province<?php echo "_".$index?>" type="text" class="field text addr" value="" />
			<label for="state_or_province<?php echo "_".$index?>_id">State / Province / Region</label>
		</span>

		<span class="left">
			<?php require_once('/php/CommonSections/contriesSelectionSection.php'); ?>
			<label for="country<?php echo "_".$index?>_id">Country</label>
		</span>

		<span class="full text">
			<textarea id="regionDescription<?php echo "_".$index?>_id"  name="regionDescription<?php echo "_".$index?>" class="field select addr" spellcheck="true" rows="1" 
			cols="65" onkeyup=""></textarea>
			<label for="regionDescription<?php echo "_".$index?>_id">Description</label>
		</span>

	</div>
</li>
