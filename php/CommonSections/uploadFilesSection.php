<li id="foli16" class="complex notranslate">

	<label class="desc">
		Files
	</label>

	<label class="desc2">
		File 1
	</label>
		
	<div>
		<span class="left">
			<select id="angle" name="angle" class="field select addr" tabindex="6">
				<option value="Select" selected="selected">New File</option>	
			</select>
		</span>
	</div>

	<div>
		<span class="left">
			<input id="Field20" name="Field20" type="file" class="boton2" size="12" tabindex="5" />
		</span>
	</div>

	<div>
		<span class="left">
			<label for="Field21">Comments</label>	
			<textarea id="Field23"  name="comments" class="field select addr" spellcheck="true" rows="5" 
				cols="72" tabindex="17" onkeyup="">
			</textarea>
		</span>
	</div>


	<label for="Field21">Type of audio</label>

	<div>
		<span>
			<input id="radioDefault_430" name="Field430" type="hidden" value="" />
		</span>
	
		<span>
		<input id="Field430_0" name="Field430" type="radio" class="field radio" value="Raw" tabindex="2"  checked="checked" />
		<label class="choice" for="Field430_0" >
		Raw</label>
		</span>

		<span>
		<input id="Field430_1" name="Field430" type="radio" class="field radio" value="Processed" tabindex="3" />
		<label class="choice" for="Field430_1" >
		Processed</label>
		</span>

		<span>
		<input id="Field430_2" name="Field430" type="radio" class="field radio" value="Notes" tabindex="4"/>
		<label class="choice" for="Field430_2" >
		Notes</label>
		</span>
		
	</div>
	
	<div id="fileExtra">

	</div>

	<INPUT TYPE=BUTTON OnClick="AddFile();" VALUE="+1 Add one" class="left small boton">
</li>
