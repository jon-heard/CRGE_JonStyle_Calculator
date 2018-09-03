
Object.prototype.equals = function(other)
{
	return JSON.stringify(this) === JSON.stringify(other);
}

function parameterizeString(source)
{
	var result = [];
	var myRegexp = /[^\s"]+|"([^"]*)"/gi;
	do {
		//Each call to exec returns the next regex match as an array
		var match = myRegexp.exec(source);
		if (match != null)
		{
			//Index 1 in the array is the captured group if it exists
			//Index 0 is the matched text, which we use if no captured group exists
			result.push(match[1] ? match[1] : match[0]);
		}
	} while (match != null);
	return result;
}