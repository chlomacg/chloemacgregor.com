export { cPrelude, jsPrelude };

const jsPrelude = `var buffered = "";
function _print(s) {
	buffered += String(s);
}
var _itoa = String;
var _ftoa = String;

`;

const cPrelude = `#include <stdio.h>
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