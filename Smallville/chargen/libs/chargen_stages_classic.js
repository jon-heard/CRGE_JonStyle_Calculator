
//////////////////////
// Helper functions //
//////////////////////
function pluralStat(type)
{
	switch (type)
	{
		case "ability": return "abilities";
		case "gear": return "gear";
		default: return type + "s";
	}
}
function indefiniteArticle(noun)
{
	var first = noun[0].toLowerCase();
	if (first == "a" || first == "e" || first == "i" || first == "o" || first == "u")
	{
		return "an";
	}
	else
	{
		return "a";
	}
}

function stepUp(types, val)
{
	for (var i = 0; i < types.length; i++)
	{
		if (_character.hasOwnProperty(pluralStat(types[i])))
		{
			if (_character[pluralStat(types[i])].hasOwnProperty(val))
			{
				_character[pluralStat(types[i])][val].value += 2;
				if (types[i] == "distinction")
				{
					refreshDistinction(val);
				}
				return true;
			}
		}
	}
	return false;
}

function getStatsList(types, skipMaxed)
{
	var result = [];
	var toAdd = null;
	for (var i = 0; i < types.length; i++)
	{
		if (_character.hasOwnProperty(pluralStat(types[i])))
		{
			var statList = _character[pluralStat(types[i])];
			for (var key in statList)
			{
				if (!statList.hasOwnProperty(key)) { continue; }
				if (skipMaxed && statList[key].value < 12)
				{
					result.push(key);
				}
			}
		}
		else
		{
			result.push(types[i]);
		}
	}
	return result;
}

function genStep_stepUpOneOfTwoValues(name, v1, v2, suffix)
{
	if (!isString(suffix)) { suffix = ""; }
	return {
		name: name, type: "select",
		text: "Step up " + v1 + " or " + v2 + "." + suffix,
		data: [ v1, v2 ],
		post: function (data) { stepUp(["value"], data); }
	};
}

function genStep_stepUp(name, types, suffix)
{
	if (!isString(suffix)) { suffix = ""; }
	var text = "Step up a ";
	var assetIndex = -1;
	for (var i = 0; i < types.length; i++)
	{
		if (i > 0)
		{
			if (i == types.length - 1)
			{
				text += " or " + indefiniteArticle(types[i]) + " ";
			}
			else
			{
				text += ", " + indefiniteArticle(types[i]) + " ";
			}
		}
		text += types[i]
		if (types[i] == "location" || types[i] == "extra")
		{
			types[i] = "resource";
		}
		if (types[i] == "asset")
		{
			assetIndex = i;
		}
	}
	text += "." + suffix;
	if (assetIndex != -1)
	{
		types[assetIndex] = "distinction";
		types.push("ability");
		types.push("gear");
	}
	return {
		name: name, type: "select",
		text: text,
		data: function() { return getStatsList(types, true); },
		post: function (data) { stepUp(types, data); }
	};
}

function genStep_newDistinction(name, nextName)
{
	return {
		name: name, type: "goto",
		data: "Add distinction 01",
		pre: function()
		{
			_returnStep = nextName;
		}
	};
}

function genStep_newGear(name, nextName)
{
	return {
		name: name, type: "goto",
		data: "Add gear 01",
		pre: function()
		{
			_returnStep = nextName;
		}
	};
}

function genStep_pathReturn(name, destination, options)
{
	return {
		name: name, type: "goto",
		pre: function ()
		{
			_pathwayChoices = options;
		},
		data: destination
	};
}

function genStep_stepUpDistinctionOrNewDistinction_step1(name)
{
	return {
		name: name, type: "select",
		text: "Step up a distinction or add a new distinction",
		data: function ()
		{
			var result = [];
			for (var key in _character.distinctions)
			{
				if (_character.distinctions[key].value < 12)
				{
					result.push(key);
				}
			}
			result.push("&lt;&lt; New distinction &gt;&gt;");
			return result;
		},
		post: function (data)
		{
			_tmp1 = false;
			if (data == "<< New distinction >>")
			{
				_tmp1 = true;
			}
			else
			{
				_character.distinctions[data].value += 2;
				refreshDistinction(data);
			}
		}
	};
}

function genStep_stepUpDistinctionOrNewDistinction_step2(name, nextName)
{
	return {
		name: name, type: "goto",
		data: function() { return (_tmp1) ? "Add distinction 01" : 1; },
		pre: function()
		{
			_returnStep = nextName;
		}
	};
}

function genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step1(name)
{
	return {
		name: name, type: "select",
		text: "Step up a distinction or ability or add a new distinction or ability",
		data: function ()
		{
			var result = [];
			for (var key in _character.distinctions)
			{
				if (_character.distinctions[key].value < 12)
				{
					result.push(key);
				}
			}
			for (var key in _character.abilities)
			{
				if (_character.abilities[key].value < 12)
				{
					result.push(key);
				}
			}
			result.push("&lt;&lt; New distinction &gt;&gt;");
			result.push("&lt;&lt; New ability &gt;&gt;");
			return result;
		},
		post: function (data)
		{
			_tmp1 = 0;
			if (data == "<< New distinction >>")
			{
				_tmp1 = 1;
			}
			else if (data == "<< New ability >>")
			{
				_tmp1 = 2
			}
			else
			{
				if (_character.distinctions.hasOwnProperty(data))
				{
					_character.distinctions[data].value += 2;
					refreshDistinction(data);
				}
				else if (_character.abilities.hasOwnProperty(data))
				{
					_character.abilities[data].value += 2;
				}
			}
		}
	};
}

function genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step2(name, nextName)
{
	return {
		name: name, type: "goto",
		data: function()
		{
			if (_tmp1 == 1)
			{
				return "Add distinction 01";
			}
			else if (_tmp1 == 2)
			{
				return "Add ability 01";
			}
			else
			{
				return 1;
			}
		},
		pre: function()
		{
			_returnStep = nextName;
		}
	};
}

