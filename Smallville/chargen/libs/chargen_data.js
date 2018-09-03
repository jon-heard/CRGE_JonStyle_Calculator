
var _selectDetails = {
    rich: "You were born with a lot of money (rich family, etc)<br/>",
    ordinary: "You were born into an typical household",
    gifted: "You were born with intrinsic talent (music, IQ, literary genius, etc)",
    strange: "You were born under strange circumstances (commune, foreign culture, future, etc)",
    alien: "You were born as an alien (mars, fairy, monster, etc)",

    jock: "You grew up with an emphasis on the physical (lots of sports, gymnastics, etc)",
    average: "You grew up with a typical emphasis",
    geek: "You grew up with an emphasis on intellectual and/or esoterica (professor parents, dungeons and dragons, musical theater, etc)",
    outsider: "You grew up outside the mainstream culture (poor, bad family reputation, etc)",
    paragon: "You grew up with an emphasis on a particular set of principles and characteristics (ethical/heroic, power/control, iconoclast, etc)",

    money: "",
    life: "",
    status: "",
    technology: "",
    paranormal: "",

    risky: "",
    "straight and narrow": "",
    lofty: "",
    underground: "",
    ethical: "",

    advancement: "",
    tragedy: "",
    "power manifestation": "",
    "first contact": "",
    "destiny": ""
};

