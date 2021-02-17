import $ from 'jquery'

$(function () {
  //for ie 11
  svg4everybody()

  // image card zoom
  $('.img-zoom').each(function () {
    $(this).imageZoom()
  })

  // page scroll blocker
  var addDocumentScrollBlocker = function () {
    document.body.classList.add('scroll-page-locked')
  }

  var removeDocumentScrollBlocker = function () {
    document.body.classList.remove('scroll-page-locked')
  }

  var hideMobileFilter = function () {
    $('body').removeClass('filter_opened')
    removeDocumentScrollBlocker()
    $('.catalog-mobile-btns .btn').addClass('btn_border')
  }

  var toggleMobileNavi = function () {
    $('body').toggleClass('menu_opened')

    if ($('body').hasClass('menu_opened')) {
      $searchEL.removeClass('_opened')
      hideMobileFilter()
      addDocumentScrollBlocker()
    } else {
      removeDocumentScrollBlocker()
    }
  }

  var toggleSearch = function () {
    $searchEL.toggleClass('_opened')

    if ($searchEL.hasClass('_opened')) {
      $('body').removeClass('menu_opened')
      hideMobileFilter()
      addDocumentScrollBlocker()
    } else {
      removeDocumentScrollBlocker()
    }
  }

  // open mobile menu
  $('.burger-menu').on('click', toggleMobileNavi)
  $('.menu-close-overlay').on('click', toggleMobileNavi)

  $('.menu').on('click', '.menu-item__link_dd', function () {
    if ($(window).width() < 980) {
      $(this).siblings('.menu-dd').slideToggle()
      $(this).parent().toggleClass('_opened')
    }
  })

  // footer nav open
  $('.footer-nav-wrapp').on('click', '.footer-col-head', function () {
    if ($(window).width() < 980) {
      $(this).siblings('.footer-col-body').slideToggle()
      $(this).parent().toggleClass('_opened')
    }
  })

  // drop down plus list
  $('.dd-list-wrapp').on('click', '.dd-list-head', function (e) {
    var $target = $(e.target)
    if ($target.is('a')) return

    $(this).siblings('.dd-list-body').slideToggle()
    $(this).parent().toggleClass('_opened')
  })

  // like btn
  $('.st-prod-card__like').on('click touchstart', function () {
    if ($(this).is('._active')) {
      $(this).removeClass('_active')
    } else {
      $(this).toggleClass('_like_animating')
      $(this).addClass('_active')
    }

    return false
  })

  $('.st-prod-card__like').on('animationend', function () {
    $(this).removeClass('_like_animating')
  })

  // filter
  $('.filters-list').on('click', '.filter-head', function () {
    $(this).siblings('.filter-drop-d').slideToggle()
    $(this).parent().toggleClass('_opened')

    if ($(window).width() >= 980) {
      $(this)
        .parent()
        .siblings('._opened')
        .removeClass('_opened')
        .find('.filter-drop-d')
        .slideUp()
    }
  })

  if ($(window).width() >= 980) {
    $(document).bind('click touchstart', function (e) {
      var $clicked = $(e.target)

      if (!$clicked.parents().hasClass('filter-item')) {
        $('.filter-item').removeClass('_opened')
        $('.filter-drop-d').slideUp()
      }
    })
  }

  $('.catalog-mobile-btns').on('click', '.btn', function () {
    var dataNameSelector = '[data-' + $(this).data().filterBtn + ']'
    $(this).removeClass('btn_border').siblings('.btn').addClass('btn_border')

    $('body').addClass('filter_opened')
    addDocumentScrollBlocker()

    $(window).scrollTop(0)

    $(dataNameSelector)
      .show()
      .siblings('.filter-item:not(' + dataNameSelector + ')')
      .hide()
  })

  $('.filter-mobile-close, .btn-filter-show').on('click', hideMobileFilter)

  // filter changing
  var addFilterVal = function ($parentEL, dataVal) {
    $parentEL.find('.filter-head__val').text(dataVal)
    $parentEL.find('.filter-head').addClass('_filtered')

    if ($parentEL.is('[data-sort]')) {
      $parentEL.find('.filter-head__tt').hide()
    }
  }

  var removeFilterVal = function ($parentEL) {
    $parentEL.find('.filter-head__val').text('')
    $parentEL.find('.filter-head').removeClass('_filtered')

    if ($parentEL.is('[data-sort]')) {
      $parentEL.find('.filter-head__tt').show()
    }
  }

  // filter checkboxes
  $('.filter-drop-d__checkboxes').on('change', 'input', function () {
    var $parentItem = $(this).parents('.filter-item')

    var dataText = $(this).parent().text().trim()
    var checkedLength = $parentItem.find('input:checked').length

    if (checkedLength === 1) {
      dataText = $parentItem.find('input:checked').parent().text().trim()
      addFilterVal($parentItem, dataText)
    } else if (checkedLength > 1) {
      addFilterVal($parentItem, checkedLength)
    } else {
      removeFilterVal($parentItem)
    }
  })

  // filter select
  $('.filter-drop-d__select').on('click', 'li:not(.active)', function () {
    var $parentItem = $(this).parents('.filter-item')
    var dataText = $(this).text().trim()

    $(this).siblings('li').removeClass('active')
    $(this).addClass('active')
    $parentItem.find('.filter-drop-d').slideToggle()

    addFilterVal($parentItem, dataText)
  })

  // filter item reset
  $('.filter-item-reset').on('click', function (event) {
    event.stopPropagation()

    var $parentItem = $(this).parents('.filter-item')
    $parentItem.find('input').prop('checked', false)
    $parentItem.find('.filter-drop-d__select li').removeClass('active')
    removeFilterVal($parentItem)
  })

  // show data password field
  $('.data-pass-btn .btn').on('click', function () {
    $(this).parent().addClass('_show-pass')
    $(this).parent().find('input').focus()
  })

  // remove outside classes
  $(document).bind('click touchstart', function (e) {
    var $clicked = $(e.target)

    if ($('.main-search-wrapper').hasClass('_opened')) {
      if (
        !$clicked.parents().hasClass('main-search') &&
        !$clicked.parents().hasClass('main-search-btn')
      ) {
        removeDocumentScrollBlocker()
        $('.main-search-wrapper').removeClass('_opened')
      }
    }

    // if (
    //   !$clicked.parents().hasClass('st-modal-cart') &&
    //   !$clicked.parents().hasClass('show-cart-btn')
    // ) {
    //   $('.st-modal-cart').removeClass('_opened')
    // }
  })

  // card page
  var checkOrderSize = function () {
    return $('.card-sizes-btns input').is(':checked')
  }

  var showOrderSizeError = function () {
    $('.card-sizes-wrapp').addClass('_check-size')
  }

  var hideOrderSizeError = function () {
    $('.card-sizes-wrapp').removeClass('_check-size')
  }

  // chose size
  $('.fake-radio-size').on('click', hideOrderSizeError)

  // btn order one click
  $('.btn-order-click').on('click', function () {
    if (checkOrderSize()) {
      $.magnificPopup.open(
        $.extend(magnificOptions, {
          items: {
            src: orderNow,
          },
        })
      )
    } else {
      showOrderSizeError()
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
      $(this).siblings().removeClass('current')
      $(this).addClass('current')
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
  $('.minus-input').on('click', function () {
    var $input = $(this).parent().find('input')
    var count = parseInt($input.val()) - 1
    count = count < 1 ? 1 : count
    $input.val(count)
    $input.change()
    return false
  })

  $('.plus-input').on('click', function () {
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

  var hideDesktopModalCart = function () {
    $('#modalCart').removeClass('_opened')
  }

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

  $('.add-to-cart-btn').on('click', function () {
    if (checkOrderSize()) {
      // add to cart
      var defaultText = $(this).text().trim()
      $(this).addClass('_added').text('Товар добавлен')

      setTimeout(() => {
        $(this).removeClass('_added').text(defaultText)
      }, 8000)
    } else {
      showOrderSizeError()
    }
  })

  // cart page
  $('.del-btns').on('click', 'button', function () {
    $.magnificPopup.close()
  })

  // cart sticky line
  var cartOrderLineFixed = function () {
    var topPos = $(window).scrollTop() + $(window).height()
    var targetPos =
      $targetCartSticky.position().top + $targetCartSticky.innerHeight()
    if (topPos > targetPos) {
      $targetCartSticky.addClass('_stop')
    } else {
      $targetCartSticky.removeClass('_stop')
    }
  }

  var $targetCartSticky = $('.cart-sticky-order-wrapp')
  if ($targetCartSticky.length) {
    cartOrderLineFixed()
    $(window).on('scroll', cartOrderLineFixed)
  }

  // show order form
  $('.cart-sticky-order__btn .btn').on('click', function () {
    $('.order-form-wrapp').slideDown()
    $(window).off('scroll', cartOrderLineFixed)
    $targetCartSticky.addClass('_stop')

    var destination = $('.order-form-wrapp').offset().top - 60
    jQuery('html:not(:animated),body:not(:animated)').animate(
      { scrollTop: destination },
      800
    )
  })

  // subs modal
  $('.subs-form').on('submit', function (e) {
    e.preventDefault()

    // send ajax
    // if success show modal
    $.magnificPopup.open(
      $.extend(magnificOptions, {
        items: {
          src: subsComplete,
        },
      })
    )

    // if success hide block
    $(this).parent().fadeOut()
  })

  // carousels
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
    smartSpeed: 1200,
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
    smartSpeed: 1200,
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
    smartSpeed: 1200,
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

  // init resize carousel
  var $mobileCarouselCard = null

  var initHtsCarousel = function () {
    $mobileCarouselCard = $('.card-bl-photos').owlCarousel({
      loop: false,
      dots: true,
      items: 1,
      smartSpeed: 1200,
      nav: true,
      navText: [
        '<svg class="icon icon-arrow-prev"><use xlink:href="assets/img/sprite.svg#arrow-prev"></use></svg>',
        '<svg class="icon icon-arrow-next"><use xlink:href="assets/img/sprite.svg#arrow-next"></use></svg>',
      ],
    })
  }

  var initCarouselResizeHandler = function () {
    if (
      $mobileCarouselCard &&
      $mobileCarouselCard.length &&
      $(window).width() >= 980
    ) {
      $mobileCarouselCard.trigger('destroy.owl.carousel')
    } else if ($(window).width() < 980) {
      initHtsCarousel()
    }
  }

  initCarouselResizeHandler()
  $(window).on('resize', initCarouselResizeHandler)

  // sticky col
  ;(function () {
    // elements
    var $targetEl = $('[data-sticky]')
    var $targetWrapp = $targetEl.parent()
    var $stickyEl = null
    var $destinationEl = $('[data-sticky-stop]')

    // if elements doesn't on page
    if (!$targetEl.length || !$destinationEl.length) {
      return
    }

    if ($stickyEl === null) {
      $stickyEl = $('<div class="sticky-wrapp"></div>')
      $stickyEl.css('width', $targetEl.css('width'))
      $targetEl.wrap($stickyEl)
    }

    $stickyEl = $targetWrapp.find('.sticky-wrapp')

    $targetEl.off('click')
    $targetEl.on('click', '.dd-list-head', function (e) {
      var $target = $(e.target)
      if ($target.is('a')) return

      $(this)
        .siblings('.dd-list-body')
        .slideToggle(300, function () {
          stickyHandler()
        })
      $(this).parent().toggleClass('_opened')
    })

    // positions
    var resizeTimer,
      offsetWrappTopPos,
      destinationBottomPos,
      stickyElHeight,
      stickyTopPosition

    // events
    $(window).scroll(stickyHandler)

    $(window).resize(function () {
      $stickyEl.css('width', $targetWrapp.css('width'))

      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        if ($(window).width() >= 980) {
          stickyHandler()
        }
      }, 300)
    })

    // init
    $(window).trigger('resize')

    // calc positions
    function calculatePositions() {
      offsetWrappTopPos = $targetWrapp.offset().top
      destinationBottomPos =
        $destinationEl.offset().top + parseInt($destinationEl.css('height'))
      stickyElHeight = parseInt($stickyEl.outerHeight())
      stickyTopPosition =
        destinationBottomPos - offsetWrappTopPos - stickyElHeight
    }

    function stickyHandler() {
      calculatePositions()

      var targetScrollElTop = offsetWrappTopPos - $(window).scrollTop()
      var targetScrollElBottom =
        destinationBottomPos - $(window).scrollTop() - stickyElHeight

      if (targetScrollElTop <= 0) {
        $stickyEl.addClass('sticky')
      } else {
        $stickyEl.removeClass('sticky')
      }

      if (targetScrollElBottom <= 0) {
        $stickyEl.addClass('stop')
        $stickyEl.css('top', stickyTopPosition)
      } else {
        $stickyEl.removeClass('stop')
        $stickyEl.css('top', '')
      }
    }
  })()
})
