function SwitchOnOff() {
	var inL = getCssProperty("switcher", "background");
	var outL = getCssProperty("body_d","background");
	var lightOn = "#dddd44";
	var lightOff = "#000";
	//alert(getCssProperty("switcher", "background-color"));
	if(inL == outL) {
		document.getElementById("body_d").style.background=lightOn;
		document.getElementById("switcher").style.background=lightOff;

		//var light = "<style>.light{background-color: #000;}</style>";
	}else {
		document.getElementById("body_d").style.background=lightOn;
		document.getElementById("switcher").style.background=lightOn;
		//var light = "<style>.light{background-color: #dddd44;}</style>";
	}
	//document.getElementById('text').innerHTML = light;
	//showText(msg);
	//return msg;
	//$document.ready("Hello!");
}

function getCssProperty(elmId, property) {
	var elem = document.getElementById(elmId);
	return window.getComputedStyle(elem,null).getPropertyValue(property);
}
// You could now get your value like
//alert(getCssProperty("light", "background"));

//Blur effect
function setFocusQuery() {
	$('#textInsideId').removeClass('blur-text');
}
function removeFocusQuery() {
	$('#textInsideId').addClass('blur-text');
}
