<html dir="ltr" lang="en-US" class=" webkit chrome win js webkit chrome win js">
	<?php include('head.php');?>
	<body class="blog cat-1-id" data-twttr-rendered="true">
	
		<div id="container">
			<form class="wufoo" autocomplete="on" enctype="multipart/form-data" method="post" novalidate
						action="../../php/_register_Location.php">
				<ul>
					<div id="main"><!-- this encompasses the entire Web site -->
						<div id="header">
							<header>
								<div class="container container_header">	
									<div id="title"></div><!--#title-->			
									<div class="clear"></div>
								</div><!--.container-->
							</header>
						</div><!--#header-->
							
						<div class="container">
							<div id="content">
								<div class="equal_height">	
								
									<div id="tabs" class="ui-tabs ui-widget ui-widget-content ui-corner-all">
										<div class="blog_subhead">
											<div class="blog_icon">
												<a href="#" title="UCLA logo"><img src="../../images/logo.png" alt="Livemocha Blog"></a>
											</div>
											
											<div class="blog_title">
												<h1><a href="#" title="The Conversation: A blog from Livemocha">Charles E. Taylor</a> <span class="smaller">taylor (Administrator)</span></h1>
											</div>
										</div>
					
										<div class="blog_subnav">
											<div class="map_small"></div>
											<h3>Consult data, insert elements, and add new users</h3>
											<ul id="tab_wrapper" class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
												<li class="ui-state-default ui-corner-top"><a href="#tabs-1">Track has Subject</a></li>
												<li class="ui-state-default ui-corner-top ui-tabs-selected ui-state-active"><a href="#tabs-2" id="tabs2">Consult</a></li>
											</ul>
										</div>
										
										<div id="tabs-1" class="tabs-content ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide2">
										
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">Track</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<?php echo options_section_in2("track", 0); ?>
													
													
												</li>
											</div><!--ends Track-->
											
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">Subject</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<?php echo options_section_in2("subject", 0); ?>
													
													
												</li>
											</div><!--ends Subject-->
											
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">Location</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<?php echo options_section_in2("location", 0); ?>
													
													
												</li>
											</div><!--ends Location-->
											
											<div>
											
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">General Information</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
												
													<div class = "right">
														<span class = "left">
															<label class ="nojump" for="relativeDistance<?php echo "_".$index?>_id">Captive</label>
															<input type="checkbox" name="vehicle" value="Bike" class="field text addr">
														</span>
														
													</div>
													
													<div>
														<span>
															<label class ="nojump" for="relativeDistance<?php echo "_".$index?>_id">Distance from recordist (min / max) </label>
															<div>
															<input id="relativeDistance<?php echo "_".$index?>_id" name="relativeDistance<?php echo "_".$index?>" type="text" class="field text addr" value="" size="20" />
															<label class ="nojump" for="relativeDistance<?php echo "_".$index?>_id">m.</label>
															<input id="relativeDistance<?php echo "_".$index?>_id" name="relativeDistance<?php echo "_".$index?>" type="text" class="field text addr" value="" size="20" />
															<label class ="nojump" for="relativeDistance<?php echo "_".$index?>_id">m.</label>
															</div>
														</span>
													</div>
													
													<div class="clear"></div>
													<p>&nbsp;</p>
													
													
													<div>
														<span class="left">
															<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
															<label for="latitude_degrees_<?php echo $index?>_id">Recording date (yyyy/mm/dd)</label>
														</span>
														
														<span class="right">
															<select id="relativePosition<?php echo "_".$index?>_id" name="relativePosition<?php echo "_".$index?>" class="field select addr" >
																<option value="True" selected="selected">True</option>
																<option value="False">False</option>
																<option value="Unknown">Unknown(s)</option>
															</select>
															<label for="latitude_degrees_<?php echo $index?>_id">stimulated</label>
														</span>
														
														<span class="left">
															<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
															<label for="latitude_degrees_<?php echo $index?>_id">Recording length (hh:mm:ss)</label>
														</span>
														
														<span class="right">
															<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
															<label for="latitude_degrees_<?php echo $index?>_id">Aprox vocalization length (hh:mm:ss)</label>
														</span>
														
														<span class="left">
															<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
															<label for="latitude_degrees_<?php echo $index?>_id">quality rating</label>
														</span>	
														
														<span class="right">
															<select id="relativePosition<?php echo "_".$index?>_id" name="relativePosition<?php echo "_".$index?>" class="field select addr" >
																<option value="Primary subject" selected="selected">Primary subject</option>
																<option value="Background sound">Background sound</option>
															</select>
															<label for="latitude_degrees_<?php echo $index?>_id">Subject importance</label>
														</span>
														
														
														
														
													</div>
													
													
													
												</li>
											</div><!--ends General Information-->
											
											<li class="buttons">
												<div>
													<button id="saveForm" name="saveForm" class="btTxt" type="submit" value="Submit">Add</button>
												</div>
											</li>
										</div>
						
										<div id="tabs-2" class="tabs-content ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide2">
											<div class="post-single">
												<div class="post-single-border-none"></div>
												<h1 class="archive"><a href="#" title="Drag & Drop">Consult</a></h1>				
												<div class="line"></div>
									
												<div class="post-content">
													<div class="clear"></div>
													<p>&nbsp;</p>
													<p>UNDER CONSTRUCTION
													</p>
												</div>	
											</div><!--.post-single-->
										</div>
										
									</div>
								</div>
							</div><!--#content-->
							<?php include('sidebar.php');?>
							<div class="clear"></div>
						</div><!--.container-->
						
						<div id="header">
							<header>
								<div class="container container_header">	
									<div id="title"></div><!--#title-->			
									<div class="clear"></div>
								</div><!--.container-->
							</header>
						</div><!--#header-->
					</div><!--#main-->
				</ul>
			</form> 
		</div>								
		
		<?php include('scripts.php');?>

	</body>
</html>