(function() {
  var $;
  $ = jQuery;
  $(document).ready(function() {
    var $g, currentOffset, lastScrollTop, scrollBottom, scrollDirection, scrollTop, visibleItems;
    currentOffset = 0;
    lastScrollTop = scrollTop = $(document).scrollTop();
    scrollBottom = scrollTop + $(window).height();
    scrollDirection = 'LOL';
    visibleItems = {};
    $g = $('<div>');
    $('#info').append($g);
    $(window).scroll(function() {
      var lastScrollDirection;
      lastScrollTop = scrollTop;
      lastScrollDirection = scrollDirection;
      scrollTop = $(document).scrollTop();
      scrollBottom = scrollTop + $(window).height();
      $g.text('Viewport top: ' + scrollTop + ', bottom: ' + scrollBottom);
      if (scrollTop > lastScrollTop) {
        scrollDirection = 'down';
      } else {
        scrollDirection = 'up';
      }
      if (scrollDirection !== lastScrollDirection) {
        return $('body').addClass('going-' + scrollDirection).removeClass('going-' + lastScrollDirection);
      }
    });
    return $('ul#scrolling-content>li').each(function() {
      var $li, $m, amountVisible, bottomEdgeVisible, tBottom, tTop, topEdgeVisible;
      $li = $(this);
      $m = $('<div>');
      $('#info').append($m);
      $m.text($li.attr('id'));
      tTop = $li.offset().top;
      tBottom = tTop + $li.height();
      topEdgeVisible = false;
      bottomEdgeVisible = false;
      $li.data('top-initial', tTop).css({
        top: tTop
      });
      console.log('top: ' + tTop + ', bottom: ' + tBottom + ', height: ' + $li.height());
      $li.find('h1').append('<span> &bull; distance from top: ' + tTop + '</span>');
      $('ul#scrolling-content').height(tBottom);
      amountVisible = 'none';
      return $(window).bind('scroll resize', function() {
        var newB, newT;
        newT = tTop >= scrollTop && tTop <= scrollBottom;
        newB = tBottom >= scrollTop && tBottom <= scrollBottom;
        $m.removeClass(amountVisible + '-visible');
        $li.removeClass(amountVisible + '-visible');
        if (newT !== topEdgeVisible) {
          topEdgeVisible = newT;
        }
        if (newB !== bottomEdgeVisible) {
          bottomEdgeVisible = newB;
        }
        if (bottomEdgeVisible || topEdgeVisible) {
          amountVisible = 'all';
          if (scrollDirection === 'down') {
            if (!topEdgeVisible) {
              $li.css({
                top: $li.height() - scrollBottom,
                bottom: null,
                position: 'absolute',
                zIndex: 1
              });
            } else {
              $li.css({
                top: $li.data('top-initial'),
                bottom: null,
                position: 'absolute',
                zIndex: 10
              });
            }
          }
        } else {
          amountVisible = 'none';
        }
        $m.addClass(amountVisible + '-visible');
        return $li.addClass(amountVisible + '-visible');
      });
    }).parent().addClass('scrolly-time');
  });
}).call(this);
