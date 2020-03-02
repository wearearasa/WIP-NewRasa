jQuery(document).ready(function () {
    heroBanner();

    // HeroBanner Content Alignment
    setTimeout(function () {
  		jQuery('#hero .hero-content-center .hero-content .text-center').addClass('align-center');
        heroBannercontent();
    }, 1000);

    journalBanner();

    equalHeight('.benefits-order .benefit-content img');

    //Show MegaMenu While overing the navgation
    jQuery('#SiteNav li').hover(
        function () {
            jQuery('#SiteNav li').removeClass('site-nav--active-dropdown');
            jQuery(this).addClass('site-nav--active-dropdown');
        },
        function () {
            jQuery('#SiteNav li').removeClass('site-nav--active-dropdown');
            jQuery(this).removeClass('site-nav--active-dropdown');
        }
    );

    // Reload the page on variant change
    jQuery("select[class^='single-option-selector']").change(function(e) {
        e.preventDefault();
        location.reload();
    });
  
    // Navigation Menu Hover show to MegeMenu
    jQuery('.site-nav > li.site-nav--has-dropdown')
        .mouseover(function () {
            jQuery('li.site-nav--has-dropdown:hover .site-nav__dropdown').show();
        })
        .mouseout(function () {
            jQuery('li.site-nav--has-dropdown .site-nav__dropdown').hide();
        });

    // Set Image as Background Image for IE Browser
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);

    if (ie) {
        jQuery(".article__grid-image-container").each(function () {
            var $container = jQuery(this),
                    imgUrl = $container.find("img").prop("src");
            if (imgUrl) {
                $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("custom-object-fit");
            }
        });
    }

  	var SliderLength = jQuery('.product-template-slider .product-single__photo').length;

    // Initiliaze slick for Product Image's
    if( SliderLength > 3) {
      jQuery('.product-template-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.slider-nav',
        adaptiveHeight: true
      });
    } else {
      jQuery('.product-template-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true
      });
    }

    jQuery('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.product-template-slider',
        arrows: false,
        focusOnSelect: true
    });

    // Initiliaze slick for Rasa Product on Homepage
    jQuery('.rasa-slider').on('init', function (event, slick) {
        jQuery('.homeshop-section .shop-btn button:first').addClass('active');
    });

    jQuery('.rasa-slider').slick({
        slidesToShow: 1,
        autoplay: false,
        infinite: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 749,
                settings: {
                    arrows: false,
                }
            },
        ]
    });

    // Button Click functionality of Rasa Slider Homepage
    jQuery('.shop-btn button').click(function () {
        jQuery('.shop-btn button').removeClass('active');
        var index = jQuery('.slick-list').find(".section-rasa[data-titleshop='" + jQuery(this).data('titleshop') + "']").data('slick-index');
        jQuery('.rasa-slider').slick("slickGoTo", index);
    });

    jQuery('.rasa-slider').on('afterChange', function (slick, currentSlide) {
        jQuery('.shop-btn button').removeClass('active');
        jQuery('.shop-btn').find("button[data-titleshop='" + jQuery('.rasa-slider .slick-current').data('titleshop') + "']").addClass('active');
    });

    // Initiliaze slick for product-slider Homepage
    jQuery('.product-slider').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 749,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            },
        ]
    });

    // Initiliaze slick for Rasa Ritual on Homepage
    jQuery('.ritual-slider').slick({
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 749,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
        ]
    });

    // Initiliaze slick for Reviews on Homepage
    jQuery('.review-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 749,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            },
        ]
    });
  
    // Initiliaze slick for Reviews on Homepage
    jQuery('.shop-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2
              }
            },
            {
                breakpoint: 749,
                settings: {
                    slidesToShow: 1
                }
            },
        ]
    });

    if (window.innerWidth < 768) {
        mobileOnlySlider();
    }

     // Product Page Bold App    
     jQuery('.bold_qb_grid').hide();

//   Review section
    jQuery(".review-content").each(function () {
        if (jQuery(this).height() < jQuery(this)[0].scrollHeight) {
            jQuery(this).parent().find(".show-more").show();
        }
    });
    jQuery(".show-more").click(function () {
        if (jQuery(this).prev().hasClass("truncate")) {
            jQuery(this).parent().find(".review-content").css("max-height", jQuery(this).parent().find(".review-content")[0].scrollHeight);
            jQuery(this).children('a').text("Read Less");
        } else {
            jQuery(this).parent().find(".review-content").css("max-height", "6em");
            jQuery(this).children('a').text("Read More");
        }
        jQuery(this).prev().toggleClass("truncate");

    });

