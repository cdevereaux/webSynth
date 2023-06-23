var editor;

function InitializeGraph() {
    const viewModel = BaklavaJS.createBaklava(document.getElementById("editor"));
    editor = viewModel.editor;

    const engine = new BaklavaJS.Engine.DependencyEngine(editor);
    engine.start();

    editor.registerNodeType(Osc);
    editor.registerNodeType(Out);
    editor.registerNodeType(Noise);
    editor.registerNodeType(Gain);
    editor.registerNodeType(Envelope);

    const token = Symbol();
    editor.graphEvents.addConnection.subscribe(token, (conn) => {
        const fromNode = editor.graph.findNodeById(conn.from.nodeId);
        const toNode = editor.graph.findNodeById(conn.to.nodeId);
        fromNode.audioNode.connect(toNode.audioNode, conn.from.index, conn.to.index);
        console.log("Connection Created.")
    });
    editor.graphEvents.removeConnection.subscribe(token, (conn) => {
        const fromNode = editor.graph.findNodeById(conn.from.nodeId);
        const toNode = editor.graph.findNodeById(conn.to.nodeId);
        fromNode.audioNode.disconnect(toNode.audioNode, conn.from.index, conn.to.index);
        console.log("Connection Deleted.")
    });
}