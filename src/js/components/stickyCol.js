import $ from 'jquery'

$(function() {
  (function() {

    // elements
    var $targetEl = $('[data-sticky]');
    var $targetWrapp = $targetEl.parent();
    var $stickyEl = null;
    var $destinationEl = $('[data-sticky-stop]');

    // if elements doesn't on page
    if (!$targetEl.length || !$destinationEl.length) {
      return;
    }

    if ($stickyEl === null) {
      $stickyEl = $('<div class="sticky-wrapp"></div>');
      $stickyEl.css('width', $targetEl.css('width'))
      $targetEl.wrap($stickyEl);
    }

    $stickyEl = $targetWrapp.find('.sticky-wrapp');

    // positions
    var resizeTimer,
        offsetWrappTopPos, 
        destinationBottomPos,
        stickyElHeight,
        stickyTopPosition;

    // events
    $(window).scroll(stickyHandler);

    $(window).resize(function() {
      $stickyEl.css('width', $targetWrapp.css('width'));
      
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if ($(window).width() >= 980) {
          calculatePositions();
          stickyHandler();
        }
      }, 300);
    });

    // init
    $(window).trigger('resize');
    
    // calc positions
    function calculatePositions() {
      offsetWrappTopPos = $targetWrapp.offset().top;
      destinationBottomPos = $destinationEl.offset().top + parseInt($destinationEl.css('height'));
      stickyElHeight = parseInt($stickyEl.outerHeight());
      stickyTopPosition = destinationBottomPos - offsetWrappTopPos - stickyElHeight;
    }

    function stickyHandler() {
      var targetScrollElTop = offsetWrappTopPos - $(window).scrollTop();
      var targetScrollElBottom = destinationBottomPos - $(window).scrollTop() - stickyElHeight;

      if (targetScrollElTop <= 0) {
        $stickyEl.addClass('sticky');
      } else {
        $stickyEl.removeClass('sticky');
      }

      if (targetScrollElBottom <= 0) {
        $stickyEl.addClass('stop');
        $stickyEl.css('top', stickyTopPosition);
      } else {
        $stickyEl.removeClass('stop');
        $stickyEl.css('top', '');
      }
    }
  }());
});