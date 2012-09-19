<html>
	<head>
		
	</head>
	
	<body>
		<div id="themeBG">
			<div id="shellContent"><div class="shellWhite">
				<div id="prof">
					<div class="tabPanelRight left">
						<div class="tabPanel2 box2 ">			
							<div class="mid profContent">
								<h2 class="headerAnimeList2"><span>Location</span></h2>
								
								<div class="animeFilter headerBar1Theme">
									<h4>filter</h4>
									<form id="qfForm" onsubmit="return false;">
										<div class="headerBarBox">
											<div class="filterSideButtons">
												<a id="advanced_filter" class="button4 advFilter" href="javascript:;">
													<span>
														<span class="showMore">show  filters</span>
													</span>
												</a>
											</div>
										</div> <!-- / .headerBarBox -->
									</form>

									<div id="qf_overlay" class="deact" style="display: none"></div>
								</div> <!-- / .animeFilter .headerBarTheme -->
									
									
									<div style="display: none; " id="advanced_filter_main_dropdown" class="box18 headerBar1More">
										<div class="mid">
											<form id="qaForm" action="" onsubmit="qa_submit(); return false;">
												<div class="advFilter1">
													<div class="advFilter11">
														<div class="filterAvgRating left">
															<h5>Avg Rating</h5>
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
															<h5>Year</h5>
															<div class="formField">
																<input name="year" type="text" id="year" value="">
																<strong>to</strong>
																<input type="text" name="to_year" value="" id="to_year">
															</div>
															<h5>Studio</h5>
															<div class="formField">
																<input class="formStudio ac_input" type="text" name="studio" value="" autocomplete="off">
															</div>

															<h5>Episodes</h5>
															<div class="formField">
																<input type="text" name="episodes" value="" id="episodes">
																<strong>to</strong>
																<input type="text" name="to_episodes" value="" id="to_episodes">
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
															<h5>Status</h5>
															<ul class="gridList">
																<li><a class="filter inclusive" href="javascript:;"><span value="1" class="null">Watched</span></a></li>
																<li><a class="filter inclusive" href="javascript:;"><span value="2" class="null">Watching</span></a></li>
																<li><a class="filter inclusive" href="javascript:;"><span value="3" class="null">Dropped</span></a></li>
																<li><a class="filter inclusive" href="javascript:;"><span value="4" class="null">Want to Watch</span></a></li>
																<li><a class="filter inclusive" href="javascript:;"><span value="5" class="null">Stalled</span></a></li>
																<li><a class="filter inclusive" href="javascript:;"><span value="6" class="null">Won't Watch</span></a></li>
															</ul>
															<div class="clear"></div>
														</div> <!-- / .filterType -->
														
													</div> <!-- / .advFilter11 -->

													<div class="advFilter12">
														<div class="filterShowOnly">
															<h5>Show only</h5>
															<ul>
																<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="is_completed" value="1">
																	<span><span class="off">completed</span></span>
																</a></li>
																<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="is_ongoing" value="1">
																	<span><span class="off">ongoing</span></span>
																</a></li>
																<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="unmarked" value="1">
																	<span><span class="off">unmarked</span></span>
																</a></li>
																<li><a class="switch" href="javascript:;" onclick="filter_button_update(this, '')" name="is_unaired" value="1">
																	<span><span class="off">unaired</span></span>
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
														<h5>Tags</h5>

														<ul id="advanced_tags" class="gridList">
															<li><a class="filter ternary" href="javascript:;"><span value="211" class="null">Action</span></a></li>
															<li><a class="filter ternary" href="javascript:;"><span value="179" class="null">Adventure</span></a></li>
															<li><a class="filter ternary" href="javascript:;"><span value="198" class="null">Comedy</span></a></li>
														</ul>
														
														<ul id="advanced_more_tags" class="gridList filterMoreTags" style="display: none;">
															<li><a class="filter ternary" href="javascript:;"><span value="124" class="null">Abstract</span></a></li>
															<li><a class="filter ternary" href="javascript:;"><span value="529" class="null">Alice in Wonderland</span></a></li>
															<li><a class="filter ternary" href="javascript:;"><span value="235" class="null">Aliens</span></a></li>
														</ul>
											
														<div class="tagsMore">
															<a id="advanced_filter_tags" class="moreTagsSmall" href="javascript:;">+ more tags</a>
														</div>
														
													</div> <!-- / .filterTags -->
												</div> <!-- / .filter2 -->

												<input class="buttonApplyFilters right" type="submit" value="">

											</form>
											<div class="clear"></div>
										</div>
										<div class="bot"></div>
									</div> <!-- .box18 -->
									
									<div class="clear"></div>
									
									<div class="pagination">
										<ul class="pag">
											<li class="prev">
												<span>« Previous</span>
											</li>
											<li class="pagSelected">1</li>
											<li class="next"><span>Next »</span></li>
										</ul>
										<span class="pagLabel">per page 
											<select name="per_page" onchange="updatePerPage(this)">
												<option value="25" selected="selected">25</option>
												<option value="50">50</option>
												<option value="100">100</option>
												<option value="250">250</option>
												<option value="500">500</option>
											</select>
										</span>
									</div>
								 
									<div class="clear"></div>
	
									<div class="alpha box22Theme">
										<div class="top"></div>
										<div class="mid">
											<h5>alphabetical: </h5>
											<ul>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/9">#</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/a">A</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/b">B</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/c">C</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/d">D</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/e">E</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/f">F</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/g">G</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/h">H</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/i">I</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/j">J</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/k">K</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/l">L</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/m">M</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/n">N</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/o">O</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/p">P</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/q">Q</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/r">R</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/s">S</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/t">T</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/u">U</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/v">V</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/w">W</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/x">X</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/y">Y</a></li>
												<li><a rel="nofollow" href="/users/maximillian/anime/watching/z">Z</a></li>
											</ul>
											<span>
												<a href="/users/maximillian/anime/watching/all">show all</a>
											</span>
											<div class="clear"></div>
										</div> <!-- / .mid -->
									</div> <!-- / .alpha .box1 -->
	
									<table class="entryTable ">
										<tbody>
											<tr>
												<th class="tableTitle"><a rel="nofollow" href="?sort=title&amp;order=desc">Title</a></th>
												<th class="tableType"><a rel="nofollow" href="?sort=type&amp;order=asc">Type</a></th>
												<th class="tableYear"><a rel="nofollow" href="?sort=year&amp;order=asc">Year</a></th>
												<th class="tableStatusEpsRating">
													<span class="status"><a rel="nofollow" href="?sort=status&amp;order=asc">Status</a></span> 
													<span class="eps"><a rel="nofollow" href="?sort=eps&amp;order=asc">Eps</a></span>
													<span class="rating"><a rel="nofollow" href="?sort=rating&amp;order=desc">Rating</a></span>
												</th>
											</tr>
											
											<tr class="row1">
												<td class="tableTitle"><a href="/anime/hunter-x-hunter-2011">Hunter x Hunter (2011)</a></td>
												<td class="tableType">TV</td>
												<td class="tableYear">2011</td>
												<td class="tableStatusEpsRating">
													<div class="myListBar">
														<form action="" class="anime4336 {mode:'anime', id:4336}">
															<span id="uid0" class="display4336 status2"></span> <!-- status box -->
															<select name="status" class="stat4336" id="uid1" onchange="set_status(this)">
																<option value="0"></option>
																<option value="2" selected="">Watching</option>
																<option value="4">Want to Watch</option>
																<option value="5">Stalled</option>
																<option value="3">Dropped</option>
																<option value="6">Won't Watch</option>
															</select>
									
															<select name="episodes" class="episodes4336" id="uid2" onchange="set_episodes(this)">
																<option value="0">Eps</option>
																<option value="1">1</option>
																<option value="46">46</option>
																<option value="47" selected="selected">47</option>
															</select>
													
															<div id="rate3" class="starrating" name="4">&nbsp;
																<div class="cancel">
																	<a href="#0" title="Cancel Rating">Cancel Rating</a>
																</div>
																<div class="star star-left on">
																	<a href="#0.5" title="Give it 0.5/5">0.5</a>
																</div>
																<div class="star star-right on">
																	<a href="#1" title="Give it 1/5">1</a>
																</div>
																<div class="star star-left on">
																	<a href="#1.5" title="Give it 1.5/5">1.5</a>
																</div>
															</div>
														</form>
														<img style="display:none;" class="loader4336 imageLoader" id="uid4"
														src="/images/layout/ajax-loader.gif" width="14" height="14" alt="">
													</div> <!-- / .myListBar -->
												</td>
											</tr>	
										</tbody>
									</table>
									
									<div class="pagination">
										<ul class="pag">
											<li class="prev">
												<span>« Previous</span>
											</li>
											<li class="pagSelected">1</li>
											<li class="next"><span>Next »</span></li>
										</ul>
										<span class="pagLabel">per page 
											<select name="per_page" onchange="updatePerPage(this)">
												<option value="25" selected="selected">25</option>
												<option value="50">50</option>
												<option value="100">100</option>
												<option value="250">250</option>
												<option value="500">500</option>
											</select>
										</span>
									</div>
									
								</div> <!-- / .mid -->
							<div class="bot"></div>
							</div> <!-- /. profContent .box2-->
						</div> <!-- / .profRight -->
					</div> <!-- / #prof -->
				<div style="clear:both;"></div>
				</div>
			</div> <!-- / .shellWhite  / #shellContent -->
		</div> <!-- / #themeBG -->
	</body>
</html>