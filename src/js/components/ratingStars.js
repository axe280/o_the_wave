import $ from 'jquery'

$(function() {
  // rating stars
  $('.rating-stars')
    .on('mouseover', '.rating-stars__item', function() {
      addRatingClass($(this), 'hover');
    })
    .on('mouseout', '.rating-stars__item', ratingHoverRemoveClass)
    .on('click', '.rating-stars__item', function() {
      addRatingClass($(this), 'selected');
    });

  function ratingHoverRemoveClass() {
    $(this).parent().children('.rating-stars__item').each(function() {
      $(this).removeClass('hover');
    });
  }

  function addRatingClass($targetEl, addClassName) {
    var starVal = parseInt($targetEl.data('rating-value'), 10);

    $targetEl.parent().children('.rating-stars__item').each(function(idx) {
      if (idx < starVal) {
        $(this).addClass(addClassName);
      } else {
        $(this).removeClass(addClassName);
      }
    });
  }
});