
var _graphOptions = {
	physics: {
		solver: "repulsion",
		repulsion: {
			centralGravity: 0.1,
			springLength: 50,
			springConstant: 0.05,
			nodeDistance: 100,
			damping: 0.09
		}
	}
};
var _colorSchemes = [];
// Extra
_colorSchemes[0] = {
	background: "lightGrey",
	border: "darkGrey",
	highlight: { background: "lightGrey", border: "black" }
};
// Feature
_colorSchemes[1] = {
	background: "red",
	border: "darkGrey",
	highlight: { background: "red", border: "black" }
};
// Lead
_colorSchemes[2] = {
	background: "yellow",
	border: "darkGrey",
	highlight: { background: "yellow", border: "black" }
};
// Location
_colorSchemes[3] = {
	background: "lightBlue",
	border: "darkGrey",
	highlight: { background: "lightBlue", border: "black" }
};
// Note
_colorSchemes[4] = {
	background: "white",
	foreground: "darkGrey",
	border: "darkGrey",
	font: { color:'darkGrey' },
	highlight: { background: "white", border: "black", font: { color:'black' } }
};

var priorData = {};
function generateOutput(data, output, force)
{
	if (!force && data.equals(priorData)) { return; }
	priorData = data;

	_graphOptions.physics.repulsion.nodeDistance = data.space;

	var graphData = { nodes: [], edges: [] };
	var namesToIds = {};
	var curId = 1;

	for (var i = 0; i < data.chars.length; i++)
	{
		graphData.nodes.push({
			id: curId,
			label: data.chars[i].name,
			shape: "box",
			color: _colorSchemes[data.chars[i].rank]
		});
		namesToIds[data.chars[i].name] = curId;
		curId++;
	}

	for (var i = 0; i < data.locations.length; i++)
	{
		graphData.nodes.push({
			id: curId,
			label: data.locations[i].name,
			shape: "circle",
			color: _colorSchemes[3]
		});
		namesToIds[data.locations[i].name] = curId;
		curId++;
	}

	for (var i = 0; i < data.notes.length; i++)
	{
		graphData.nodes.push({
			id: curId,
			label: data.notes[i].text,
			shape: "box",
			color: _colorSchemes[4],
			shapeProperties:{borderDashes:[2,2]},
			font: { color:'darkGrey' },
		});
		graphData.edges.push({
			from: curId,
			to: namesToIds[data.notes[i].node],
			dashes:[2,2],
			length:
				_graphOptions.physics.repulsion.nodeDistance * data.noteSpace
		});
		curId++;
	}

	for (var i = 0; i < data.connections.length; i++)
	{
		graphData.edges.push({
			from: namesToIds[data.connections[i].lhs],
			to: namesToIds[data.connections[i].rhs],
			label: data.connections[i].text,
			arrows: data.connections[i].bi ? "to from" : "to",
			font: {align: 'middle'}
		});
	}

	let network = new vis.Network(output[0], graphData, _graphOptions);
	if (!data.physics)
	{
		network.on("stabilizationIterationsDone", function ()
		{
			network.setOptions( { physics: false } );
		});
	}
}
