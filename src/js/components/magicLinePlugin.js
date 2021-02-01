;(function ($) {
  $.fn.myMagicLine = function (options) {
    var settigs = $.extend(
      {
        variant: 'click',
      },
      options
    )

    this.each(function () {
      var $magicLineWrap = $(this)

      $magicLineWrap.append('<li class="magic-line"></li>')
      var $magicLine = $magicLineWrap.find('.magic-line')
      magicLineAnimate($magicLineWrap.children().first())

      if (settigs.variant === 'click') {
        $magicLineWrap.on('click', 'li:not(.magic-line)', function () {
          magicLineAnimate($(this))
        })
      }

      if (settigs.variant === 'hover') {
        $magicLineWrap.on('mouseover', 'li:not(.magic-line)', function () {
          magicLineAnimate($(this))
        })
      }

      function magicLineAnimate($el) {
        $magicLine.stop().animate(
          {
            left: $el.position().left,
            width: $el.outerWidth(),
          },
          250
        )
      }
    })

    return this
  }
})(jQuery)
