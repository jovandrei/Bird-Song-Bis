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
												<li class="ui-state-default ui-corner-top"><a href="#tabs-1">Analysis</a></li>
												<li class="ui-state-default ui-corner-top ui-tabs-selected ui-state-active"><a href="#tabs-2" id="tabs2">Consult</a></li>
											</ul>
										</div>
										
										<div id="tabs-1" class="tabs-content ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide2">
										
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">Subject Species</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<?php echo options_section_in2("subject_species", 0); ?>
												</li>
											</div><!--ends Subject Species-->
											
											
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">General Information</h1>
													<div class="line"></div>	
												</div>
												
												<li class="complex notranslate">		
													<div>
														<span class="left">
															<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
															<label for="latitude_degrees_<?php echo $index?>_id">name</label>
														</span>
														<span class="right">
																<select id="relativePosition<?php echo "_".$index?>_id" name="relativePosition<?php echo "_".$index?>" class="field select addr" >
																	<option value="up hill" selected="selected">up hill</option>
																	<option value="along">along</option>
																	<option value="from">from</option>
																	<option value="up road">up road</option>
																	<option value="down road">down road</option>
																	<option value="N">N</option>
																	<option value="W" >W</option>
																	<option value="S" >S</option>
																	<option value="E" >E</option>
																	<option value="NW" >NW</option>
																	<option value="NE" >NE</option>
																	<option value="SW" >SW</option>
																	<option value="SE" >SE</option>
																</select>
																<label for="latitude_degrees_<?php echo $index?>_id">sex</label>
														</span>
														<span class="left">
															<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
															<label for="latitude_degrees_<?php echo $index?>_id">marked id</label>
														</span>
														<span>
															<textarea id="fileComment_0_id"  name="locationDescription_0" 
																class="field select addr" spellcheck="true" rows="1" cols="70" onkeyup=""></textarea>
															<label for="locationDescription_0_id">notes</label>
														</span>
													</div>
													
												</li>
											</div><!--ends Relative Location-->
											
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