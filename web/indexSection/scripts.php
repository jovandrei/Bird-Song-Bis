<script type="text/javascript" src="http://dzggv69fpq0a3.cloudfront.net/wp-content/themes/live-mocha-theme/js/jquery.fancybox-1.3.4.pack.js?e83a2c"></script>
<link rel="stylesheet" href="http://dzggv69fpq0a3.cloudfront.net/wp-content/themes/live-mocha-theme/css/jquery.fancybox-1.3.4.css?e83a2c" type="text/css">

<script type="text/javascript">
	jQuery.noConflict();
	jQuery(document).ready(function() {				
		jQuery('.jss_lightbox').fancybox({
			'overlayColor'		: '#503D29',
			'overlayOpacity'	: 0.85,
			'centerOnScroll'	: true,
			'titlePosition'		: 'outside'
		});
		
	    jQuery("#lang_sel ul:first-child").mouseover(function(){
			jQuery("#lang_sel ul").addClass("lang_sel_hovered_wrapper");
			jQuery("#lang_sel ul li ul li:last-child").addClass("lang_sel_rad_bot");
			
	    }).mouseout(function(){
			jQuery("#lang_sel ul").removeClass("lang_sel_hovered_wrapper");
			jQuery("#lang_sel ul li ul li:last-child").removeClass("lang_sel_rad_bot");
		  
	    });
		
	    jQuery("#lang_sel li ul li a").mouseover(function(){
			jQuery(this).addClass("lang_sel_hovered");
			
	    }).mouseout(function(){
			jQuery(this).removeClass("lang_sel_hovered");
		  
	    });
		
	});
</script>
	
		
<script type="text/javascript">
	jQuery.noConflict();
	jQuery(document).ready(function() {
		jQuery("ul.sub-menu").parent().children(':first-child').addClass('parent');
		
	});
</script>
	
		
		
<script type="text/javascript">
	jQuery.noConflict();
	jQuery(document).ready(function() {
			
		function slider_initCallback(carousel) {
			
			jQuery("#gallery_next").bind('click', function() {
				carousel.next();
				return false;
			});
			
			jQuery("#gallery_prev").bind('click', function() {
				carousel.prev();
				return false;
			});
				
		};
				
		jQuery("#gallery_list").jcarousel({
			// Configuration goes here
			initCallback: slider_initCallback,
			buttonNextHTML: null,
	        buttonPrevHTML: null,
	        animation: 850,
			scroll: 1
		});
		
	});
</script>
	
<!--Plugin WP Missed Schedule 2011.0920.2011 Active-->
<script type="text/javascript" src="http://classroom.livemocha.com/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js?e83a2c"></script>
<script type="text/javascript">
/* <![CDATA[ */
var _wpcf7 = {"loaderUrl":"http:\/\/classroom.livemocha.com\/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","sending":"Sending ...","cached":"1"};
/* ]]> */
</script>
<script type="text/javascript" src="http://classroom.livemocha.com/wp-content/plugins/contact-form-7/includes/js/scripts.js?e83a2c"></script>
<script type="text/javascript" src="http://dzggv69fpq0a3.cloudfront.net/wp-includes/js/jquery/ui/jquery.ui.tabs.min.js?e83a2c"></script>

	
<script type="text/javascript">
jQuery(document).ready(function() {		
	jQuery("#submit_login").click(function() {
		var timezone = jstz.determine();
		var check = checkform();
		if (check) {
			data2 = "http://127.0.0.1/Projecto-Idiomas/index2.php";
			window.location.href = data2;
			var str2 = jQuery("#login_form").serialize();
			jQuery.ajax({type: "POST", url: "http://classroom.livemocha.com/wp-content/themes/live-mocha-theme/process-login2.php", data: str2+"&timezone="+timezone.name(), success: function(data)
			{
				
				if(data !== '') {
					//alert(data);
					window.location.href = data2;
					
				} else {			
					jQuery("#signingup_error").html("Login Error! Have you forgotten your password?").fadeIn("fast");
				}
				
			}	
			});
		}
		return false;
		
	});
	
	jQuery("#log").click(function(){
		jQuery("#log_error").fadeOut("slow");
	});
	
	jQuery("#pwd").click(function(){
		jQuery("#pwd_error").fadeOut("slow");
	});
	
		
			
});
</script>

<script language="JavaScript">
	function checkform() {
		
		if (document.login_form.log.value == ''){
				jQuery("#log_error").html("Your ID is missing!").fadeIn("fast");
				return false;
		}
		
		if (document.login_form.pwd.value == ''){
				jQuery("#pwd_error").html("Your password is missing!").fadeIn("fast");
				return false;
		} 
		return true;
	}

</script>