
var _values = ["duty", "glory", "justice", "love", "power", "truth"];
var _stresses = ["afraid", "angry", "exhausted", "injured", "insecure"];
var _originPathways = ["rich", "ordinary", "gifted", "strange", "metahuman"];
var _lifeChangingEventPathways = [
	"advancement", "tragedy", "power manifestation", "first contact", "destiny"
];

var _answers = [];

var _title = "";
var _tmp1;
var _tmp2;

var _currentSteps;
var _currentStep = 0;
var _currentAnswer = 0;
var _pathwayChoices = [];

var _nullFnc = function () { };
var _preFnc = _nullFnc;
var _midFnc = _nullFnc;
var _postFnc = _nullFnc;
var _getData = _nullFnc;

var _prevAnswerSrc = null;
function genChargen(answerSrc)
{
	if (answerSrc == _prevAnswerSrc)
	{
		return;
	}
	_prevAnswerSrc = answerSrc;
	setStatus("");
	if (!answerSrc.isEmpty())
	{
		try
		{
			_answers = JSON.parse(answerSrc);
		}
		catch (exception)
		{
			setStatus(exception);
			return;
		}
	}
	_currentStep = 0;
	_currentAnswer = 0;
	_currentSteps = [];
	for (var i = 0; i < _steps.length; i++)
	{
		_currentSteps[i] = _steps[i];
	}
	resetCharacter();
	runNextStep();
	if (isAnswerCurrent())
	{
		_answers.pop();
	}
	var answerSrc = serializeChargen();
	if (_prevAnswerSrc != answerSrc)
	{
		_prevAnswerSrc = answerSrc;
		input.val(answerSrc);
	}
}

function refreshCharSheet()
{
	charSheet.html(makeSheet());
}

