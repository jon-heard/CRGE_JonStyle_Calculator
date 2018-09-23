
var _levelupOptions = [
	"Add / Replace comment", "Remove comment",
	"",
	"Change value statement", "Change relationship statement",
	"",
	"Add relationship", "Add extra", "Add location", "Add distinction", "Add ability",
	"Add gear", "Add ability effect",
	"",
	"Shift values", "Step up relationship (d6)", "Step up resource (d6: extra, d8: location)",
	"Step up distinction (d10)", "Step up ability (d12)",
	"",
	"Step down relationship", "Remove relationship", "Remove resource",
	"Remove distinction", "Remove ability"
];

var _levelupSteps = {
	"Add / Replace comment": "Add / replace comment 01",
	"Remove comment": "Remove comment 01",

	"Change value statement": "Value statement 01",
	"Change relationship statement": "Relationship statement 01",

	"Add relationship": "Add relationship 01",
	"Add extra": "Add extra 01",
	"Add location": "Add location 01",
	"Add distinction": "Add distinction 01",
	"Add ability": "Add ability 01",
	"Add gear": "Add gear 01",
	"Add ability effect": "Add ability effect 01",

	"Shift values": "Shift values 01",
	"Step up relationship (d6)": "Step up relationship 01",
	"Step up resource (d6: extra, d8: location)": "Step up resource 01",
	"Step up distinction (d10)": "Step up distinction 01",
	"Step up ability (d12)": "Step up ability 01",

	"Step down relationship": "Step down relationship 01",
	"Remove relationship": "Remove relationship 01",
	"Remove resource": "Remove resource 01",
	"Remove distinction": "Remove distinction 01",
	"Remove ability": "Remove ability 01",
}

var _returnStep = "origin 01";
var _stages;

