window.addEventListener('load', () => {
		let codeareas = document.getElementsByTagName("code");
		for(i = 0; i < codeareas.length; i++)
			codeareas[i].innerHTML = highlight(codeareas[i].innerHTML);
});

color_dict = {
	"let": "#3a7f3a",
	"fn": "#8145d0",
	"if": "#62a0b8",
	"else": "#62a0b8",
	"void": "#9a94d3",
	"bool": "#9a94d3",
	"int": "#9a94d3",
	"float": "#9a94d3",
	"string": "#9a94d3",
	"and": "#e2954d",
	"or": "#e2954d",
	"xor": "#e2954d",
	"true": "#7ea082",
	"false": "#bc634f"
};

function highlight_kw(_, s1, keyword, s2) {
	return '<span style="color: ' + color_dict[keyword] + '">' + s1 + keyword + s2 + '</span>';
}

function highlight(text) {
  var comment = false;
  var lines = text.split('\n');
  text = '';

  for(var i = 0; i < lines.length; i++) {
    var line = lines[i];

    line = line.replace(/(\s|\b)(let|fn|if|else|and|or|xor|true|false|int|float|string|void|bool)(\s|\b)/g, highlight_kw);

    // Comments are handled separately
    if (!comment)
    {
      var result1 = line.match(/\/\*([\s\S]*?)\*\//ig);

      if(result1 != null)
      {
        for(var r = 0; r < result1.length; r++)
        {
          line = line.replace(result1[r], '<span style="color: #485866">$&</span>');
        }
      }
      else
      {
        var result = line.match(/\/\*([\s\S]*?)[\s\S]*/i);

        if(result != null)
        {
          line = line.replace(result[0], '<span style="color: #485866">$&</span>');

          comment = true;
        }
      }
    }
    else
    {
      var result = line.match(/[\s\S]*\*\/|\*\//);

      if(result != null)
      {
        line = line.replace(result[0], '<span style="color: #485866">$&</span>');

        comment = false;
      }
      else
      {
        line = '<span style="color: #485866">' + line + '</span>';
      }
    }

    text += line;
    if (i != lines.length - 1)
      text += '\n';
  }

  return text;
};