_answerStopTypes = ["goto"];
_answerSkipTypes = ["pass", "upgrade", "label", "spacer"];
function runNextStep()
{
	var result = "";
	var step = _currentSteps[_currentStep];
	_preFnc = step.hasOwnProperty("pre") ? step.pre : _nullFnc;
	_midFnc = step.hasOwnProperty("mid") ? step.mid : _nullFnc;
	_postFnc = step.hasOwnProperty("post") ? step.post : _nullFnc;
	_getData = _nullFnc;
	var data =
		!step.hasOwnProperty("data") ? null : isFunction(step.data) ? step.data() : step.data;

	console.log("Step: " + step.name);
	if (step.hasOwnProperty("title")) { _title = isFunction(step.title) ? step.title() : step.title; }
	result += "<div id='chargenHeading'><span id='chargenTitle'>" + _title + "</span><span id='chargenSubtitle'>(" + step.name + ")</span></div>";
	result += step.hasOwnProperty("text") ? (isFunction(step.text) ? step.text() : step.text) : "";

	while (_answers[_currentAnswer] == "")
	{
		_currentAnswer++;
	}
	if (hasAnswer() && isAnswerCurrent() && isAnswer(step.name))
	{
		_answers.pop();
		_currentAnswer = _answers.length;
	}
	else if (hasAnswer() && _answerStopTypes.indexOf(step.type) == -1)
	{
		if (_answerSkipTypes.indexOf(step.type) == -1 || isAnswer(step.name)) { _currentAnswer++; }
		_preFnc();
		_getData = function () { return _answers[_currentAnswer - 1].data; }
		_midFnc(_getData());
		if (hasAnswer())
		{
			setTimeout(shiftStep, 0, 1, true);
		}
		return;
	}

	switch (step.type)
	{
		case "pass":
			result +=
				"Pass the turn to the next player <i>(continue when it gets back to you)</i>.";
			break;
		case "upgrade":
			result += "<span class='stepFocus'>On the map:</span> If you just connected lead \"<span class='charName'/>\" to an extra that now has multiple connections then decide as a group whether to upgrade the extra to a feature.  If so then upgrade it."
			break;
		case "label":
			break;
		case "text":
			if (data == null)
			{
				data = "";
			}
			result += "<br/><input id='text_only' oninput='_midFnc(this.value)' value='" + data + "'/>";
			_getData = function () { return $("#text_only").val().replaceAll("\\\\n", "<br/>"); };
			break;
		case "text2":
			if (data == null)
			{
				data = ["", ""];
			}
			result += "<br/>";
			result += "<input id='text3_first'  oninput='_midFnc([ this.value, $(\"#text3_second\").val() ])' value='" + data[0] + "'/>";
			result += "<input id='text3_second' oninput='_midFnc([ $(\"#text3_first\").val(), this.value ])' value='" + data[1] + "'/>";
			_getData = function ()
			{
				return [$("#text3_first").val().replaceAll("\\\\n", "<br/>"), $("#text3_second").val().replaceAll("\\\\n", "<br/>")];
			};
			break;
		case "text3":
			if (data == null)
			{
				data = ["", "", ""];
			}
			result += "<br/>";
			result += "<input id='text3_first'  oninput='_midFnc([ this.value, $(\"#text3_second\").val(), $(\"#text3_third\").val() ])' value='" + data[0] + "'/>";
			result += "<input id='text3_second' oninput='_midFnc([ $(\"#text3_first\").val(), this.value, $(\"#text3_third\").val() ])' value='" + data[1] + "'/>";
			result += "<input id='text3_third'  oninput='_midFnc([ $(\"#text3_first\").val(), $(\"#text3_second\").val(), this.value ])' value='" + data[2] + "'/>";
			_getData = function () { return [$("#text3_first").val().replaceAll("\\\\n", "<br/>"), $("#text3_second").val().replaceAll("\\\\n", "<br/>"), $("#text3_third").val().replaceAll("\\\\n", "<br/>")]; };
			break;
		case "select":
			if (data == null) { data = []; }
			result += "<br/><select id='chargenSelect' onChange='handleSelect1Change();'>";
			for (var i = 0; i < data.length; i++)
			{
				result += "<option>" + data[i] + "</option>";
			}
			result += "</select><span id='selectDescription'/>";
			_getData = function () { return $("#chargenSelect").val(); }
			data = data[0];
			break;
		case "select2":
			if (data == null) { data = [[], []]; }
			result += "<br/><select id='chargenSelect_first'> onChange='_midFnc(this.value, $(\"#chargenSelect_second\").val())'";
			for (var i = 0; i < data[0].length; i++)
			{
				result += "<option>" + data[0][i] + "</option>";
			}
			result += "</select>";
			result += "<br/><select id='chargenSelect_second' onChange='_midFnc($(\"#chargenSelect_first\").val(), this.value)'>";
			for (var i = 0; i < data[1].length; i++)
			{
				result += "<option>" + data[1][i] + "</option>";
			}
			result += "</select>";
			_getData = function () { return [$("#chargenSelect_first").val(), $("#chargenSelect_second").val()]; }
			break;
	}
	if (step.type != "goto" && step.type != "spacer")
	{
		result += "<br/><br/><button id='chargenOk' onclick='shiftStep(1)'>Continue</button>";
		if (step.showCharSrc != false)
		{
			result += "<button onclick='textToClipboard(serializeCharacter())'>Copy character source</button>";
		}
	}
	result += "<script>";
	result += "$(\".charName\").html(_character.name); $(\".tmp1\").html(_tmp1); $(\".tmp2\").html(_tmp2); _preFnc(); _midFnc(\"" + data + "\");";
	if (step.type == "select")
	{
		result += " handleSelect1Change();";
	}
	if (step.type == "goto" || step.type == "spacer")
	{
		if (isString(data)) { data = "\"" + data + "\""; }
		result += " shiftStep(" + data + ");";
	}
	result += "</script>";
	chargen.html(result);
}

function handleSelect1Change()
{
	var value = $("#chargenSelect").val();
	$("#chargenOk").prop("disabled", value == "");
	var description = "";
	if (_selectDescriptions.hasOwnProperty(value))
	{
		description += _selectDescriptions[value];
	}
	var distinctionIndex = findDistinction(value);
	if (distinctionIndex != -1)
	{
		var triggers = _distinctions[distinctionIndex].triggers;
		for (var i = 0; i < triggers.length; i++)
		{
			description += "<br/> At D" + (i*4+4) + ": " + triggers[i];
		}
	}
	$("#selectDescription").html(description);
	_midFnc(value);
}

