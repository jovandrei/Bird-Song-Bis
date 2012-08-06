<!DOCTYPE html>
<html>
<head>

	<title>
	Experiment
	</title>

	<!-- CSS -->
	<link href="css/structure.css" rel="stylesheet">
	<link href="css/form.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<!-- JavaScript -->
	<script type="text/javascript" src="scripts/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="scripts/camposDinamicos.js"></script>
	<script src="scripts/wufoo.js"></script>

	<?php
	require_once('php/data.php');
	?> 

	<!--[if lt IE 10]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<link href='http://fonts.googleapis.com/css?family=Viga|Titan+One|Passion+One|Cabin+Condensed:700' rel='stylesheet' type='text/css'>
	


	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>

	<script src="http://cdn.jquerytools.org/1.2.6/form/jquery.tools.min.js"></script>



</head>

<body id="public">
<a href="#"> . </a>
	
<div id="container" class="ltr">


<form id="form20" name="form20" class="wufoo  page" autocomplete="off" enctype="multipart/form-data" method="post" novalidate
action="php/register_Experiment.php">

<header id="header" class="info">
<h2>Experiment</h2>
</header>

<ul>
<div>
<li id="foli3" class="notranslate       ">
<label class="desc" id="title3" for="Field3">
Select one
</label>
<div>
<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
<option value=""></option>
<option value="New Track" selected="selected">New Experiment</option>
<?php echo researcherData(); ?>
</select>
</div>
</li>


<li id="foli16" class="complex notranslate">
<label class="desc" id="title16" for="Field16">
General Information
</label>

<label class="desc2" id="title16" for="Field16">
Date
</label>

<span>
<input id="Field8-1" name="month_performed" type="text" class="field text" value="" size="2" maxlength="2" tabindex="2" />
<label for="Field8-1">MM</label>
</span> 
<span class="symbol">/</span>
<span>
<input id="Field8-2" name="day_performed" type="text" class="field text" value="" size="2" maxlength="2" tabindex="3" />
<label for="Field8-2">DD</label>
</span>
<span class="symbol">/</span>
<span>
 <input id="Field8" name="year_performed" type="text" class="field text" value="" size="4" maxlength="4" tabindex="4" />
<label for="Field8">YYYY</label>
</span>
<span id="cal20">
<img id="pick20" class="datepicker" src="images/calendar.png" alt="Pick a date." />
</span>



<div>
	<span class="full text">
		<label class="desc2" id="title16" for="Field16">
			Description
		</label>
		<textarea id="Field23"  name="comments" class="field select addr" spellcheck="true" rows="5" 
			cols="72" tabindex="17" onkeyup="">
		</textarea>
		
	</span>
</div>
</li>
</div>

<li id="foli16" class="complex notranslate      ">
	<label class="desc" id="title16" for="Field16">
		Methods
	</label>
	<div>
		<span class="full text">
		<label class="desc2" id="title16" for="Field16">
			Method 1
		</label>
		<textarea id="Field23"  name="comments" class="field select addr" spellcheck="true" rows="5" 
			cols="72" tabindex="17" onkeyup="">
		</textarea>
		<label for="Field21">Comments</label>
		</span>
		
	</div>
	<div id="methodExtra">

	</div>
	<INPUT TYPE=BUTTON OnClick="AddMethod();" VALUE="+1 Add one" class="right small boton">
</li>


<li id="foli16" class="complex notranslate      ">
<label class="desc" id="title16" for="Field16">
Researchers

</label>

<div>
<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
<option value=""></option>
<option value="New Track" selected="selected"></option>
</select>
<label for="Field21">Researcher 1</label>
</div>


<div id="researcherExtra">

</div>
<INPUT TYPE=BUTTON OnClick="AddResearcher();" VALUE="+1 Add one" class="left small boton">
</li>

<li id="foli16" class="complex notranslate      ">
	<label class="desc" id="title16" for="Field16">
		Tracks
	</label>
	<div>
		<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
			<option value=""></option>
			<option value="New Track" selected="selected"></option>
		</select>
		<label for="Field21">Track 1</label>
	</div>
	<div id="trackExtra">

	</div>
	<INPUT TYPE=BUTTON OnClick="AddTrack();" VALUE="+1 Add one" class="left small boton">
</li>

<li id="foli16" class="complex notranslate      ">
	<label class="desc" id="title20" for="Field20">
		Files
	</label>
	<div>
	<span>
		<label class="desc2" id="title16" for="Field16">
		File 1
		</label>
		<input id="Field20" name="Field20" type="file" class="boton2" size="12" tabindex="5" />

		<label for="Field21">Comments</label>
		
		<textarea id="Field23"  name="comments" class="field select addr" spellcheck="true" rows="5" 
			cols="72" tabindex="17" onkeyup="">
		</textarea>


		<label for="Field21">Type of audio</label>

		<input id="radioDefault_430" name="Field430" type="hidden" value="" />
		
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

	</span>
	</div>
	<div id="fileExtra">

	</div>

	<INPUT TYPE=BUTTON OnClick="AddFile();" VALUE="+1 Add one" class="left small boton">
</li>


<li class="buttons ">
	<div>
		<button id="saveForm" name="saveForm" class ="btTxt" type="submit" value="Submit">Add</button> 	
	</div>
</li>

</ul>
</form> 

</div><!--container-->

</body>
</html>