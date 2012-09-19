<div id="container">
	<div>
		<div class="top2">
			<div class="tabNav">
				<ul>
					<li ><a href="/users/maximillian"><span>Analysis</span></a></li>
					<li class="selected"><a href="/users/maximillian/anime"><span>Location</span></a></li>
					<li><a href="/users/maximillian/manga"><span>Subject</span></a></li>
					<li><a href="/users/maximillian/reviews"><span>Track</span></a></li>
				</ul>
				<div class="clear"></div>
			</div> <!-- / .tabNav -->
			<div class="clear"></div>
		</div>	
	</div>
	
	<form class="wufoo" autocomplete="on" enctype="multipart/form-data" method="post" novalidate
		action="php/LocationSections/_register_Location.php">

		<header class="info">
			<h2>Location</h2>
		</header>

		<ul>
			<?php include('/php/LocationSections/LocationSections.php'); ?>
			<?php include('/php/CommonSections/buttonSection.php');?>
		</ul>
	</form> 
</div>