//   journal section
    jQuery('.latest-entry .grid li:nth-child(4)').nextAll('li').addClass('remove-entries');
    jQuery('.latest-entry .grid').addClass('add-entries');
    jQuery('.view-all img').click(function () {
        jQuery('.latest-entry .grid li:nth-child(4)').nextAll('li').each(function () {
            if (jQuery(this).hasClass('remove-entries')) {
                jQuery('.latest-entry .grid').removeClass('add-entries');
                jQuery(this).removeClass('remove-entries');
            } else {
                jQuery('.latest-entry .grid').addClass('add-entries');
                jQuery(this).addClass('remove-entries');
            }
        });
    });

    // Scroll to collection while Click on Collection Title
    jQuery(".collection-icons a[href^='#']").click(function (e) {
        e.preventDefault();
        if (window.innerWidth > 991) {
            var position = jQuery(jQuery(this).attr("href")).offset().top - 156;
        } else if (window.innerWidth > 750) {
            var position = jQuery(jQuery(this).attr("href")).offset().top - 200;
        } else {
            var position = jQuery(jQuery(this).attr("href")).offset().top - 80;
        }
        jQuery("body, html").animate({
            scrollTop: position
        }, 100);
    });
  
    // Scroll to review in product page
    jQuery(".product-review").click(function (e) {
        e.preventDefault();
        if (window.innerWidth > 991) {
            var position = jQuery(".review-sec").offset().top - 156;
        } else if (window.innerWidth > 768) {
            var position = jQuery(".review-sec").offset().top - 200;
        } else {
            var position = jQuery(".review-sec").offset().top - 100;
        }
        jQuery("body, html").animate({
            scrollTop: position
        }, 100);
    });

    equalHeight('.grid--uniform li .product-card .product-card__title');
    equalHeight('.grid--uniform li .product-card .product-card__image-wrapper');

    equalHeight('#essential-collection .grid--uniform.mob-slider li .product-card .product-card__title');
    equalHeight('#essential-collection .grid--uniform.mob-slider li .product-card .product-card__image-wrapper');

    equalHeight('#curated-collection .grid--uniform.mob-slider li .product-card .product-card__title');
    equalHeight('#curated-collection .grid--uniform.mob-slider li .product-card .product-card__image-wrapper');

    equalHeight('#complete-the-ritual .grid--uniform.mob-slider li .product-card .product-card__title');
    equalHeight('#complete-the-ritual .grid--uniform.mob-slider li .product-card .product-card__image-wrapper');

//   	mwInstagramFeed.init();
});

jQuery(window).load(function () {
    // Product Page Bold App
     jQuery('.bold_qb_grid:empty').remove();
     if (jQuery(".template-product").find(".guarantee-membership").length > 0) {
        if (jQuery(".template-product").find(".bold_qb_grid").length > 0) {
            var totalCost = '';
            jQuery(".bold_qb_grid ul.shappify_qb_grid li").each(function (index, element) {
                if (index == 0) {
                    totalCost = jQuery(element).find('.money').html().replace('$', '');
                }
            });
            if (totalCost != '') {
                var totalpercent = '';
          		var totalQuantity = '';
                var totalMoney = '';
                var list = jQuery(".bold_qb_grid").prepend('<ul class="second_ul"></ul>').find('ul.second_ul');
              	list.insertAfter('.bold_qb_grid h4');
                jQuery(".bold_qb_grid ul.shappify_qb_grid li").each(function (index, element) {

                    if (element) {
                        totalpercent = jQuery(element).find('.percent').text().replace('%', '');
          				totalQuantity = jQuery(element).find('.quantity').text();
                        totalMoney = jQuery(element).find('.money').text().replace('$', '');
                      	list.append('<li>' + totalQuantity + ' bags, $' + totalMoney + '/bag</li>');
                        if (totalpercent != '') {
          					var savings = Math.round(parseInt(totalCost) / 100 * totalpercent) * parseInt(totalQuantity);
                            jQuery(element).find('.percent').text('$' + savings);
                          	jQuery(element).find('.money').text('$' + totalMoney * totalQuantity);
                        }
                    }
                });
            }
            jQuery('.bold_qb_grid').show();
            jQuery(".bold_qb_grid").insertAfter(".guarantee-membership");
//             setTimeout(function() {
//               jQuery(".bold_qb_grid").insertAfter(".guarantee-membership");
//           }, 1500);
        }
    } else {
        jQuery(".mob-flex").prepend('.bold_qb_grid');
    }
    equalHeight('.ritual-block .ritual-content');
    equalHeight('.starter-section .starter-block');
  
//     if (typeof jQuery === 'undefined') {
//       	return;
//       console.log('test-load');
//     }
//     console.log('test');
//     mwInstagramFeed.init();

});

