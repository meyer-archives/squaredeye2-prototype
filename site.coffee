$ = jQuery

$(document).ready ->
	currentOffset = 0
	lastScrollTop = scrollTop = $(document).scrollTop()
	scrollBottom = scrollTop + $(window).height()
	scrollDirection = 'LOL'
	visibleItems = {}

	currentFixedSection = false

	$g = $('<div>')
	$('#info').append $g

	$(window).scroll ->
		lastScrollTop = scrollTop
		lastScrollDirection = scrollDirection

		# Viewport top and bottom
		scrollTop = $(document).scrollTop()
		scrollBottom = scrollTop + $(window).height()

		$g.text 'Viewport top: '+scrollTop+', bottom: '+scrollBottom

		if scrollTop > lastScrollTop
			scrollDirection = 'down'
		else
			scrollDirection = 'up'

		if scrollDirection != lastScrollDirection
			$('body').addClass('going-'+scrollDirection).removeClass('going-'+lastScrollDirection)

	containerHeight = false

	$('ul#scrolling-content>li').each (index) ->
		$li = $(this)

		if !containerHeight
			containerHeight = $li.parent().height()
			$li
				.parent()
				.css {position:'relative',height:containerHeight}

		$li.css {zIndex:index+50}

		$menu = $li
			.find('.menu')
			.css {zIndex:index+150}

		menuHeight = $menu.height()

		# The div that wraps the menu. Height adjusts from zero to full height
		$menuContainer = $menu.children('div')#.height(0)

		$menu.height(menuHeight).find('ul').height(menuHeight) # wut

		$debug = $('<div>')
		$('#info').append $debug
		$debug.text $li.attr('id')

		# I suck at naming variables
		tTop = $li.offset().top
		tHeight = $li.height()
		tBottom = tTop+tHeight
		cssBottom = containerHeight-tBottom

		topEdgeVisible = false
		bottomEdgeVisible = false

		$li.css
#			bottom: cssBottom
			top: tTop

		console.log 'top: '+tTop+', bottom: '+cssBottom + ', height: '+$li.height()

		$li.find('h1').append('<span> &bull; distance from bottom: '+cssBottom+', height: '+$li.height()+'</span>')

		amountVisible = 'none'
		isFirst = 'yeah'
		isLast = 'ok'

		bringIt = (e) ->
			newIsFirst = (tTop <= scrollTop && tBottom >= scrollTop)
			newIsLast = (tBottom >= scrollTop && tBottom <= scrollBottom)

			distanceFromTop = tTop-scrollTop

			if e.type == 'resize'
				console.log 'reposition currently fixed element' 

			$debug.text distanceFromTop+'px'

			if distanceFromTop <= menuHeight
				$menuContainer.height(menuHeight-distanceFromTop)
			else
				$menuContainer.height(0)

			if tHeight > $(window).height()
				if newIsLast != isLast
					isLast = newIsLast
					if isLast
						$li.css({position:'fixed',top:($(window).height()-tHeight)})
					else
						$li.css({position:'absolute',top:tTop})
			else
				if newIsFirst != isFirst
					isFirst = newIsFirst
					if isFirst
						$li.css({position:'fixed',top:0})
					else
						$li.css({position:'absolute',top:tTop})

#		bringIt({type:'init'})

		$(window).bind 'scroll resize', bringIt

	.parent().addClass 'scrolly-time'