<li class="complex notranslate">
	<div>
		<span>
			<form>
				<h5>Type of audio:</br></br>
				<input type="radio" class="edicion_eventos" name="file_type_<?php echo $index?>" value="Raw_audio" checked="checked"/> Raw audio</br>
				<input type="radio" class="edicion_eventos" name="file_type_<?php echo $index?>" value="Processed_audio"/> Processed audio</br>
				<input type="radio" class="edicion_eventos" name="file_type_<?php echo $index?>" value="Audio_notes"/> Audio notes</br>
				<input type="radio" class="edicion_eventos" name="file_type_<?php echo $index?>" value="Textgrid"/> Textgrid</br>
				<input type="radio" class="edicion_eventos" name="file_type_<?php echo $index?>" value="Array sync file"/> Array sync file</br>
				<input type="radio" class="edicion_eventos" name="file_type_<?php echo $index?>" value="Localization file"/> Localization file</br>
				<input type="radio" class="edicion_eventos" name="file_type_<?php echo $index?>" value="Key"/> Key</h5>
			</form>
		</span>
	</div>
	
		<div>		
		<span class="left">
			<form>
				<label for="file">Filename:</label>
				<input type="file" name="file_<?php echo $index?>" id="file_<?php echo $index?>_id" /> 
			</form>
			
		</span>
	</div>
</li>