jQuery(window).resize(function () {
    heroBanner();
    heroBannercontent();
    journalBanner();
    equalHeight('.ritual-block .ritual-content');
    equalHeight('.starter-section .starter-block');

    if (window.innerWidth < 768) {
        if (!jQuery('.mob-slider, .mob-acc-slider, .accordian-slider').hasClass('slick-initialized')) {
            mobileOnlySlider();
        }
 
    } else {
        if (jQuery('.mob-slider, .mob-acc-slider, .accordian-slider').hasClass('slick-initialized')) {
            jQuery('.mob-slider, .mob-acc-slider, .accordian-slider').slick('unslick');
        }
    }
  
});

jQuery(window).scroll(function () {
    var afterScroll = jQuery('header').height();
    var scroll = jQuery(window).scrollTop();

    // Set Fixed Header
    if (jQuery('body').hasClass('template-index')) {
        if (scroll >= afterScroll) {
            jQuery("header.site-header").addClass("fixed-header");
        } else if (scroll == 0) {
            jQuery("header.site-header").removeClass("fixed-header");
        }
    } else {
        if (scroll >= afterScroll) {
            jQuery("header.site-header").addClass("fixed-header");
            if (window.innerWidth > 991) {
                jQuery("body").css("padding-top", 116 + 'px');
            } else {
                jQuery("body").css("padding-top", 69 + 'px');
            }
        } else if (scroll == 0) {
            jQuery("header.site-header").removeClass("fixed-header");
            jQuery("body").css("padding-top", '');
        }
    }

    jQuery('.site-nav > li.site-nav--has-dropdown').find('.site-nav__dropdown').hide();
});

function heroBanner() {
    if (window.innerWidth > 750) {
        jQuery('#hero').css('height', jQuery(window).height());
    } else {
        jQuery('#hero').css('height', '');
    }
}

function heroBannercontent() {
    var herobottomHeight = jQuery('.bannerimage-bottom').height();
    var contentHeight = jQuery('#shopify-section-hero').innerHeight() - herobottomHeight;
    var totalHeight = contentHeight - jQuery('#shopify-section-header header').height() + 19;
    jQuery('#shopify-section-hero .hero-block .hero-content').removeAttr('style');
    jQuery('#shopify-section-hero .hero-block .hero-content').css({
        'height': totalHeight,
        'margin-top': jQuery('#shopify-section-header header').height()
    });
}

function journalBanner() {
    if (window.innerWidth > 1700) {
        jQuery('.journel-banner').css('height', jQuery(window).height() - jQuery('#shopify-section-header header').height());
    } else {
        jQuery('.journel-banner').css('height', '');
    }
}

function mobileOnlySlider() {
    jQuery('.mob-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: false,
        adaptiveHeight: true
    });

    jQuery('.mob-acc-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: false,
        asNavFor: '.accordian-slider',
        adaptiveHeight: true
    });

    jQuery('.accordian-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: false,
        draggable: false
    });

    jQuery('.accordian-slider .slick-track').addClass('hide-acc');
    jQuery('.our-guarantees div[data-toggle="collapse"]').on('click', function () {
        jQuery('.accordian-slider .slick-track').toggleClass('show');
    });
}

function equalHeight(htmlSelector) {
    var baseHeight = 0;
    jQuery(htmlSelector).css("height", "auto");
    jQuery(htmlSelector).each(function (index, box) {
        var height = jQuery(box).outerHeight();
        if (height > baseHeight) {
            baseHeight = height;
        }
    });
    jQuery(htmlSelector).css('height', (baseHeight) + "px");
}