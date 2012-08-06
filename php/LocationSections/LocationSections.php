<div >
	<?php echo options_section2("Location", 0); ?>

	<div id="extraAbsoluteLocation">
		<?php
			$index = 0; 
			include('/php/LocationSections/AbsoluteSection/_AddAbsoluteSection.php'); 
		?>
	</div>
	
	<INPUT TYPE=BUTTON OnClick="AddElement('nextRelativeLocation', '#extraRelativeLocation', 
		'/php/LocationSections/RelativeSection/_AddRelativeSection.php');" 
		VALUE="+1 Add one Relative" class="right small boton2">
	<div id="extraRelativeLocation">
		<?php
			$index = 0; 
			include('/php/LocationSections/RelativeSection/_AddRelativeSection.php'); 
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

</div>