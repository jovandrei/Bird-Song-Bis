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
													<h1 class="archive">Researcher</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<?php echo options_section_in2("researcher", 0); ?>
													
													
												</li>
											</div><!--ends Researcher-->
											
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">Track has Subject</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<?php echo options_section_in2("track_has_subject", 0); ?>
													
													
												</li>
											</div><!--ends Track has Subject-->
											
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">Method</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<?php echo options_section_in2("method", 0); ?>
													
													
												</li>
											</div><!--ends Method-->
											
											<div>
												<div class="post-single">
													<div class="post-single-border-none"></div>
													<h1 class="archive">Files</h1>				
													<div class="line"></div>	
												</div>
												<li class="complex notranslate">
													<div>
														<span class="left">
															<input type="file" name="file_<?php echo $index?>" id="file_<?php echo $index?>_id" />
														</span>
														<span class="right">
															<select id="relativePosition<?php echo "_".$index?>_id" name="relativePosition<?php echo "_".$index?>" class="field select addr" >
																	<option value="up hill" selected="selected">Raw audio</option>
																	<option value="along">Processed audio</option>
																	<option value="from">Audio notes</option>
																	<option value="up road">Textgrid</option>
																	<option value="down road">Array sync file</option>
																	<option value="N">Localization file</option>
																	<option value="W" >Key</option>
															</select>
														</span>
														<span>
															<textarea id="fileComment_0_id"  name="locationDescription_0" 
																class="field select addr" spellcheck="true" rows="1" cols="70" onkeyup=""></textarea>
															<label for="locationDescription_0_id">Comments</label>
														</span>
														
													</div>
												</li>
											</div><!--ends Files-->
											
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