(function() {
  var $;
  $ = jQuery;
  $(document).ready(function() {
    var $g, containerHeight, currentFixedSection, currentOffset, lastScrollTop, scrollBottom, scrollDirection, scrollTop, visibleItems;
    currentOffset = 0;
    lastScrollTop = scrollTop = $(document).scrollTop();
    scrollBottom = scrollTop + $(window).height();
    scrollDirection = 'LOL';
    visibleItems = {};
    currentFixedSection = false;
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
    containerHeight = false;
    return $('ul#scrolling-content>li').each(function(index) {
      var $debug, $li, $menu, $menuContainer, amountVisible, bottomEdgeVisible, bringIt, cssBottom, isFirst, isLast, menuHeight, tBottom, tHeight, tTop, topEdgeVisible;
      $li = $(this);
      if (!containerHeight) {
        containerHeight = $li.parent().height();
        $li.parent().css({
          position: 'relative',
          height: containerHeight
        });
      }
      $li.css({
        zIndex: index + 50
      });
      $menu = $li.find('.menu').css({
        zIndex: index + 150
      });
      menuHeight = $menu.height();
      $menuContainer = $menu.children('div');
      $menu.height(menuHeight).find('ul').height(menuHeight);
      $debug = $('<div>');
      $('#info').append($debug);
      $debug.text($li.attr('id'));
      tTop = $li.offset().top;
      tHeight = $li.height();
      tBottom = tTop + tHeight;
      cssBottom = containerHeight - tBottom;
      topEdgeVisible = false;
      bottomEdgeVisible = false;
      $li.css({
        top: tTop
      });
      console.log('top: ' + tTop + ', bottom: ' + cssBottom + ', height: ' + $li.height());
      $li.find('h1').append('<span> &bull; distance from bottom: ' + cssBottom + ', height: ' + $li.height() + '</span>');
      amountVisible = 'none';
      isFirst = 'yeah';
      isLast = 'ok';
      bringIt = function(e) {
        var distanceFromTop, newIsFirst, newIsLast;
        newIsFirst = tTop <= scrollTop && tBottom >= scrollTop;
        newIsLast = tBottom >= scrollTop && tBottom <= scrollBottom;
        distanceFromTop = tTop - scrollTop;
        if (e.type === 'resize') {
          console.log('reposition currently fixed element');
        }
        $debug.text(distanceFromTop + 'px');
        if (distanceFromTop <= menuHeight) {
          $menuContainer.height(menuHeight - distanceFromTop);
        } else {
          $menuContainer.height(0);
        }
        if (tHeight > $(window).height()) {
          if (newIsLast !== isLast) {
            isLast = newIsLast;
            if (isLast) {
              return $li.css({
                position: 'fixed',
                top: $(window).height() - tHeight
              });
            } else {
              return $li.css({
                position: 'absolute',
                top: tTop
              });
            }
          }
        } else {
          if (newIsFirst !== isFirst) {
            isFirst = newIsFirst;
            if (isFirst) {
              return $li.css({
                position: 'fixed',
                top: 0
              });
            } else {
              return $li.css({
                position: 'absolute',
                top: tTop
              });
            }
          }
        }
      };
      return $(window).bind('scroll resize', bringIt);
    }).parent().addClass('scrolly-time');
  });
}).call(this);
