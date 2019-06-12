let myVar;

function load() 
{
  myVar = setTimeout(showPage, 750);
}

function showPage() 
{
  document.getElementById("loader").style.display = "none";
  document.getElementById("page").style.display = "block";
}