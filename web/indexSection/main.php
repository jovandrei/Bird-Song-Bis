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
		<style>
			#sidebar-left ul li.current-menu-item a {
				background				:	#9fae00;
				color					:	#FFF;
			}
			
			#sidebar-left ul li.current-menu-item a.parent, #sidebar-left ul li.current-menu-parent a {
				background				:	#9fae00 url("http://dzggv69fpq0a3.cloudfront.net/wp-content/themes/live-mocha-theme/images/pag-nav.png") no-repeat 5px 3px;
				color					:	#FFF;
			}
			
			#sidebar-left ul li.current-menu-item a.parent:hover, #sidebar-left ul li.current-menu-parent a:hover {
				background				:	#9fae00 url("http://dzggv69fpq0a3.cloudfront.net/wp-content/themes/live-mocha-theme/images/pag-nav.png") no-repeat 5px 3px;
				color					:	#FFF;
			}
			
			#sidebar-left ul li.current-menu-item ul li a:hover {
				color				:	#9fae00;
				background			:	transparent;
			}
			
			#sidebar-left ul li.current-menu-parent ul li.current-menu-item a, #sidebar-left ul li.current-menu-parent ul li.current-menu-item a:hover {
				color				:	#9fae00;
				background			:	transparent;
			}
		
		</style>

		<div id="content-full">
			<?php include('main_login.php');?>
		</div><!--#content-->
	</div><!--.container-->
</div><!--#main-->