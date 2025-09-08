window.addEventListener('load', async () => {
	// Load the wasm file
	await wasm_bindgen('./assets/brevislib_bg.wasm');
console.log("INITTING");
	wasm_bindgen.init_wasm();

	var textareas = document.getElementsByTagName('textarea');
	var count = textareas.length;
	for(var i=0;i<count;i++){
    	textareas[i].onkeydown = function(e){
        	if(e.shiftKey && (e.keyCode==9 || e.which==9)) {
            	e.preventDefault();
            	var s = this.selectionStart;
            	this.value = this.value.substring(0,this.selectionStart) + "	" + this.value.substring(this.selectionEnd);
            	this.selectionEnd = s+1;
        	}
    	}
	}
});

const core_fns_c = `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void _print(char* s){ printf("%s", s); }

char*
_itoa(long long int val)
{
	static char buf[32] = {0};
	int i = 30;

	if(val == 0){
		strcpy(buf, "0");
		return buf;
	}
	for(; val && i; --i, val /= 10)
		buf[i] = "0123456789"[val % 10];

	return &buf[i+1];
}
char*
concat(const char *s1, const char *s2)
{
	size_t len1,len2;
	char *result = malloc((len1 = strlen(s1)) + (len2 = strlen(s2)) + 1);

	if(result){
		memcpy(result, s1, len1);
		memcpy(result + len1, s2, len2 + 1);
	}
	return result;
}

`;

const core_fns_js = `var buffered = "";
function _print(s) {
	buffered += String(s);
}
var _itoa = String;
var _ftoa = String;

`;


// These are accessed via window[], so need to be global.
var compile_c = (s) => wasm_bindgen.compile_c(s, core_fns_c);
var compile_py = (s) => wasm_bindgen.compile_py(s);
var compile_js = (s) => wasm_bindgen.compile_js(s, core_fns_js);

function openOutput(id) {
	var outputs = document.getElementsByClassName("out");
	for (let i = 0; i < outputs.length; i++) {
		outputs[i].style.display = "none";
	}
	document.getElementById(id).style.display = "block";
}

function compile(elm) {
	let src = document.getElementById(elm).value;
	var js_output;

	document.getElementById("stdout")
			.getElementsByTagName("code")
			.item(0).innerHTML = "loading...";
	document.getElementById("output_tabs").style.display = "block";
	document.getElementById("output").style.display = "";
	var outputs = document.getElementsByClassName("out");
	for(let i = 0; i < outputs.length; i++) {
		let output_id = outputs[i].id;
		if(output_id == "stdout"){
			continue;
		}
		let output = window["compile_" + output_id](src);
		document.getElementById(output_id)
				.getElementsByTagName("code")
				.item(0).innerHTML =
			output.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");
		if(output_id == "js"){
			js_output = output;
		}
	}
	document.getElementById("stdout")
			.getElementsByTagName("code")
			.item(0).innerHTML = eval(js_output);
	openOutput("stdout");
}

