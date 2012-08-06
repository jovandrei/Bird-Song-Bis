var nextVegetation = 1;
document.cookie ='nextVegetation='+nextVegetation+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextResearcher = 1;
document.cookie ='nextResearcher='+nextResearcher+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextTrack = 1;
document.cookie ='nextTrack='+nextTrack+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextFile = 1;
document.cookie ='nextFile='+nextFile+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextMethod = 1;
document.cookie ='nextMethod='+nextMethod+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextLocation = 1;
document.cookie ='nextLocation='+nextLocation+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextRecordingHardware = 1;
document.cookie ='nextRecordingHardware='+nextRecordingHardware+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextTrack_has_Subject = 1;
document.cookie ='nextTrack_has_Subject='+nextTrack_has_Subject+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextChannel = 1;
document.cookie ='nextChannel='+nextChannel+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

var nextSubArray = 1;
document.cookie ='nextSubArray='+nextSubArray+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

function AddSubarray(){

	nextSubArray++;
	document.cookie ='nextSubArray='+nextSubArray+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	campo = '<select id="Field3" name="Field3" class="field select medium" tabindex="1" > ';
	campo += '<option value=""></option>';
	campo += '<option value="New Channel" selected="selected"></option>';
	campo += '</select>';
	campo += '<label for="Field21">SubArray '+nextSubArray+'</label>';
		$("#subArrayExtra").append(campo);
}


function AddVegetation() {

	document.cookie ='nextVegetation='+nextVegetation+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

	campo = '<label class="desc2" id="title16" for="Field16">';
	campo += 'Vegetation '+(nextVegetation+1)+'</label>';

	campo += '<span> <input id="average_density'+nextVegetation+'" name="average_density'+nextVegetation+'" type="text" class="field text addr" value="" size="20" tabindex="'+(nextVegetation + 15)+'" />';
	campo += '<label for="Field2">Average density</label></span>';

	campo += '<span><input id="projected_cover'+nextVegetation+'" name="projected_cover'+nextVegetation+'" type="text" class="field text addr" value="" size="20" tabindex="'+(nextVegetation + 15)+'" />';
	campo += '<label for="Field2">Projected cover</label></span>';

	campo += '<span ><input id="average_height'+nextVegetation+'" name="average_height'+nextVegetation+'" type="text" class="field text addr" value="" size="20" tabindex="'+(nextVegetation + 15)+'" />';
	campo += '<label for="Field2">Average height</label></span>';

	campo += '<span class="left distance"><input id="scientific_name'+nextVegetation+'" name="scientific_name'+nextVegetation+'" type="text" class="field text addr" value="" maxlength="15" tabindex="'+(nextVegetation + 15)+'" />';
	campo += '<label for="Field20">Scientific name</label></span>';

	campo += '<span class="right distance"><input id="common_name'+nextVegetation+'" name="common_name'+nextVegetation+'" type="text" class="field text addr" value="" maxlength="15" tabindex="'+(nextVegetation + 15)+'" />';
	campo += '<label for="Field20">Common name</label></span>';
	$("#camposExtras").append(campo);
	nextVegetation++;
}


function AddResearcher(){
	nextResearcher++;
	document.cookie ='nextResearcher='+nextResearcher+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

	campo = '<select id="Field3" name="Field3" class="field select medium" tabindex="1" > ';
	campo += '<option value=""></option>';
	campo += '<option value="New Researcher" selected="selected"></option>';
	campo += '</select>';
	campo += '<label for="Field21">Track '+nextResearcher+'</label>';
	$("#researcherExtra").append(campo);


}


function AddTrack(){
	nextTrack++;
	document.cookie ='nextTrack='+nextTrack+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	campo = '<select id="Field3" name="Field3" class="field select medium" tabindex="1" > ';
	campo += '<option value=""></option>';
	campo += '<option value="New Track" selected="selected"></option>';
	campo += '</select>';
	campo += '<label for="Field21">Track '+nextTrack+'</label>';
		$("#trackExtra").append(campo);

}


function AddFile(){
	nextFile++;
	document.cookie ='nextFile='+nextFile+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

	campo = '<span>'
		campo += '<label class="desc2" id="title16" for="Field16">'
		campo += 'File '+nextFile+''
		campo += '</label>'
		campo += '<input id="Field20" name="Field20" type="file" class="boton2" size="12" tabindex="5" />'

		campo += '<label for="Field21">Comments</label>'
		
		campo += '<textarea id="Field23"  name="comments" class="field select addr" spellcheck="true" rows="5" '
			campo += 'cols="72" tabindex="17" onkeyup="">'
		campo += '</textarea>'


		campo += '<label for="Field21">Type of audio</label>'

		campo += '<input id="radioDefault_43'+nextFile+'" name="Field43'+nextFile+'" type="hidden" value="" />'
		
		campo += '<span>'
		campo += '<input id="Field43'+nextFile+'_0" name="Field43'+nextFile+'" type="radio" class="field radio" value="Raw" tabindex="2"  checked="checked" />'
		campo += '<label class="choice" for="Field43'+nextFile+'_0" >'
		campo += 'Raw</label>'
		campo += '</span>'

		campo += '<span>'
		campo += '<input id="Field43'+nextFile+'_1" name="Field43'+nextFile+'" type="radio" class="field radio" value="Processed" tabindex="3" />'
		campo += '<label class="choice" for="Field43'+nextFile+'_1" >'
		campo += 'Processed</label>'
		campo += '</span>'

		campo += '<span>'
		campo += '<input id="Field43'+nextFile+'_2" name="Field43'+nextFile+'" type="radio" class="field radio" value="Notes" tabindex="4"/>'
		campo += '<label class="choice" for="Field43'+nextFile+'_2" >'
		campo += 'Notes</label>'
		campo += '</span>'

	campo += '</span>'

		$("#fileExtra").append(campo);

}

function AddMethod(){
	nextFile++;
	document.cookie ='nextMethod='+nextMethod+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';

	campo = '<span class="full text">';
	campo += '<label class="desc2" id="title16" for="Field16">';
	campo += 'Method '+nextFile+'';
	campo += '</label>';
	campo += '<textarea id="Field23"  name="comments" class="field select addr" spellcheck="true" rows="5" ';
	campo += 'cols="72" tabindex="17" onkeyup="">';
	campo += '</textarea>';
	campo += '<label for="Field21">Comments</label>';
	campo += '</span>';
	$("#methodExtra").append(campo);

}



function AddTrack_has_Subject(){
	nextTrack_has_Subject++;
	document.cookie ='nextTrack_has_Subject='+nextTrack_has_Subject+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	campo = '<select id="Field3" name="Field3" class="field select medium" tabindex="1" > ';
	campo += '<option value=""></option>';
	campo += '<option value="New Track has Subject" selected="selected"></option>';
	campo += '</select>';
	campo += '<label for="Field21">Track has Subject '+nextTrack_has_Subject+'</label>';
		$("#track_has_SubjectExtra").append(campo);

}

function AddChannel(){
	nextChannel++;
	document.cookie ='nextChannel='+nextChannel+'; expires=Thu, 2 Aug 2021 20:47:11 UTC; path=';
	campo = '<select id="Field3" name="Field3" class="field select medium" tabindex="1" > ';
	campo += '<option value=""></option>';
	campo += '<option value="New Channel" selected="selected"></option>';
	campo += '</select>';
	campo += '<label for="Field21">Channel '+nextChannel+'</label>';
		$("#channelExtra").append(campo);

}