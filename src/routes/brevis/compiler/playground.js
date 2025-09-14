export { init, core_fns_c, core_fns_js, compile_c, compile_js, compile_py }

function init() {
	// Load the wasm file
	await wasm_bindgen('./assets/brevislib_bg.wasm');
console.log("INITTING");
	wasm_bindgen.init_wasm();
}

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
function compile_c(s){ return wasm_bindgen.compile_c(s, core_fns_c); }
function compile_py(s){ return wasm_bindgen.compile_py(s); }
function compile_js(s){ return wasm_bindgen.compile_js(s, core_fns_js); }
