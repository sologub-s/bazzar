(function($) {
  "use strict"; // Start of use strict
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  $('.jsToggleAdminButton').on('click', function () {
    if($(this).hasClass('disabled')) {
      return;
    }
    $(this).html($(this).data('loading-text'));
    $.post(`/admin/users/toggle/admin/${$(this).data('id')}/`, (data) => {
      $(this).html($(this).data('default-text'));
      if(!data.success) {
        $(this).parent().find('small').html('<br />'+data.errors.join('; ')).show();
        return;
      }
      $(this).parent().find('small').hide();
      $(this)
          .toggleClass('active', data.userIsAdmin)
          .toggleClass('btn-outline-primary', !data.userIsAdmin)
          .toggleClass('btn-primary', data.userIsAdmin);
    })
  });

  $('.jsToggleBannedButton').on('click', function () {
    if($(this).hasClass('disabled')) {
      return;
    }
    $(this).html($(this).data('loading-text'));
    $.post(`/admin/users/toggle/banned/${$(this).data('id')}/`, (data) => {
      $(this).html($(this).data('default-text'));
      if(!data.success) {
        $(this).parent().find('small').html('<br />'+data.errors.join('; ')).show();
        return;
      }
      $(this).parent().find('small').hide();
      $(this)
          .toggleClass('active', data.userBanned)
          .toggleClass('btn-outline-warning', !data.userBanned)
          .toggleClass('btn-warning', data.userBanned);
    })
  });

  $('.jsToggleProductActiveButton').on('click', function () {
    if($(this).hasClass('disabled')) {
      return;
    }
    $(this).html($(this).data('loading-text'));
    $.post(`/admin/products/toggle/active/${$(this).data('id')}/`, (data) => {
      $(this).html($(this).data('default-text'));
      if(!data.success) {
        $(this).parent().find('small').html('<br />'+data.errors.join('; ')).show();
        return;
      }
      $(this).parent().find('small').hide();
      $(this)
          .toggleClass('active', data.productActive)
          .toggleClass('btn-outline-success', !data.productActive)
          .toggleClass('btn-success', data.productActive);
    })
  });

  $('.jsApplyFilter').on('change', function () {
    location.href = $(this).val();
  });

  $('.jsSortBy').on('click', function () {
    location.href = $(this).hasClass('sorting_asc') ? $(this).data('sortbylinkdesc') : $(this).data('sortbylinkasc');
  });

  $('.jsSearchContainer').each(function () {
    var container = $(this);
    container.find('.jsSearchReset').on('click', function () {
      location.href = $(this).data('reseturl');
    });
    container.find('.jsSearchGo').on('click', function () {
      location.href = $(this).data('gourl') + '&search_request=' + container.find('.jsSearchInput').val();
    });
    container.find('.jsSearchInput').on('keypress', function (e) {
      if (e.which == 13) {
        container.find('.jsSearchGo').click();
        return;
      }
      if (e.which == 27) {
        container.find('.jsSearchInput').val('');
        return;
      }
    });
  });

  $('.jsKcOpener').on('click', function () {
      var opener = $(this);
      var targetInput = $(opener.data('target'));
      window.KCFinder = {
          callBack: function(url) {
            window.KCFinder = null;
            if (targetInput.length) {
                targetInput.val(url).trigger('input');
            }
          }
      };
      window.open('/admin/ckeditor/kcfinder/browse.php?type=images', 'kcfinder_textbox',
          'status=0, toolbar=0, location=0, menubar=0, directories=0, ' +
          'resizable=1, scrollbars=0, width=800, height=600'
      );
  });

  $('.jsImageUrl').on('input', function () {
    _.debounce(() => {
        //$($(this).data('target')).attr('src', $(this).val()).toggle(!$(this).val().length);
        $.ajax({
            url: $(this).val(),
            type: 'GET',
            success: () => {
                $($(this).data('target')).attr('src', $(this).val()).removeClass('d-none');
            },
            error: () => {
                $($(this).data('target')).addClass('d-none');
            }
        });
    }, 500)();
  });

  $('.jsTogglePostActiveButton').on('click', function () {
      if($(this).hasClass('disabled')) {
          return;
      }
      $(this).html($(this).data('loading-text'));
      $.post(`/admin/posts/toggle/active/${$(this).data('id')}/`, (data) => {
          $(this).html($(this).data('default-text'));
          if(!data.success) {
              $(this).parent().find('small').html('<br />'+data.errors.join('; ')).show();
              return;
          }
          $(this).parent().find('small').hide();
          $(this)
              .toggleClass('active', data.postActive)
              .toggleClass('btn-outline-success', !data.postActive)
              .toggleClass('btn-success', data.postActive);
      })
  });

  $('.jsBootstrapSwitch').bootstrapSwitch();

  setInterval(() => {
      $('.jsBrokenCategory').toggleClass('d-none', !$('.jsToggleBrokenCategories:checked').length);
  }, 1000);

    $('.jsSaveCategory').on('click', function () {
        location.href = $(this).data('url') + '?terms=' + $(this).closest('.row').find('input[name=search_terms]').val();
    });


})(jQuery); // End of use strict
