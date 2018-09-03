
var _steps = [
    { name: "origin 01", type: "text", title: "Origin",
        text: "Name your lead.",
        mid: function(data)
        {
            data = data.default("Unnamed");
            _character.name = data;
            refreshCharSheet();
        },
        post: function(data)
        {
            _tmp1 = _character.name;
        },
    },
    { name: "origin 02", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Add the new lead \"<span class='tmp1'/>\".",
    },
    { name: "origin 03", type: "pass"
    },
    { name: "origin 04", type: "text",
        text: "Enter the name of a lead that <span class='charName'/> doesn't yet have a relationship with.<br/>Enter nothing if <span class='charName'/> has a relationship with all other leads.",
        post: function(data)
        {
            _tmp1 = data.trim();
            if (_tmp1 != "")
            {
                _character.relationships[_tmp1] = { value: 4, text: ""};
            }
        }
    },
    { name: "origin 05", type: "goto",
        data: function() { return (_tmp1 == "") ? 1 : -1; }
    },
    { name: "origin 06", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Make sure that lead \"<span class='charName'/>\" is connected to all other leads <i>(biconnect, empty relationship text)</i>."
    },
    { name: "origin 07", type: "text3",
        text: "Enter a new extra, followed by two associated specialties.<br/>This should be someone important to <span class='charName'/>'s origin.",
        post: function(data)
        {
            _tmp1 = data[0].default("Unknown");
            _character.resources[_tmp1] =
                { value: 4, specialties: [ data[1].default("Unknown"),
                data[2].default("Unknown") ] };
        }
    },
    { name: "origin 08", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Add the new extra \"<span class='tmp1'/>\" and connect lead \"<span class='charName'/>\" to it."
    },
    // { name: "origin 09", type: "select",
    //     text: "Pick an \"origin\" pathway.",
    //     data: function()
    //     {
    //         return _originPathways;
    //     },
    //     post: function(data)
    //     {
    //         _currentStep = findStep(data + " 01");
    //     }
    // },


    { name: "youth 01", type: "pass", title: "Youth",
    },
    { name: "youth 02", type: "text3",
        text: "Enter a new location, followed by two associated specialties.<br/>This should be someplace important to <span class='charName'/>'s youth.",
        post: function(data)
        {
            _tmp1 = data[0].default("Unknown");
            _character.resources[_tmp1] =
                { value: 4, specialties: [ data[1].default("Unknown"),
                data[2].default("Unknown") ] };
        }
    },
    { name: "youth 03", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Add the new location \"<span class='tmp1'/>\" and connect lead \"<span class='charName'/>\" to it."
    },
    { name: "youth 04", type: "pass"
    },
    { name: "youth 05", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Pick an extra or location you have added.  Connect it to another extra or location."
    },
    // { name: "youth 06", type: "select",
    //     text: "Pick a \"youth\" pathway.",
    //     data: function()
    //     {
    //         return _selectOptions;
    //     },
    //     post: function(data)
    //     {
    //         _currentStep = findStep(data + " 01");
    //     }
    // },


    { name: "focus 01", type: "pass", title: "Focus",
    },
    { name: "focus 02", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Pick a feature, extra or location.  Connect it to a feature, extra, location or lead."
    },
    { name: "focus 03", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Pick or create a feature, extra or location.  Connect lead \"<span class='charName'/>\" to it.<br/>This should be someone or someplace important to <span class='charName'/>'s focus."
    },
    { name: "focus 04", type: "upgrade",
    },
    { name: "focus 05", type: "text3",
        text: "Enter the newly connected feature, extra or location as a new resource, followed by two associated specialties.",
        post: function(data)
        {
            _tmp1 = data[0].default("Unknown");
            _character.resources[_tmp1] =
                { value: 4, specialties: [ data[1].default("Unknown"),
                data[2].default("Unknown") ] };
        }
    },
    // { name: "focus 06", type: "select",
    //     text: "Pick a \"focus\" pathway.",
    //     data: function()
    //     {
    //         return _selectOptions;
    //     },
    //     post: function(data)
    //     {
    //         _currentStep = findStep(data + " 01");
    //     }
    // },


    { name: "road 01", type: "pass", title: "Road",
    },
    { name: "road 02", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Pick a feature, extra or location.  Connect it to a lead."
    },
    // { name: "road 04", type: "select",
    //     text: "Pick a \"road\" pathway.",
    //     data: function() {
    //         return _selectOptions;
    //     },
    //     post: function(data)
    //     {
    //         _currentStep = findStep(data + " 01");
    //     }
    // },


    { name: "test 03", type: "select", title: "Testing",
        text: "Pick a resource to upgrade (or pick nothing to continue).",
        data: function()
        {
            var result = [""];
            for (var key in _character.resources)
            {
                if (_character.resources[key].value < 12)
                {
                    result.push(key);
                }
            }
            return result;
        },
        post: function(data)
        {
            _tmp1 = data.trim();
            if (_tmp1.isEmpty())
            {
                return;
            }
            _character.resources[data].value += 2;
        }
    },
    { name: "test 04", type: "goto",
        data: function() { return (_tmp1 == "") ? 1 : -1; }
    },


    { name: "life changing event 01", type: "pass", title: "Life changing event",
    },
    { name: "life changing event 02", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Pick or create a feature, extra or location.  Connect lead \"<span class='charName'/>\" to it.<br/>This should be someone or someplace important to <span class='charName'/>'s life changing event."
    },
    { name: "life changing event 03", type: "upgrade",
    },
    { name: "life changing event 04", type: "text3",
        text: "Enter the newly connected extra, feaure or location as a new resource, followed by two associated specialties.",
        post: function(data)
        {
            _tmp1 = data[0].default("Unknown");
            _character.resources[_tmp1] =
                { value: 4, specialties: [ data[1].default("Unknown"),
                data[2].default("Unknown") ] };
        }
    },
    { name: "life changing event 05", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Pick an extra, feaure or location.  Connect it to a lead."
    },
    { name: "life changing event 06", type: "select",
        text: "(optional) Pick a resource to replace with a new resource at the same die rating.",
        data: function()
        {
            var result = [""];
            for (var key in _character.resources)
            {
                result.push(key);
            }
            return result;
        },
        post: function(data)
        {
            _tmp1 = data;
            _tmp2 = 0;
            if (data == "")
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
    { name: "life changing event 07", type: "goto",
        data: function() { return (_tmp2 == 0) ? 5 : 1; }
    },
    { name: "life changing event 08", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Disconnect lead \"<span class='charName'/>\" from \"<span class='tmp1'/>\"."
    },
    { name: "life changing event 09", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Pick or create a feature, extra or location.  Connect lead \"<span class='charName'/>\" to it for for a 2D<span class='tmp2'/> resource."
    },
    { name: "life changing event 10", type: "upgrade",
    },
    { name: "life changing event 11", type: "text3",
        text: "Enter the newly connected feature, extra or location as a new resource, followed by two associated specialties.",
        post: function(data)
        {
            _tmp1 = data[0].default("Unknown");
            _character.resources[_tmp1] =
                { value: _tmp2, specialties: [ data[1].default("Unknown"),
                data[2].default("Unknown") ] };
        }
    },
    { name: "life changing event 12", type: "select2",
        text: "(optional) Choose a D4 resource to remove and choose a second resource to step up.",
        data: function()
        {
            var result = [[""], [""]];
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
        post: function(data)
        {
            _tmp1 = data[0];
            _tmp2 = data[1];
            if (data[0] == "" || data[1] == "")
            {
                return;
            }
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
    },
    { name: "life changing event 13", type: "goto",
        data: function() { return (_tmp1 == "" || _tmp2 == "") ? 2 : 1; }
    },
    { name: "life changing event 14", type: "label",
        text: "<span class='stepFocus'>On the map:</span> Disconnect lead \"<span class='charName'/>\" from \"<span class='tmp1'/>\"."
    },
    // { name: "life changing event 15", type: "select",
    //     text: "Pick a \"life changing event\" pathway to continue with.",
    //     data: function()
    //     {
    //         return _lifeChangingEventPathways;
    //     },
    //     post: function(data)
    //     {
    //         _currentStep = findStep(data + " 01");
    //     }
    // },


    { name: "wrapup 01", type: "pass", title: "Wrapup",
    },
    // step up any value 3 times
    { name: "wrapup 02", type: "select",
        text: "Step up a value 1/3",
        data: function()
        {
            return getNonMaxedvalues();
        },
        post: function(data)
        {
            _character.values[data].value += 2;
        }
    },
    { name: "wrapup 03", type: "select",
        text: "Step up a value 2/3",
        data: function()
        {
            return getNonMaxedvalues();
        },
        post: function(data)
        {
            _character.values[data].value += 2;
        }
    },
    { name: "wrapup 04", type: "select",
        text: "Step up a value 3/3",
        data: function()
        {
            return getNonMaxedvalues();
        },
        post: function(data)
        {
            _character.values[data].value += 2;
        }
    },
    // appearance
    { name: "wrapup 05", type: "text",
        text: "Enter <span class='charName'/>'s appearance.",
        mid: function(data)
        {
            data = data.default("Nondescript");
            _character.appearance = data;
            refreshCharSheet();
        }
    },
    // background
    { name: "wrapup 06", type: "text",
        text: "Enter <span class='charName'/>'s background in one or two sentences.",
        mid: function(data)
        {
            data = data.default("Amnesiac");
            _character.background = data;
            refreshCharSheet();
        }
    },
    // extra to feature upgrades
    { name: "wrapup 07", type: "select",
        text: "Choose one of <span class='charName'/>\'s resources that is based on a feature in the map.<br/>Choose nothing if <span class='charName'/> has no resources that are based on features.",
        data: function()
        {
            var result = [""];
            for (var key in _character.resources)
            {
               result.push(key); 
            }
            return result;
        },
        post: function(data)
        {
            _tmp1 = data.trim();
            if (_tmp1 != "")
            {
                _character.relationships[_tmp1] =
                    { value: _character.resources[_tmp1].value, text: "" };
                delete _character.resources[_tmp1];
            }
        }
    },
    { name: "wrapup 08", type: "goto",
        data: function() { return (_tmp1 == "") ? 1 : -1; }
    },
    // value statements
    { name: "wrapup 09", type: "text",
        text: "How does <span class='charName'/> feel about <b>duty</b>?",
        mid: function(data)
        {
            data = data.default("Ambivalent");
            _character.values.duty.text = data;
            refreshCharSheet();
        }
    },
    { name: "wrapup 10", type: "text",
        text: "How does <span class='charName'/> feel about <b>glory</b>?",
        mid: function(data)
        {
            data = data.default("Ambivalent");
            _character.values.glory.text = data;
            refreshCharSheet();
        }
    },
    { name: "wrapup 11", type: "text",
        text: "How does <span class='charName'/> feel about <b>justice</b>?",
        mid: function(data)
        {
            data = data.default("Ambivalent");
            _character.values.justice.text = data;
            refreshCharSheet();
        }
    },
    { name: "wrapup 12", type: "text",
        text: "How does <span class='charName'/> feel about <b>love</b>?",
        mid: function(data)
        {
            data = data.default("Ambivalent");
            _character.values.love.text = data;
            refreshCharSheet();
        }
    },
    { name: "wrapup 13", type: "text",
        text: "How does <span class='charName'/> feel about <b>power</b>?",
        mid: function(data)
        {
            data = data.default("Ambivalent");
            _character.values.power.text = data;
            refreshCharSheet();
        }
    },
    { name: "wrapup 14", type: "text",
        text: "How does <span class='charName'/> feel about <b>truth</b>?",
        mid: function(data)
        {
            data = data.default("Ambivalent");
            _character.values.truth.text = data;
            refreshCharSheet();
        }
    },
    // feature statements
    { name: "wrapup 15", type: "text",
        text: "How does <span class='charName'/> feel about <b><span id='focusRelationship'/></b>?",
        pre: function()
        {
            _tmp1 = findRelationshipMissingStatement();
            if (_tmp1.isEmpty())
            {
                shiftStep(2);
            }
            $("#focusRelationship").html(_tmp1);
        },
        mid: function(data)
        {
            data = data.default("Ambivalent");
            _character.relationships[_tmp1].text = data;
            refreshCharSheet();
        }
    },
    { name: "wrapup 16", type: "goto",
        data: -1
    },


    { name: "levelup 01", type: "select", title: "Level up",
        text: "How to level up the character?",
        data: [ "Change value statement", "Change relationship statement" ]
    },
    { name: "levelup 02", type: "goto",
        data: "levelup 01"
    },


    { name: "rich 01", text: "Step up duty or power (1/2)", type: "select", data: function() { return [ "duty", "power" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "rich 02", text: "Step up duty or power (2/2)", type: "select", data: function() { return [ "duty", "power" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "rich 03", type: "goto", pre: function() {  _selectOptions = [ "jock", "average" ]; } },
    { name: "rich 04", type: "goto", pre: function() {  _currentStep = findStep("youth 01"); } },

    { name: "ordinary 01", text: "Step up love or justice (1/2)", type: "select", data: function() { return [ "love", "justice" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "ordinary 02", text: "Step up love or justice (2/2)", type: "select", data: function() { return [ "love", "justice" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "ordinary 03", type: "goto", pre: function() {  _selectOptions = [ "jock", "average", "geek" ]; } },
    { name: "ordinary 04", type: "goto", pre: function() {  _currentStep = findStep("youth 01"); } },

    { name: "gifted 01", text: "Step up glory or truth (1/2)", type: "select", data: function() { return [ "glory", "truth" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "gifted 02", text: "Step up glory or truth (2/2)", type: "select", data: function() { return [ "glory", "truth" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "gifted 03", type: "goto", pre: function() {  _selectOptions = [ "average", "geek", "outsider" ]; } },
    { name: "gifted 04", type: "goto", pre: function() {  _currentStep = findStep("youth 01"); } },

    { name: "strange 01", text: "Step up glory or power (1/2)", type: "select", data: function() { return [ "glory", "power" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "strange 02", text: "Step up glory or power (2/2)", type: "select", data: function() { return [ "glory", "power" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "strange 03", type: "goto", pre: function() {  _selectOptions = [ "geek", "outsider", "paragon" ]; } },
    { name: "strange 04", type: "goto", pre: function() {  _currentStep = findStep("youth 01"); } },

    { name: "alien 01", text: "Step up duty or truth (1/2)", type: "select", data: function() { return [ "duty", "truth" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "alien 02", text: "Step up duty or truth (2/2)", type: "select", data: function() { return [ "duty", "truth" ]; }, post: function(data) { _character.values[data].value += 2; } },
    { name: "alien 03", type: "goto", pre: function() {  _selectOptions = [ "outsider", "paragon" ]; } },
    { name: "alien 04", type: "goto", pre: function() {  _currentStep = findStep("youth 01"); } },

    { name: "jock 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "jock 02", type: "goto", pre: function() {  _selectOptions = [ "money", "life" ]; } },
    { name: "jock 03", type: "goto", pre: function() {  _currentStep = findStep("focus 01"); } },

    { name: "average 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "average 02", type: "goto", pre: function() {  _selectOptions = [ "money", "life", "status" ]; } },
    { name: "average 03", type: "goto", pre: function() {  _currentStep = findStep("focus 01"); } },

    { name: "geek 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "geek 02", type: "goto", pre: function() {  _selectOptions = [ "life", "status", "technology" ]; } },
    { name: "geek 03", type: "goto", pre: function() {  _currentStep = findStep("focus 01"); } },

    { name: "outsider 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "outsider 02", type: "goto", pre: function() {  _selectOptions = [ "status", "technology", "paranormal" ]; } },
    { name: "outsider 03", type: "goto", pre: function() {  _currentStep = findStep("focus 01"); } },

    { name: "paragon 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "paragon 02", type: "goto", pre: function() {  _selectOptions = [ "technology", "paranormal" ]; } },
    { name: "paragon 03", type: "goto", pre: function() {  _currentStep = findStep("focus 01"); } },

    { name: "money 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "money 02", type: "goto", pre: function() {  _selectOptions = [ "risky", "straight and narrow" ]; } },
    { name: "money 03", type: "goto", pre: function() {  _currentStep = findStep("road 01"); } },

    { name: "life 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "life 02", type: "goto", pre: function() {  _selectOptions = [ "risky", "straight and narrow", "lofty" ]; } },
    { name: "life 03", type: "goto", pre: function() {  _currentStep = findStep("road 01"); } },

    { name: "status 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "status 02", type: "goto", pre: function() {  _selectOptions = [ "straight and narrow", "lofty", "underground" ]; } },
    { name: "status 03", type: "goto", pre: function() {  _currentStep = findStep("road 01"); } },

    { name: "technology 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "technology 02", type: "goto", pre: function() {  _selectOptions = [ "lofty", "underground", "ethical" ]; } },
    { name: "technology 03", type: "goto", pre: function() {  _currentStep = findStep("road 01"); } },

    { name: "paranormal 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "paranormal 02", type: "goto", pre: function() {  _selectOptions = [ "underground", "ethical" ]; } },
    { name: "paranormal 03", type: "goto", pre: function() {  _currentStep = findStep("road 01"); } },

    { name: "risky 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "risky 02", type: "goto", pre: function() {  _selectOptions = [ "advancement", "tragedy" ]; } },
    { name: "risky 03", type: "goto", pre: function() {  _currentStep = findStep("life changing event 01"); } },

    { name: "straight and narrow 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "straight and narrow 02", type: "goto", pre: function() {  _selectOptions = [ "advancement", "tragedy", "power manifestation" ]; } },
    { name: "straight and narrow 03", type: "goto", pre: function() {  _currentStep = findStep("life changing event 01"); } },

    { name: "lofty 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "lofty 02", type: "goto", pre: function() {  _selectOptions = [ "tragedy", "power manifestation", "first contact" ]; } },
    { name: "lofty 03", type: "goto", pre: function() {  _currentStep = findStep("life changing event 01"); } },

    { name: "underground 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "underground 02", type: "goto", pre: function() {  _selectOptions = [ "power manifestation", "first contact", "destiny" ]; } },
    { name: "underground 03", type: "goto", pre: function() {  _currentStep = findStep("life changing event 01"); } },

    { name: "ethical 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "ethical 02", type: "goto", pre: function() {  _selectOptions = [ "first contact", "destiny" ]; } },
    { name: "ethical 03", type: "goto", pre: function() {  _currentStep = findStep("life changing event 01"); } },

    { name: "advancement 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "advancement 02", type: "goto", pre: function() {  _currentStep = findStep("wrapup 01"); } },

    { name: "tragedy 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "tragedy 02", type: "goto", pre: function() {  _currentStep = findStep("wrapup 01"); } },

    { name: "power manifestation 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "power manifestation 02", type: "goto", pre: function() {  _currentStep = findStep("wrapup 01"); } },

    { name: "first contact 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "first contact 02", type: "goto", pre: function() {  _currentStep = findStep("wrapup 01"); } },

    { name: "destiny 01", text: "Step up or add a new distinction", type: "select", data: function() { return _distinctions.map(function(c) { return c.name; }); }, post: function(data) { if (_character.assets.hasOwnProperty(data)) { _character.assets[data].value += 2; } else { _character.assets[data] = { value: 4 }; refreshAssets(); } } },
    { name: "destiny 02", type: "goto", pre: function() {  _currentStep = findStep("wrapup 01"); } },
]
