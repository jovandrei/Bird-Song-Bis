
<script type="text/javascript" src="https://d3ma4po7pyaqu9.cloudfront.net/wp-content/themes/live-mocha-theme/js/jquery.fancybox-1.3.4.pack.js?e83a2c"></script>
<link rel="stylesheet" href="https://d3ma4po7pyaqu9.cloudfront.net/wp-content/themes/live-mocha-theme/css/jquery.fancybox-1.3.4.css?e83a2c" type="text/css">
	
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
		
	jQuery("#another").show();
	
    jQuery("#another").live("click", function() {
        
		offset = jQuery('[id^=appendto]').last().attr('id').substr(8);
    
        jQuery("#appendto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/additional-posts.php?offset="+offset, function() {
		
				if((174 - offset) < 10) {
					
					jQuery("#another").hide();
					
				}
				
            });
            
        return false;
	
    });
	
});
</script>
	
		
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
		
	jQuery("#anotherl").hide();
	
    jQuery("#tabs2").click(function() {
        
		offset = jQuery('[id^=appendlearnersto]').last().attr('id').substr(16);
    
        jQuery("#appendlearnersto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/initial-posts-learners.php?offset="+offset, function() {
		
				if((83 - offset) < 10) {
					
					jQuery("#anotherl").hide();
					
				} else {
					
					jQuery("#anotherl").show();
					
				}
				
            });
            
        return false;
	
    });
	
    jQuery("#anotherl").live("click", function() {
        
		offset = jQuery('[id^=appendlearnersto]').last().attr('id').substr(16);
    
        jQuery("#appendlearnersto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/additional-posts-learners.php?offset="+offset, function() {
		
				if((83 - offset) < 10) {
					
					jQuery("#anotherl").hide();
					
				} else {
					
					jQuery("#anotherl").show();
					
				}
				
            });
            
        return false;
	
    });
	
});
</script>
	
		
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
		
	jQuery("#anothert").hide();
	
    jQuery("#tabs3").click(function() {
        
		offset = jQuery('[id^=appendteachersto]').last().attr('id').substr(16);
    
        jQuery("#appendteachersto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/initial-posts-teachers.php?offset="+offset, function() {
		
				if((24 - offset) < 10) {
					
					jQuery("#anothert").hide();
					
				} else {
					
					jQuery("#anothert").show();
					
				}
				
            });
            
        return false;
	
    });
	
    jQuery("#anothert").live("click", function() {
        
		offset = jQuery('[id^=appendteachersto]').last().attr('id').substr(16);
    
        jQuery("#appendteachersto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/additional-posts-teachers.php?offset="+offset, function() {
		
				if((24 - offset) < 10) {
					
					jQuery("#anothert").hide();
					
				} else {
					
					jQuery("#anothert").show();
					
				}
				
            });
            
        return false;
	
    });
	
});
</script>
	
		
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
		
	jQuery("#anotherpress").show();
	
    jQuery("#anotherpress").live("click", function() {
        
		offset = jQuery('[id^=appendto]').last().attr('id').substr(8);
    
        jQuery("#appendto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/additional-posts-press.php?offset="+offset, function() {
		
				if((57 - offset) < 10) {
					
					jQuery("#anotherpress").hide();
					
				} else {
					
					jQuery("#anotherpress").show();
					
				}
				
            });
            
        return false;
	
    });
	
});
</script>
	
		
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
		
	jQuery("#anothern").hide();
	
    jQuery("#tabs5").click(function() {
        
		offset = jQuery('[id^=appendnewsto]').last().attr('id').substr(12);
    
        jQuery("#appendnewsto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/initial-posts-news.php?offset="+offset, function() {
		
				if((46 - offset) < 10) {
					
					jQuery("#anothern").hide();
					
				} else {
					
					jQuery("#anothern").show();
					
				}
				
            });
            
        return false;
	
    });
	
    jQuery("#anothern").live("click", function() {
        
		offset = jQuery('[id^=appendnewsto]').last().attr('id').substr(12);
    
        jQuery("#appendnewsto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/additional-posts-news.php?offset="+offset, function() {
		
				if((46 - offset) < 10) {
					
					jQuery("#anothern").hide();
					
				} else {
					
					jQuery("#anothern").show();
					
				}
				
            });
            
        return false;
	
    });
	
});
</script>
	
		
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
		
	jQuery("#anotherp").hide();
	
    jQuery("#tabs6").click(function() {
        
		offset = jQuery('[id^=appendpressto]').last().attr('id').substr(13);
    
        jQuery("#appendpressto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/initial-posts-release.php?offset="+offset, function() {
		
				if((25 - offset) < 10) {
					
					jQuery("#anotherp").hide();
					
				} else {
					
					jQuery("#anotherp").show();
					
				}
				
            });
            
        return false;
	
    });
	
    jQuery("#anotherp").live("click", function() {
        
		offset = jQuery('[id^=appendpressto]').last().attr('id').substr(13);
    
        jQuery("#appendpressto"+offset)
            .load("http://livemocha.com/wp-content/themes/live-mocha-theme/additional-posts-release.php?offset="+offset, function() {
		
				if((25 - offset) < 10) {
					
					jQuery("#anotherp").hide();
					
				} else {
					
					jQuery("#anotherp").show();
					
				}
				
            });
            
        return false;
	
    });
	
});
</script>
	
		
	