var _distinctions = [
    { name: "Agile", triggers: [
        "Reroll a die in an Agile roll when you Choose to drop everything you're carrying.",
        "Spend a Plot Point to Decrease your opponent's Injured or Exhausted Stress pool.",
        "Add a d10 to the Trouble pool to escape—without Giving In—a Contest or Test in which you have used your Agile die."
    ]},
    { name: "Athletic", triggers: [
        "Spend a Plot Point to Reroll a die in any Athletic roll.",
        "Earn a Plot Point when you Choose to use brute force instead of finesse.",
        "Add a d6 to Trouble to Increase your Afraid or Insecure Stress pool."
    ]},
    { name: "Attractive", triggers: [
        "Earn a Plot Point when your looks draw you unwanted attention.",
        "Spend a Plot Point to Reroll a die in an Attractive roll.",
        "Add a d6 to Trouble to Reroll a second die in an Attractive roll."
    ]},
    { name: "Back handed", triggers: [
        "Earn a Plot Point for another Lead and Increase your Angry or Insecure Stress pool against him.",
        "Spend a Plot Point to Decrease another Lead or Feature's Angry or Insecure Stress pool against you or another character.",
        "Add a d6 to Trouble to Reroll a die in your Angry or Insecure Stress pool."
    ]},
    { name: "Big brother", triggers: [
        "Add a d6 to Trouble to Reveal that you have video or audio surveillance of a Lead or Feature.",
        "Add a d10 to Trouble to Reroll a die whenever secrets you know come into play.",
        "Earn a Plot Point when you Choose to disable or dismantle your existing surveillance of or files on a Lead or Feature."
    ]},
    { name: "Big hearted", triggers: [
        "Earn a Plot Point when you Choose to buy somebody's sob story.",
        "Earn a Plot Point and Add a d6 to the Trouble pool when you risk yourself to help somebody in need.",
        "Give your opposition a d6 to roll against you and Increase your Insecure or Afraid Stress pool against them when they try to talk you out of helping somebody"
    ]},
    { name: "Clever", triggers: [
        "Earn a Plot Point when you Choose to show off your smarts in some annoying or frustrating manner.",
        "Spend a Plot Point to Reveal that you know a piece of useful trivia.",
        "Earn a Plot Point and Add a d6 to Trouble when your clever plan goes off the tracks."
    ]},
    { name: "Connected", triggers: [
        "Spend a Plot Point to Gain a d8 Relationship with a Feature for the rest of the scene.",
        "Spend a Plot Point to Reveal you 'know a guy' who can provide you with information or material goods.",
        "Spend a Plot Point to Gain a 2d8 Location that you'd normally not have access to."
    ]},
    { name: "Cosmopolitan", triggers: [
        "Give your opposition a d6 to Reroll a die when dealing with other cultures.",
        "Give your opposition a d10 to Reroll two dice when dealing with other cultures.",
        "Spend a Plot Point to Reveal that you have spent time in a foreign (but terrestrial) culture."
    ]},
    { name: "Daring", triggers: [
        "Add a d6 to Trouble to Reroll a die in a Daring roll.",
        "Add a d10 to Trouble to Reroll two dice in a Daring roll.",
        "Spend a Plot Point to Decrease your opponent's Injured or Insecure Stress pool."
    ]},
    { name: "Extraterrestrial knowledge", triggers: [
        "Earn a Plot Point when you Reveal you know way too much about an alien culture.",
        "Spend a Plot Point to Reroll a die in any roll associated with understanding alien cultures.",
        "Add a d6 to Trouble to Increase an Insecure or Afraid Stress pool against or about aliens."
    ]},
    { name: "Family reputation", triggers: [
        "Earn a Plot Point and Give your opposition a d6 when your family reputation precedes you.",
        "Add a d6 to Trouble to Reveal you have access to someone who owes your family a favor, allowing you to buy your way out of a situation.",
        "Add a d10 to Trouble to Reroll a die in any social interaction connected to your family."
    ]},
    { name: "Fast talker", triggers: [
        "Earn a Plot Point and Give your opposition a d6 when you're caught in a lie or exaggeration.",
        "Add a d6 to Trouble to Reroll a die in a Fast Talker roll.",
        "Spend a Plot Point to Gain a 2d8 Extra that you have already fast-talked into giving you assistance."
    ]},
    { name: "Fixer", triggers: [
        "Add a d6 to Trouble to Reveal that you have access to small, non-unique items you're not supposed to have.",
        "Spend a Plot Point to Reveal you 'know a guy.'",
        "Add a d6 to the Trouble pool to Reroll a die in any social interaction with your former clients."
    ]},
    { name: "Gearhead", triggers: [
        "Earn a Plot Point when you inconveniently Choose to stop and admire fine technology.",
        "Spend a Plot Point to Reveal information about a car or other non-unique tech.",
        "Spend a Plot Point to Reroll a die when using or repairing anything mechanical."
    ]},
    { name: "Genius", triggers: [
        "Spend a Plot Point to Reveal that you've studied a subject and know its basics.",
        "Earn a Plot Point and Add a d6 to Trouble when you assume others can't follow your complicated thinking.",
        "Spend a Plot Point to Reroll any academic or intellectual roll."
    ]},
    { name: "Guilty", triggers: [
        "Earn a Plot Point and Give your opposition a d6 when your guilt stymies or confuses you.",
        "Spend a Plot Point to Reroll a die on any roll when trying to make amends.",
        "Earn a Plot Point to Increase your opposition's Injured or Insecure Stress pool against you."
    ]},
    { name: "Hacker", triggers: [
        "Add a d6 to the Trouble pool to Reroll a die in a Hacker roll.",
        "Spend a Plot Point to Reveal a fact about security holes or other exploitable weaknesses in the target of your hacking.",
        "Add a d10 to the Trouble pool to Gain a 2d8 Extra or d8 Relationship for an ally you're working with."
    ]},
    { name: "Herioic reputation", triggers: [
        "Earn a Plot Point when you Choose to protect your secret identity at the cost of lying to your friends or not using your reputation toward your goals.",
        "Add a d6 to Trouble to Reroll a die when you intimidate or awe someone as a hero.",
        "Spend a Plot Point to Gain a 2d8 Extra for the rest of the scene (a devoted fan!)."
    ]},
    { name: "Impulsive", triggers: [
        "Earn a Plot Point and Add a d6 to Trouble when you act rashly.",
        "Earn a Plot Point when you Choose to Interfere in a Contest.",
        "Spend a Plot Point to Reroll a die when acting first would work to your advantage."
    ]},
    { name: "In over my head", triggers: [
        "Earn a Plot Point and Add d6 to Trouble when you get into trouble over your head.",
        "Add a d6 to Trouble to Increase your Insecure or Angry Stress pool against opponents who outclass or capture you.",
        "Add a d6 to Trouble to Reroll a die when trying to gain important information when you're in over your head."
    ]},
    { name: "Investigator", triggers: [
        "Earn a Plot Point when you Choose to spend a scene investigating instead of taking immediate action.",
        "Spend a Plot Point to Reroll an Investigator Investigation roll.",
        "Spend a Plot Point and Add a d6 to Trouble to Reveal a clue from a prior scene in which you Chose to investigate."
    ]},
    { name: "Likeable", triggers: [
        "Give your opposition a d6 to Reroll a die in a Likeable roll.",
        "Earn a Plot Point when you Decrease your own Afraid or Insecure Stress pool—you don't really mean to upset anyone!",
        "Spend a Plot Point to Reroll a die in an argument with someone that likes you."
    ]},
    { name: "Manipulative", triggers: [
        "Earn a Plot Point and Give your opposition a d6 when you ask them to trust you, even if you don't mean it.",
        "Spend a Plot Point to Gain a d8 Relationship for one scene with a Feature with whom you don't already have a Relationship.",
        "Spend a Plot Point to Reroll a die in a Contest with someone you've been manipulating."
    ]},
    { name: "Marksman", triggers: [
        "Earn a Plot Point when you Choose to run out of ammunition.",
        "Spend a Plot Point to Reroll a die in a Marksman roll.",
        "Add a d6 to Trouble to Reroll a die in a Marksman roll."
    ]},
    { name: "Martial artist", triggers: [
        "Spend a Plot Point to Reroll a die when you redirect an opponent's momentum.",
        "Spend a Plot Point to Decrease your opponent's Injured or Exhausted Stress pool.",
        "Spend a Plot Point to Increase your Injured or Exhausted Stress pool."
    ]},
    { name: "Mastermind", triggers: [
        "Add a d6 to Trouble to Reroll a die when dealing with characters you have a history of manipulating.",
        "Spend a Plot Point to Reveal that you've planned for this eventuality and have the resources necessary for your plan.",
        "Spend a Plot Point to Reroll a die when your plan comes to fruition."
    ]},
    { name: "Military brat", triggers: [
        "Earn a Plot Point when you Choose to have your military knowledge get you in trouble.",
        "Spend a Plot Point to Reroll a die when you call in a favor to get you out of trouble.",
        "Add a d6 to Trouble to Reveal that you have military hardware or secrets you shouldn't have."
    ]},
    { name: "Not born yesterday", triggers: [
        "Earn a Plot Point when you Choose to buy a reasonable lie.",
        "Earn a Plot Point and Give your opposition a d6 when confronted with a problem that defies normal common sense or logic.",
        "Spend a Plot Point to Reroll a die in a Contest or Test when you're convinced you're being lied to, swindled, or distracted."
    ]},
    { name: "Observant", triggers: [
        "Add a d6 to Trouble to Reroll your first roll in any Contest or Test where you have been surprised, ambushed, or caught off guard.",
        "Spend a Plot Point and Reroll a die in an Observant roll when you're sure there's more than meets the eye.",
        "Spend a Plot Point to Decrease your opposition's Insecure or Angry Stress pool against you as a result of your damning evidence."
    ]},
    { name: "On a mission", triggers: [
        "Earn a Plot Point and Add a d6 to Trouble when you foolishly pursue your mission despite the risk.",
        "Spend a Plot Point to Reroll a die in a roll that directly contributes to your mission.",
        "Earn a Plot Point and Increase your opponent's Insecure or Angry Stress pool against you when you try to recruit others to your cause."
    ]},
    { name: "Right place right time", triggers: [
        "Earn a Plot Point and Give your opposition a d6 when somebody confronts you about your presence somewhere offlimits, secret, or prohibited.",
        "Add a d6 to Trouble to join a scene you weren't in.",
        "Add a d10 to the Trouble pool to add both yourself and another Lead or Feature to a scene you're not in."
    ]},
    { name: "Savage", triggers: [
        "Earn a Plot Point and Add a d6 to Trouble whenever you act upon your base instincts.",
        "Add a d6 to Trouble to Increase your Injured or Afraid Stress pool.",
        "Spend a Plot Point when you draw on your primal rage to Recover your own Injured or Afraid Stress."
    ]},
    { name: "Shameless flirt", triggers: [
        "Earn a Plot Point and Add a d6 to Trouble when you flirt with someone you know you shouldn't.",
        "Spend a Plot Point to Reveal a new facet of your 'worldly and cosmopolitan life' as a d8 Useful Detail.",
        "Spend a Plot Point to Reroll any die in a Shameless Flirt roll."
    ]},
    { name: "Smartass", triggers: [
        "Earn a Plot Point and Give your opposition a d6 when you're being a Smartass in a dangerous situation.",
        "When you Give a die for this Distinction, it's now a d10; however, if you inflict Angry or Insecure Stress in that Contest, Increase your Stress pool.",
        "Spend a Plot Point to Reroll any die involving your verbal taunts and insults."
    ]},
    { name: "Sneaky", triggers: [
        "Spend a Plot Point to Reroll any die in a Sneaky roll.",
        "Add a d6 to Trouble to Reroll a second die on a Sneaky roll.",
        "Spend a Plot Point to Reveal that you've palmed a small object from a previous scene."
    ]},
    { name: "Soldier", triggers: [
        "Earn a Plot Point when you Choose to follow orders, stick to protocol, or maintain strict discipline when it would benefit you more to do otherwise.",
        "Spend a Plot Point to Reroll any die in a Soldier roll because of your discipline and training.",
        "Add a d6 to Trouble when you draw upon your military expertise to Increase your Injured or Afraid Stress pool."
    ]},
    { name: "Vicious", triggers: [
        "Add a d6 to the Trouble pool to Increase your Angry or Afraid Stress pool.",
        "Add a d6 to the Trouble pool to Increase your Insecure or Exhausted Stress pool.",
        "Spend a Plot Point to Increase your Injured or Afraid Stress pool. You can combine this with the d4 trigger to Increase two dice in your Afraid Stress pool. "
    ]},
    { name: "Wealthy", triggers: [
        "Spend a Plot Point to Reroll one die in a Contest or Test swayable by money.",
        "Spend a Plot Point to Reveal that you own a large nonunique item such as a car, call center, or evil corporation as a d8 Useful Detail.",
        "Add a d6 to the Trouble pool to Increase your Insecure or Afraid Stress pool when bringing up your vast fortune in a Contest or Test."
    ]},
    { name: "Weapons master", triggers: [
        "Spend a Plot Point to Decrease your opponent's Injured or Afraid Stress pool against you when you're armed.",
        "Spend a Plot Point to Increase your Injured or Afraid Stress pool when you're armed.",
        "Spend a Plot Point to make a wild, sweeping attack with your weapon. Roll your own dice instead of Trouble in a Test that each affected character must beat to avoid taking Exhausted or Injured Stress."
    ]},
    { name: "Willful", triggers: [
        "Earn a Plot Point and Add a d6 to Trouble when you put your foot down.",
        "Add a d10 to Trouble to put your foot down and Reroll a die in a Willful roll.",
        "Spend a Plot Point to Decrease your opponent's Insecure or Afraid Stress pool against you. You're a hard nut to crack."
    ]},
    { name: "Heritage: Almeracan", limit: "psychic", triggers: [
        "Earn a Plot Point when you Choose to act disdainfully and dismissively to your 'inferiors.'",
        "Add a d6 to the Trouble pool when you use dangerous offworld technology to use a Special Effect from an Ability you do not have.",
        "Spend a Plot Point to Increase your Angry or Insecure Stress pool."
    ]},
    { name: "Heritage: Atlantean", limit: "dehydration", triggers: [
        "Earn a Plot Point when dehydration forces a Shutdown of your Abilities.",
        "Earn a Plot Point when you Choose to put the welfare of the oceans over that of the surface world.",
        "Spend a Plot Point to Reroll any die in a Test or Contest that includes one of your Ability dice."
    ]},
    { name: "Heritage: Cybernetic", limit: "electricity", triggers: [
        "Earn a Plot Point when your Abilities are Shutdown by technological interference.",
        "Spend a Plot Point to directly interface with another piece of technology.",
        "Add a d6 to Trouble to use a Special Effect from a connected Ability you don't have, temporarily rerouting your cybernetic systems."
    ]},
    { name: "Heritage: Kryptonian", limit: "kryptonite, magic", triggers: [
        "Earn a Plot Point when your Abilities are Shutdown by green or blue kryptonite or you Choose to act on baser instincts under the sway of red kryptonite.",
        "Add a d6 to the Trouble pool to use a Special Effect from a connected Ability you don't have.",
        "Spend a Plot Point to use Kryptonian technology to gain or grant an unconnected Ability for one scene at a d6 die rating."
    ]},
    { name: "Heritage: Magical", limit: "mute, binding", triggers: [
        "Add a d6 to Trouble to Reroll any die due to your magical 'luck.'",
        "Add a d10 to Trouble to use a Special Effect from an Ability you do not have, connected or not.",
        "Add a d10 to Trouble to Reveal that you know a spirit, demon, or sorcerer with information you need."
    ]},
    { name: "Heritage: Martian", limit: "fire", triggers: [
        "Earn a Plot Point and Increase your opposition's Afraid or Insecure Stress pool when you're threatened by fire.",
        "Add a d6 to Trouble to join any scene with a Lead or Feature with whom you have a Relationship of d6 or higher.",
        "Earn a Plot Point when you Choose to act anonymously when revealing yourself would be beneficial."
    ]},
];

