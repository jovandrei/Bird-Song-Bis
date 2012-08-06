<!DOCTYPE html>
<html>
<head>

	<title>
	Subject
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


<form id="form20" name="form20" class="wufoo  page" autocomplete="on" enctype="multipart/form-data" method="post" novalidate
action="php/register_Researcher.php">

<header id="header" class="info">
<h2>Subject</h2>
</header>

<ul>

<li id="foli3" class="notranslate       ">
<label class="desc" id="title3" for="Field3">
Select one
</label>
<div>
<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
<option value=""></option>
<option value="New Track" selected="selected">New Subject</option>
<?php //echo subjectData(); ?>
</select>
</div>
</li>


<li id="foli16" class="complex notranslate      ">
<label class="desc" id="title16" for="Field16">
General Information
</label>
<div>


<span class="left small">
<input id="Field27" name="scientific_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Market id</label>
</span>

<span class="right">
<input id="Field28" name="common_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Name</label>
</span>

<span class="left">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >N</option>
</select>
<label for="Field21">Age class</label>
</span>

<span class="right">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >N</option>
</select>
<label for="Field21">Sex</label>
</span>

<span class="left">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >N</option>
</select>
<label for="Field21">Breeding status</label>
</span>

<span class="right">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >N</option>
</select>
<label for="Field21">Non-breeding status</label>
</span>

<span class="left">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >N</option>
</select>
<label for="Field21">Syte status</label>
</span>


<span class="right">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >N</option>
</select>
<label for="Field21">Type</label>
</span>
	
<span class="full text">
<textarea id="Field23"  name="description" class="field select addr" spellcheck="true" rows="5" 
cols="72" tabindex="17" onkeyup=""></textarea>
 <label for="Field21">Notes</label>
</span>

</div>
</li>

<li id="foli16" class="complex notranslate      ">


<label class="desc" id="title16" for="Field16">
Group
</label>


<div>
<label class="desc2" id="title16" for="Field16">
Subject Species

</label>

<span class="">
<input id="Field5" name="projected_cover0" type="text" class="field text addr" value="" size="25" tabindex="3" />
<label for="Field2">Approximate size</label>
</span>


<span class="">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >Sight and sound</option>
</select>
<label for="Field21">Identified by</label>
</span>

<span class="right">
<input id="Field5" name="projected_cover0" type="text" class="field text addr" value="" size="25" tabindex="3" />
<label for="Field2">Certainty of species</label>
</span>


<span class="left distance">
<input id="Field27" name="scientific_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Scientific name</label>
</span>

<span class="right distance">
<input id="Field28" name="common_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Common name</label>
</span>
</div>

<div id="camposExtra">
</div>

<INPUT TYPE=BUTTON OnClick="AddVegetation();" VALUE="+1 Add one" class="right small boton">


</li>


<li id="foli16" class="complex notranslate hide">


<label class="desc" id="title16" for="Field16">
Individual
</label>


<div>
<label class="desc2" id="title16" for="Field16">
Subject Species
</label>



<span class="left">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >Sight and sound</option>
</select>
<label for="Field21">Identified by</label>
</span>



<span class="right">
<input id="Field5" name="projected_cover0" type="text" class="field text addr" value="" size="25" tabindex="3" />
<label for="Field2">Certainty of species</label>
</span>


<span class="left distance">
<input id="Field27" name="scientific_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Scientific name</label>
</span>

<span class="right distance">
<input id="Field28" name="common_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Common name</label>
</span>
</div>

<div id="camposExtras">
</div>

<INPUT TYPE=BUTTON OnClick="AddVegetation();" VALUE="+1 Add one" class="right small boton">
</li>

<li id="foli16" class="complex notranslate      ">
	<label class="desc" id="title16" for="Field16">
		Track has Subject
	</label>
	<div>
		<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
			<option value=""></option>
			<option value="New Track" selected="selected"></option>
		</select>
		<label for="Field21">Track has Subject 1</label>
	</div>
	<div id="track_has_SubjectExtra">

	</div>
	<INPUT TYPE=BUTTON OnClick="AddTrack_has_Subject();" VALUE="+1 Add one" class="left small boton">
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