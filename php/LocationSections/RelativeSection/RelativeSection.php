<li class="complex notranslate">
	<div class='radioButton'>
		<h5>
			<form id="viewForm">
				<input type="radio" class="edicion_eventos" name="view" value="compressed" checked="checked"/> Compressed
				<input type="radio" class="edicion_eventos" name="view" value="expanded"/> Expanded
			</form>
		</h5>
	</div>	
</li>
<li class="complex notranslate">		
	<div class='more-content-in'>
	<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
		<span>
			<label class ="nojump" for="relativeDistance_id">Recorded</label>
			<input id="relativeDistance_id" name="relativeDistance" type="text" class="field text addr" value="" size="27" />
			<label class ="nojump" for="relativeDistance_id">m.</label>
		</span>
		<span class="right">
				<select id="relativePosition_id" name="relativePosition" class="field select addr" >
					<option value="up hill" selected="selected">up hill</option>
					<option value="along">along</option>
					<option value="from">from</option>
					<option value="up road">up road</option>
					<option value="down road">down road</option>
					<option value="N">N</option>
					<option value="W" >W</option>
					<option value="S" >S</option>
					<option value="E" >E</option>
					<option value="NW" >NW</option>
					<option value="NE" >NE</option>
					<option value="SW" >SW</option>
					<option value="SE" >SE</option>
				</select>
				<label for="relativePosition_id">Position</label>
		</span>
		
	</div>
	
	<?php include('/php/LocationSections/RelativeSection/MarkerSection.php'); ?>	
</li>