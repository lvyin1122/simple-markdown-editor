initEditor();

function initEditor() {
	
	var editor = ace.edit("md-editor");

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/markdown"); 
    editor.getSession().setTabSize(4); 
    editor.getSession().setUseWrapMode(true); 

    editor.setValue(localStorage.localData || "");

    parseMarkdown(editor);

    editor.getSession().on("change", function(e) {
    	parseMarkdown(editor);
    });
}

function parseMarkdown(editor) {
	var viewer = $("#md-viewer");
	var data = editor.getValue();

	localStorage.localData = data;

	data = marked(data);
	viewer.html(data);

	$("pre > code", viewer).each(function () {
    	hljs.highlightBlock(this);
  	});
}