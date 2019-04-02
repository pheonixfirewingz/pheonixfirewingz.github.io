/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Search


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

});