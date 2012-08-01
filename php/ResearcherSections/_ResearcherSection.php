<div id="container">
	<form class="wufoo" autocomplete="on" enctype="multipart/form-data" method="post" novalidate
		action="php/ResearcherSections/register_ResearcherData.php">

		<header class="info" >
			<h2>Researcher</h2>
		</header>

		<ul>
			<?php include('/php/ResearcherSections/_ResearcherSubSections.php'); ?>
			<?php include('/php/CommonSections/buttonSection.php');?>
		</ul>
	</form>
</div>