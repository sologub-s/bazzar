
(function($) {

    $(document).ready(function () {

        $('.jsExpander').on('click', function () {
            var contentBody = $(this).closest('.views-row').find('.views-field-body');
            var i = $(this).find('i');
            if (i.hasClass('fa-caret-left')) {
                i.removeClass('fa-caret-left').addClass('fa-caret-down');
                contentBody.slideDown();
            } else {
                i.removeClass('fa-caret-down').addClass('fa-caret-left');
                contentBody.slideUp();
            }
        });

        /*
        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'vertical',
            loop: false
        })
        */

        var galleryTop = new Swiper('.gallery-top', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 10,
            on: {
                slideChangeTransitionEnd: function(){
                    var activeIndex = this.activeIndex;
                    if (typeof galleryThumbs === 'undefined') {
                        return;
                    }
                    $(galleryThumbs.slides).removeClass('is-selected');
                    $(galleryThumbs.slides).eq(activeIndex).addClass('is-selected');
                    galleryThumbs.slideTo(activeIndex,500, false);

                }
            }

        });
        if ($('.gallery-thumbs').length) {
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                freeMode: true,
                centeredSlides: false,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                init: false,
                on: {
                    init: function () {
                        $(this.slides).eq(galleryTop.activeIndex).addClass('is-selected');
                        //this.slideTo(galleryTop.activeIndex);
                    },
                    click: function (){
                        var clicked = this.clickedIndex;
                        this.activeIndex = clicked; //don't need this
                        //this.updateClasses() //don't need this
                        $(this.slides).removeClass('is-selected');
                        $(this.clickedSlide).addClass('is-selected');
                        galleryTop.slideTo(clicked,500, false);

                    }
                }
            });
            galleryThumbs.init();
        }

        $('body').on('click', '.jsToggler', function () {
            $(this).parent().find('> ul').toggle();
            $(this).find('i').toggleClass('fa-caret-left');
            $(this).find('i').toggleClass('fa-caret-down');
        });

        $('body').on('click', '.jsShowCharacteristics', function (e) {
            e.preventDefault();
            $(this).slideUp();
            $(this).parent().find('.characteristics').slideDown();
        });

        $('body').on('click', '.jsHideCharacteristics', function (e) {
            e.preventDefault();
            $(this).parent().parent().find('.characteristics').slideUp();
            $(this).parent().parent().find('.jsShowCharacteristics').slideDown();

        });

        $('body').on('click', '.jsToggleFavourites', function (e) {
            e.preventDefault();
            let fa = $(this).find('i');
            fa.removeClass('fa-star fa-star-o').addClass('fa-spinner fa-spin');
            $.post('/user/favourites/toggle', {
                'product_id': $(this).data('product_id')
            })
                .done(function(data) {
                    fa.addClass('fa-star' + (data['currentStatus'] === 'added' ? '' : '-o'));
                    if (data['currentStatus'] === 'added') {
                        fa.animateCss('rotateIn');
                    } else {
                        fa.animateCss('fadeIn');
                    }
                })
                .fail(function(response) {
                    if (response.status == 404) {
                        fa.addClass('fa-star-o');
                        alert('Product not found');
                    }
                })
                .always(function() {
                    fa.removeClass('fa-spinner fa-spin');
                });

        });

        $('body').on('click', '.jsRemoveCompare', function (e) {
            e.preventDefault();
            let tr = $(this).closest('tr');
            $.post('/compare/toggle', {
                'product_id': $(this).data('product_id')
            })
                .done(function(data) {
                    console.log(data['currentStatus'], $(this).closest('tr'));
                    if(data['currentStatus'] === 'removed') {
                        tr.slideUp();
                    }
                    $('.jsAmountInCompare').html(data['countInCompare']);
                })
                .fail(function(response) {
                    if (response.status == 404) {
                        alert('Product not found');
                    }
                })
        });

        $('body').on('click', '.jsToggleCompare', function (e) {
            e.preventDefault();
            let fa = $(this).find('i');
            fa.removeClass('fa-bar-chart fa-line-chart').addClass('fa-spinner fa-spin');
            $.post('/compare/toggle', {
                'product_id': $(this).data('product_id')
            })
                .done(function(data) {
                    fa.addClass('fa-' + (data['currentStatus'] === 'added' ? 'line' : 'bar') + '-chart');
                    if (data['currentStatus'] === 'added') {
                        fa.animateCss('rotateIn');
                    } else {
                        fa.animateCss('fadeIn');
                    }
                    $('.jsAmountInCompare').html(data['countInCompare']);
                })
                .fail(function(response) {
                    if (response.status == 404) {
                        fa.addClass('fa-bar-chart');
                        alert('Product not found');
                    }
                })
                .always(function() {
                    fa.removeClass('fa-spinner fa-spin');
                });

        });

        $('body').on('click', '.jsSearchBlock', function (e) {
            e.preventDefault();

            let input = $(this).find('input');
            let a = $(this).find('a');

            let sendRequest = function () {
                if (input.val() == '') {
                    input.addClass('error');
                    return false;
                }
                window.location.href = '/catalogue/search/'+input.val();
                return false;
            }

            a.on('click', function () {
                return sendRequest();
            });
            input.on('keyup', function (e) {
                let keycode = (e.keyCode ? e.keyCode : e.which);
                if (keycode == 13) {
                    return sendRequest();
                }
                if (keycode == 27) {
                    input.val('');
                }
            });
        });

    });

})(jQuery);

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});