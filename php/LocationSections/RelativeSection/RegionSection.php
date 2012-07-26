<li class="complex notranslate">

	<label class="desc2" for="Region_id">IN REGION</label>
	<?php echo options_section_in("Region"); ?>
	
	<div class='more-content-in'>
		<span>
			<label class ="nojump" for="regionName_id">Name</label>
			<input id="regionName_id" name="regionName" type="text" class="field text addr" value="" size="32" />
		</span>
	</div>
	<div class='more-content-in'>
		<span class="right state">
			<input id="state_or_province_id" name="state_or_province" type="text" class="field text addr" value="" />
			<label for="state_or_province_id">State / Province / Region</label>
		</span>

		<span class="left">
			<?php require_once('/php/CommonSections/contriesSelectionSection.php'); ?>
			<label for="country_id">Country</label>
		</span>

		<span class="full text">
			<textarea id="regionDescription_id"  name="regionDescription" class="field select addr" spellcheck="true" rows="1" 
			cols="65" onkeyup=""></textarea>
			<label for="regionDescription_id">Description</label>
		</span>

	</div>
</li>
