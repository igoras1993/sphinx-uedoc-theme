import $ from 'jquery';
import { isOutOfVerticalSroll } from "./utilities";

/**
 * Hightlight the correct locatoc list item based on its position when the user scroll the page
 */
$(window).on('load', function () {

	var sections = $('div.section')
	sections = sections.toArray()
	sections.shift()
	sections = $(sections)

	var localtoc = $('div#uedoc-localtoc li')
	var tocscroll = $('div#localtoc div.localtocwrapper')

	$(window).on('scroll', function () {
		var top = -1;
		var topmost = undefined
		sections.each(function () {
			var topOffset = $(this).offset().top - $(window).scrollTop()
			if (top == -1 || top > Math.abs(topOffset)) {
				top =  Math.abs(topOffset)
				topmost = $(this)
			}
		})
		localtoc.each(function () {
			var toctext = $($(this).children().get(0)).attr('href')
			toctext = toctext.substr(1)
			if (topmost.attr('id') == toctext) {
				if (isOutOfVerticalSroll(tocscroll, $(this), 50)) {
					tocscroll.stop(true, false).animate({
						scrollTop: $(this).position().top
					}, 200);
				}
				$(this).addClass('current-reading')
			} else {
				$(this).removeClass('current-reading')
			}
		})
	})
})
