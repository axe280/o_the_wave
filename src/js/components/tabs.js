import $ from 'jquery'

$(function() {
  // simple tabs
  $('[data-simple-tabs]').on('click', 'li:not(.current)', function() {
    $(this)
      .addClass('current')
      .siblings().removeClass('current')
      .parents('.simple-tabs-wrapp')
      .find('.simple-tabs-box')
      .eq($(this).index()).fadeIn()
      .siblings('.simple-tabs-box').hide();
  });
});