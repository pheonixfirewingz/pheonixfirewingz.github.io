/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Search
5. Init Home Slider
6. Init SVG
7. Init Portfolio Slider
8. Init Testimonial Slider


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initSearch();
	initHomeSlider();
	initSvg();
	initPortfolioSlider();
	initTestSlider();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			var hamburger = $('.hamburger');

			hamburger.on('click', function()
			{
				menu.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Search

	*/

	function initSearch()
	{
		var searchButton = $('.search_button');
		var searchContainer = $('.search_container');
		searchButton.on('click', function()
		{
			searchContainer.toggleClass('active');
		});
	}

	/* 

	5. Init Home Slider

	*/

	function initHomeSlider()
	{
		if($('.home_slider').length)
		{
			var homeSlider = $('.home_slider');
			homeSlider.owlCarousel(
			{
				items:1,
				autoplay:true,
				loop:true,
				nav:false,
				smartSpeed:1200
			});

			/* Custom dots events */
			if($('.home_slider_custom_dot').length)
			{
				$('.home_slider_custom_dot').on('click', function()
				{
					$('.home_slider_custom_dot').removeClass('active');
					$(this).addClass('active');
					homeSlider.trigger('to.owl.carousel', [$(this).index(), 1200]);
				});
			}

			/* Change active class for dots when slide changes by nav or touch */
			homeSlider.on('changed.owl.carousel', function(event)
			{
				$('.home_slider_custom_dot').removeClass('active');
				$('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
			});
		}
	}

	/* 

	6. Init SVG

	*/

	function initSvg()
	{
		if($('img.svg').length)
		{
			jQuery('img.svg').each(function()
			{
				var $img = jQuery(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');

				jQuery.get(imgURL, function(data)
				{
					// Get the SVG tag, ignore the rest
					var $svg = jQuery(data).find('svg');

					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
					}
					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
					}

					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');

					// Replace image with new SVG
					$img.replaceWith($svg);
				}, 'xml');
			});
		}	
	}

	/* 

	7. Init Portfolio Slider

	*/

	function initPortfolioSlider()
	{
		if($('.portfolio_slider').length)
		{
			var portfoliSlider = $('.portfolio_slider');
			portfoliSlider.owlCarousel(
			{
				items: 4,
				loop: false,
				autoplay: false,
				smartSpeed: 1200,
				dots: false,
				nav: false,
				margin: 20,
				responsive:
				{
					0:{items:1},
					768:{items:2},
					992:{items:3},
					1441:{items:4}
				}
			});
		}
	}

	/* 

	8. Init Testimonial Slider

	*/

	function initTestSlider()
	{
		if($('.test_slider').length)
		{
			var testSlider = $('.test_slider');
			testSlider.owlCarousel(
			{
				items: 1,
				loop: true,
				autoplay: true,
				autoplayHoverPause:true,
				smartSpeed: 1200,
				dots: false,
				nav: false
			});
		}
	}

});