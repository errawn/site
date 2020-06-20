(function ($) {
  'use strict';
  function portfolio_init() {
    var portfolio_grid = $('.portfolio-grid'),
      portfolio_filter = $('.portfolio-filters');
    if (portfolio_grid) {
      portfolio_grid.shuffle({ speed: 450, itemSelector: 'figure' });
      portfolio_filter.on('click', '.filter', function (e) {
        portfolio_grid.shuffle('update');
        e.preventDefault();
        $('.portfolio-filters .filter').parent().removeClass('active');
        $(this).parent().addClass('active');
        portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
      });
    }
  }
  $(function () {
    $('#contact_form').validator();
    $('#contact_form').on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        var url = 'contact_form/contact_form.php';
        $.ajax({
          type: 'POST',
          url: url,
          data: $(this).serialize(),
          success: function (data) {
            var messageAlert = 'alert-' + data.type;
            var messageText = data.message;
            var alertBox =
              '<div class="alert ' +
              messageAlert +
              ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
              messageText +
              '</div>';
            if (messageAlert && messageText) {
              $('#contact_form').find('.messages').html(alertBox);
              $('#contact_form')[0].reset();
            }
          },
        });
        return false;
      }
    });
  });
  function mobileMenuHide() {
    var windowWidth = $(window).width(),
      siteHeader = $('#site_header');
    if (windowWidth < 992) {
      siteHeader.addClass('mobile-menu-hide');
      setTimeout(function () {
        siteHeader.addClass('animate');
      }, 500);
    } else {
      siteHeader.removeClass('animate');
    }
  }
  function ajaxLoader() {
    var ajaxLoadedContent = $('#page-ajax-loaded');
    function showContent() {
      ajaxLoadedContent.removeClass('rotateOutDownRight closed');
      ajaxLoadedContent.show();
      $('body').addClass('ajax-page-visible');
    }
    function hideContent() {
      $('#page-ajax-loaded').addClass('rotateOutDownRight closed');
      $('body').removeClass('ajax-page-visible');
      setTimeout(function () {
        $('#page-ajax-loaded.closed').html('');
        ajaxLoadedContent.hide();
      }, 500);
    }
    var href = $('.ajax-page-load').each(function () {
      href = $(this).attr('href');
      if (
        location.hash ==
        location.hash.split('/')[0] + '/' + href.substr(0, href.length - 5)
      ) {
        var toLoad = $(this).attr('href');
        showContent();
        ajaxLoadedContent.load(toLoad);
        return false;
      }
    });
    $(document)
      .on('click', '.site-main-menu, #ajax-page-close-button', function (e) {
        e.preventDefault();
        hideContent();
        location.hash = location.hash.split('/')[0];
      })
      .on('click', '.ajax-page-load', function () {
        var hash =
          location.hash.split('/')[0] +
          '/' +
          $(this)
            .attr('href')
            .substr(0, $(this).attr('href').length - 5);
        location.hash = hash;
        showContent();
        return false;
      });
  }
  function scrollTop() {
    if ($(window).scrollTop() > 150) {
      $('.lmpixels-scroll-to-top').removeClass('hidden');
    } else {
      $('.lmpixels-scroll-to-top').addClass('hidden');
    }
  }
  $(window)
    .on('load', function () {
      $('.preloader').fadeOut(800, 'linear');
    })
    .on('resize', function () {
      mobileMenuHide();
    })
    .scroll(function () {
      scrollTop();
    });
  $(document).on('ready', function () {
    var offset = 0;
    if ($(window).width() < 992) {
      offset = 25;
    }
    $('.pt-trigger').mPageScroll2id({
      layout: 'vertical',
      highlightClass: 'active',
      keepHighlightUntilNext: false,
      scrollSpeed: 880,
      scrollEasing: 'easeInOutExpo',
      scrollingEasing: 'easeInOutCirc',
      clickedClass: '',
      appendHash: true,
      offset: offset,
      forceSingleHighlight: true,
    });
    var $portfolio_container = $('.portfolio-grid');
    $portfolio_container.imagesLoaded(function () {
      portfolio_init(this);
    });
    var $container = $('.blog-masonry');
    $container.imagesLoaded(function () {
      $container.masonry();
    });
    $('.menu-toggle').on('click', function () {
      $('#site_header').addClass('animate');
      $('#site_header').toggleClass('mobile-menu-hide');
    });
    $('.site-main-menu').on('click', 'a', function (e) {
      mobileMenuHide();
    });
    $('.sidebar-toggle').on('click', function () {
      $('#blog-sidebar').toggleClass('open');
    });
    $('.testimonials.owl-carousel').owlCarousel({
      nav: true,
      items: 3,
      loop: false,
      navText: false,
      margin: 25,
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        768: { items: 2 },
        1200: { items: 2 },
      },
    });
    $('.clients.owl-carousel')
      .imagesLoaded()
      .owlCarousel({
        nav: true,
        items: 2,
        loop: false,
        navText: false,
        margin: 10,
        autoHeight: false,
        responsive: { 0: { items: 2 }, 768: { items: 4 }, 1200: { items: 6 } },
      });
    $('.text-rotation').owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      margin: 0,
      items: 1,
      autoplay: true,
      autoplayHoverPause: false,
      autoplayTimeout: 3800,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
    });
    $('body').magnificPopup({
      delegate: 'a.lightbox',
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      image: { titleSrc: 'title', gallery: { enabled: true } },
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
          '</div>',
        patterns: {
          youtube: { index: 'youtube.com/', id: null, src: '%id%?autoplay=1' },
          vimeo: {
            index: 'vimeo.com/',
            id: '/',
            src: '//player.vimeo.com/video/%id%?autoplay=1',
          },
          gmaps: { index: '//maps.google.', src: '%id%&output=embed' },
        },
        srcAction: 'iframe_src',
      },
      callbacks: {
        markupParse: function (template, values, item) {
          values.title = item.el.attr('title');
        },
      },
    });
    $('.ajax-page-load-link').magnificPopup({
      type: 'ajax',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery: { enabled: true },
    });
    $('.form-control')
      .val('')
      .on('focusin', function () {
        $(this).parent('.form-group').addClass('form-group-focus');
      })
      .on('focusout', function () {
        if ($(this).val().length === 0) {
          $(this).parent('.form-group').removeClass('form-group-focus');
        }
      });
    $('#map').googleMap({ zoom: 16 });
    $('#map').addMarker({
      address: 'S601 Townsend Street, San Francisco, California, USA',
    });
    $('.lmpixels-scroll-to-top').click(function () {
      $('body,html').animate({ scrollTop: 0 }, 400);
      return false;
    });
    window.onhashchange = function (event) {
      if (location.hash) {
        ajaxLoader();
      }
    };
    $('body').append(
      '<div id="page-ajax-loaded" class="page-ajax-loaded animated rotateInDownRight"></div>'
    );
    ajaxLoader();
    scrollTop();
  });
})(jQuery);
