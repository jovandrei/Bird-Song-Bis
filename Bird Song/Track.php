<!DOCTYPE html>
<html>
<head>

	<title>
	Track
	</title>

	<?php
 	require_once('/php/data.php');
?>
<!-- CSS -->
<link href="css/structure.css" rel="stylesheet">
<link href="css/form.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/style.css">
<!-- JavaScript -->
<script type="text/javascript" src="scripts/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="scripts/camposDinamicos.js"></script>
<script type="text/javascript" src="scripts/completarCamposDinamicamente.js"></script>
<script type="text/javascript" src="scripts/show_hide_section.js"></script>
<script src="scripts/wufoo.js"></script>

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
action="">

<header id="header" class="info">
<h2>Track</h2>
</header>

<ul>

<li id="foli3" class="notranslate       ">
<label class="desc" id="title3" for="Field3">
Select one
</label>
<div>
<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
<option value=""></option>
<option value="New Track" selected="selected">New Track</option>
</select>
</div>
</li>



<li id="foli8" class="date notranslate leftHalf     ">
<label class="desc" id="title8" for="Field8">
Date
</label>
<span>
<input id="Field8-1" name="Field8-1" type="text" class="field text" value="" size="2" maxlength="2" tabindex="2" />
<label for="Field8-1">MM</label>
</span> 
<span class="symbol">/</span>
<span>
<input id="Field8-2" name="Field8-2" type="text" class="field text" value="" size="2" maxlength="2" tabindex="3" />
<label for="Field8-2">DD</label>
</span>
<span class="symbol">/</span>
<span>
 <input id="Field8" name="Field8" type="text" class="field text" value="" size="4" maxlength="4" tabindex="4" />
<label for="Field8">YYYY</label>
</span>
<span id="cal20">
<img id="pick20" class="datepicker" src="images/calendar.png" alt="Pick a date." />
</span>
</li>

<li id="foli5" class="time notranslate rightHalf     ">
<label class="desc" id="title5" for="Field5">
Time
</label>
<span class="hours">
<input id="Field5" name="Field5" type="text" class="field text" value="" size="2" maxlength="2" tabindex="5" />
<label for="Field5">HH</label>
</span>
<span class="symbol minutes">:</span>
<span class="minutes">
<input id="Field5-1" name="Field5-1" type="text" class="field text" value="" size="2" maxlength="2" tabindex="6" />
<label for="Field5-1">MM</label>
</span>
<span class="symbol seconds">:</span>
<span class="seconds">
 <input id="Field5-2" name="Field5-2" type="text" class="field text" value="" size="2" maxlength="2" tabindex="7" />
<label for="Field5-2">SS</label>
</span>
<span class="ampm">
<select id="Field5-3" name="Field5-3" class="field select" style="width:4em" tabindex="8" >
<option value="AM" selected="selected">AM</option>
<option value="PM" >PM</option>
</select>
<label for="Field5-3">AM/PM</label>
</span>
</li>

<li id="foli5" class="time notranslate leftHalf     ">
<label class="desc" id="title5" for="Field5">
Length
</label>
<span class="hours">
<input id="Field5" name="Field5" type="text" class="field text" value="" size="2" maxlength="2" tabindex="5" />
<label for="Field5">HH</label>
</span>
<span class="symbol minutes">:</span>
<span class="minutes">
<input id="Field5-1" name="Field5-1" type="text" class="field text" value="" size="2" maxlength="2" tabindex="6" />
<label for="Field5-1">MM</label>
</span>
<span class="symbol seconds">:</span>
<span class="seconds">
 <input id="Field5-2" name="Field5-2" type="text" class="field text" value="" size="2" maxlength="2" tabindex="7" />
<label for="Field5-2">SS</label>
</span>
</li>

<li id="foli15" class="notranslate rightHalf     ">
<label class="desc" id="title15" for="Field15">
Sample rate
</label>
<div>
<input id="Field15" name="Field15" type="text" class="field text medium" value="" maxlength="255" tabindex="9" onkeyup="" />
</div>
</li>


<li id="foli325" class="likert notranslate 
col5
 ">
<table cellspacing="0">

