var _defaultCharacter = {
    "name": "Unnamed",
    "appearance": "Nondescript",
    "background": "Amnesiac",
    "values": {
      "duty": { "value": 4, "text": "" },
      "glory": { "value": 4, "text": "" },
      "justice": { "value": 4, "text": "" },
      "love": { "value": 4, "text": "" },
      "power": { "value": 4, "text": "" },
      "truth": { "value": 4, "text": "" }
    },
    "relationships": {},
    "resources": {},
    "assets": {},
    "state": {
      "afraid": 0,
      "angry": 0,
      "exhausted": 0,
      "injured": 0,
      "insecure": 0,
      "plot": 0,
      "growth": [],
      "challenges": {},
      "resourceUse": {}
    }
}
var _character = $.extend(true, {}, _defaultCharacter);

function resetCharacter()
{
    _character = $.extend(true, {}, _defaultCharacter);
}

function serializeCharacter()
{
    return JSON.stringify(_character, null, 2);
}

function makeSheet()
{
    var ui = "";
    ui += "<h2>" + _character.name + "</h2>";
    ui += "<table>";
    ui += "<tr><td><b>Appearance</b></td><td>" + _character.appearance + "</td></tr>";
    ui += "<tr><td><b>Background</b></td><td>" + _character.background + "</td></tr>";
    ui += "</table><br/><br/>";

	ui += "<table border='0'><tr><th colspan='3'>Values</th></tr>\n";
	for (var i = 0; i < _values.length; i++)
	{
		let value = _character.values[_values[i]].value;
		if (_character.state.challenges.hasOwnProperty(_values[i]))
		{
			value -= _character.state.challenges[_values[i]] * 2;
		}
        ui += "<tr><td class='valueTitle'>" + _values[i].capitalize() + "</td>";
        ui += "<td class='valueDie'>D" + value + "</td>";
		ui += "<td class='valueText'>" + apos(_character.values[_values[i]].text) + "</td></tr>\n";
	}
	ui += "</table><hr/>\n";

	ui += "<table border='0'><tr><th colspan='3'>Relationships</th></tr>\n";
	for (var name in _character.relationships)
	{
		let value = _character.relationships[name].value;
		if (_character.state.challenges.hasOwnProperty(name))
		{
			value -= _character.state.challenges[name] * 2;
		}
		ui += "<tr><td class='relationshipTitle'>" + apos(name) + "</td>";
        ui += "<td class='relationshipDie'>D" + value + "</td>";
		ui += "</td><td class='relationshipText'>" + apos(_character.relationships[name].text);
		ui += "</td></tr>\n";
	}
	ui += "</table>\n";

	ui += "<table border='0'><tr><th colspan='3'>Resources</th></tr>\n";
	for (var name in _character.resources)
	{
		let count = 2;
		if (_character.state.resourceUse.hasOwnProperty(name))
		{
			count -= _character.state.resourceUse[name];
		}
		ui += "<tr><td class='resourceTitle'>" + apos(name) + "</td>";
        ui += "<td class='resourceDie'>2D" + _character.resources[name].value + "</td>";
		ui += "<td class='resourceUses'>" + _character.resources[name].specialties.join(", ") + "</td></tr>\n";
	}
	ui += "</table><hr/>\n";

	ui += "<table border='0'><tr><th colspan='3'>Assets</th></tr>\n";
	for (var name in _character.assets)
	{
		let limitText =
			_character.assets[name].hasOwnProperty("limits") ?
			("Limits: " + apos(_character.assets[name].limits.join(", "))) :
			"";
        ui += "<tr><td class='assetTitle'>" + apos(name) + "</td>";
        ui += "<td class='assetDie'>D" + _character.assets[name].value + "</td>";
        ui += "<td class='assetLimits'>" + limitText + "</td></tr>\n";
		ui += "<tr><td class='assetEffects' colspan='3'>\n";
		for (var i = 0; i < _character.assets[name].effects.length; i++)
		{
			ui += apos(_character.assets[name].effects[i]) + "<br/>";
		}
		ui += "</td></tr>\n";
	}
    ui += "</table>\n";
    return ui;
}
