

(function($) {
  /**
   * @todo
   */
  Drupal.behaviors.symphonyThemeColors = {
    attach: function (context) {
      $('body', context).once('block-theme-colors-showhide', function () {													   
        jQuery('.block-theme-colors .close').click(function(e){
		  e.preventDefault();
		  jQuery('.block-theme-colors .block-theme-color-content ').hide();
		  jQuery(this).hide();
		  jQuery('.block-theme-colors .open').show();
		});
		jQuery('.block-theme-colors .open').click(function(e){
          e.preventDefault();
		  jQuery('.block-theme-colors .block-theme-color-content ').show();
		  jQuery(this).hide();
		  jQuery('.block-theme-colors .close').show();
		});  
      });
    }
  };

  Drupal.behaviors.quatroAccordion = {
    attach: function () {
	   $('.block-accordion').accordion({
          heightStyle: 'content',
		  autoHeight: false
       });
    }
  };
  
  Drupal.behaviors.quatroTabs = {
    attach: function () {
	   $('.block-tabs').tabs();
    }
  };
  
  Drupal.behaviors.quatroToggle = {
    attach: function () {
        $('div.toggle_area').find('div.toggle_content').hide().end();
	  
	    $('div.toggle_label').click(function() {
          $(this).next().slideToggle();
	  	  if($(this).hasClass('active')) {
	        $(this).removeClass('active');
		  } else {
	        $(this).addClass('active');
		  }
        });
    }
  };
})(jQuery);