////////////
// Stages //
////////////
var _stages_classic =
{
	stageNames: [ "origin", "youth", "focus", "road", "life changing event" ],
	startingChoices: [ "rich", "ordinary", "gifted", "strange", "metahuman" ],
	finalChoices: [ "advancement", "tragedy", "power manifestation", "first contact", "destiny" ],
	steps:
	[
		//////////////////////
		// 1-origin 1: rich //
		//////////////////////
		{
			name: "rich 01", type: "goto",
			title: "Origin: rich"
		},
		genStep_stepUpOneOfTwoValues("rich 02", "duty", "power", " (1/2)"),
		genStep_stepUpOneOfTwoValues("rich 03", "duty", "power", " (2/2)"),
		genStep_newDistinction("rich 04", "rich 05"),
		genStep_stepUp("rich 05", [ "resource" ]),
		genStep_stepUp("rich 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("rich 07", "youth 01", [ "jock", "average", "paragon" ]),

		//////////////////////////
		// 1-origin 2: ordinary //
		//////////////////////////
		{
			name: "ordinary 01", type: "goto",
			title: "Origin: ordinary"
		},
		genStep_stepUpOneOfTwoValues("ordinary 02", "love", "justice", " (1/2)"),
		genStep_stepUpOneOfTwoValues("ordinary 03", "love", "justice", " (2/2)"),
		genStep_newDistinction("ordinary 04", "ordinary 05"),
		genStep_stepUp("ordinary 05", [ "relationship" ]),
		genStep_stepUp("ordinary 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("ordinary 07", "youth 01", [ "jock", "average", "geek" ]),

		////////////////////////
		// 1-origin 3: gifted //
		////////////////////////
		{
			name: "gifted 01", type: "goto",
			title: "Origin: gifted"
		},
		genStep_stepUpOneOfTwoValues("gifted 02", "glory", "truth", " (1/2)"),
		genStep_stepUpOneOfTwoValues("gifted 03", "glory", "truth", " (2/2)"),
		genStep_newDistinction("gifted 04", "gifted 05"),
		{
			name: "gifted 05", type: "select",
			text: "Choose a new distinction or ability.",
			data: function()
			{
				var distinctions = _distinctions.map(function(c)
				{
					return c.name;
				});
				distinctions = distinctions.filter(function(val)
				{
					return !_character.distinctions.hasOwnProperty(val);
				});
				distinctions.push("");
				distinctions.push("");
				var abilities = _abilities.map(function(c)
				{
					return c.name;
				});
				abilities = abilities.filter(function(val)
				{
					return !_character.abilities.hasOwnProperty(val);
				});
				var result = $.merge(distinctions, abilities);
				return result;
			},
			post: function (data)
			{
				var index = findDistinction(data);
				if (index == -1) // Must be an ability
				{
					_tmp1 = data;
					_character.abilities[data] = { value: 4, effects: [] };
				}
				else
				{
					_tmp1 = "";
					var distinction = _distinctions[index];
					_character.distinctions[data] = { value: 4, effects: [distinction.triggers[0]] };
					if (distinction.hasOwnProperty("limits"))
					{
						_character.distinctions[data].limits = distinction.limits;
					}
				}
			}
		},
		{
			name: "gifted 06", type: "goto",
			data: function() { return _tmp1=="" ? 1 : "Add ability 02"; },
			pre: function()
			{
				_returnStep = "gifted 07";
			}
		},
		genStep_stepUp("gifted 07", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("gifted 08", "youth 01", [ "average", "geek", "outsider" ]),

		/////////////////////////
		// 1-origin 4: strange //
		/////////////////////////
		{
			name: "strange 01", type: "goto",
			title: "Origin: strange"
		},
		genStep_stepUpOneOfTwoValues("strange 02", "glory", "power", " (1/2)"),
		genStep_stepUpOneOfTwoValues("strange 03", "glory", "power", " (2/2)"),
		genStep_newDistinction("strange 04", "strange 05"),
		genStep_stepUp("strange 05", [ "resource" ]),
		genStep_stepUp("strange 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("strange 07", "youth 01", [ "geek", "outsider", "paragon" ]),

		////////////////////////////
		// 1-origin 5: metahuman //
		////////////////////////////
		{
			name: "metahuman 01", type: "goto",
			title: "Origin: metahuman"
		},
		genStep_stepUpOneOfTwoValues("metahuman 02", "duty", "truth", " (1/2)"),
		genStep_stepUpOneOfTwoValues("metahuman 03", "duty", "truth", " (2/2)"),
		{
			name: "metahuman 04", type: "goto",
			data: "Pick heritage 01",
			pre: function()
			{
				_returnStep = "metahuman 05";
			}
		},
		{
			name: "metahuman 05", type: "select",
			text: "Choose what to do next.",
			data: function()
			{
				return ["Step up " + _tmp1, "Add new ability"];
			},
			post: function(data)
			{
				if (data == "Add new ability")
				{
					_tmp2 = true;
				}
				else
				{
					_tmp2 = false;
				}
			}
		},
		{
			name: "metahuman 06", type: "goto",
			data: "Add ability 01",
			data: function() { return _tmp2 ? "Add ability 01" : 1 },
			pre: function()
			{
				if (_tmp2)
				{
					_returnStep = "metahuman 07";
				}
				else
				{
					_character.distinctions[_tmp1].value += 2;
				}
			}
		},
		genStep_newDistinction("metahuman 07", "metahuman 08"),
		genStep_pathReturn("metahuman 08", "youth 01", [ "jock", "outsider", "paragon" ]),

		/////////////////////
		// 2-youth 1: jock //
		/////////////////////
		{
			name: "jock 01", type: "goto",
			title: "Youth: jock"
		},
		genStep_stepUpDistinctionOrNewDistinction_step1("jock 02"),
		genStep_stepUpDistinctionOrNewDistinction_step2("jock 03", "jock 04"),
		genStep_stepUp("jock 04", [ "resource" ]),
		genStep_stepUp("jock 05", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("jock 06", "focus 01", [ "money", "life", "paranormal" ]),

		////////////////////////
		// 2-youth 2: average //
		////////////////////////
		{
			name: "average 01", type: "goto",
			title: "Youth: average"
		},
		genStep_stepUpDistinctionOrNewDistinction_step1("average 02"),
		genStep_stepUpDistinctionOrNewDistinction_step2("average 03", "average 04"),
		genStep_stepUp("average 04", [ "relationship" ]),
		genStep_stepUp("average 05", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("average 06", "focus 01", [ "money", "life", "status" ]),
	
		/////////////////////
		// 2-youth 3: geek //
		/////////////////////
		{
			name: "geek 01", type: "goto",
			title: "Youth: geek"
		},
		genStep_newDistinction("geek 02", "geek 03"),
		genStep_stepUp("geek 03", ["distinction"]),
		genStep_stepUp("geek 04", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("geek 05", "focus 01", [ "life", "status", "technology" ]),
	
		/////////////////////////
		// 2-youth 4: outsider //
		/////////////////////////
		{
			name: "outsider 01", type: "goto",
			title: "Youth: outsider"
		},
		genStep_stepUpDistinctionOrNewDistinction_step1("outsider 02"),
		genStep_stepUpDistinctionOrNewDistinction_step2("outsider 03", "outsider 04"),
		genStep_stepUp("outsider 04", [ "location" ]),
		genStep_stepUp("outsider 05", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("outsider 06", "focus 01", [ "status", "technology", "paranormal" ]),
		
		////////////////////////
		// 2-youth 5: paragon //
		////////////////////////
		{
			name: "paragon 01", type: "goto",
			title: "Youth: paragon"
		},
		genStep_stepUpDistinctionOrNewDistinction_step1("paragon 02"),
		genStep_stepUpDistinctionOrNewDistinction_step2("paragon 03", "paragon 04"),
		genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step1("paragon 04"),
		genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step2("paragon 05", "paragon 06"),
		genStep_stepUp("paragon 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("paragon 07", "focus 01", [ "money", "technology", "paranormal" ]),

		//////////////////////
		// 3-focus 1: money //
		//////////////////////
		{
			name: "money 01", type: "goto",
			title: "Focus: money"
		},
		genStep_newDistinction("money 02", "money 03"),
		genStep_stepUp("money 03", [ "resource" ]),
		genStep_stepUp("money 04", [ "relationship" ]),
		genStep_pathReturn("money 05", "road 01", [ "risky", "straight and narrow", "ethical" ]),

		/////////////////////
		// 3-focus 2: life //
		/////////////////////
		{
			name: "life 01", type: "goto",
			title: "Focus: life"
		},
		genStep_stepUp("life 02", [ "relationship" ]),
		genStep_stepUp("life 03", [ "relationship" ]),
		genStep_stepUp("life 04", [ "resource" ]),
		genStep_pathReturn("life 05", "road 01", [ "risky", "straight and narrow", "lofty" ]),

		///////////////////////
		// 3-focus 3: status //
		///////////////////////
		{
			name: "status 01", type: "goto",
			title: "Focus: status"
		},
		genStep_stepUp("status 02", [ "distinction" ]),
		genStep_stepUp("status 03", [ "resource" ]),
		genStep_stepUp("status 04", [ "relationship" ]),
		genStep_pathReturn("status 05", "road 01", [ "straight and narrow", "lofty", "underground" ]),

		///////////////////////////
		// 3-focus 4: technology //
		///////////////////////////
		{
			name: "technology 01", type: "goto",
			title: "Focus: technology"
		},
		genStep_newGear("technology 02", "technology 03"),
		{
			name: "technology 03", type: "select",
			text: "Step up a distinction or gear or add a new distinction or gear",
			data: function ()
			{
				var result = [];
				for (var key in _character.distinctions)
				{
					if (_character.distinctions[key].value < 12)
					{
						result.push(key);
					}
				}
				for (var key in _character.gear)
				{
					if (_character.gear[key].value < 12)
					{
						result.push(key);
					}
				}
				result.push("&lt;&lt; New distinction &gt;&gt;");
				result.push("&lt;&lt; New gear &gt;&gt;");
				return result;
			},
			post: function (data)
			{
				_tmp1 = 0;
				if (data == "<< New distinction >>")
				{
					_tmp1 = 1;
				}
				else if (data == "<< New gear >>")
				{
					_tmp1 = 2
				}
				else
				{
					if (_character.distinctions.hasOwnProperty(data))
					{
						_character.distinctions[data].value += 2;
					}
					else if (_character.gear.hasOwnProperty(data))
					{
						_character.gear[data].value += 2;
					}
				}
			}
		},
		{
			name: "technology 04", type: "goto",
			data: function()
			{
				if (_tmp1 == 1)
				{
					return "Add distinction 01";
				}
				else if (_tmp1 == 2)
				{
					return "Add gear 01";
				}
				else
				{
					return 1;
				}
			},
			pre: function()
			{
				_returnStep = "technology 05";
			}
		},
		genStep_stepUp("technology 05", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("technology 06", "road 01", [ "lofty", "underground", "ethical" ]),

		///////////////////////////
		// 3-focus 5: paranormal //
		///////////////////////////
		{
			name: "paranormal 01", type: "goto",
			title: "Focus: paranormal"
		},
		genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step1("paranormal 02"),
		genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step2("paranormal 03", "paranormal 04"),
		{
			name: "paranormal 04", type: "select",
			text: function()
			{
				var result = hasHeritage() ? "S" : "Pick a heritage or s";
				result += "tep up a distinction or add a new distinction";
				return result;
			},
			data: function ()
			{
				var result = [];
				if (!hasHeritage())
				{
					result.push("&lt;&lt; Pick heritage &gt;&gt;");
				}
				for (var key in _character.distinctions)
				{
					if (_character.distinctions[key].value < 12)
					{
						result.push(key);
					}
				}
				result.push("&lt;&lt; New distinction &gt;&gt;");
				return result;
			},
			post: function (data)
			{
				switch (data)
				{
					case "<< Pick heritage >>":
						_tmp1 = 1;
						break;
					case "<< New distinction >>":
						_tmp1 = 2;
						break;
					default:
						_tmp1 = 0;
						_character.distinctions[data].value += 2;
						refreshDistinction(data);
				}
			}
		},
		{
			name: "paranormal 05", type: "goto",
			data: function()
			{
				switch (_tmp1)
				{
					case 1:
						return "Pick heritage 01";
					case 2:
						return "Add distinction 01";
					default:
						return 1;
				}
			},
			pre: function()
			{
				_returnStep = "paranormal 06";
			}
		},
		genStep_stepUp("paranormal 06", [ "relationship" ]),
		genStep_pathReturn("paranormal 07", "road 01", [ "risky", "underground", "ethical" ]),

		/////////////////////
		// 4-road 1: risky //
		/////////////////////
		{
			name: "risky 01", type: "goto",
			title: "Road: risky"
		},
		genStep_stepUpOneOfTwoValues("risky 02", "glory", "power"),
		genStep_stepUpDistinctionOrNewDistinction_step1("risky 03"),
		genStep_stepUpDistinctionOrNewDistinction_step2("risky 04", "risky 05"),
		genStep_stepUp("risky 05", [ "resource" ]),
		genStep_stepUp("risky 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("risky 07", "life changing event 01"),
	
		///////////////////////////////////
		// 4-road 2: straight and narrow //
		///////////////////////////////////
		{
			name: "straight and narrow 01", type: "goto",
			title: "Road: straight and narrow"
		},
		genStep_stepUpOneOfTwoValues("straight and narrow 02", "duty", "love"),
		genStep_stepUpDistinctionOrNewDistinction_step1("straight and narrow 03"),
		genStep_stepUpDistinctionOrNewDistinction_step2("straight and narrow 04", "straight and narrow 05"),
		genStep_stepUp("straight and narrow 05", [ "relationship" ]),
		genStep_stepUp("straight and narrow 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("straight and narrow 07", "life changing event 01"),

		/////////////////////
		// 4-road 3: lofty //
		/////////////////////
		{
			name: "lofty 01", type: "goto",
			title: "Road: lofty"
		},
		genStep_stepUpOneOfTwoValues("lofty 02", "glory", "truth"),
		genStep_stepUpDistinctionOrNewDistinction_step1("lofty 03"),
		genStep_stepUpDistinctionOrNewDistinction_step2("lofty 04", "lofty 05"),
		genStep_stepUp("lofty 05", [ "resource" ]),
		genStep_stepUp("lofty 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("lofty 07", "life changing event 01"),

		///////////////////////////
		// 4-road 4: underground //
		///////////////////////////
		{
			name: "underground 01", type: "goto",
			title: "Road: underground"
		},
		genStep_stepUpOneOfTwoValues("underground 02", "justice", "truth"),
		genStep_stepUpDistinctionOrNewDistinction_step1("underground 03"),
		genStep_stepUpDistinctionOrNewDistinction_step2("underground 04", "underground 05"),
		genStep_stepUp("underground 05", [ "relationship" ]),
		genStep_stepUp("underground 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("underground 07", "life changing event 01"),

		///////////////////////
		// 4-road 5: ethical //
		///////////////////////
		{
			name: "ethical 01", type: "goto",
			title: "Road: ethical"
		},
		genStep_stepUpOneOfTwoValues("ethical 02", "justice", "love"),
		genStep_stepUpDistinctionOrNewDistinction_step1("ethical 03"),
		genStep_stepUpDistinctionOrNewDistinction_step2("ethical 04", "ethical 05"),
		genStep_stepUp("ethical 05", [ "relationship" ]),
		genStep_stepUp("ethical 06", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("ethical 07", "life changing event 01"),

		//////////////////////////////////////////
		// 5-life changing event 1: advancement //
		//////////////////////////////////////////
		{
			name: "advancement 01", type: "goto",
			title: "Life changing event: advancement"
		},
		genStep_stepUpOneOfTwoValues("advancement 02", "glory", "power", " (1/2)"),
		genStep_stepUpOneOfTwoValues("advancement 03", "glory", "power", " (2/2)"),
		genStep_stepUp("advancement 04", [ "value" ]),
		genStep_stepUpDistinctionOrNewDistinction_step1("advancement 05"),
		genStep_stepUpDistinctionOrNewDistinction_step2("advancement 06", "advancement 07"),
		genStep_stepUp("advancement 07", [ "location" ]),
		genStep_stepUp("advancement 08", [ "relationship" ], " (1/2)"),
		genStep_stepUp("advancement 09", [ "relationship" ], " (2/2)"),
		genStep_stepUp("advancement 10", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("advancement 11", "wrapup 01"),

		//////////////////////////////////////
		// 5-life changing event 2: tragedy //
		//////////////////////////////////////
		{
			name: "tragedy 01", type: "goto",
			title: "Life changing event: tragedy"
		},
		genStep_stepUpOneOfTwoValues("tragedy 02", "justice", "love", " (1/2)"),
		genStep_stepUpOneOfTwoValues("tragedy 03", "justice", "love", " (2/2)"),
		genStep_stepUp("tragedy 04", [ "value" ]),
		genStep_stepUpDistinctionOrNewDistinction_step1("tragedy 05"),
		genStep_stepUpDistinctionOrNewDistinction_step2("tragedy 06", "tragedy 07"),
		genStep_stepUp("tragedy 07", [ "relationship" ], " (1/2)"),
		genStep_stepUp("tragedy 08", [ "relationship" ], " (2/2)"),
		genStep_stepUp("tragedy 09", [ "extra" ]),
		genStep_stepUp("tragedy 10", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("tragedy 11", "wrapup 01"),

		//////////////////////////////////////////////////
		// 5-life changing event 3: power manifestation //
		//////////////////////////////////////////////////
		{
			name: "power manifestation 01", type: "goto",
			title: "Life changing event: power manifestation"
		},
		genStep_stepUpOneOfTwoValues("power manifestation 02", "power", "power", " (power focus!)"),
		genStep_stepUp("power manifestation 03", [ "value" ], " (1/2)"),
		genStep_stepUp("power manifestation 04", [ "value" ], " (2/2)"),
		{
			name: "power manifestation 05", type: "goto",
			data: "Add ability 01",
			pre: function()
			{
				_returnStep = "power manifestation 06";
			}
		},
		genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step1("power manifestation 06"),
		genStep_stepUpDistinctionOrAbilityOrNewDistinctionOrAbility_step2("power manifestation 07", "power manifestation 08"),
		genStep_stepUp("power manifestation 08", [ "distinction" ]),
		genStep_stepUp("power manifestation 09", [ "location" ], " (1/2)"),
		genStep_stepUp("power manifestation 10", [ "location" ], " (2/2)"),
		genStep_pathReturn("tragedy 11", "wrapup 01"),

		////////////////////////////////////////////
		// 5-life changing event 4: first contact //
		////////////////////////////////////////////
		{
			name: "first contact 01", type: "goto",
			title: "Life changing event: first contact"
		},
		genStep_stepUpOneOfTwoValues("first contact 02", "duty", "truth", " (1/2)"),
		genStep_stepUpOneOfTwoValues("first contact 03", "duty", "truth", " (2/2)"),
		genStep_stepUp("first contact 04", [ "value" ]),
		{
			name: "first contact 05", type: "select",
			text: function()
			{
				var result = hasHeritage() ? "S" : "Pick a heritage or s";
				result += "tep up a distinction or gear or add a new distinction or gear";
				return result;
			},
			data: function ()
			{
				var result = [];
				if (!hasHeritage())
				{
					result.push("&lt;&lt; Pick heritage &gt;&gt;");
				}
				for (var key in _character.distinctions)
				{
					if (_character.distinctions[key].value < 12)
					{
						result.push(key);
					}
				}
				for (var key in _character.gear)
				{
					if (_character.gear[key].value < 12)
					{
						result.push(key);
					}
				}
				result.push("&lt;&lt; New distinction &gt;&gt;");
				result.push("&lt;&lt; New gear &gt;&gt;");
				return result;
			},
			post: function (data)
			{
				switch (data)
				{
					case "<< Pick heritage >>":
						_tmp1 = 1;
						break;
					case "<< New distinction >>":
						_tmp1 = 2;
						break;
					case "<< New gear >>":
						_tmp1 = 3;
						break;
					default:
						_tmp1 = 0;
						if (_character.distinctions.hasOwnProperty(data))
						{
							_character.distinctions[data].value += 2;
							refreshDistinction(data);
						}
						else if (_character.gear.hasOwnProperty(data))
						{
							_character.gear[data].value += 2;
						}
						else
						{
							throw "Invalid selection";
						}
				}
			}
		},
		{
			name: "first contact 06", type: "goto",
			data: function()
			{
				switch (_tmp1)
				{
					case 1:
						return "Pick heritage 01";
					case 2:
						return "Add distinction 01";
					case 3:
						return "Add gear 01";
					default:
						return 1;
				}
			},
			pre: function()
			{
				_returnStep = "first contact 07";
			}
		},
		genStep_stepUp("first contact 07", [ "relationship" ], " (1/3)"),
		genStep_stepUp("first contact 08", [ "relationship" ], " (2/3)"),
		genStep_stepUp("first contact 09", [ "relationship" ], " (3/3)"),
		genStep_stepUp("first contact 10", [ "resource" ]),
		genStep_pathReturn("first contact 11", "wrapup 01"),

		//////////////////////////////////////
		// 5-life changing event 5: destiny //
		//////////////////////////////////////
		{
			name: "destiny 01", type: "goto",
			title: "Life changing event: destiny"
		},
		genStep_stepUpOneOfTwoValues("destiny 02", "duty", "duty", " (duty focus!)"),
		genStep_stepUp("destiny 03", [ "value" ]),
		genStep_stepUp("destiny 04", [ "value" ]),
		{
			name: "destiny 05", type: "select",
			text: function()
			{
				var result = hasHeritage() ? "S" : "Pick a heritage or s";
				result += "tep up a distinction or ability or add a new distinction or ability";
				return result;
			},
			data: function ()
			{
				var result = [];
				if (!hasHeritage())
				{
					result.push("&lt;&lt; Pick heritage &gt;&gt;");
				}
				for (var key in _character.distinctions)
				{
					if (_character.distinctions[key].value < 12)
					{
						result.push(key);
					}
				}
				for (var key in _character.abilities)
				{
					if (_character.abilities[key].value < 12)
					{
						result.push(key);
					}
				}
				result.push("&lt;&lt; New distinction &gt;&gt;");
				result.push("&lt;&lt; New ability &gt;&gt;");
				return result;
			},
			post: function (data)
			{
				switch (data)
				{
					case "<< Pick heritage >>":
						_tmp1 = 1;
						break;
					case "<< New distinction >>":
						_tmp1 = 2;
						break;
					case "<< New ability >>":
						_tmp1 = 3;
						break;
					default:
						_tmp1 = 0;
						if (_character.distinctions.hasOwnProperty(data))
						{
							_character.distinctions[data].value += 2;
							refreshDistinction(data);
						}
						else if (_character.abilities.hasOwnProperty(data))
						{
							_character.abilities[data].value += 2;
						}
						else
						{
							throw "Invalid selection";
						}
				}
			}
		},
		{
			name: "destiny 06", type: "goto",
			data: function()
			{
				switch (_tmp1)
				{
					case 1:
						return "Pick heritage 01";
					case 2:
						return "Add distinction 01";
					case 3:
						return "Add ability 01";
					default:
						return 1;
				}
			},
			pre: function()
			{
				_returnStep = "destiny 07";
			}
		},
		genStep_stepUp("destiny 07", [ "resource" ]),
		genStep_stepUp("destiny 08", [ "relationship" ], " (1/2)"),
		genStep_stepUp("destiny 09", [ "relationship" ], " (2/2)"),
		genStep_stepUp("destiny 10", [ "relationship", "resource", "asset" ]),
		genStep_pathReturn("destiny 11", "wrapup 01"),
	]
}