var _steps = [
	////////////////////
	// 0-chargen type //
	////////////////////
	// {
	// 	name: "pathways type 01", type: "select",
	//  title: "Pathways type",
	// 	text: "Choose your pathways type:",
	// 	showCharSrc: false,
	// 	data: [ "classic", "highschool" ],
	// 	post: function(data)
	// 	{
	// 		_stages = _stages_classic;
	// 		switch (data)
	// 		{
	// 			case "highschool":
	// 				_stages = _stages_classic;
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// 		_currentSteps = $.merge(_currentSteps, _stages.steps);
	// 	}
	// },
	{
		name: "Pathways type 01", type: "goto",
		pre: function(data)
		{
			_stages = _stages_classic;
			_currentSteps = $.merge(_currentSteps, _stages.steps);
		}
	},

	//////////////
	// 1-origin //
	//////////////
	{
		name: "origin 01", type: "text",
		text: "Name your lead.",
		title: function()
		{
			return _stages.stageNames[0].capitalize();
		},
		mid: function (data)
		{
			data = data.default("Unnamed");
			_character.name = data;
			refreshCharSheet();
		},
		post: function (data) { _tmp1 = _character.name; },
	},
	{
		name: "origin 02", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Add the new lead \"<span class='tmp1'/>\".",
	},
	{
		name: "origin 03", type: "pass"
	},
	{
		name: "origin 04", type: "text",
		text: "Enter the name of a lead that <span class='charName'/> doesn't yet have a relationship with.<br/>Enter nothing if <span class='charName'/> has a relationship with all other leads.",
		post: function (data)
		{
			_tmp1 = data.trim();
			if (_tmp1 != "")
			{
				_character.relationships[_tmp1] = { value: 4, text: "" };
			}
		}
	},
	{
		name: "origin 05", type: "goto",
		data: function () { return (_tmp1 == "") ? 1 : -1; }
	},
	{
		name: "origin 06", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Make sure that lead \"<span class='charName'/>\" is connected to all other leads <i>(biconnect, empty relationship text)</i>."
	},
	{
		name: "origin 07", type: "text3",
		text: "Enter a new extra, followed by two associated specialties.<br/>This should be someone important to <span class='charName'/>'s origin.",
		post: function (data)
		{
			_tmp1 = data[0].default("Unknown");
			_character.resources[_tmp1] =
				{
					value: 4, specialties: [data[1].default("Unknown"),
					data[2].default("Unknown")]
				};
		}
	},
	{
		name: "origin 08", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Add the new extra \"<span class='tmp1'/>\" and connect lead \"<span class='charName'/>\" to it."
	},
	{
		name: "origin 09", type: "select",
	    text: "Pick an \"origin\" pathway.",
	    data: function()
	    {
	        return _stages.startingChoices;
	    },
	    post: function(data)
	    {
			_tmp1 = data;
			_character.path.push(data);
			_character.pathTitles.push(_stages.stageNames[0]);
	    }
	},
	{
		name: "origin 10", type: "goto",
		data: function() { return _tmp1 + " 01"; }
	},

	/////////////
	// 2-youth //
	/////////////
	{
		name: "youth 01", type: "spacer"
	},
	{
		name: "youth 02", type: "pass",
		title: function()
		{
			return _stages.stageNames[1].capitalize();
		},
	},
	{
		name: "youth 03", type: "text3",
		text: "Enter a new location, followed by two associated specialties.<br/>This should be someplace important to <span class='charName'/>'s youth.",
		post: function (data)
		{
			_tmp1 = data[0].default("Unknown");
			_character.resources[_tmp1] =
				{
					value: 4, specialties: [data[1].default("Unknown"),
					data[2].default("Unknown")]
				};
		}
	},
	{
		name: "youth 04", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Add the new location \"<span class='tmp1'/>\" and connect lead \"<span class='charName'/>\" to it."
	},
	{
		name: "youth 05", type: "pass"
	},
	{
		name: "youth 06", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Pick an extra or location you have added.  Connect it to another extra or location."
	},
	{
		name: "youth 07", type: "select",
	    text: "Pick a \"youth\" pathway.",
	    data: function()
	    {
	        return _pathwayChoices;
	    },
	    post: function(data)
	    {
			_tmp1 = data;
			_character.path.push(data);
			_character.pathTitles.push(_stages.stageNames[1]);
	    }
	},
	{
		name: "youth 08", type: "goto",
		data: function() { return _tmp1 + " 01"; }
	},

	/////////////
	// 3-focus //
	/////////////
	{
		name: "focus 01", type: "spacer"
	},
	{
		name: "focus 02", type: "pass",
		title: function()
		{
			return _stages.stageNames[2].capitalize();
		},
	},
	{
		name: "focus 03", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Pick a feature, extra or location.  Connect it to a feature, extra, location or lead."
	},
	{
		name: "focus 04", type: "goto",
		data: "Connect to new/existing node 01",
		pre: function()
		{
			_returnStep = "focus 05";
			_tmp1 = "This should be someone or someplace important to <span class='charName'/>'s focus.";
		}
	},
	{
		name: "focus 05", type: "pass"
	},
	{
		name: "focus 06", type: "goto",
		data: "resources to relationships 01",
		pre: function() { _returnStep = "focus 07"; }
	},
	{
		name: "focus 07", type: "select",
	    text: "Pick a \"focus\" pathway.",
	    data: function()
	    {
	        return _pathwayChoices;
	    },
	    post: function(data)
	    {
		   _tmp1 = data;
		   _character.path.push(data);
		   _character.pathTitles.push(_stages.stageNames[2]);
	    }
	},
	{
		name: "focus 07", type: "goto",
		data: function() { return _tmp1 + " 01"; }
	},

	////////////
	// 4-road //
	////////////
	{
		name: "road 01", type: "spacer"
	},
	{
		name: "road 02", type: "pass",
		title: function()
		{
			return _stages.stageNames[3].capitalize();
		},
	},
	{
		name: "road 03", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Pick a feature, extra or location.  Connect it to a lead."
	},
	{
		name: "road 04", type: "select",
	    text: "Pick a \"road\" pathway.",
	    data: function() {
	        return _pathwayChoices;
	    },
	    post: function(data)
	    {
	       _tmp1 = data;
		   _character.path.push(data);
		   _character.pathTitles.push(_stages.stageNames[3]);
	   }
	},
	{
		name: "road 05", type: "goto",
		data: function() { return _tmp1 + " 01"; }
	},

	///////////////////////////
	// 5-life changing event //
	///////////////////////////
	{
		name: "life changing event 01", type: "spacer"
	},
	{
		name: "life changing event 02", type: "pass",
		title: function()
		{
			return _stages.stageNames[4].capitalize();
		},
	},
	{
		name: "life changing event  03", type: "goto",
		data: "Connect to new/existing node 01",
		pre: function()
		{
			_returnStep = "life changing event 04";
			_tmp1 = "This should be someone or someplace important to <span class='charName'/>'s life changing event.";
		}
	},
	{
		name: "life changing event 04", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Pick an extra, feaure or location.  Connect it to a lead."
	},
	{
		name: "life changing event 05", type: "select",
		text: "(optional) Pick a resource to replace with a new resource at the same die rating.  Pick 'None' to skip this step.",
		data: function ()
		{
			var result = ["&lt;&lt; None &gt;&gt;"];
			for (var key in _character.resources)
			{
				result.push(key);
			}
			return result;
		},
		post: function (data)
		{
			_tmp1 = data;
			_tmp2 = 0;
			if (data == "<< None >>")
			{
				return;
			}
			for (var key in _character.resources)
			{
				if (key == data)
				{
					_tmp2 = _character.resources[key].value;
					delete _character.resources[key];
				}
			}
		}
	},
	{
		name: "life changing event 06", type: "goto",
		data: function () { return (_tmp2 == 0) ? 5 : 1; }
	},
	{
		name: "life changing event 07", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Remove connection from lead \"<span class='charName'/>\" to \"<span class='tmp1'/>\"."
	},
	{
		name: "life changing event 08", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Pick or create a feature, extra or location.  Connect lead \"<span class='charName'/>\" to it for for a 2D<span class='tmp2'/> resource."
	},
	{
		name: "life changing event 09", type: "upgrade",
	},
	{
		name: "life changing event 10", type: "text3",
		text: "Enter the newly connected feature, extra or location as a new resource, followed by two associated specialties.",
		post: function (data)
		{
			_tmp1 = data[0].default("Unknown");
			_character.resources[_tmp1] =
				{
					value: _tmp2, specialties: [data[1].default("Unknown"),
					data[2].default("Unknown")]
				};
		}
	},
	{
		name: "life changing event 11", type: "pass"
	},
	{
		name: "life changing event 12", type: "goto",
		data: "resources to relationships 01",
		pre: function() { _returnStep = "life changing event 13"; }
	},
	{
		name: "life changing event 13", type: "select2",
		text: "(optional) Choose a D4 resource to remove and choose a second resource to step up.  Choose 'None' to skip this step.",
		data: function ()
		{
			var result = [["&lt;&lt; None &gt;&gt;"], ["&lt;&lt; None &gt;&gt;"]];
			for (var key in _character.resources)
			{
				if (_character.resources[key].value <= 4)
				{
					result[0].push(key);
				}
				if (_character.resources[key].value < 12)
				{
					result[1].push(key);
				}
			}
			return result;
		},
		post: function (data)
		{
			_tmp1 = data[0];
			_tmp2 = data[1];
			if (data[0] != "<< None >>" && data[1] != "<< None >>")
			{
				for (var key in _character.resources)
				{
					if (key == data[0])
					{
						delete _character.resources[key];
					}
					if (key == data[1])
					{
						_character.resources[key].value += 2;
					}
				}
			}
		}
	},
	{
		name: "life changing event 14", type: "goto",
		data: function () { return (_tmp1 == "<< None >>" || _tmp2 == "<< None >>") ? 2 : 1; }
	},
	{
		name: "life changing event 15", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Remove connection from lead \"<span class='charName'/>\" to \"<span class='tmp1'/>\"."
	},
	{
		name: "life changing event 16", type: "select",
	    text: "Pick a \"life changing event\" pathway to continue with.",
	    data: function()
	    {
	        return _stages.finalChoices;
	    },
	    post: function(data)
	    {
			_tmp1 = data;
			_character.path.push(data);
			_character.pathTitles.push(_stages.stageNames[4]);
	    }
	},
	{
		name: "life changing event 17", type: "goto",
		data: function() { return _tmp1 + " 01"; }
	},

	//////////////
	// 6-wrapup //
	//////////////
	{
		name: "wrapup 01", type: "spacer"
	},
	{
		name: "wrapup 02", type: "pass", title: "Wrapup",
	},
	// Remove resources that are duped as relationships
	{
		name: "wrapup 03", type: "label",
		text: "I am about to remove <span class='charName'/>'s resources that are duplicated in <span class='charName'/>'s relationships (as they are no longer necessary).",
		post: function()
		{
			for (var key in _character.resources)
			{
				if (_character.relationships.hasOwnProperty(key))
				{
					delete _character.resources[key];
					delete _character.relationships[key].specialties;
				}
			}
		}
	},
	// step up any value 3 times
	{
		name: "wrapup 04", type: "select",
		text: "Step up a value 1/3",
		data: function ()
		{
			return getNonMaxedvalues();
		},
		post: function (data)
		{
			_character.values[data].value += 2;
		}
	},
	{
		name: "wrapup 05", type: "select",
		text: "Step up a value 2/3",
		data: function ()
		{
			return getNonMaxedvalues();
		},
		post: function (data)
		{
			_character.values[data].value += 2;
		}
	},
	{
		name: "wrapup 06", type: "select",
		text: "Step up a value 3/3",
		data: function ()
		{
			return getNonMaxedvalues();
		},
		post: function (data)
		{
			_character.values[data].value += 2;
		}
	},
	// appearance
	{
		name: "wrapup 07", type: "text",
		text: "Enter <span class='charName'/>'s appearance.",
		mid: function (data)
		{
			data = data.default("Nondescript");
			_character.appearance = data;
			refreshCharSheet();
		}
	},
	// background
	{
		name: "wrapup 08", type: "text",
		text: "Enter <span class='charName'/>'s background in one or two sentences.",
		mid: function (data)
		{
			data = data.default("Amnesiac");
			_character.background = data;
			refreshCharSheet();
		}
	},
	// value statements
	{
		name: "wrapup 09", type: "text",
		text: "How does <span class='charName'/> feel about <b>duty</b>?",
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.values.duty.text = data;
			refreshCharSheet();
		}
	},
	{
		name: "wrapup 10", type: "text",
		text: "How does <span class='charName'/> feel about <b>glory</b>?",
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.values.glory.text = data;
			refreshCharSheet();
		}
	},
	{
		name: "wrapup 11", type: "text",
		text: "How does <span class='charName'/> feel about <b>justice</b>?",
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.values.justice.text = data;
			refreshCharSheet();
		}
	},
	{
		name: "wrapup 12", type: "text",
		text: "How does <span class='charName'/> feel about <b>love</b>?",
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.values.love.text = data;
			refreshCharSheet();
		}
	},
	{
		name: "wrapup 13", type: "text",
		text: "How does <span class='charName'/> feel about <b>power</b>?",
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.values.power.text = data;
			refreshCharSheet();
		}
	},
	{
		name: "wrapup 14", type: "text",
		text: "How does <span class='charName'/> feel about <b>truth</b>?",
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.values.truth.text = data;
			refreshCharSheet();
		}
	},
	// feature statements
	{
		name: "wrapup 15", type: "goto",
		data: function()
		{
			_tmp1 = findRelationshipMissingStatement();
			return _tmp1.isEmpty() ? 3 : 1;
		}
	},
	{
		name: "wrapup 16", type: "text",
		text: "How does <span class='charName'/> feel about <b><span id='focusRelationship'/></b>?",
		pre: function ()
		{
			$("#focusRelationship").html(_tmp1);
		},
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.relationships[_tmp1].text = data;
			refreshCharSheet();
		}
	},
	{
		name: "wrapup 17", type: "goto",
		data: -2
	},

	///////////////
	// 7-levelup //
	///////////////
	{
		name: "levelup 01", type: "spacer"
	},
	{
		name: "levelup 02", type: "spacer"
	},
	{
		name: "levelup 03", type: "spacer"
	},
	{
		name: "levelup 04", type: "select", title: "Level up",
		text: "In what way do you want to level up <span class='charName'/>?",
		data: _levelupOptions,
		mid: function (data)
		{
			var stepData = _currentSteps[findStep(_levelupSteps[data])].data;
			if (!isUndefined(stepData))
			{
				if (isFunction(stepData))
				{
					stepData = stepData();
				}
				if (isArray(stepData) && stepData.length == 0)
				{
					$("#chargenOk").prop("disabled", true);
				}
			}
		},
		post: function (data)
		{
			_tmp1 = data;
			_returnStep = "levelup 04";
		}
	},
	{
		name: "levelup 05", type: "goto",
		data: function ()
		{
			if (_levelupSteps.hasOwnProperty(_tmp1))
			{
				return _levelupSteps[_tmp1];
			}
			else
			{
				alert("Unimplemented levelup choosen: " + _tmp1);
				return -1;
			}
		}
	},

	{
		name: "Add / replace comment 01", type: "text2",
		text: "Enter the comment name and text",
		post: function(data)
		{
			_character.comments[data[0]] = data[1]; 
		}
	},
	{
		name: "Add / replace comment 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Remove comment 01", type: "select",
		text: "Choose the comment to remove",
		data: function()
		{
			var result = [];
			for (var key in _character.comments)
			{
				result.push(key);
			}
			return result;
		},
		post: function(data)
		{
			delete _character.comments[data];
		}
	},
	{
		name: "Remove comment 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Value statement 01", type: "select",
		text: "Choose a value to set the statement for",
		data: function () { return _values },
		post: function (data) { _tmp1 = data; }
	},
	{
		name: "Value statement 02", type: "text",
		text: "Enter the new value statement for <b><span class='tmp1'/></b>.",
		data: function () { return _character.values[_tmp1].text; },
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.values[_tmp1].text = data;
			refreshCharSheet();
		}
	},
	{
		name: "Value statement 03", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Relationship statement 01", type: "select",
		text: "Choose a Relationship to set the statement for",
		data: function ()
		{
			var result = [];
			for (var key in _character.relationships)
			{
				result.push(key);
			}
			return result;
		},
		post: function (data) { _tmp1 = data; }
	},
	{
		name: "Relationship statement 02", type: "text",
		text: "Enter the new Relationship statement for <b><span class='tmp1'/></b>.",
		data: function () { return _character.relationships[_tmp1].text; },
		mid: function (data)
		{
			data = data.default("Ambivalent");
			_character.relationships[_tmp1].text = data;
			refreshCharSheet();
		}
	},
	{
		name: "Relationship statement 03", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Add relationship 01", type: "text",
		text: "Enter the name of the relationship to add",
		post: function (data)
		{
			_tmp1 = data;
			_character.relationships[data] = { value: 4, text: "" };
		},
	},
	{
		name: "Add relationship 02", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Add the new feature \"<span class='tmp1'/>\" and connect lead \"<span class='charName'/>\" to it."
	},
	{
		name: "Add relationship 03", type: "goto",
		data: "Relationship statement 02"
	},

	{
		name: "Add extra 01", type: "text3",
		text: "Enter the new extra's name, followed by two associated specialties.",
		post: function (data)
		{
			_tmp1 = data[0].default("Unknown");
			_character.resources[_tmp1] =
				{
					value: 4, specialties: [data[1].default("Unknown"),
					data[2].default("Unknown")]
				};
		}
	},
	{
		name: "Add extra 02", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Add the new extra \"<span class='tmp1'/>\" and connect lead \"<span class='charName'/>\" to it."
	},
	{
		name: "Add extra 03", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Add location 01", type: "text3",
		text: "Enter the new location's name, followed by two associated specialties.",
		post: function (data)
		{
			_tmp1 = data[0].default("Unknown");
			_character.resources[_tmp1] =
				{
					value: 4, specialties: [data[1].default("Unknown"),
					data[2].default("Unknown")]
				};
		}
	},
	{
		name: "Add location 02", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Add the new location \"<span class='tmp1'/>\" and connect lead \"<span class='charName'/>\" to it."
	},
	{
		name: "Add location 03", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Add distinction 01", type: "select",
		text: "Choose a new distinction.",
		data: function ()
		{
			var result = _distinctions.map(function(c)
			{
				return c.name;
			});
			result = result.filter(function(val)
			{
				return !_character.distinctions.hasOwnProperty(val);
			});
			return result;
		},
		post: function(data)
		{
			var distinction = _distinctions[findDistinction(data)];
			_character.distinctions[data] = { value: 4, effects: [distinction.triggers[0]] };
			if (distinction.hasOwnProperty("limits"))
			{
				_character.distinctions[data].limits = distinction.limits;
			}
		}
	},
	{
		name: "Add distinction 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Add ability 01", type: "select",
		text: "Choose a new ability.",
		data: function ()
		{
			var result = getAbilityNames();
			for (var i = 0; i < result.length; i++)
			{
				for (var key in _character.abilities)
				{
					if (key == result[i])
					{
						result.splice(i, 1);
						i--;
						break;
					}
				}
			}
			return result;
		},
		post: function (data)
		{ 
			_tmp1 = data;
			_character.abilities[data] = { value: 4, effects: [] };
		}
	},
	{
		name: "Add ability 02", type: "select",
		text: "Choose the special effect for ability \"<span class='tmp1'/>\".",
		data: function ()
		{
			return _abilities[findAbility(_tmp1)].effects;
		},
		post: function (data)
		{
			_character.abilities[_tmp1].effects.push(data);
		}
	},
	{
		name: "Add ability 03", type: "select",
		text: "Choose the limit for ability \"<span class='tmp1'/>\".",
		data: function ()
		{
			var result = $.extend([], _abilities[findAbility(_tmp1)].limits);
			result.push("&lt;&lt; Other &gt;&gt;");
			return result;
		},
		post: function (data)
		{
			if (data != "<< Other >>")
			{
				_character.abilities[_tmp1].limits = [ data ];
				_tmp1 = null;
			}
		}
	},
	{
		name: "Add ability 04", type: "goto",
		data: function() { return isString(_tmp1) ? 1 : 2; }
	},
	{
		name: "Add ability 05", type: "text",
		text: "Enter a limit for ability \"<span class='tmp1'/>\".",
		mid: function(data)
		{
			if (data == "")
			{
				_character.abilities[_tmp1].limits = [];
			}
			else
			{
				_character.abilities[_tmp1].limits = [ data ];
			}
			refreshCharSheet();
		}
	},
	{
		name: "Add ability 06", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Add gear 01", type: "text2",
		text: "Enter the name for a new gear, followed by a single special effect.",
		post: function(data)
		{
			_character.gear[data[0]] = { value: 4, effects: [ data[1] ] };
		}
	},
	{
		name: "Add gear 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Add ability effect 01", type: "select",
		text: "Choose the ability to add a special effect for.",
		data: function ()
		{
			var result = [];
			for (var key in _character.abilities)
			{
				if (_character.abilities[key].effects.length < 5)
				{
					result.push(key);
				}
			}
			return result;
		},
		post: function (data) { _tmp1 = data; }
	},
	{
		name: "Add ability effect 02", type: "select",
		text: "Choose the special effect for ability \"<span class='tmp1'/>\".",
		data: function ()
		{
			var result = $.extend(true, [], _abilities[findAbility(_tmp1)].effects);
			var currentEffects = _character.abilities[_tmp1].effects;
			for (var i = 0; i < result.length; i++)
			{
				for (var k = 0; k < currentEffects.length; k++)
				{
					if (result[i] == currentEffects[k])
					{
						result.splice(i, 1);
						i--;
						break;
					}
				}
			}
			return result;
		},
		post: function (data)
		{
			_character.abilities[_tmp1].effects.push(data);
		}
	},
	{
		name: "Add ability effect 03", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Pick heritage 01", type: "select",
		text: "Pick a new heritage.",
		data: function()
		{
			return _heritages.map(function(c)
			{
				return c.name;
			});
		},
		post: function(data)
		{
			_tmp1 = data;
			var heritage = _heritages[findHeritage(data)];
			var heritages = {};
			heritages[data] = { value: 4, effects: [heritage.triggers[0]] };
			_character.distinctions = $.extend(heritages, _character.distinctions);
			if (heritage.hasOwnProperty("limits"))
			{
				_character.distinctions[data].limits = heritage.limits;
			}	
		}
	},
	{
		name: "Pick heritage 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Shift values 01", type: "select2",
		text: "Choose the value to step down and the value to step up.",
		data: function ()
		{
			var result = [[], []];
			for (var key in _character.values)
			{
				if (_character.values[key].value > 4) { result[0].push(key); }
				if (_character.values[key].value < 12) { result[1].push(key); }
			}
			return result;
		},
		post: function (data)
		{
			_character.values[data[0]].value -= 2;
			_character.values[data[1]].value += 2;
		},
	},
	{
		name: "Shift values 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Step up relationship 01", type: "select",
		text: "Choose a relationship to step up.",
		data: function ()
		{
			var result = [];
			for (var key in _character.relationships)
			{
				if (_character.relationships[key].value < 12)
				{
					result.push(key);
				}
			}
			return result;
		},
		post: function (data)
		{
			_character.relationships[data].value += 2;
		}
	},
	{
		name: "Step up relationship 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Step up resource 01", type: "select",
		text: "Choose an resource to step up.",
		data: function ()
		{
			var result = [];
			for (var key in _character.resources)
			{
				if (_character.resources[key].value < 12)
				{
					result.push(key);
				}
			}
			return result;
		},
		post: function (data)
		{
			_character.resources[data].value += 2;
		}
	},
	{
		name: "Step up resource 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Step up distinction 01", type: "select",
		text: "Choose an distinction to step up.",
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
			return result;
		},
		post: function (data)
		{
			_character.distinctions[data].value += 2;
			refreshDistinction(data);
		}
	},
	{
		name: "Step up distinction 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Step up ability 01", type: "select",
		text: "Choose an ability to step up.",
		data: function ()
		{
			var result = [];
			for (var key in _character.abilities)
			{
				if (_character.abilities[key].value < 12)
				{
					result.push(key);
				}
			}
			return result;
		},
		post: function (data)
		{
			_character.abilities[data].value += 2;
		}
	},
	{
		name: "Step up ability 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Step down relationship 01", type: "select",
		text: "Choose a relationship to step up.",
		data: function ()
		{
			var result = [];
			for (var key in _character.relationships)
			{
				if (_character.relationships[key].value > 4)
				{
					result.push(key);
				}
			}
			return result;
		},
		post: function (data)
		{
			_character.relationships[data].value -= 2;
		}
	},
	{
		name: "Step up relationship 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Remove relationship 01", type: "select",
		text: "Choose a relationship to remove.",
		data: function ()
		{
			var result = [];
			for (var key in _character.relationships)
			{
				result.push(key);
			}
			return result;
		},
		post: function (data)
		{
			delete _character.relationships[data];
		}
	},
	{
		name: "Remove relationship 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Remove resource 01", type: "select",
		text: "Choose a resource to remove.",
		data: function ()
		{
			var result = [];
			for (var key in _character.resources)
			{
				result.push(key);
			}
			return result;
		},
		post: function (data)
		{
			delete _character.resources[data];
		}
	},
	{
		name: "Remove resource 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Remove distinction 01", type: "select",
		text: "Choose a distinction to remove.",
		data: function ()
		{
			var result = [];
			for (var key in _character.distinctions)
			{
				result.push(key);
			}
			return result;
		},
		post: function (data)
		{
			delete _character.distinctions[data];
		}
	},
	{
		name: "Remove distinction 02", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "Remove ability 01", type: "select",
		text: "Choose an ability to remove.",
		data: function ()
		{
			var result = [];
			for (var key in _character.abilities)
			{
				result.push(key);
			}
			return result;
		},
		post: function (data)
		{
			delete _character.abilities[data];
		}
	},
	{
		name: "Remove ability 02", type: "goto",
		data: function() { return _returnStep; }
	},


	{
		name: "Connect to new/existing node 01", type: "label",
		text: function()
		{
			return "<span class='stepFocus'>On the map:</span> Pick an existing feature, extra or location OR create a new extra or location.  Connect lead \"<span class='charName'/>\" to the picked or created node.<br/>" + _tmp1;
		}
	},
	{
		name: "Connect to new/existing node 02", type: "select",
		text: "What did you do in the previous step?",
		data: [ "Picked an existing feature", "Picked an existing extra", "Something else" ],
		post: function(data)
		{
			switch (data)
			{
				case "Picked an existing feature":
					_tmp1 = 1;
					break;
				case "Picked an existing extra":
					_tmp1 = 2;
					break;
				default:
					_tmp1 = 0;
			}
		}
	},
	{
		name: "Connect to new/existing node 03", type: "goto",
		data: function()
		{
			switch (_tmp1)
			{
				case 1:
					return 6;
				case 2:
					return 3;
				default:
					return 1;
			}
		}
	},
	{
		name: "Connect to new/existing node 04", type: "text3",
		text: "Enter the newly connected extra or location, followed by two associated specialties.",
		post: function (data)
		{
			_tmp1 = data[0].default("Unknown");
			_character.resources[_tmp1] =
				{
					value: 4, specialties: [data[1].default("Unknown"),
					data[2].default("Unknown")]
				};
		}
	},
	{
		name: "Connect to new/existing node 05", type: "goto",
		data: function() { return _returnStep; }
	},
	{
		name: "Connect to new/existing node 06", type: "text3",
		text: "Enter the newly connected extra, followed by two associated specialties.",
		post: function (data)
		{
			_tmp1 = data[0].default("Unknown");
			_character.resources[_tmp1] =
				{
					value: 4, specialties: [data[1].default("Unknown"),
					data[2].default("Unknown")]
				};
		}
	},
	{
		name: "Connect to new/existing node 07", type: "label",
		text: "<span class='stepFocus'>On the map:</span> Decide as a group whether to upgrade the extra \"<span class='tmp1'/>\" to a feature.  If so then upgrade it on the map now.",
	},
	{
		name: "Connect to new/existing node 08", type: "goto",
		data: function() { return _returnStep; }
	},
	{
		name: "Connect to new/existing node 09", type: "text",
		text: "Enter the name of the newly connected feature.",
		post: function(data)
		{
			_character.relationships[data] = { value: 4, text: "" };
		}
	},
	{
		name: "Connect to new/existing node 10", type: "goto",
		data: function() { return _returnStep; }
	},

	{
		name: "resources to relationships 01", type: "select",
		text: "Choose one the features that <span class='charName'/> is connected to but doesn't yet have a relationship with.<br/>Choose \'none\' if there are none.",
		data: function ()
		{
			var result = [];
			for (var key in _character.resources)
			{
				if (!_character.relationships.hasOwnProperty(key))
				{
					result.push(key);
				}
			}
			result.push("&lt;&lt; None &gt;&gt;");
			return result;
		},
		post: function(data)
		{
			_tmp1 = false;
			if (data != "<< None >>")
			{
				_tmp1 = true;
				_character.relationships[data] = _character.resources[data];
				_character.relationships[data].text = "";
			}
		}
	},
	{
		name: "resources to relationships 02", type: "goto",
		data: function () { return _tmp1 ? -1 : 1; }
	},
	{
		name: "resources to relationships 03", type: "goto",
		data: function() { return _returnStep; }
	},
]
