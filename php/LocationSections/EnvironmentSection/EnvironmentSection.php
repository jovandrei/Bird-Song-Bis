<li class="complex notranslate">
	<div class='radioButton'>
		<h5>
				<input type="radio" class="edicion_eventos" name="view" value="compressed" checked="checked"/> Compressed
				<input type="radio" class="edicion_eventos" name="view" value="expanded"/> Expanded
		</h5>
	</div>	
</li>

<li class="complex notranslate">		

	<div class='more-content-in'>
	<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
		<span class="full text">
			<textarea id="environmentComments_<?php echo $index?>_id"  name="environmentComments_<?php echo $index?>" class="field select addr" spellcheck="true" rows="1" 
			cols="65" onkeyup=""></textarea>
			<label for="environmentComments_<?php echo $index?>_id">Comments/Features</label>
		</span>		
	</div>
	
	<?php include('/php/LocationSections/EnvironmentSection/MarkerSection/MarkerSection.php'); ?>	
</li>