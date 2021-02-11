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

  // show data password field
  $('.data-pass-btn .btn').on('click', function () {
    $(this).parent().addClass('_show-pass')
    $(this).parent().find('input').focus()
  })

  // remove outside classes
  $(document).bind('click touchstart', function (e) {
    var $clicked = $(e.target)
    if (
      !$clicked.parents().hasClass('main-search') &&
      !$clicked.parents().hasClass('main-search-btn')
    ) {
      $('.main-search-wrapper').removeClass('_opened')
      removeDocumentScrollBlocker()
    }

    if (
      !$clicked.parents().hasClass('st-modal-cart') &&
      !$clicked.parents().hasClass('show-cart-btn')
    ) {
      $('.st-modal-cart').removeClass('_opened')
    }
  })

  // open search panel
  var $searchEL = $('.main-search-wrapper')
  $('.main-search-btn').on('click', toggleSearch)
  $('.main-search-overlay').on('click', toggleSearch)

  // open order item
  $('.order-item').on('click', '.btn', function () {
    var $item = $(this).parents('.order-item')
    $item.toggleClass('_opened')
    $item.find('.order-item__details').slideToggle()
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

  // change src, hover product
  $(document).on(
    'mouseover',
    '.st-prod-card__nav span:not(.current)',
    function () {
      var srcProd = $(this).data().prodSrc
      var $img = $(this).parent().siblings('[data-target-prod-src]')

      $(this).siblings().removeClass('current')
      $(this).addClass('current')
      $img.attr('src', srcProd)
    }
  )

  // switch prodct columns
  $('.ch-c-filter-switch').on('click', 'button:not(.active)', function () {
    if ($(this).data().prodCols === true) {
      $('.catalog-list').addClass('_cols')
    } else {
      $('.catalog-list').removeClass('_cols')
    }

    $(this).addClass('active').siblings('button').removeClass('active')
  })

  // plus/minus value
  $('.minus-input').click(function () {
    var $input = $(this).parent().find('input')
    var count = parseInt($input.val()) - 1
    count = count < 1 ? 1 : count
    $input.val(count)
    $input.change()
    return false
  })

  $('.plus-input').click(function () {
    var $input = $(this).parent().find('input')
    $input.val(parseInt($input.val()) + 1)
    $input.change()
    return false
  })

  // magnific popup
  var magnificOptions = {
    type: 'inline',
    midClick: true,
    mainClass: 'mfp-zoom',
    removalDelay: 300,
    cursor: null,
    callbacks: {
      open: function () {
        addDocumentScrollBlocker()
        $('.mfp-close').html(
          '<svg class="icon icon-close-wide"><use xlink:href="assets/img/sprite.svg#close-wide"></use></svg>'
        )
      },
      close: function () {
        removeDocumentScrollBlocker()
      },
    },
  }
  $('.open-popup-link').magnificPopup(magnificOptions)

  // cart modal
  var isCartEmpty = false
  $('.show-cart-btn').on('click', function () {
    if (isCartEmpty) {
      showModal('#modalEmptyCart')
    } else {
      showModal('#modalCart')
    }
  })

  $('.st-modal-cart .mfp-close').on('click', function () {
    $(this).parent().removeClass('_opened')
  })

  var showModal = function (modalSrc) {
    if ($(window).width() < 980) {
      $.magnificPopup.open(
        $.extend(magnificOptions, {
          items: {
            src: modalSrc,
          },
        })
      )
    } else {
      $(modalSrc).addClass('_opened')
    }
  }

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

  if ($(window).width() < 980) {
    $('.card-bl-photos').owlCarousel({
      loop: false,
      dots: true,
      items: 1,
      nav: true,
      navText: [
        '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
        '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
      ],
    })
  }
})
