document.addEventListener('mousemove',mouseLocation,false);

function mouseLocation(e)
{
	var x = e.pageX;
	shouldOpen(x);
}

function shouldOpen(x)
{
	if(x < 160)
	{
		openNav();
	}
	else
	{
		closeNav();
	}
}

function openNav() 
{
  document.getElementById("sidebox").style.width = "160px";
}

function closeNav() 
{
  document.getElementById("sidebox").style.width = "0";
}