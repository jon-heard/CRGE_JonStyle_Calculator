var _defaultCharacter = {
    "name": "Unnamed",
    "appearance": "Nondescript",
	"background": "Amnesiac",
	"path": [],
	"pathTitles": [],
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
    "distinctions": {},
	"abilities": {},
	"gear": {},
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
var _testCharacter = {
	"name": "Clark",
	"appearance": "Tall, built, dark hair, low key",
	"background": "farming, journalism",
	"path": [ "metahuman", "paragon", "paranormal", "ethical", "destiny" ],
	"pathTitles": [ "origin", "youth", "focus", "road", "life changing event"],
	"values": {
		"duty": { "value": 6, "text": "I must fullfill my parent's hopes for me." },
		"glory": { "value": 4, "text": "The blur gives people hope." },
		"justice": { "value": 4, "text": "I must protect the innocent." },
		"love": { "value": 6, "text": "I must safeguard my family and friends." },
		"power": { "value": 4, "text": "Power corrupts." },
		"truth": { "value": 6, "text": "The truth is often dangerous." }
	},
	"relationships": {
		"Chloe": { "value": 10, "text": "I need to be there for Chloe." },
		"Jonathan": { "value": 4, "text": "Jonathan was my moral compass." },
		"Lana": { "value": 6, "text": "Lana is not the girl I loved in high school." },
		"Lex": { "value": 6, "text": "Lex can never be trusted." },
		"Lois": { "value": 12, "text": "I can't tell Lois my secret." },
		"Martha": { "value": 8, "text": "Martha is my constant supporter." },
		"Oliver": { "value": 8, "text": "Oliver is reckless." },
		"Tess": { "value": 6, "text": "Tess knows what she wants." },
		"Zod": { "value": 6, "text": "There must be good in Zod." }
	},
	"resources": {
		"Crows nest": { "value": 4, "specialties": [ "protect", "high" ] },
		"Daily planet": { "value": 4, "specialties": [ "research", "info" ] },
		"Fortress of solitude": { "value": 8, "specialties": [ "traning", "knowledge (Kryptonian)" ] },
		"Justice society": { "value": 6, "specialties": [ "assistance", "inspiration" ] },
		"Kent farm": { "value": 6, "specialties": [ "comfort", "restoration" ] },
		"Oliver's team": { "value": 4, "specialties": [ "brawl", "sneaky" ] },
		"John Jones": { "value": 6, "specialties": [ "retrieval", "crime" ] }
	},
	"distinctions": {
		"Heritage: Kryptonian": { "value": 8,
			"limits": [ "kryptonite", "magic", "red sun" ], "effects": [
			"Earn a plot point when your abilities are shutdown by green or blue kryptonite or you choose to act on baser instincts under the sway of red kryptonite.",
			"Add a D6 to the trouble pool to use a special effect from a connected ability you don't have."
		]},
		"Big hearted": { "value": 12, "effects": [
			"Earn a plot point when you choose to buy someone's sob story.",
			"Earn a plot point and add a D6 to the trouble pool when you risk yourself to help someone in need."
		]},
		"Guilty": { "value": 8, "effects": [
			"Earn a plot point and give your opposition a D6 when your guilt stymies or confuses you."
		]},
		"Impulsive": { "value": 8, "effects": [
			"Earn a plot point and add a D6 to trouble when you act rashly.",
			"Earn a plot point when you choose to interfere in a contest."
		]},
	},
	"abilities": {
		"Heat vision": { "value": 6, "effects": [
			"create a wide-angle sweep effect that inflicts Insecure or Afraid stress.",
			"destroy an inanimate object as big as a car.  Spend two plot points for an object as big as a house.",
			"Spend three plot points for an object as big as a skyscraper or a river."
		]},
		"Invulneratbility": { "value": 10, "effects": [
			"decrease an opponent's injured or exhausted stress pool",
			"recover your Injured or Exhuasted stress."
		]},
		"Super breath": { "value": 6, "effects": [
			"trap somebody in a sheath of ice.  Your target must win a contest against you to break free.",
			"clear a scene of all dust, smoke, loose debris, or sand."
		]},
		"Super senses (hearing, sight)": { "value": 8,
			"limits": [ "lead (sight)", "sonic (hearing)" ], "effects": [
			"see through objects to find specific people or objects",
			"hear or see into a nearby scene you're not in."
		]},
		"Super speed": { "value": 10, "effects": [
			"join a scene or switch to a new scene regardless of distance.",
			"catch bullets or other missiles out of the air.",
			"run fast enough to cross water as if it were solid ground."
		]},
		"Super strength": { "value": 10, "effects": [
			"perform a fantastic feat of strength.",
			"throw or knock another character out of a scene.",
			"leap a great distance into another scene."
		]}
	},
	"gear": {
		"Cellphone": { "value": 4, "effects": [
			"Listen in on a phonecall with a known number."
		]}
	},
	"state": {
		"afraid": 0, "angry": 0, "exhausted": 0, "injured": 0, "insecure": 0, "plot": 1,
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
    return jsonStringifyPretty(_character, 2, 2);
}

function makeSheet()
{
    var ui = "";
    ui += "<h2>" + _character.name + "</h2>";
    ui += "<table>";
    ui += "<tr><td class='dHead'><b>Appearance</b></td><td>" + _character.appearance + "</td></tr>";
	ui += "<tr><td class='dHead'><b>Background</b></td><td>" + _character.background + "</td></tr>";
	ui += "<tr><td class='dHead'><b>Path</b></td><td>"
	for (var i = 0; i < _character.path.length; i++)
	{
		if (i != 0) { ui += ", "; }
		if (i == 3) { ui += "<br/>"; }
		ui += "<b>" + _character.pathTitles[i].capitalize() + ":</b> " + _character.path[i].capitalize();
	}
	ui += "</td></tr></table>";

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
	ui += "</table>\n";

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
	ui += "</table>\n";

	ui += "<table border='0'><tr><th colspan='3'>Assets</th></tr>\n";
	for (var name in _character.distinctions)
	{
		var distinction = _character.distinctions[name];
		ui += getAssetUi(name, distinction.value, distinction.limits, distinction.effects);
	}
	for (var name in _character.abilities)
	{
		var ability = _character.abilities[name];
		var effects = ability.effects.map(fixupSpendEffect);
		ui += getAssetUi(name, ability.value, ability.limits, effects);
	}
	for (var name in _character.gear)
	{
		var gear = _character.gear[name];
		var effects = gear.effects.map(fixupSpendEffect);
		ui += getAssetUi(
			name, gear.value, ["gear"], effects);
	}
    ui += "</table><br/><br/>\n";
    return ui;
}

function getAssetUi(name, value, limits, effects)
{
	let limitText = isArray(limits) ? "Limits: " + apos(limits.join(", ")) : "";
	var result = "";
	result += "<tr><td class='assetTitle'>" + apos(name) + "</td>";
	result += "<td class='assetDie'>D" + value + "</td>";
	result += "<td class='assetLimits'>" + limitText + "</td></tr>\n";
	result += "<tr><td colspan='3'>\n";
	for (var i = 0; i < effects.length; i++)
	{
		result += "<div class='effect'>" + apos(effects[i]) + "</div>";
	}
	result += "</td></tr>\n";
	return result;
}

function fixupSpendEffect(effect)
{
	if (effect.startsWith("Spend "))
	{
		return effect;
	}
	else
	{
		return "Spend a plot point to " + effect.uncapitalize();
	}
}

function hasHeritage()
{
	var names = Object.keys(_character.distinctions);
	if (names.length == 0)
	{
		return false;
	}
	for (var i = 0; i < names.length; i++)
	{
		if (names[i].startsWith("Heritage:"))
		{
			return true;
		}
	}
	return false;
}