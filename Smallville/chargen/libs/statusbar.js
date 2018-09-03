
var _statusbar;

function setStatusbar(newStatusbar)
{
	_statusbar = newStatusbar;
}

function setStatus(text)
{
	_statusbar.css("background-color", text=="" ? "" : "red");
	if (text == "")
	{
		text = "&nbsp;";
	}
	_statusbar.html(text);
}