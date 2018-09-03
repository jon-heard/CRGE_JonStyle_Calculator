
function new_blankData()
{
	return {
		chars: [], locations: [], connections: [], notes: [], physics: true,
		space: 100, noteSpace: 3
	};
}

function err(src, msg, focus, line)
{
	setStatus(src + ": " + msg + " (" + focus + "):\t'" + line + "'");
}

function nameToIndex(haystack, needle, otherHaystack)
{
	var result = -1;
	for (var i = 0; i < haystack.length; i++)
	{
		if (haystack[i].name == needle)
		{
			result = i;
			break;
		}
	}
	if (result == -1 && otherHaystack)
	{
		return nameToIndex(otherHaystack, needle);
	}
	return result;
}

function checkArgCount(command, paramCount, line)
{
	var argCount = command.length - 1;
	if (argCount != paramCount)
	{
		err(command[0], "Bad arg count", argCount, line);
		return false;
	}
	return true;
}

function parseInput(source)
{
	var result = new_blankData();

	var commands = source.split("\n");
	for (var i = 0; i < commands.length; i++)
	{
		if (commands[i] === "") { continue; }
		if (commands[i].startsWith("//")) { continue; }
		let command = parameterizeString(commands[i]);
		switch (command[0])
		{
			case "cfg_physics":
				if (!checkArgCount(command, 1, commands[i])) { return; }
				if (command[1] != "true" && command[1] != "false")
				{
					err(
						command[0], "Physics state must be boolean",
						command[1], commands[i]);
					return false;
				}
				result.physics = (command[1]=="true" ? true : false);
				break;
			case "cfg_space":
				if (!checkArgCount(command, 1, commands[i])) { return; }
				let space = command[1];
				if (isNaN(space))
				{
					err(
						command[0], "Invalid space (must be integer)",
						command[1], commands[i]);
					return false;
				}
				result.space = space;
				break;
			case "cfg_noteSpace":
				if (!checkArgCount(command, 1, commands[i])) { return; }
				let noteSpace = command[1];
				if (isNaN(noteSpace))
				{
					err(
						command[0], "Invalid note space (must be integer)",
						command[1], commands[i]);
					return false;
				}
				result.noteSpace = noteSpace;
				break;
			case "extra":
			case "feature":
			case "lead":
				if (!checkArgCount(command, 1, commands[i])) { return; }
				let newChar = { name: command[1], rank: 0 };
				if (command[0] == "feature") { newChar.rank = 1; }
				if (command[0] == "lead") { newChar.rank = 2; }
				result.chars.push(newChar);
				break;
			case "location":
				if (!checkArgCount(command, 1, commands[i])) { return; }
				result.locations.push({ name: command[1] });
				break;
			case "connect":
			case "biconnect":
				if (command.length > 1 &&
				    nameToIndex(result.chars, command[1], result.locations)==-1)
				{
					err(
						command[0], "Character not found", command[1],
						commands[i]);
					return false;
				}
				if (command.length > 2 &&
				    nameToIndex(result.chars, command[2], result.locations)==-1)
				{
					err(
						command[0], "Character not found", command[2],
						commands[i]);
					return false;
					}
				if (command.length == 3)
				{
					result.connections.push({
						lhs: command[1],
						rhs: command[2],
						text: "",
						bi: command[0]=="biconnect"
					});	
				}
				else if (command.length == 4)
				{
					result.connections.push({
						lhs: command[1],
						rhs: command[2],
						text: command[3],
						bi: command[0]=="biconnect"
					});
				}
				else
				{
					err(
						command[0], "Bad arg count", command.length - 1,
						commands[i]);
					return false;
				}
				break;
			case "upgrade":
			case "downgrade":
				if (!checkArgCount(command, 1, commands[i])) { return; }
				let index = nameToIndex(result.chars, command[1]);
				if (index == -1)
				{
					err(
						command[0], "Character not found", command[1],
						commands[i]);
					return false;
				}
				else
				{
					let adjust = 0;
					if (command[0] == "downgrade" &&
					    result.chars[index].rank > 0)
					{
						adjust = -1;
					}
					else if (command[0] == "upgrade" &&
					         result.chars[index].rank < 2)
					{
						adjust = 1;
					}
					result.chars[index].rank += adjust;
				}
				break;
			case "note":
				if (!checkArgCount(command, 2, commands[i])) { return; }
				result.notes.push({ node: command[1], text: command[2] });
				break;
			default:
				err("", "Unknown command", command[0], commands[i]);
				return false;
		}
	}

	//result = makeTestInput();
	setStatus("");
	return result;
}
