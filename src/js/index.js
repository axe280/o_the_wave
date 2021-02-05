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

  // footer nav open
  $('.footer-col-head').on('click', function () {
    if ($(window).width() < 980) {
      $(this).siblings('.footer-col-body').slideToggle()
      $(this).parent().toggleClass('_opened')
    }
  })

  $('.dd-list-head').on('click', function () {
    $(this).siblings('.dd-list-body').slideToggle()
    $(this).parent().toggleClass('_opened')
  })

  // open search panel
  var $searchEL = $('.main-search-wrapper')
  $('.main-search-btn').on('click', toggleSearch)
  $('.main-search-overlay').on('click', toggleSearch)

  $(document).bind('click touchstart', function (e) {
    var $clicked = $(e.target)
    if (
      !$clicked.parents().hasClass('main-search') &&
      !$clicked.parents().hasClass('main-search-btn')
    ) {
      $('.main-search-wrapper').removeClass('_opened')
      removeDocumentScrollBlocker()
    }
  })

  // open order item
  $('.order-item').on('click', '.btn', function () {
    var $item = $(this).parents('.order-item')
    $item.find('.order-item__details').slideToggle()
    $item.toggleClass('_opened')
  })

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
  // $('.owl-carousel').owlCarousel({
  //   margin: 10,
  //   nav: true,
  //   navText: [
  //     '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
  //     '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
  //   ],
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     640: {
  //       items: 2,
  //     },
  //     740: {
  //       items: 3,
  //     },
  //     1000: {
  //       items: 5,
  //     },
  //   },
  // })

  $('.main-carousel').owlCarousel({
    items: 1,
    autoplay: true,
    loop: true,
    dots: true,
    nav: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    navText: [
      '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
      '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
    ],
  })

  $('.brands-carousel').owlCarousel({
    nav: true,
    loop: true,
    dots: false,
    navText: [
      '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
      '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 3,
        margin: 12,
      },
      980: {
        items: 4,
        margin: 20,
      },
      1200: {
        items: 5,
        margin: 35,
      },
    },
  })

  $('.insta-carousel').owlCarousel({
    loop: true,
    dots: false,
    navText: [
      '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
      '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
    ],
    responsive: {
      0: {
        margin: 8,
        center: true,
        autoWidth: true,
        nav: false,
      },
      980: {
        nav: true,
        center: true,
        autoWidth: true,
        margin: 16,
      },
      1400: {
        items: 3,
        margin: 16,
        center: false,
        autoWidth: false,
        nav: true,
      },
    },
  })

  $('.st-prod-carousel').owlCarousel({
    nav: true,
    loop: true,
    dots: false,
    navText: [
      '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
      '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 2,
        margin: 16,
      },
      980: {
        items: 3,
        margin: 16,
      },
      1200: {
        items: 4,
        margin: 16,
      },
    },
  })
})