function serializeChargen(skipAddCurrent)
{
	if (!skipAddCurrent)
	{
		_answers.push({ name: _currentSteps[_currentStep].name, current: true });
	}
	var result = jsonStringifyPretty(_answers, 1, 2);
	if (!skipAddCurrent)
	{
		_answers.pop();
	}
	return result;
}

function gotoStep(dest, skipAddAnswer)
{
	if (isString(dest))
	{
		dest = findStep(dest);
	}
	var data = _getData();
	if (!skipAddAnswer)
	{
		if (!isUndefined(data))
		{
			_answers.push({ name: _currentSteps[_currentStep].name, data: data });
			_currentAnswer++;
		}
		else if (_currentSteps[_currentStep].type == "spacer")
		{
			_answers.push("");
			_currentAnswer++;
		}
	}
	_postFnc(data);
	_currentStep = dest;
	refreshCharSheet();
	runNextStep();
	input.val(serializeChargen(skipAddAnswer));
}

function shiftStep(shift, skipAnswer)
{
	if (shift == null)
	{
		gotoStep(_currentStep + 1, skipAnswer);
	}
	else if (isString(shift))
	{
		gotoStep(shift, skipAnswer);
	}
	else if (isFunction(shift))
	{
		shiftStep(shift(), skipAnswer);
	}
	else if (isNumber(shift))
	{
		gotoStep(_currentStep + shift, skipAnswer);
	}
}

function findStep(name)
{
	var result = 0;
	for (var i = 0; i < _currentSteps.length; i++)
	{
		if (_currentSteps[i].name == name)
		{
			result = i;
			break;
		}
	}
	return result;
}

function getDistinctionNames()
{
	return _distinctions.map(function (c)
	{
		return c.name;
	});
}

function findDistinction(name)
{
	var result = -1;
	for (var i = 0; i < _distinctions.length; i++)
	{
		if (_distinctions[i].name == name)
		{
			result = i;
			break;
		}
	}
	return result;
}

function findHeritage(name)
{
	var result = -1;
	for (var i = 0; i < _heritages.length; i++)
	{
		if (_heritages[i].name == name)
		{
			result = i;
			break;
		}
	}
	return result;
}

function getNonMaxedvalues()
{
	var result = [];
	for (var key in _character.values)
	{
		if (_character.values[key].value < 12)
		{
			result.push(key);
		}
	}
	return result;
}

function getAbilityNames()
{
	return _abilities.map(function (c)
	{
		return c.name;
	});
}

function findAbility(name)
{
	var result = -1;
	for (var i = 0; i < _abilities.length; i++)
	{
		if (_abilities[i].name == name)
		{
			result = i;
			break;
		}
	}
	return result;
}

function findRelationshipMissingStatement()
{
	for (var key in _character.relationships)
	{
		if (_character.relationships[key].text.isEmpty())
		{
			return key;
		}
	}
	return "";
}

function hasAnswer()
{
	return _currentAnswer < _answers.length;
}

function isAnswer(name)
{
	return _currentAnswer < _answers.length && _answers[_currentAnswer].name == name;
}

function isAnswerCurrent()
{
	return _currentAnswer < _answers.length && _answers[_currentAnswer].current == true;
}

function refreshDistinction(name)
{
	var index = findDistinction(name);
	var triggers;
	if (index >= 0)
	{
		triggers = _distinctions[index].triggers;
	}
	else
	{
		index = findHeritage(name);
		if (index == 0) { return; }
		triggers = _heritages[index].triggers;
	}
	_character.distinctions[name].effects = [];
	if (_character.distinctions[name].value >= 4)
	{
		_character.distinctions[name].effects.push(triggers[0]);
	}
	if (_character.distinctions[name].value >= 8)
	{
		_character.distinctions[name].effects.push(triggers[1]);
	}
	if (_character.distinctions[name].value >= 12)
	{
		_character.distinctions[name].effects.push(triggers[2]);
	}
}
