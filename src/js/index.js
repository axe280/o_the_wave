import $ from 'jquery'

$(function () {
  //for ie 11
  svg4everybody()
  // picturefill();

  // page scroll blocker
  var addDocumentScrollBlocker = function () {
    document.body.classList.add('scroll-page-locked')
  }

  var removeDocumentScrollBlocker = function () {
    document.body.classList.remove('scroll-page-locked')
  }

  var toggleMobileNavi = function () {
    $('body').toggleClass('menu_opened')

    if ($('body').hasClass('menu_opened')) {
      addDocumentScrollBlocker()
      $searchEL.removeClass('_opened')
    } else {
      removeDocumentScrollBlocker()
    }
  }

  var toggleSearch = function () {
    $searchEL.toggleClass('_opened')

    if ($searchEL.hasClass('_opened')) {
      $('body').removeClass('menu_opened')
      addDocumentScrollBlocker()
    } else {
      removeDocumentScrollBlocker()
    }
  }

  // open mobile menu
  $('.burger-menu').on('click', toggleMobileNavi)
  $('.menu-close-overlay').on('click', toggleMobileNavi)

  $('.menu-item__link_dd').on('click', function () {
    if ($(window).width() < 980) {
      $(this).siblings('.menu-dd').slideToggle()
      $(this).parent().toggleClass('_opened')
    }
  })

  // open search panel
  var $searchEL = $('.main-search-wrapper')
  $('.main-search-btn').on('click', toggleSearch)
  $('.main-search-overlay').on('click', toggleSearch)

  // sticky header
  function stickyHeader() {
    var $header = $('#header')
    var headerStickyTimer = null

    if ($header.length) {
      headerStickyCalc()

      $(window).on('scroll', function () {
        headerStickyCalc()
      })
    }

    function headerStickyCalc() {
      clearTimeout(headerStickyTimer)

      headerStickyTimer = setTimeout(function () {
        var headerHeight = $header.outerHeight()
        var headerOffsetTop = $header.offset().top
        var scroll = $(window).scrollTop()

        if (scroll >= headerOffsetTop + headerHeight) {
          $header.addClass('header_sticky')
        } else {
          $header.removeClass('header_sticky')
        }
      }, 50)
    }
  }

  stickyHeader()

  // simple tabs
  $('[data-simple-tabs]').on('click', 'li:not(.current)', function () {
    $(this)
      .addClass('current')
      .siblings()
      .removeClass('current')
      .parents('.simple-tabs-wrapp')
      .find('.simple-tabs-box')
      .eq($(this).index())
      .fadeIn()
      .siblings('.simple-tabs-box')
      .hide()
  })

  // // data-lity
  // $(document).on('lity:ready', function (e, instance) {
  //   addDocumentScrollBlocker()

  //   var el = instance.element()
  //   el.find('.lity-close').html(
  //     '<svg class="icon icon-close"><use xlink:href="assets/img/sprite.svg#close"></use></svg>'
  //   )
  // })

  // $(document).on('lity:close', function () {
  //   removeDocumentScrollBlocker()
  // })

  // // magnific popup
  // $('.open-popup-link').magnificPopup({
  //   type: 'inline',
  //   midClick: true,
  //   mainClass: 'mfp-zoom',
  //   removalDelay: 300,
  //   cursor: null,
  //   callbacks: {
  //     open: function () {
  //       addDocumentScrollBlocker()
  //       $('.mfp-close').html(
  //         '<svg class="icon icon-close"><use xlink:href="assets/img/sprite.svg#close"></use></svg>'
  //       )
  //     },
  //     close: function () {
  //       removeDocumentScrollBlocker()
  //     },
  //   },
  // })

  // $('.magnific-gallery').magnificPopup({
  //   delegate: 'button',
  //   type: 'image',
  //   midClick: true,
  //   cursor: null,
  //   gallery: {
  //     enabled: true,
  //     arrowMarkup:
  //       '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg></button>',
  //     tCounter: '<span class="mfp-counter">%curr% / %total%</span>',
  //   },
  //   mainClass: 'mfp-zoom',
  //   removalDelay: 300,
  //   callbacks: {
  //     open: function () {
  //       addDocumentScrollBlocker()
  //       $('.mfp-close').html(
  //         '<svg class="icon icon-close"><use xlink:href="assets/img/sprite.svg#close"></use></svg>'
  //       )
  //     },
  //     close: function () {
  //       removeDocumentScrollBlocker()
  //     },
  //   },
  // })

  // owl carousel
  $('.owl-carousel').owlCarousel({
    margin: 10,
    nav: true,
    navText: [
      '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
      '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      640: {
        items: 2,
      },
      740: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  })
})
