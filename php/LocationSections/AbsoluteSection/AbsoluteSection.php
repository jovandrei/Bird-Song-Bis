<li class="complex notranslate">
	<label class="desc" for="latitude_degrees_<?php echo $index?>_id">
		Absolute Information
	</label>

	<div>
		<span>
			<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
			<label  class ="nojumpBig" for="latitude_degrees_<?php echo $index?>_id">°</label>
			
			<input id="latitude_minutes_<?php echo $index?>_id" name="latitude_minutes_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
			<label  class ="nojumpBig" for="latitude_minutes_<?php echo $index?>_id">'</label>
			
			<input id="latitude_seconds_<?php echo $index?>_id" name="latitude_seconds_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
			<label  class ="nojumpBig" for="latitude_seconds_<?php echo $index?>_id">"</label>
			
			<select id="latitude_orientation_<?php echo $index?>_id" name="latitude_orientation_<?php echo $index?>" class="field select addr">
				<option value="N" selected="selected">N</option>
				<option value="S" >S</option>
			</select>
				
			<label for="latitude_degrees_<?php echo $index?>_id">Latitude</label>
		</span>	
	</div>
	
	<div>
		<span>
			<input id="longitude_degrees_<?php echo $index?>_id" name="longitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
			<label  class ="nojumpBig" for="longitude_degrees_<?php echo $index?>_id">°</label>
			
			<input id="longitude_minutes_<?php echo $index?>_id" name="longitude_minutes_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
			<label  class ="nojumpBig" for="longitude_minutes_<?php echo $index?>_id">'</label>
			
			<input id="longitude_seconds_<?php echo $index?>_id" name="longitude_seconds_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
			<label  class ="nojumpBig" for="longitude_seconds_<?php echo $index?>_id">"</label>
			
			<select id="longitude_orientation_<?php echo $index?>_id" name="longitude_orientation_<?php echo $index?>" class="field select addr">
				<option value="W" selected="selected">W</option>
				<option value="E" >E</option>
			</select>
			
			<label for="longitude_degrees_<?php echo $index?>_id">Longitude</label>
		</span>
	</div>
	
	<div>
		<span>
			
			<input id="elevation_<?php echo $index?>_id" name="elevation_<?php echo $index?>" type="text" class="field text addr" value="" size="20" />
			<label  class ="nojump" for="elevation_<?php echo $index?>_id">m.</label>
			<label for="elevation_<?php echo $index?>_id">Elevation</label>
		</span>
	</div>
</li>
