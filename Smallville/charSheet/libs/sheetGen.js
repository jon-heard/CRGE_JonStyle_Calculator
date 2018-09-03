
function parseInput(src)
{
	return JSON.parse(src);
}

var _values = [ "duty", "glory", "justice", "love", "power", "truth" ];
var _stresses = [ "afraid", "angry", "exhausted", "injured", "insecure" ];

function generateOutput(src, dest, force)
{
	window.document.title = src.name + " (smallville)";
	dest.css("padding", "2em");
	var result = "";
	result += "<h1>" + apos(src.name) + "</h1>\n";

	result += "<span id='plotTitle'>Plot:</span><span id='plotValue'>" + src.state.plot + "</span>";
	result += "<button onClick='incPlot()'>+</button><button onClick='decPlot()'>-</button>";
	result += "<span id='plotSpace'/>";

	result += "<span id='growthTitle'>Growth:</span>";
	var growthText = [];
	for (var i = 0; i < src.state.growth.length; i++)
	{
		growthText.push(
			"<a class='growthItem' onclick='removeGrowth(" + i + ")'>" +
			src.state.growth[i] + "</a>");
	}
	result += "<span id='growthValues'>" + growthText.join(", ") + "</span>";
	result += "<button onClick='addGrowth()'>+</button>";

	result += "<br/><br/>\n";

	result += "<table border='0'><tr><th colspan='3'>Values</th></tr>\n";
	for (var i = 0; i < _values.length; i++)
	{
		let value = src.values[_values[i]].value;
		if (src.state.challenges.hasOwnProperty(_values[i]))
		{
			value -= src.state.challenges[_values[i]] * 2;
		}
		result += "<tr><td class='valueTitle'>" + _values[i].capitalize() + "</td>";
		result += "<td class='valueDie'>" + dice(1, value, _values[i]);
		if (value > 4)
		{
			result += "<button onclick='decDrive(\"" + _values[i] +  "\")'>-</button>";
		}
		result += "</td><td class='valueText'>" + apos(src.values[_values[i]].text) + "</td></tr>\n";
	}
	result += "</table>\n";

	result += "<table border='0'><tr><th colspan='3'>Stress</th></tr>\n";
	for (var i = 0; i < _stresses.length; i++)
	{
		 result += "<tr><td class='stressTitle'>" + _stresses[i].capitalize() + "</td><td class='stressDie'>" + dice(1, src.state[_stresses[i]], _stresses[i] + "</td>");
		 result += "<td><select onchange='setStress(\"" + _stresses[i] + "\", this.value)'>";
		 for (var j = 0; j < 14; j += 2)
		 {
			 if (j == 2) { continue; }
			 result += "<option value='" + j + "' " + (j==src.state[_stresses[i]] ? "selected" : "") + ">" + j + "</option>";
		 }
		 result += "</select></td></tr>\n";
	}
	result += "</table><hr/>\n";

	result += "<table border='0'><tr><th colspan='3'>Relationships</th></tr>\n";
	for (var name in src.relationships)
	{
		let value = src.relationships[name].value;
		if (src.state.challenges.hasOwnProperty(name))
		{
			value -= src.state.challenges[name] * 2;
		}
		result += "<tr><td class='relationshipTitle'>" + apos(name) + "</td>";
		result += "<td class='relationshipDie'>" + dice(1, value, apos(name));
		if (value > 4)
		{
			result += "<button onclick='decDrive(\"" + name +  "\")'>-</button>";
		}
		result += "</td><td class='relationshipText'>" + apos(src.relationships[name].text);
		result += "</td></tr>\n";
	}
	result += "</table>\n";

	result += "<table border='0'><tr><th colspan='3'>Resources</th></tr>\n";
	for (var name in src.resources)
	{
		let count = 2;
		if (src.state.resourceUse.hasOwnProperty(name))
		{
			count -= src.state.resourceUse[name];
		}
		result += "<tr><td class='resourceTitle'>" + apos(name) + "</td>";
		result += "<td class='resourceDie'>";
		result += resourceDice(count, src.resources[name].value, apos(name));
		if (count > 0)
		{
			result += "<button onclick='decResource(\"" + name + "\")'>-</button>";
		}
		result += "</td>";
		result += "<td class='resourceUses'>" + src.resources[name].uses.join(", ") + "</td></tr>\n";
	}
	result += "</table><hr/>\n";

	result += "<table border='0'><tr><th colspan='3'>Assets</th></tr>\n";
	for (var name in src.assets)
	{
		let limitText =
			src.assets[name].hasOwnProperty("limits") ?
			("Limits: " + apos(src.assets[name].limits.join(", "))) :
			"";
		result += "<tr><td class='assetTitle'>" + apos(name) + "</td><td class='assetDie'>" + dice(1, src.assets[name].value, apos(name)) + "</td><td class='assetLimits'>" + limitText + "</td></tr>\n";
		result += "<tr><td class='assetEffects' colspan='3'>\n";
		for (var i = 0; i < src.assets[name].effects.length; i++)
		{
			result += apos(src.assets[name].effects[i]) + "<br/>";
		}
		result += "</td></tr>\n";
	}
	result += "</table>\n";

	dest.html(result);
}

function dice(count, type, name)
{
	if (count < 0) { count = 0; }
	if (type < 0) { type = 0; }
	if (type == 0 || count == 0) { return (count==1?"":count) + "D" + type; }
	return "<button onclick='addDieToPool(" + type + ",\"" + name + "\")'>" + (count==1?"":count) + "D" + type + "</button>";
}

function resourceDice(count, type, name)
{
	if (count < 0) { count = 0; }
	if (type < 0) { type = 0; }
	if (type == 0 || count == 0) { return (count==1?"":count) + "D" + type; }
	return "<button onclick='rollResource(" + count + ", " + type + ",\"" + name + "\")'>" + (count==1?"":count) + "D" + type + "</button>";
}

function apos(text)
{
	return text.replaceAll("'", "&apos;");
}