var _abilities = [
      { name: "ABSORPTION", limits: ["Broken Concentration","Cold","Grounding"], effects: [
          "Absorb energy to Decrease your opponent’s Injured or Exhausted Stress pool against you or another character.",
          "Absorb the energy out of an attack on you or another character.",
          "Use absorbed energy to perform feats of super-strength",
          "Release the energy you have absorbed to power technology.",
          "Release absorbed energy behind you, propelling you forward at great speed."
      ]},
      { name: "ADAPTATION", limits: ["Dehydration","Cold","Heat","Vacuum"], effects: [
          "Adapt your physiology to new conditions.",
          "Extend your adaptation to other characters as long as you touch them.",
          "Blend in to your chosen environment.",
          "Reveal additional details of your chosen environment.",
          "Find useful resources in your chosen environment."
      ]},
      { name: "ANIMAL CONTROL", limits: ["Eye Contact","Pain Transference","Psychic Feedback"], effects: [
          "See through an animal’s eyes in another scene.",
          "See an animal’s recent memories.",
          "Summon an animal that you can control.",
          "Take on features of your chosen animal.",
          "Stress Out an animal."
      ]},
      { name: "ASTRAL PROJECTION", limits: ["Psychic Feedback","Electromagnetic Fields","Tethered to Body"], effects: [
          "Take another character with you.",
          "Disrupt electronics while astrally projected.",
          "Astrally project one body part to see or touch the astral world.",
          "Project “deeper” into otherworldly spirit realms.",
          "Take along material objects defined by the scope of your Ability die rating."
      ]},
      { name: "BLAST", limits: ["Heat","Ice","Rubber","Lead Shielding","Cold","Vacuum"], effects: [
          "Create a wide-angle sweep effect that inflicts Insecure or Afraid Stress.",
          "Destroy an inanimate object as big as a car. Spend two Plot Points for an object as big as a house. Spend three for an object as big as a skyscraper or a river.",
          "Make geysers of your element shoot up from the ground beneath your foes.",
          "Create a sweep effect fireball that explodes on contact, inflicting Injured or Exhausted Stress.",
          "Encase a person or an object in ice for a scene due to ice blast or super-breath blast. Breaking free requires a Test with your Ability die Aiding Trouble."
      ]},
      { name: "BODY TRANSFORMATION", limits: ["Corrosion","Heat","Wind"], effects: [
          "Turn to a gaseous or liquid form and escape through a crack.",
          "Become a rock-hard statue for a scene, ignoring Injured or Exhausted Stress.",
          "Turn another character into your chosen element.",
          "Turn yourself into living fire, Increasing your Injured or Afraid Stress pool.",
          "Hide in a large amount of your chosen element."
      ]},
      { name: "CLAWS", limits: ["Electricity","Magnetism","Terrifying"], effects: [
          "Increase your Injured or Afraid Stress pool.",
          "Rip apart solid, inert obstacles.",
          "Stop your fall by using your claws as pitons.",
          "Regrow your claws if they are damaged or broken.",
          "Cling to a surface with your claws despite adverse conditions."
      ]},
      { name: "COMBUSTION", limits: ["Time","Water","Vacuum"], effects: [
          "Cause an explosive sweep effect that inflicts Injured Stress.",
          "Reveal that you left a bomb in a location you were in earlier in the episode.",
          "Draw everyone’s attention to an explosion so you can escape a scene.",
          "Create shaped charges that can take down obstacles without damaging the surrounding structure.",
          "Create a time bomb set to go off after a certain amount of time has passed."
      ]},
      { name: "COMPREHENSION", limits: ["Auditory","Visual","Time"], effects: [
          "Instantly understand a spoken language you’ve never heard before.",
          "Figure out alien technology well enough to use it…once.",
          "Deduce the language or code’s origin in general terms.",
          "Write or speak in response to what you’ve deciphered.",
          "Read binary code to reconstitute data files or understand a program’s function."
      ]},
      { name: "CRYOKINESIS", limits: ["Heat","Sunlight","Passion"], effects: [
          "Entomb another character in ice, in a form of suspended animation.",
          "Create walls of ice to block a path or pursuer.",
          "Jam mechanical devices with frost and ice.",
          "“Skate” across ice.",
          "Freeze a large mass of liquid or even gas into a solid state."
      ]},
      { name: "DENSITY CONTROL", limits: ["Electricity","Water","Wind"], effects: [
          "Walk through a wall into a scene in progress.",
          "Become hard as stone and Decrease your opponent’s Injured or Exhausted Stress pool.",
          "Reach into another character’s body—as an attack or as medical attention.",
          "Decrease your density to the point where you float on air.",
          "Make your fists super-dense and Increase your Injured or Exhausted Stress pool."
      ]},
      { name: "DREAM MANIPULATION", limits: ["Psychic Feedback","Strong Emotion","Dreams About You"], effects: [
          "Bring other characters into a dreamscape with you.",
          "Create an item, location, or event within a dream.",
          "Force a dream to recall a memory of the dreamer.",
          "Make the dreamer sleepwalk.",
          "Enter the dreams of a comatose dreamer."
      ]},
      { name: "DUPLICATION", limits: ["Psychic Feedback","Pain Transference","Split Attention"], effects: [
          "Create a duplicate with one of your Abilities, stepped back by one. Spend additional Plot Points to give your dupe additional Abilities.",
          "Have a stashed dupe in a convenient place you’ve been in before.",
          "Merge two dupes together, sharing memories.",
          "“share” Stress across dupes, splitting die steps among them.",
          "Duplicate a hand-held item along with yourself."
      ]},
      { name: "EARTH CONTROL", limits: ["Must be Grounded","Cold","Water"], effects: [
          "Encase another character in stone.",
          "Create a sweep effect of quakes that inflict Exhausted or Afraid Stress.",
          "Raise a barrier of stone before you or others, Decreasing your opponent’s Injured or Exhausted Stress pool.",
          "Seal a corridor with a wall of stone.",
          "Make the earth swallow up a vehicle, a building, or a whole town."
      ]},
      { name: "ELECTROKINESIS", limits: ["Grounding","Rubber","Conductive Materials"], effects: [
          "Create a powerful storm.",
          "Channel lightning to a point on the ground.",
          "Charge your body or conductive material with electricity to be released at a later point.",
          "Activate electronic devices using your electrical abilities.",
          "Create an electromagnetic pulse to disable all electronic devices within a scene."
      ]},
      { name: "FLIGHT", limits: ["Short Distances","Sonic Boom","Wind"], effects: [
          "Carry something large or ungainly along with you.",
          "Support a falling object such as a floundering aircraft.",
          "Dive bomb an enemy and Increase your Stress pool for this attack.",
          "Change direction quickly to fly around an obstacle; you may use this obstacle as a d8 Useful Detail.",
          "Join another scene you are not a part of, even if you cannot get there by ground."
      ]},
      { name: "FORCE FIELD", limits: ["Psychic Feedback","Mental","Concentration"], effects: [
          "Decrease Injured or Insecure Stress on all characters within the force field.",
          "Entrap another character in a force field.",
          "Fly short distances within a force bubble.",
          "Slip from the grasp of an adversary by sliding out of your force field.",
          "Keep all forms of gas in or out of the field; this can provide a bubble of breathable air in an airless environment or keep harmful gases in or out."
      ]},
      { name: "GRAVITY CONTROL", limits: ["Concentration","Density","Magnetism"], effects: [
          "Hold another character or object in place with powerful gravity.",
          "Fly short distances or hover in place.",
          "Toss another character out of a scene.",
          "Make a character or object so light that it can float in the breeze.",
          "Increase the gravity in a scene; you may use the crushing gravity as a d8 Useful Detail for the remainder of the scene."
      ]},
      { name: "HEALING", limits: ["Emotional Trigger","Damage Transfer","Touch"], effects: [
          "Recover another character’s Angry or Exhausted Stress.",
          "Recover another character’s Afraid or Insecure Stress.",
          "Stave off a disease or other affliction, such as blindness, for a short period of time.",
          "Identify any poison or toxin in your subject’s body.",
          "Remove another character’s Injured Stress and add it to yourself."
      ]},
      { name: "HYDROKINESIS", limits: ["Cold","Heat","Sand"], effects: [
          "Create small storm or thick fog within a scene; you may use this as a d8 Useful Detail.",
          "Create bubbles of air to allow others to survive underwater.",
          "Create huge tidal waves.",
          "Turn any large body of water, such as a lake, into steam or ice or vice-versa.",
          "Create a moving wall of water capable of Decreasing the Injured or Exhausted Stress pool of your opponent or an ally’s opponent."
      ]},
      { name: "ILLUSIONS", limits: ["Psychic Feedback","Concentration","One Target"], effects: [
          "Create illusions so real that another character thinks they can be seen, heard, smelled, and even touched.",
          "Create illusions that appear for all characters in a scene.",
          "Create an illusion of a scene, changing the surroundings.",
          "Create an illusion pleasing enough to Decrease an Afraid or Insecure Stress pool.",
          "Create an illusion scary enough to Increase an Afraid or Insecure Stress pool."
      ]},
      { name: "INSECT CONTROL", limits: ["Pain Transference","Psychic Feedback","Bug Spray"], effects: [
          "See through the eyes of an insect in another scene.",
          "Swarm insects on another character for a scene. Any other character can use the swarm as a d8 Useful Detail.",
          "Take on aspects of the insects that you control.",
          "Call insects of the type you control to you.",
          "Direct insects to infest large electronic or mechanical devices in the scene to disrupt them and render them inoperable."
      ]},
      { name: "INVISIBILITY", limits: ["Mental","Scent","Audible"], effects: [
          "Disappear and escape from a scene.",
          "Hide for an entire scene to listen in without being noticed.",
          "Shadow someone for a whole day without them noticing you at all.",
          "See other invisible people or objects.",
          "Turn another person or object invisible for a scene."
      ]},
      { name: "INVULNERABILITY", limits: ["Energy","Electricity","Magic"], effects: [
          "Decrease an opponent’s Injured or Exhausted Stress pool.",
          "Recover your Injured or Exhausted Stress.",
          "Ignore the effects of exposure to extreme temperatures such as arctic cold or volcanic cores.",
          "Ignore hunger or exhaustion due to lack of sleep.",
          "Ignore the need to breathe in an airless environment such as underwater."
      ]},
      { name: "LIGHT CONTROL", limits: ["Shadow","Diffusion","Mirror"], effects: [
          "Create a dazzling blast, temporarily blinding everyone in a scene.",
          "Create a dizzying light show, hypnotizing anyone that can see the lights.",
          "Use a focused light beam to burn through an inanimate object or burn a message onto a surface.",
          "Shine brightly into the ultraviolet spectrum, imitating sunlight.",
          "Create holographic shapes from light that can remain for an entire scene."
      ]},
      { name: "LUCK", limits: ["Mental","Emotional Trigger","Magic"], effects: [
          "Reroll a die in a Test or Contest that includes a Complication.",
          "Force your opponent to reroll the highest die in a Test or Contest.",
          "Allow another Lead or Feature to Reroll a die in a Test or Contest that includes a Complication.",
          "Chance upon a clue when you aren’t looking for it.",
          "Decrease an Injured or Afraid Stress pool that would have obviously hurt you."
      ]},
      { name: "MAGNETISM", limits: ["Electricity","Plastics","Concentration"], effects: [
          "Wrap metal around a character, trapping him.",
          "Wipe computer data storage and memory banks.",
          "Scramble electronic devices for the remainder of the scene.",
          "Manipulate the iron in the blood of another person to stun him or cause Injured Stress.",
          "Move big metallic objects around as defined by the scope of your die rating."
      ]},
      { name: "MIND CONTROL", limits: ["Psychic Feedback","Eye Contact","Auditory"], effects: [
          "Insert a post-hypnotic suggestion in your target to be acted upon later.",
          "Erase a memory, such as a secret identity.",
          "Insert false memories into a target.",
          "Make a target into your stalwart defender without having to maintain control over every action.",
          "Make a target oppose his friends without having to maintain control over every action."
      ]},
      { name: "PARALYSIS", limits: ["Psychic Feedback","Touch","Duration"], effects: [
          "Make another character unable to move, speak, or act.",
          "Release a paralyzing agent that slows everyone in a scene except you. You may use this as a d8 Useful Detail.",
          "Stun a target from a distance so that he can no longer run away.",
          "Make a target fall asleep.",
          "Increase your Afraid or Insecure Stress pool."
      ]},
      { name: "PLANT CONTROL", limits: ["Pain Transference","Psychic Feedback","Cold"], effects: [
          "Make vines burst from below, binding a character to the ground. Anyone but the target may use the vines as a d8 Useful Detail for the rest of the scene.",
          "Send messages through plant life in scenes you’re not in.",
          "Grow a large plant pod to escape a scene through the ground.",
          "Speak to plant life in the scene you are in to ask for residual memories.",
          "Cause plants in a scene with you to secrete toxins. You may use the toxins as a d8 Useful Detail."
      ]},
      { name: "POISON", limits: ["Touch","Wind","Water"], effects: [
          "Make your poisonous gas affect everyone in a scene as a sweep effect.",
          "Infect a target with a poison that will activate one or more scenes later.",
          "Conceal the toxin from normal medical science.",
          "Recover yourself or somebody in the same scene from any Stress caused by a toxin.",
          "Increase an Injured or Exhausted Stress pool with your poison."
      ]},
      { name: "POSSESSION", limits: ["Psychic Feedback","Duration","Concentration"], effects: [
          "Seize control of an Extra in the same scene as you for the rest of this episode, or until they break free of your control.",
          "Control all Extras in a scene. Rather than inhabiting everyone’s body, you are merely in the back of their minds, making suggestions that everyone seems to agree are good ideas. The effects only last for this scene.",
          "Use someone else’s Special Effect for the rest of the scene.",
          "Take control of a Lead or Feature in another scene for a single Contest or Test.",
          "Take control of a Lead or Feature for the remainder of the scene or until they break free. This also requires a Contest against the target."
      ]},
      { name: "POWER LEECH", limits: ["Uncontrollable","Touch","Concentration"], effects: [
          "Gain an Ability possessed by another Lead or Feature in the same scene. The die rating of the stolen Ability is the lower of your Power Leech die rating and the stolen Ability’s original die rating.",
          "Shutdown an Ability possessed by another Lead or Feature in the same scene. Your die rating must be equal to or greater than their Ability’s die rating.",
          "Use a Special Effect possessed by Gear in the same scene.",
          "Step up another Ability of yours by stepping back an opponent’s Ability.",
          "Spend a Plot Point and step this ability back by one to step back all Abilities in the same scene as you by one."
      ]},
      { name: "PRECOGNITION", limits: ["Traumatic Flashes","Psychic Feedback","Uncontrollable"], effects: [
          "Sense an opponent’s next move in a fight. Remove the highest rolling die from his next roll.",
          "Learn about an object or person’s future just by touching him.",
          "Act on your precognitive abilities—reroll your entire pool, minus any Complications.",
          "Have gained a precognitive clue that leads you to a scene you are not a part of.",
          "Have left a clue or message in a scene you are not a part of but have visited before."
      ]},
      { name: "PYROKINESIS", limits: ["Water","Cold","Vacuum"], effects: [
          "Melt an inanimate object with a scope defined by your die rating.",
          "Create a ring of fire, trapping another character.",
          "Absorb existing fire and heat into your own body.",
          "Surround yourself with flames and Increase your Injured or Afraid Stress pool.",
          "Create a wall of flame to Decrease your opponent’s Injured or Exhausted Stress pool against you."
      ]},
      { name: "REGENERATION", limits: ["Emotional Block","Elemental Trigger","Vampirism"], effects: [
          "Recover Exhausted or Injured Stress.",
          "Recover Afraid or Insecure Stress.",
          "Grow back a severed limb or other body part.",
          "Cure yourself from any ailment or disease.",
          "Return from the dead. You must step this Ability back by a step as a consequence."
      ]},
      { name: "SHADOW CONTROL", limits: ["Light","Fire","UV Light (including Sunlight)"], effects: [
          "Turn someone else into a shadow.",
          "Restrain another character with his own shadow.",
          "Attack someone with his own shadow.",
          "Envelop an entire scene in darkness, snuffing out all light.",
          "Temporarily blind everyone in a scene by covering their eyes in their own shadows."
      ]},
      { name: "SHADOW WALK", limits: ["Light","Fire","UV Light (including Sunlight)"], effects: [
          "Slip into holes and cracks too small for pursuers to follow.",
          "Jump into one shadow and out of another.",
          "Spread a shadow across a scene to jump in one end and out the other.",
          "Jump into another person’s shadow and jump out of the same person’s shadow at a later point in time.",
          "Jump into a shadow on a flat surface like a wall and out on the other side of the surface as if the shadow was a doorway or portal."
      ]},
      { name: "SHAPESHIFTING", limits: ["Concentration","Scent","X-Rays"], effects: [
          "Change shape into an object the same size as yourself.",
          "Imitate another character down to fingerprints and retinal patterns.",
          "Grow in size to two or three times your normal height.",
          "Shrink to miniscule size.",
          "Change into an animal that would be indistinguishable from the real thing at a genetic level."
      ]},
      { name: "SONIC BLAST", limits: ["Silence","Requires Vocals","White Noise"], effects: [
          "Affect everyone in the scene that can hear you. Roll your own dice instead of Trouble in a Test that each affected character must beat to avoid taking Exhausted or Injured Stress.",
          "Emit a low frequency scream and cause a localized earthquake.",
          "Emit a high frequency scream that scrambles electronics in a scene and calls to all nearby canines.",
          "Emit a scream of the exact frequency required to shatter a specific glass object in the same scene as you.",
          "Emit a scream of such force that it deteriorates concrete and other materials back to its rocky and sandy origins."
      ]},
      { name: "STRETCHING", limits: ["Electricity","Cold","Heat"], effects: [
          "Force yourself through narrow spaces including pipes and cracks.",
          "Stretch long distances to reach great heights.",
          "Stretch in all directions like a net in order to catch a falling object or person.",
          "Change your appearance in minor ways to hide your identity.",
          "Decrease your opponent’s Injured or Exhausted Stress pool against you."
      ]},
      { name: "SUPER-SENSES", limits: ["Lead","Overload","Interference","Magic"], effects: [
          "See through objects to find specific people or objects.",
          "Hear or see into a nearby scene you’re not in.",
          "Get the scent of any person or object and track the scent to its source.",
          "See microscopic details greater than what is possible with an electron microscope.",
          "See in all directions at once.",
          "Hear signals along the radio band or see beyond the electromagnetic spectrum."
      ]},
      { name: "SUPER-SPEED", limits: ["Unstoppable","Sonic Boom","Out of Touch"], effects: [
          "Join a scene or switch to a new scene regardless of distance.",
          "Run so fast you run up a vertical surface.",
          "Perform multiple (non-Test or non-Contest) activities in the time it takes others to perform a single activity.",
          "Run fast enough to cross water as if it were solid ground.",
          "Change direction quickly to zip around an obstacle you have avoided; you may use this obstacle as a d8 Useful Detail."
      ]},
      { name: "SUPER-STRENGTH", limits: ["Uncontrollable","Anger Trigger","Needs Focus"], effects: [
          "Perform a fantastic feat of strength.",
          "THrow or knock another character out of a scene.",
          "Pound on the ground, creating a shockwave sweep effect and knocking everyone in the scene off their feet.",
          "Break through a wall—even a brick or stone wall—to grab a target or object on the other side.",
          "Wield a large inanimate object, like an automobile, as a weapon (and as a d8 Useful Detail)."
      ]},
      { name: "SWIMMING", limits: ["Dehydration","Ice","Earth","Not Amphibious"], effects: [
          "Move through water at high speeds—join another scene regardless of distance if it’s accessible by water.",
          "Escape a scene by jumping into a nearby body of water and disappearing into the depths.",
          "Leap from the water onto a nearby shore, boat, or low-flying aircraft to surprise your foes.",
          "Resist the pressure of very deep water without a pressure suit or submarine.",
          "Decrease any Injured or Exhausted Stress while you are in the water by dodging around your opponent."
      ]},
      { name: "TECHNOPATHY", limits: ["Electricity","Psychic Feedback","Magnetism"], effects: [
          "Break through a computer system’s firewall.",
          "Control any electronic device in the same scene as you; you may use this device as a d8 Useful Detail for the rest of the scene.",
          "Turn on and control vehicles as if you’re physically driving them.",
          "See through the “eyes” of electronic devices in scenes other than your own.",
          "Override security codes on door panels or electronic vaults."
      ]},
      { name: "TELEKINESIS", limits: ["Psychic Feedback","Concentration","Emotion Trigger"], effects: [
          "Knock a character out of a scene.",
          "Create a telekinetic shield to Decrease an opponent’s Injured or Afraid Stress pool.",
          "Push, pull, or lift something really heavy.",
          "Fly or levitate a short distance. Spend another Plot Point if you want to carry others with you.",
          "Shoot bolts of telekinetic force."
      ]},
      { name: "TELEPATHY", limits: ["Psychic Feedback","Concentration","Eye-contact"], effects: [
          "Read another character’s surface thoughts.",
          "Send messages psychically to a character in a different scene.",
          "Create a mental shield to block other mental powers from invading your mind.",
          "Sense the location and well-being of any one person that you have met before.",
          "Attack another person with a mental blast."
      ]},
      { name: "TELEPORTATION", limits: ["Concentration","Slow","Mental"], effects: [
          "Join a scene or switch to a new scene regardless of distance.",
          "Quickly teleport away to escape from a scene.",
          "Take another character with you.",
          "Create a small portal capable of teleporting objects.",
          "Create a portal that alters your falling trajectory, landing safely or off to the side."
      ]},
      { name: "TIME CONTROL", limits: ["Time","Concentration","Psychic Feedback"], effects: [
          "Stop time for ten subjective minutes.",
          "Slow time around you, allowing you to switch to a new scene instantly.",
          "Stop time for five subjective minutes but bring another person with you.",
          "Reverse time for a few seconds to change one error, allowing you to reroll your last dice roll—however, you must keep the second roll.",
          "Slow time enough for you to perform multiple activities in the time it takes others to perform a single activity"
      ]},
      { name: "TUNNELING", limits: ["Misdirection","Water","Earthquake"], effects: [
          "Make tunnels that last for the remainder of the episode in the form of d8 Useful Details.",
          "Escape a scene by digging an escape tunnel.",
          "Find a weak point in any floor by digging beneath it; this becomes a d8 Useful Detail you can use for the rest of the scene.",
          "Make tunnels collapse behind you so that you cannot be followed.",
          "Use your claws to Increase your Injured or Afraid Stress pool."
      ]},
      { name: "WALL WALKING", limits: ["Slow","Slick Surfaces","Water"], effects: [
          "Hide on a ceiling, making it easy for you to jump down into the middle of those below.",
          "Escape a scene by use of a convenient window or similar exit leading to an outside wall.",
          "Take another person with you as you walk off on the wall or ceiling.",
          "Jump from wall to wall, keeping your grip as if on a flat surface.",
          "Decrease an Injured or Exhausted Stress pool when a structure or building you’re clinging to collapses or falls."
      ]},
      { name: "WIND CONTROL", limits: ["Grounded","Dirt","Vacuum"], effects: [
          "Fly a short distance.",
          "Create a localized tornado.",
          "Create a powerful wind as a sweep effect inflicting Exhausted or Insecure Stress.",
          "Lift another person or inanimate object off the ground and into the air.",
          "Hold a target, object, or even a moving car in place with powerful gusts of wind."
      ]}    
];
