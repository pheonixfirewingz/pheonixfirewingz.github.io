let sound_Level;
/*
 * this is not sent to the website servers and is diffrent depending on user
 */
function StoreUserDataToLocalBrowser()
{
	localStorage.setItem("Volume",sound_Level);
}

function userDataLoad()
{
	sound_Level = localStorage.getItem("Volume");
}

function NewUser()
{
	sound_Level = 100;
}