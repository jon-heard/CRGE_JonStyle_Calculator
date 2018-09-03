
String.prototype.capitalize = function()
{
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.replaceAll = function(search, replacement)
{
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.default = function(val)
{
	return this.trim()=="" ? val : this.trim();
}

String.prototype.isEmpty = function(val)
{
	return this.trim()=="";
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

function apos(text)
{
	return text.replaceAll("'", "&apos;");
}
