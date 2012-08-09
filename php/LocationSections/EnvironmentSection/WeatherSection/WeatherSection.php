<li class="complex notranslate">

	<label class="desc2" for="Weather_<?php echo $index?>_id">HAS WEATHER</label>
	<?php echo options_section_in2("weather", $index); ?>
	
	<div class='more-content-in'>
		<span>
			<textarea id="weatherDescription<?php echo "_".$index?>_id"  name="weatherDescription<?php echo "_".$index?>" 
			class="field select addr" spellcheck="true" rows="1" cols="65" onkeyup=""></textarea>
			<label for="weatherDescription<?php echo "_".$index?>_id">Description</label>
		</span>
		
	</div>
</li>