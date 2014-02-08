$(document).ready(function() {
    $('#switch-change').on('switch-change', function (e, data) {
  		var $element = $(data.el),
      	value = data.value;

  		console.log(e, $element, value);
  		console.log("Hello");
	});

	$("[name='my-checkbox']").bootstrapSwitch();

});