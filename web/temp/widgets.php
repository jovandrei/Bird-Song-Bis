<div class="widget-area">
	<ul><h3>Subscribe</h3>
		<script type="text/javascript">
			$jean = jQuery.noConflict();
			$jean(document).ready(function($) {
			$("#frmSubscribe").submit(function(event){
					event.preventDefault();
					if ( $("#email").val() ){
						var reg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-]{1,})+\.)+([a-zA-Z0-9]{2,})+$/;
						if( !reg.test($("#email").val()) ){
							$("#subscribeInfo").html("<span class=\"error\">Invalid email id.</span>");
						}else{
							$("#subscribeInfo").html("<strong>Loading.......</strong>");
							var data = "email="+$("#email").val();
							var url = "http://livemocha.com/wp-content/plugins/easy-automatic-newsletter/includes/ean-subscription.php";
							$.post(url, data, function(response) {
								$("#subscribeInfo").html(response);
								$("#email").val("");
							});
						}
					}else{
						$("#subscribeInfo").html("<span class=\"error\">Please enter email id.</span>");
					}
				});
			});
		</script>
		<div id="ean">
			<form action="" id="frmSubscribe" method="post">
				<span id="subscribeInfo"></span>
					<input type="text" name="email" id="email" value="Email" onclick="if (this.defaultValue==this.value) this.value=''" onblur="if (this.value=='') this.value=this.defaultValue">
					<input type="submit" name="Subscribe" value="Subscribe">
					<center><span class="powered-by">Powered by <br>Easy Automatic Newsletter Lite v2.7</span></center>
			</form>
		</div>
	</ul>
</div>


<div class="widget-area">
	<ul><h3>Search</h3>
		<form role="search" method="get" id="searchform" action="http://livemocha.com">
		<div>
			<label class="screen-reader-text" for="s">Search for:</label>
			<input type="text" value="" name="s" id="s">
			<input type="submit" id="searchsubmit" value="Search">
		</div>
		<input type="hidden" name="lang" value="en"></form>
	</ul>
</div>