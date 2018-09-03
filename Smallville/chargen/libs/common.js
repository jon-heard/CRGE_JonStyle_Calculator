
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

function isUndefined(val)
{
    return val === undefined;
}

function apos(text)
{
	return text.replaceAll("'", "&apos;");
}

function jsonStringifyPretty(obj, levels, space)
{
    if (levels <= 0)
    {
        return JSON.stringify(obj);
    }
    else
    {
        var a = JSON.parse(JSON.stringify(obj));
        for (var key in a)
        {
            a[key] = jsonStringifyPretty(a[key], levels-1, space);
        }
        a = JSON.stringify(a, null, space); 
        return a.replaceAll("\"{", "{").replaceAll("}\"", "}").replaceAll("\\\\\\\"", "\"");
    }
}
