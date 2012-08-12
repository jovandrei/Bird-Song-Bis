<div >
	<?php echo options_section2("Location", 0); ?>
		
	<div class='more-info'>		
		<h4 class='compressed'>Relative Location</h4>
		
		<div class='more-content'>
		<div>
		<h5><INPUT TYPE=BUTTON OnClick="AddElement('nextRelativeLocation', '#extraRelativeLocation', 
					'/php/LocationSections/RelativeSection/_AddRelativeSection.php');" 
					VALUE="+1 Add one Marker" class="left small boton"></h5>
					<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
		</div>
			<div>
				<div id="extraRelativeLocation">
					<?php
						$index = 0; 
						include('/php/LocationSections/RelativeSection/_AddRelativeSection.php'); 
					?>
				</div>
			</div>
			<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
		</div>
	</div>
	
	<div id="extraAbsoluteLocation">
		<?php
			$index = 0; 
			include('/php/LocationSections/AbsoluteSection/_AddAbsoluteSection.php'); 
		?>
	</div>
	
	
	<div id="extraEnvironment">
		<?php
			$index = 0; 
			include('/php/LocationSections/EnvironmentSection/_AddEnvironmentSection.php'); 
		?>
	</div>
		
	<div id="extraFile">
		<?php
			$index = 0; 
			include('/php/GeneralSections/FileSection/_AddFileSection.php'); 
		?>
	</div>

	<a href="#" tabindex="-1"> ------------------------------------------------------ </a>
	<li class="complex notranslate">
		<div>
			<span>
				<textarea id="locationDescription_0_id"  name="locationDescription_0" 
					class="field select addr" spellcheck="true" rows="1" cols="70" onkeyup=""></textarea>
				<label for="locationDescription_0_id">Location Description</label>
			</span>		
		</div>
	</li>
</div>