<!--Plugin WP Missed Schedule 2011.0920.2011 Active--><script type="text/javascript" src="https://d3ma4po7pyaqu9.cloudfront.net/wp-includes/js/jquery/ui/jquery.ui.core.min.js?e83a2c"></script>
<script type="text/javascript" src="https://d3ma4po7pyaqu9.cloudfront.net/wp-includes/js/jquery/ui/jquery.ui.datepicker.min.js?e83a2c"></script>
<script type="text/javascript" src="https://d3ma4po7pyaqu9.cloudfront.net/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js?e83a2c"></script>
<script type="text/javascript">
/* <![CDATA[ */
var _wpcf7 = {"loaderUrl":"http:\/\/livemocha.com\/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","sending":"Sending ...","cached":"1"};
/* ]]> */
</script>
<script type="text/javascript" src="https://d3ma4po7pyaqu9.cloudfront.net/wp-content/plugins/contact-form-7/includes/js/scripts.js?e83a2c"></script>
<script type="text/javascript" src="https://d3ma4po7pyaqu9.cloudfront.net/wp-includes/js/jquery/ui/jquery.ui.widget.min.js?e83a2c"></script>
<script type="text/javascript" src="https://d3ma4po7pyaqu9.cloudfront.net/wp-includes/js/jquery/ui/jquery.ui.tabs.min.js?e83a2c"></script>

	
<script type="text/javascript">
jQuery(document).ready(function() {
		
		
		
			
	function oc(a)
	{
		var o = {};
		for(var i=0;i<a.length;i++)
		{
			o[a[i]]='';
		}
		return o;
	}
	
	jQuery("#member_signin").click(function()
	{
		
		var rand = 859;
		var browser = "Chrome";
		var version = 0.0;
		var lang = "";
		
		//alert(browser+' / '+version);
		
		if (
			rand <= 0 &&
			browser == "Chrome" &&
			version >= 20 && 
			lang in oc(['','pt-br']) 
		) {
			
			jQuery.fancybox({
				'type'				: 'iframe',
				'title'             : '',
				'padding'           : 2,
				'overlayColor'		: '#F1F1F1',
				'overlayOpacity'	: 0.8,
				'centerOnScroll'	: true,
				'scrolling'			: 'no',
				'width'             : 900,
				'height'            : 640,
				'href' 				: 'http://livemocha.com/wp-content/themes/live-mocha-theme/beta.php'
			});
			return false;

		} else {
			
			return true;
			
		}
		
	});
	
			
});
</script>

<script language="JavaScript">
	
	function checkform()
	{
		
		if (
			document.login_form.log.value == ''
		)
		{
								
				jQuery("#log_error").html("Your email is missing!").fadeIn("fast");
				return false;
		
		}
		
		if (
			document.login_form.pwd.value == ''
		)
		{
								
				jQuery("#pwd_error").html("Your password is missing!").fadeIn("fast");
				return false;
		
		} 

		return true;
	}

</script>