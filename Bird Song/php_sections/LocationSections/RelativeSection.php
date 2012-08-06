<li id="foli16" class="complex notranslate">
	<label class="desc" for="Field16">
		Relative
	</label>

	<div>
		<span class="left">
			<select id="newRelative" name="newRelative" class="field select addr" tabindex="6" >
				<option value="New Relative" selected="selected">New Relative</option>
				<option value="" disabled="disabled">--------</option>
			</select>
		</span>
	</div>

	<div>
		<span class="left">
				<select id="angle" name="langle" class="field select addr" tabindex="6" >
					<option value="N" selected="selected">N</option>
					<option value="W" >W</option>
					<option value="S" >S</option>
					<option value="E" >E</option>
					<option value="NW" >NW</option>
					<option value="NE" >NE</option>
					<option value="SW" >SW</option>
					<option value="SE" >SE</option>
				</select>
				<label for="langle">Angle of recording</label>
		</span>
	</div>


	<div>
		<span>
				<label class="desc2" for="Field21">Marker 1</label>
		</span>
	</div>
	
	<div>
		<span>
			<label class ="nojump" for="distance">Recorded</label>
			<input id="distance" name="distance" type="text" class="field text addr" value="" tabindex="7" size="27" />
			<label class ="nojump" for="distance">m.</label>
		</span>
		<span class="right">
			<select id="angle" name="angle" class="field select addr" tabindex="6">
				<option value="Select" selected="selected">Select position</option>	
				<option value="N">N</option>
				<option value="W" >W</option>
				<option value="S" >S</option>
				<option value="E" >E</option>
				<option value="NW" >NW</option>
				<option value="NE" >NE</option>
				<option value="SW" >SW</option>
				<option value="SE" >SE</option>
			</select>
		</span>
	</div>

	<div>
		<span>
		from
			<select id="angle" name="angle" class="field select addr" tabindex="6" width="251" style="width: 251px">
				<option value="Select" selected="selected">New Marker</option>
				<option value="" disabled="disabled">--------</option>	
			</select>
		</span>

		<span class="right">
		<input id="Marker" name="Marker" type="text" class="field text addr" value="" tabindex="7" />
		</span>
	</div>

	<div>
		<label class="desc3" id="title16" for="Field16">
			Area
		</label>

		<span class="left">
			<select id="angle" name="angle" class="field select addr" tabindex="6">
				<option value="Select" selected="selected">New Area</option>
				<option value="" disabled="disabled">--------</option>	
			</select>
		</span>
	</div>
	
	<div>
		<span class="left state">
			<input id="state_or_province" name="state_or_province" type="text" class="field text addr" value="" tabindex="7" />
			<label for="Field21">State / Province / Region</label>
		</span>

		<span class="right">
			<?php require_once('/php_sections/contriesSelection.php'); ?>
			<label for="Field19">Country</label>
		</span>

		<span class="full text">
			<textarea id="description"  name="description" class="field select addr" spellcheck="true" rows="5" 
			cols="72" tabindex="9" onkeyup=""></textarea>
			<label for="Field21">Description</label>
		</span>

	</div>

	<div id="camposExtras">
	</div>
	<INPUT TYPE=BUTTON OnClick="AddVegetation();" VALUE="+1 Add one" class="right small boton">
	<div>
	</div>
	
</li>
