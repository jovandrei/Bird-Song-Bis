<div id="container2">
	
	<div class="top2">
		<div class="tabNav">
			<ul>
				<li ><a href="Analysis.php"><span>Analysis</span></a></li>
				<li class="selected"><a href="LocationSearch.php"><span>Location</span></a></li>
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
			<h2>Location Search</h2>
		</header>
						
	</form>

	<ul>
		<div class="tabPanel2 box2 ">
			<div class='more-info'">
				<h4 class='compressed' >Show filters</h4>
						
				<div class='more-content'>
					<div>
						<?php include('php_search/LocationSections/filters.php'); ?>
					</div>
				</div>
			</div>
			<div class="filterKey"> </div>
		</div>
		<?php include('php_search/LocationSections/LocationSections.php'); ?>
	</ul>
</div>