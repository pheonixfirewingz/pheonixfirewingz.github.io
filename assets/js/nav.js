/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = (window.innerWidth / 6) + "px";
  document.getElementById("close").style.display = "none";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function openMNav() {
	document.getElementById("mySidenav").style.width = "200px";
	document.getElementById("close").style.display = "block";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = "white";
}

window.addEventListener('mousemove', function(e)
{
		if(window.innerWidth >= 330)
		{
			if(window.innerWidth <= 2000)
			{
				if(window.innerWidth <= 1030)
				{
				}
				else
				{
					if(e.x <= (0 + (window.innerWidth / 6)))
					{
						openNav();
					}
					else
					{
					closeNav();
					}
				}
			}
			else
			{
				console.log("ERROR: Screen to big for right maths to take place");
			}
		}
		else
		{
			console.log("ERROR: Screen to small for right maths to take place");
		}
});

