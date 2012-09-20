<div style="display: block; " id="advanced_filter_main_dropdown" class="box18 headerBar1More">
	<div class="mid">
		<form id="qaForm" action="" onsubmit="qa_submit(); return false;">
			<div class="advFilter1">
				<div class="advFilter11">
					<div class="filterAvgRating left">
						<h5>Distance from markers</h5>
						<div class="formField">
							<strong>greater than</strong>
							<input type="text" name="rating_greater" value="">
							
						</div>
						<div class="formField">
							<strong>less than</strong>
							<input type="text" name="rating_less" value="">
						</div>
					</div> <!-- / .avgRating -->

					<div class="filterYearStudioEps">
						<h5>Latitude</h5>
						<div class="formField">
							<input name="year" type="text" id="year" value="">
							<strong>to</strong>
							<input type="text" name="to_year" value="" id="to_year">
						</div>
						
						<h5>Longitude</h5>
						<div class="formField">
							<input type="text" name="episodes" value="" id="episodes">
							<strong>to</strong>
							<input type="text" name="to_episodes" value="" id="to_episodes">
						</div>
						
						<h5>Weather</h5>
						<div class="formField">
							<input class="formStudio ac_input" type="text" name="studio" value="" autocomplete="off">
						</div>

					</div> <!-- / .filterYearStudioEps -->

					<div class="filterKey">
						<h5>Key: </h5>
						<div class="left">
							<img class="left" 
							src="http://www.anime-planet.com/images/layout/includeBG.gif" alt="include icon"> 
							<span>- include</span>
						</div>
						<div class="left">
							<img class="left" 
							src="http://www.anime-planet.com/images/layout/excludeBG.gif" alt="exclude icon"> 
							<span>- exclude</span>
						</div>
						<div class="clear"></div>
					</div> <!-- / .filterKey -->
					
					<div class="filterStatus">
						<h5>Markers</h5>
						<ul class="gridList">
							<li><a class="filter inclusive" href="javascript:;"><span value="1" class="null">Red thing</span></a></li>
							<li><a class="filter inclusive" href="javascript:;"><span value="2" class="null">Garden</span></a></li>
							<li><a class="filter inclusive" href="javascript:;"><span value="3" class="null">Big Tower</span></a></li>
							<li><a class="filter inclusive" href="javascript:;"><span value="4" class="null">Green house</span></a></li>
							<li><a class="filter inclusive" href="javascript:;"><span value="5" class="null">NASA</span></a></li>
							<li><a class="filter inclusive" href="javascript:;"><span value="6" class="null">Field</span></a></li>
						</ul>
						<div class="clear"></div>
					</div> <!-- / .filterType -->
					
				</div> <!-- / .advFilter11 -->

				<div class="advFilter12">
					<div class="filterShowOnly">
						<h5>Show only</h5>
						<ul>
							<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="is_completed" value="1">
								<span><span class="off">complete</span></span>
							</a></li>
							<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="is_ongoing" value="1">
								<span><span class="off">incomplete</span></span>
							</a></li>
							<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="is_blank" value="1">
								<span><span class="off">blank</span></span>
							</a></li>
							<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="no_recs" value="1">
								<span><span class="off">marked w/no recs</span></span>
							</a></li>
						</ul>
					</div> <!-- / .filterShowOnly -->
				</div> <!-- / .advFilter12 -->
			</div> <!-- / .advFilter1 -->

			<div class="advFilter2">
				<div class="filterTags">
					<h5>Vegetation</h5>

					<ul id="advanced_tags" class="gridList">
						<li><a class="filter ternary" href="javascript:;"><span value="211" class="null">Tundra</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="179" class="null">Taiga</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="198" class="null">Temperate broadleaf</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="124" class="null">Temperate steppe</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="529" class="null">Subtropical rainforest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Monsoon forest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Desert</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Xeric shrubland</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="124" class="null">Dry steppe</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="529" class="null">Semidesert</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Grass savanna</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Tree savanna</span></a></li>
					</ul>
					
					<ul id="advanced_more_tags" class="gridList filterMoreTags" style="display: none;">
						<li><a class="filter ternary" href="javascript:;"><span value="211" class="null">Tundra</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="179" class="null">Taiga</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="198" class="null">Temperate broadleaf</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="124" class="null">Temperate steppe</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="529" class="null">Subtropical rainforest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Monsoon forest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Desert</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Xeric shrubland</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="124" class="null">Dry steppe</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="529" class="null">Semidesert</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Grass savanna</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Tree savanna</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Subtropical dry forest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Tropical rainforest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Alpine tundra</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Montane forests</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="211" class="null">Tundra</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="179" class="null">Taiga</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="198" class="null">Temperate broadleaf</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="124" class="null">Temperate steppe</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="529" class="null">Subtropical rainforest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Monsoon forest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Desert</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Xeric shrubland</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="124" class="null">Dry steppe</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="529" class="null">Semidesert</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Grass savanna</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Tree savanna</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Subtropical dry forest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Tropical rainforest</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Alpine tundra</span></a></li>
						<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Montane forests</span></a></li>
					</ul>
		
					<div class="tagsMore">
						<a id="advanced_filter_tags" class="moreTagsSmall" href="javascript:;">+ more Vegs</a>
					</div>
					
				</div> <!-- / .filterTags -->
			</div> <!-- / .filter2 -->

			<input class="buttonApplyFilters right" type="submit" value="">

		</form>

	</div>
	<div class="bot"></div>
</div> <!-- .box18 -->