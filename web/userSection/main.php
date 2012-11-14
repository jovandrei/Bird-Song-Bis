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
							<a href="#" title="UCLA logo"><img src="images/logo.png" alt="Livemocha Blog"></a>
						</div>
						
						<div class="blog_title">
							<h1><a href="#" title="The Conversation: A blog from Livemocha">Charles E. Taylor</a> <span class="smaller">taylor (Administrator)</span></h1>
						</div>
					</div>

					<div class="blog_subnav">
						<div class="map_small"></div>
						<h3>Consult data, insert elements, and add new users</h3>
						<ul id="tab_wrapper" class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
							<li class="ui-state-default ui-corner-top"><a href="#tabs-1">Location</a></li>
							<li class="ui-state-default ui-corner-top ui-tabs-selected ui-state-active"><a href="#tabs-2" id="tabs2">Consult</a></li>
						</ul>
					</div>
					
					<div id="tabs-1" class="tabs-content ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide2">
					
						<div><!--starts General Information-->
							<div class="post-single">
								<div class="post-single-border-none"></div>
								<h1 class="archive"><a href="#" title="General Information">General Information</a></h1>				
								<div class="line"></div>	
							</div>
							<li class="complex notranslate">
								<div>
									<span>
										<textarea id="locationDescription_0_id"  name="locationDescription_0" 
											class="field select addr" spellcheck="true" rows="1" cols="70" onkeyup=""></textarea>
										<label for="locationDescription_0_id">Location Description</label>
									</span>		
								</div>
							</li>
						</div><!--ends General Information-->
						
						<div><!--starts Absolute Location-->
							<div class="post-single">
								<div class="post-single-border-none"></div>
								<h1 class="archive"><a href="#" title="Drag & Drop">Absolute Location</a></h1>				
								<div class="line"></div>
							</div><!--.post-single-->
							
							<li class="complex notranslate">
								<div>
									<span>
										<input id="latitude_degrees_<?php echo $index?>_id" name="latitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
										<label  class ="nojumpBig" for="latitude_degrees_<?php echo $index?>_id">°</label>
										
										<input id="latitude_minutes_<?php echo $index?>_id" name="latitude_minutes_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
										<label  class ="nojumpBig" for="latitude_minutes_<?php echo $index?>_id">'</label>
										
										<input id="latitude_seconds_<?php echo $index?>_id" name="latitude_seconds_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
										<label  class ="nojumpBig" for="latitude_seconds_<?php echo $index?>_id">"</label>
										
										<select id="latitude_orientation_<?php echo $index?>_id" name="latitude_orientation_<?php echo $index?>" class="field select addr">
											<option value="N" selected="selected">N</option>
											<option value="S" >S</option>
										</select>
											
										<label for="latitude_degrees_<?php echo $index?>_id">Latitude</label>
									</span>	
								</div>
								
								<div>
									<span>
										<input id="longitude_degrees_<?php echo $index?>_id" name="longitude_degrees_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
										<label  class ="nojumpBig" for="longitude_degrees_<?php echo $index?>_id">°</label>
										
										<input id="longitude_minutes_<?php echo $index?>_id" name="longitude_minutes_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
										<label  class ="nojumpBig" for="longitude_minutes_<?php echo $index?>_id">'</label>
										
										<input id="longitude_seconds_<?php echo $index?>_id" name="longitude_seconds_<?php echo $index?>" type="text" class="field text addr" value="" size="5" />
										<label  class ="nojumpBig" for="longitude_seconds_<?php echo $index?>_id">"</label>
										
										<select id="longitude_orientation_<?php echo $index?>_id" name="longitude_orientation_<?php echo $index?>" class="field select addr">
											<option value="W" selected="selected">W</option>
											<option value="E" >E</option>
										</select>
										
										<label for="longitude_degrees_<?php echo $index?>_id">Longitude</label>
									</span>
								</div>
								
								<div>
									<span>
										
										<input id="elevation_<?php echo $index?>_id" name="elevation_<?php echo $index?>" type="text" class="field text addr" value="" size="20" />
										<label  class ="nojump" for="elevation_<?php echo $index?>_id">m.</label>
										<label for="elevation_<?php echo $index?>_id">Elevation</label>
									</span>
								</div>
							</li>
						</div> <!--ends Absolute Location-->		
												
						<div class="post-single">
							<div class="post-single-border-none"></div>
							<h1 class="archive"><a href="#" title="Drag & Drop">Relative Location</a></h1>				
							<div class="line"></div>
				
							<div class="post-content">
								<div class="clear"></div>
								<p>&nbsp;</p>
								<p>UNDER CONSTRUCTION</p>
							</div>	
						</div><!--.post-single-->
						
						<div class="post-single">
							<div class="post-single-border-none"></div>
							<h1 class="archive"><a href="#" title="Drag & Drop">Environment</a></h1>				
							<div class="line"></div>
				
							<div class="post-content">
								<div class="clear"></div>
								<p>&nbsp;</p>
								<p>UNDER CONSTRUCTION</p>
							</div>	
						</div><!--.post-single-->
						
						<div class="post-single">
							<div class="post-single-border-none"></div>
							<h1 class="archive"><a href="#" title="Drag & Drop">Files</a></h1>				
							<div class="line"></div>
				
							<div class="post-content">
								<div class="clear"></div>
								<p>&nbsp;</p>
								<p>UNDER CONSTRUCTION</p>
							</div>	
						</div><!--.post-single-->
						
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
</div><!--#main-->
