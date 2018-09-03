
var _statusbar;

function setStatusbar(newStatusbar)
{
	_statusbar = newStatusbar;
}

function setStatusErr(isErr)
{
	_statusbar.css("background-color", isErr ? "red" : "");
}

function setStatus(text)
{
	if (text == "")
	{
		text = "&nbsp;";
	}
	_statusbar.html(text);
}