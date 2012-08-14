<li class="complex notranslate">

	<label class="desc2" for="Region_<?php echo $index?>_id">IN REGION</label>
	<?php echo options_section_in2("Region", $index); ?>
	
	<div class='more-content-in'>
		<span>
			<label class ="nojump" for="regionName_<?php echo $index?>>_id">Name</label>
			<input id="regionName_<?php echo $index?>_id" name="regionName_<?php echo $index?>" type="text" class="field text addr" value="" size="32" />
		</span>
	</div>
	<div class='more-content-in'>
		<span class="left">
			<?php require_once('/php/CommonSections/contriesSelectionSection.php'); ?>
			<label for="country_<?php echo $index?>_id">Country</label>
		</span>
		
		<span class="right state">
			<input id="state_or_province_<?php echo $index?>_id" name="state_or_province_<?php echo $index?>" type="text" class="field text addr" value="" />
			<label for="state_or_province_<?php echo $index?>_id">State / Province / Region</label>
		</span>

		<span class="full text">
			<textarea id="regionDescription_<?php echo $index?>_id"  name="regionDescription_<?php echo $index?>" class="field select addr" spellcheck="true" rows="1" 
			cols="55" onkeyup=""></textarea>
			<label for="regionDescription_<?php echo $index?>_id">Description</label>
		</span>

	</div>
</li>