<thead>
<tr>
<th>&nbsp;</th>
<td >Very Low</td>
<td >Low</td>
<td >Medium</td>
<td >High</td>
<td >Very High</td>
</tr>
</thead>

<tbody>	

<tr class="statement325">
<th><label for="Field325">Quality</label></th>
<td title="Very Unsatisfied">
<input id="Field325_1" name="Field325" type="radio" tabindex="4" value="Very Unsatisfied" />
<label for="Field325_1">1</label>
</td>
<td title="Unsatisfied">
<input id="Field325_2" name="Field325" type="radio" tabindex="5" value="Unsatisfied" />
<label for="Field325_2">2</label>
</td>
<td title="Neutral">
<input id="Field325_3" name="Field325" type="radio" tabindex="6" value="Neutral" />
<label for="Field325_3">3</label>
</td>
<td title="Satisfied">
<input id="Field325_4" name="Field325" type="radio" tabindex="7" value="Satisfied" />
<label for="Field325_4">4</label>
</td>
<td title="Very Satisfied">
<input id="Field325_5" name="Field325" type="radio" tabindex="8" value="Very Satisfied" checked="checked"/>
<label for="Field325_5">5</label>
</td>
</tr>

<tr class="alt statement330">
<th><label for="Field330">Biological interest</label></th>
<td title="Very Unsatisfied">
<input id="Field330_1" name="Field330" type="radio" tabindex="29" value="Very Unsatisfied" />
<label for="Field330_1">1</label>
</td>
<td title="Unsatisfied">
<input id="Field330_2" name="Field330" type="radio" tabindex="30" value="Unsatisfied" />
<label for="Field330_2">2</label>
</td>
<td title="Neutral">
<input id="Field330_3" name="Field330" type="radio" tabindex="31" value="Neutral" />
<label for="Field330_3">3</label>
</td>
<td title="Satisfied">
<input id="Field330_4" name="Field330" type="radio" tabindex="32" value="Satisfied" />
<label for="Field330_4">4</label>
</td>
<td title="Very Satisfied">
<input id="Field330_5" name="Field330" type="radio" tabindex="33" value="Very Satisfied" checked="checked"/>
<label for="Field330_5">5</label>
</td>
</tr>

</tbody>
</table>
</li>
<div class='more-info'>
	<h4 class='expanded'>Researcher</h4>				
	<div class='more-content'>
		<?php include('/php_sections/ResearcherSections/_ResearcherSections.php'); ?>
		<a href="#"> ------------------------------------------------------ </a>
	</div>
</div>


</li>

<li id="foli16" class="complex notranslate      ">
<label class="desc" id="title16" for="Field16">
Location
</label>

<div>
	<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
		<option value=""></option>
		<option value="New Track" selected="selected"></option>
	</select>
	<label for="Field21">Location</label>
</div>

</li>

<li id="foli16" class="complex notranslate      ">
<label class="desc" id="title16" for="Field16">
Recording Hardware
</label>

<div>
	<select id="Field3" name="Field3" class="field select medium" tabindex="1" > 
		<option value=""></option>
		<option value="New Track" selected="selected"></option>
	</select>
	<label for="Field21">Recording Hardware</label>
</div>

</li>




<li id="foli433" class="notranslate      ">
<fieldset>
<![if !IE | (gte IE 8)]>
<legend id="title433" class="desc">
Noise saturated
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


<li id="foli434" class="notranslate      ">
<fieldset>
<![if !IE | (gte IE 8)]>
<legend id="title434" class="desc">
Recording type
</legend>
<![endif]>
<!--[if lt IE 8]>
<label id="title434" class="desc">
Do you attend church as much as you'd like to?
</label>
<![endif]-->

<div>
<input id="radioDefault_434" name="Field434" type="hidden" value="" />
<span>
<input id="Field434_0" name="Field434" type="radio" class="field radio" value="Yes" tabindex="2"   
/>
<label class="choice" for="Field434_0" >
Microphone</label>
</span>
<span>
<input id="Field434_1" name="Field434" type="radio" class="field radio" value="No" tabindex="3" checked="checked"/>
<label class="choice" for="Field434_1" >
Array</label>
</span>
</div>

</fieldset>
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