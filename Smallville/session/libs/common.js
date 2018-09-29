
String.prototype.capitalize = function ()
{
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.uncapitalize = function ()
{
	return this.charAt(0).toLowerCase() + this.slice(1);
}

String.prototype.replaceAll = function (search, replacement)
{
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.default = function (val)
{
	return this.trim() == "" ? val : this.trim();
}

String.prototype.isEmpty = function (val)
{
	return this.trim() == "";
}

Array.prototype.moveElement = function(from, to)
{
	if (from < this.length && from >= 0 && to < this.length && to >= 0)
	{
		this.splice(to, 0, this.splice(from, 1)[0]);
		return true;
	}
	return false;
}

function isFunction(val)
{
	return val && {}.toString.call(val) === '[object Function]';
}

function isNumber(val)
{
	return $.isNumeric(val);
}

function isString(val)
{
	return typeof val === 'string' || val instanceof String;
}

function isUndefined(val)
{
	return val === undefined;
}

function isArray(val)
{
	return Array.isArray(val);
}

function isObject(val)
{
	return val !== null && typeof val === 'object';
}

function apos(text)
{
	return text.replaceAll("'", "&apos;");
}

function jsonStringifyPretty(val, levels, space)
{
	if (!isObject(val))
	{
		return val;
	}
	else if (levels <= 0)
	{
		return JSON.stringify(val);
	}
	else
	{
		var a = JSON.parse(JSON.stringify(val));
		for (var key in a)
		{
			a[key] = jsonStringifyPretty(a[key], levels - 1, space);
		}
		a = JSON.stringify(a, null, space);
		return a.
			replaceAll("\"{", "{").replaceAll("}\"", "}").replaceAll("\\\\\\\"", "\"").
			replaceAll("\"\"\"\"", "\"\"").replaceAll("\\\\n", "\n");
	}
}

function textToClipboard(text)
{
	var buf = $("<textarea>");
	$("body").append(buf);
	buf.val(text).select();
	document.execCommand("copy");
	buf.remove();
}

function clipboardToText()
{
	var buf = $("<textarea>");
	$("body").append(buf);
	buf.val("abc").focus().select();
	document.execCommand("paste");
	var result = buf.val();
	buf.remove();
	return result;
}
