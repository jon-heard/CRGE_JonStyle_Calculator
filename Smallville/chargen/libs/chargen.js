
var _values = [ "duty", "glory", "justice", "love", "power", "truth" ];
var _stresses = [ "afraid", "angry", "exhausted", "injured", "insecure" ];
var _originPathways = [ "rich", "ordinary", "gifted", "strange", "alien" ];
var _lifeChangingEventPathways = [
    "advancement", "tragedy", "power manifestation", "first contact", "destiny"
];

var _answers = [];

var _title = "";
var _tmp1;
var _tmp2;

var _currentStep = 0;
var _currentAnswer = 0;
var _selectOptions = [];

var _nullFnc = function() {};
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
        catch(exception)
        {
            setStatus(exception);
            return;
        }
    }
    _currentStep = 0;
    _currentAnswer = 0;
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

_answerStopTypes = [ "goto" ];
_answerSkipTypes = [ "pass", "upgrade", "label" ];
function runNextStep()
{
    var result = "";
    var step = _steps[_currentStep];
    _preFnc = step.hasOwnProperty("pre") ? step.pre : _nullFnc;
    _midFnc = step.hasOwnProperty("mid") ? step.mid : _nullFnc;
    _postFnc = step.hasOwnProperty("post") ? step.post : _nullFnc;
    _getData = _nullFnc;
    var data =
        !step.hasOwnProperty("data") ? null : isFunction(step.data) ? step.data() : step.data;

    console.log("Step: " + step.name);
    if (step.hasOwnProperty("title")) { _title = step.title; }
    result += "<div id='title'>" + _title + " <i>(" + step.name + ")</i></div>";
    result += step.hasOwnProperty("text") ? step.text : "";

    if (isAnswerCurrent() && isAnswer(step.name))
    {}
    else if (hasAnswer() && _answerStopTypes.indexOf(step.type) == -1)
    {
        if (_answerSkipTypes.indexOf(step.type) == -1 || isAnswer(step.name)) { _currentAnswer++; }
        _preFnc();
        _getData = function() { return _answers[_currentAnswer-1].data; }
        _midFnc(_getData());
        shiftStep(1, true);
        return;
    }

    switch(step.type)
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
            result += "<br/><input id='text_only' oninput='_midFnc(this.value)'></input>";
            _getData = function() { return $("#text_only").val(); };
            break;
        case "text3":
            result += "<br/>";
            result += "<input id='text3_first'  oninput='_midFnc([ this.value, $(\"#text3_second\").val(), $(\"#text3_third\").val() ])'></input>";
            result += "<input id='text3_second' oninput='_midFnc([ $(\"#text3_first\").val(), this.value, $(\"#text3_third\").val() ])'></input>";
            result += "<input id='text3_third'  oninput='_midFnc([ $(\"#text3_first\").val(), $(\"#text3_second\").val(), this.value ])'></input>";
            _getData = function() { return [ $("#text3_first").val(), $("#text3_second").val(), $("#text3_third").val() ]; };
            break;
        case "select":
            if (data == null) { data = []; }
            result += "<br/><select id='chargenSelect'>";
            for (var i = 0; i < data.length; i++)
            {
                result += "<option>" + data[i] + "</option>";
            }
            result += "</select>";
            _getData = function() { return $("#chargenSelect").val(); }
            break;
        case "select2":
            if (data == null) { data = [[],[]]; }
            result += "<br/><select id='chargenSelect_first'>";
            for (var i = 0; i < data[0].length; i++)
            {
                result += "<option>" + data[0][i] + "</option>";
            }
            result += "</select>";
            result += "<br/><select id='chargenSelect_second'>";
            for (var i = 0; i < data[1].length; i++)
            {
                result += "<option>" + data[1][i] + "</option>";
            }
            result += "</select>";
            _getData = function() { return [$("#chargenSelect_first").val(), $("#chargenSelect_second").val()]; }
            break;
        case "checkbox":
            if (isAnswer(step.name) && (!isAnswerCurrent() || !isAnswer(step.name)))
            {
                _currentAnswer++;
                _getData = function() { return _answers[_currentAnswer-1].data; }
                shiftStep(1, true);
                return;
            }
            result += "<br/><input id='chargen_checkbox' type='checkbox' oninput='_midFnc(this.value)'></input>";
            _getData = function() { return $("#chargen_checkbox")[0].checked; };
            break;
    }
    if (step.type != "goto" && step.type != "end")
    {
        result += "<br/><br/><button onclick='shiftStep(1)'>Ok</button><button>Undo</button>";
    }
    result += "<script>$(\".charName\").html(_character.name); $(\".tmp1\").html(_tmp1); $(\".tmp2\").html(_tmp2); _preFnc(); _midFnc(\"\");</script>"
    if (step.type == "goto")
    {
        if (data == null)
        {
            result += "<script>shiftStep(1);</script>";
        }
        else if (isNumber(data))
        {
            result += "<script>shiftStep(" + data + ");</script>";
        }
        else if (isString(data))
        {
            result += "<script>gotoStep(\"" + data + "\");</script>";
        }
    }
    //return result;
    chargen.html(result);
}

function serializeChargen(skipAddCurrent)
{
    if (!skipAddCurrent)
    {
        _answers.push({ name: _steps[_currentStep].name, current: true });
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
            _answers.push({ name: _steps[_currentStep].name, data: data });
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
    gotoStep(_currentStep + shift, skipAnswer);
}
function findStep(name)
{
    var result = 0;
    for (var i = 0; i < _steps.length; i++)
    {
        if (_steps[i].name == name)
        {
            result = i;
            break;
        }
    }
    return result;
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
function refreshAssets()
{
    for (var key in _character.assets)
    {
        let index = findDistinction(key);
        if (index> -1)
        {
            let distinction = _distinctions[index];
            let triggers = [];
            if (_character.assets[key].value >= 4)
            {
                triggers.push(distinction.triggers[0]);
            }
            if (_character.assets[key].value >= 8)
            {
                triggers.push(distinction.triggers[1]);
            }
            if (_character.assets[key].value >= 12)
            {
                triggers.push(distinction.triggers[2]);
            }
            _character.assets[key].effects = triggers;
        }
    }
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
    var result = [];
    for (var key in _abilities)
    {
        result.push(_abilities[key].name);
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
