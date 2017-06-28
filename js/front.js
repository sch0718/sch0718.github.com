/**
 * @author 신춘호(sch0718@naver.com)
 * @date 2016. 5. 19.
 * @file front.js
 */

$(document).ready(function() {
	var loginLayer = $("#loginContainer");
	loginLayer.modalLayer();
	var location = document.location.href;
	var functionParamName = "executeFunction";
	if (location.indexOf(functionParamName) > -1) {
		var func = location.substring(location.indexOf(functionParamName) + functionParamName.length + 1);
		eval(func).call();
	}
});

function showLoginModal() {
	$("[data-target='#loginContainer'][data-toggle='modal']").click();
}

function expandAccordion(id) {
	$("#lnb-header-" + id + " > .panel-title > a").attr("aria-expanded", true);
	$("#lnb-body-" + id).addClass("in");
}

function collapseAccordion(id) {
	$("#lnb-header-" + id + " > .panel-title > a").attr("aria-expanded", false);
	$("#lnb-body-" + id).removeClass("in");
}