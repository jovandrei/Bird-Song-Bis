<div id="container">
	
	<div class="top2">
		<div class="tabNav">
			<ul>
				<li ><a href="ANALYSIS.php"><span>Analysis</span></a></li>
				<li class="selected"><a href="Location.php"><span>Location</span></a></li>
				<li><a href="Location.php"><span>Subject</span></a></li>
				<li><a href="Location.php"><span>Track</span></a></li>
			</ul>
			<div class="clear"></div>
		</div> <!-- / .tabNav -->
		<div class="clear"></div>
	</div>	
	
	<form class="wufoo" autocomplete="on" enctype="multipart/form-data" method="post" novalidate
		action="php/LocationSections/_register_Location.php">

		<header class="info">
			<h2>Location</h2>
		</header>

		<ul>
			<?php include('php/LocationSections/LocationSections.php'); ?>
			<?php include('php/CommonSections/buttonSection.php');?>
		</ul>
	</form> 
</div>