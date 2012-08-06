<!DOCTYPE html>
<html>
<head>

	<title>
	Track Subject Point in Clip
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
<h2>Track Subject Point in Clip</h2>
</header>

<ul>

<li id="foli3" class="notranslate       ">
<label class="desc" id="title3" for="Field3">
Select one
</label>
<div>
<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
<option value=""></option>
<option value="New Track" selected="selected">New TSPC</option>
<?php //echo subjectData(); ?>
</select>
</div>
</li>



<li id="foli16" class="complex notranslate      ">
<label class="desc" id="title16" for="Field16">
General Information
</label>
<div>



<span class="left distance">
<input id="Field27" name="scientific_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Scientific name</label>
</span>

<span class="right distance">
<input id="Field28" name="common_name0" type="text" class="field text addr" value="" maxlength="15" tabindex="3" />
<label for="Field20">Common name</label>
</span>

<span class="left">
<select id="Field21" name="angle" class="field select addr" tabindex="15" >
<option value="" selected="selected"></option>
<option value="N" >N</option>
</select>
<label for="Field21">Breeding status</label>
</span>




</div>
</li>


<li id="foli433" class="notranslate      ">
<fieldset>
<![if !IE | (gte IE 8)]>
<legend id="title433" class="desc">
Stimulated
</legend>
<![endif]>
<!--[if lt IE 8]>
<label id="title433" class="desc">
Do you attend church as much as you'd like to?
</label>
<![endif]-->

<div>
<input id="radioDefault_433" name="Field433" type="hidden" value="" />
<span>
<input id="Field433_0" name="Field433" type="radio" class="field radio" value="Yes" tabindex="2"   
/>
<label class="choice" for="Field433_0" >
Yes</label>
</span>
<span>
<input id="Field433_1" name="Field433" type="radio" class="field radio" value="No" tabindex="3" checked="checked"/>
<label class="choice" for="Field433_1" >
No</label>
</span>
</div>

</fieldset>
</li>


<li id="foli433" class="notranslate      ">
<fieldset>
<![if !IE | (gte IE 8)]>
<legend id="title433" class="desc">
Captive
</legend>
<![endif]>
<!--[if lt IE 8]>
<label id="title433" class="desc">
Do you attend church as much as you'd like to?
</label>
<![endif]-->

<div>
<input id="radioDefault_434" name="Field434" type="hidden" value="" />
<span>
<input id="Field434_0" name="Field434" type="radio" class="field radio" value="Yes" tabindex="2"   
/>
<label class="choice" for="Field434_0" >
Yes</label>
</span>
<span>
<input id="Field434_1" name="Field434" type="radio" class="field radio" value="No" tabindex="3" checked="checked"/>
<label class="choice" for="Field434_1" >
No</label>
</span>
</div>

</fieldset>


<li id="foli1" class="time notranslate leftHalf     ">
<label class="desc2" id="title16" for="Field16">
Start
</label>
<span class="hours">
<input id="Field1" name="Field1" type="text" class="field text" value="" size="2" maxlength="2" tabindex="8" />
<label for="Field1">HH</label>
</span>
<span class="symbol minutes">:</span>
<span class="minutes">
<input id="Field1-1" name="Field1-1" type="text" class="field text" value="" size="2" maxlength="2" tabindex="9" />
<label for="Field1-1">MM</label>
</span>
<span class="symbol seconds">:</span>
<span class="seconds">
 <input id="Field1-2" name="Field1-2" type="text" class="field text" value="" size="2" maxlength="2" tabindex="10" />
<label for="Field1-2">SS</label>
</span>
<span class="ampm">
<select id="Field1-3" name="Field1-3" class="field select" style="width:4em" tabindex="11" >
<option value="AM" selected="selected">AM</option>
<option value="PM" >PM</option>
</select>
<label for="Field1-3">AM/PM</label>
</span>
</li>

<li id="foli4" class="time notranslate rightHalf     ">
<label class="desc2" id="title16" for="Field16">
End
</label>
<span class="hours">
<input id="Field4" name="Field4" type="text" class="field text" value="" size="2" maxlength="2" tabindex="15" />
<label for="Field4">HH</label>
</span>
<span class="symbol minutes">:</span>
<span class="minutes">
<input id="Field4-1" name="Field4-1" type="text" class="field text" value="" size="2" maxlength="2" tabindex="16" />
<label for="Field4-1">MM</label>
</span>
<span class="symbol seconds">:</span>
<span class="seconds">
 <input id="Field4-2" name="Field4-2" type="text" class="field text" value="" size="2" maxlength="2" tabindex="17" />
<label for="Field4-2">SS</label>
</span>
<span class="ampm">
<select id="Field4-3" name="Field4-3" class="field select" style="width:4em" tabindex="18" >
<option value="AM" selected="selected">AM</option>
<option value="PM" >PM</option>
</select>
<label for="Field4-3">AM/PM</label>
</span>
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