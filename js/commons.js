/**
 * @author 신춘호(sch0718@naver.com)
 * @date 2016. 5. 2.
 * @file commons.js
 */

/**
 * 서버에 설정된 ContextPath 전역변수
 */
var CONTEXT_PATH = "/";
var CURRENT_USER = null;

/**
 * 문자열의 바이트 수를 리턴한다.
 * @returns byte 수
 * @author 신춘호(sch0718@naver.com)
 */
if (!String.prototype.byteLength) {
	String.prototype.byteLength = function() {
		return (function(str, bytes, index, char) {
			for (bytes = index = 0; char = str.charCodeAt(index++); bytes += char >> 11 ? 3 : char >> 7 ? 2 : 1);
			return bytes
		})(this);
	};
}

/**
 * 문자열이 length보다 작은 자리수일 경우 앞에 0을 붙인다. ex) "123".zeroMask(5);
 * @param length 0을 붙일 길이
 * @returns 0을 붙인 문자열
 * @author 신춘호(sch0718@naver.com)
 */
if (!String.prototype.zeroMask) {
	String.prototype.zeroMask = function(length) {
		return (function(str, length) {
			for (; str.length < length; str = "0" + str);
			return str;
		})(this, length);
	};
}

/**
 * <pre>
 * startsWith 함수가 지원되지 않는 경우 상속하여 재구현 검색 할 문자열로 시작되는지 여부를 리턴한다.
 * ex)
 * &quot;abcdefg&quot;.startsWith(&quot;abc&quot;); -&gt; true
 * &quot;abcdefg&quot;.startsWith(&quot;abc&quot;, 3); -&gt; false
 * </pre>
 * 
 * @param searchString 검색 할 문자열
 * @param position (optional) 검색 시작 위치
 * @return 검색 할 문자열로 시작 여부
 * @author 신춘호(sch0718@naver.com)
 */
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}

if (!Date.prototype.format) {
	Date.prototype.format = function(f) {
		if (!this.valueOf())
			return "";
		var weekName = [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ];
		var d = this;
		return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
			switch ($1) {
				case "yyyy":
					return d.getFullYear();
				case "yy":
					return ((d.getFullYear() % 1000) + "").zeroMask(2);
				case "MM":
					return ((d.getMonth() + 1) + "").zeroMask(2);
				case "dd":
					return (d.getDate() + "").zeroMask(2);
				case "E":
					return weekName[d.getDay()];
				case "HH":
					return (d.getHours() + "").zeroMask(2);
				case "hh":
					return (((h = d.getHours() % 12) ? h : 12) + "").zeroMask(2);
				case "mm":
					return (d.getMinutes() + "").zeroMask(2);
				case "ss":
					return (d.getSeconds() + "").zeroMask(2);
				case "a/p":
					return d.getHours() < 12 ? "오전" : "오후";
				default:
					return $1;
			}
		});
	};
}

/**
 * Java의 HashSet 클래스를 일부 구현
 * @author 신춘호(sch0718@naver.com)
 */
var HashSet = function() {
	var values = new Array();

	this.add = add;
	this.clear = clear;
	this.clone = clone;
	this.contains = contains;
	this.isEmpty = isEmpty;
	this.remove = remove;
	this.size = size;
	this.toArray = toArray;
	this.toString = toString;

	/**
	 * 값을 추가한다.
	 * @param value 값
	 * @param 성공여부
	 */
	function add(value) {
		var isSuccess = false;
		try {
			values[values.length] = value;
			isSuccess = true;
		} catch (e) {
			isSuccess = false;
		}
		return isSuccess;
	}

	/**
	 * 세트의 모든 데이터를 삭제한다.
	 */
	function clear() {
		values = new Array();
	}

	/**
	 * 세트를 복제한다.
	 * @return 복제된 세트
	 */
	function clone() {
		var set = new HashSet();
		for (var i = 0; i < values.length; i++) {
			set.add(values[i]);
		}

		return set;
	}

	/**
	 * 지정된 값이 세트에 이미 존재하는지 여부를 리턴한다.
	 * @param value 값
	 * @return 값이 세트에 이미 존재하는지 여부
	 */
	function contains(value) {
		for (var i = 0; i < values.length; i++) {
			if (values[i] == value) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 세트가 비어있는지 여부를 리턴한다.
	 * @return 세트가 비어있는지 여부
	 */
	function isEmpty() {
		return (size() == 0);
	}

	/**
	 * 지정된 값을 세트에서 삭제한다.
	 * @param value 삭제하려는 값
	 */
	function remove(value) {
		var isSuccess = false;
		try {
			var afterValueIndex = false;
			for (var i = 0; i < values.length; i++) {
				if (values[i] == value)
					afterValueIndex = true;
				if (afterValueIndex)
					values[i] = values[i + 1];
			}
			if (afterValueIndex)
				values.length = values.length - 1;
			isSuccess = true;
		} catch (e) {
			isSuccess = false;
		}

		return isSuccess;
	}

	/**
	 * 세트의 크기를 리턴한다.
	 * @return 세트의 크기
	 */
	function size() {
		return values.length;
	}

	/**
	 * 세트를 배열로 변환하여 리턴한다.
	 * @return 배열
	 */
	function toArray() {
		return values;
	}

	/**
	 * 세트의 값들을 구분자(',')로 나열하여 문자열로 리턴한다.
	 * @return 세트 값들의 문자열
	 */
	function toString() {
		var text = "";
		for (var i = 0; i < values.length; i++) {
			text += values[i];
			if (i != values.length - 1)
				text += ", ";
		}
		return text;
	}
};

/**
 * Java의 HashMap 클래스를 일부 구현
 * @author 신춘호(sch0718@naver.com)
 * @dependency HashSet
 */
var HashMap = function() {
	var keySetObj = new HashSet();
	var valueSetObj = new HashSet();

	this.clear = clear;
	this.clone = clone;
	this.containsKey = containsKey;
	this.containsValue = containsValue;
	this.get = get;
	this.isEmpty = isEmpty;
	this.keySet = keySet;
	this.put = put;
	this.putAll = putAll;
	this.remove = remove;
	this.size = size;
	this.values = values;
	this.toString = toString;

	/**
	 * 맵의 모든 데이터를 삭제한다.
	 */
	function clear() {
		keySetObj.clear();
		valueSetObj.clear();
	}

	/**
	 * 맵을 복제한다.
	 * @return 복제된 맵
	 */
	function clone() {
		var map = new HashMap();
		var keyArray = keySetObj.toArray();
		var valueArray = valueSetObj.toArray();
		for (var i = 0; i < size(); i++) {
			map.put(keyArray[i], valueArray[i]);
		}
		return map;
	}

	/**
	 * 지정된 키가 맵에 이미 존재하는지 여부를 리턴한다.
	 * @param key 키
	 * @return 키가 맵에 이미 존재하는지 여부
	 */
	function containsKey(key) {
		return keySetObj.contains(key);
	}

	/**
	 * 지정된 값이 맵에 이미 존재하는지 여부를 리턴한다.
	 * @param value 값
	 * @return 값이 맵에 이미 존재하는지 여부
	 */
	function containsValue(value) {
		return valueSetObj.contains(value);
	}

	/**
	 * 지정된 키의 값을 리턴한다. 키로 매핑된 값이 없으면 null을 리턴한다.
	 * @param key 키
	 * @return 지정된 키로 매핑된 값
	 */
	function get(key) {
		if (containsKey(key)) {
			var keyArray = keySetObj.toArray();
			var valueArray = valueSetObj.toArray();
			for (var i = 0; i < size(); i++) {
				if (keyArray[i] == key) {
					return valueArray[i];
				}
			}
		}
		return null;
	}

	/**
	 * 맵이 비어있는지 여부를 리턴한다.
	 * @return 맵이 비어있는지 여부
	 */
	function isEmpty() {
		return (size() == 0);
	}

	/**
	 * 맵의 키 세트를 리턴한다.
	 * @return 키 세트
	 */
	function keySet() {
		return keySetObj;
	}

	/**
	 * 지정된 키로 값을 매핑한다. 이미 키가 존재할 경우 해당 키의 값을 수정한다.
	 * @param key 키
	 * @param value 값
	 * @return 지정된 값
	 */
	function put(key, value) {
		if (containsKey(key)) {
			var keyArray = keySetObj.toArray();
			var valueArray = valueSetObj.toArray();
			for (var i = 0; i < size(); i++) {
				if (keyArray[i] == key) {
					valueArray[i] = value;
					break;
				}
			}
		} else {
			keySetObj.add(key);
			valueSetObj.add(value);
		}
		return value;
	}

	/**
	 * 해당 맵의 키와 값을 모두 매핑한다.
	 * @param map 키와 값을 넣을 HashMap 객체
	 */
	function putAll(map) {
		var keyArray = map.keySet().toArray();
		var valueArray = map.values().toArray();
		for (var i = 0; i < map.size(); i++) {
			put(keyArray[i], valueArray[i]);
		}
	}

	/**
	 * 지정된 키의 데이터를 삭제한다.
	 * @param key 키
	 * @return 제거된 키의 값(지정된 키가 없었을 경우 null)
	 */
	function remove(key) {
		if (containsKey(key)) {
			valueSetObj.remove(get(key));
			return keySetObj.remove(key);
		}
		return null;
	}

	/**
	 * 맵의 크기를 리턴한다.
	 * @return 맵의 크기
	 */
	function size() {
		return keySetObj.size();
	}

	/**
	 * 맵의 값 세트를 리턴한다.
	 * @return 값 세트
	 */
	function values() {
		return valueSetObj;
	}

	/**
	 * 맵의 키와 값들을 구분자(',')로 나열하여 문자열로 리턴한다.
	 * @return 세트 값들의 문자열
	 */
	function toString() {
		var text = "";
		var keyArray = keySetObj.toArray();
		var valueArray = valueSetObj.toArray();
		for (var i = 0; i < size(); i++) {
			text += keyArray[i] + "=" + valueArray[i];
			if (i != size() - 1)
				text += ", ";
		}
		return text;
	}
};

/**
 * Pagination 기능 구현
 * @author 신춘호(sch0718@naver.com)
 * @dependency jQuery, jQuery-cookie
 */
var Pagination = {
	formId: "searchForm",
	pageParamName: "page",
	sizeParamName: "size",
	cookieName: "Pageable.size",
	getForm: function() {
		var me = this;
		return $("#" + me.formId);
	},
	goPage: function(pageNum) {
		try {
			var me = this;
			var form = me.getForm();
			$("[name='" + me.pageParamName + "']", form).val(pageNum);
			form.submit();
		} catch (e) {
			log.debug(e);
		}
	},
	changeSize: function(pageSize) {
		var me = this;
		var form = me.getForm();
		$("[name='" + me.pageParamName + "']", form).val(0);
		$("[name='" + me.sizeParamName + "']", form).val(pageSize);
		me.setCookie();
		form.submit();
	},
	setCookie: function() {
		var me = this;
		var form = me.getForm();
		$.cookie(me.cookieName, $("[name='" + me.sizeParamName + "']", form).val(), {
			expires: 30,
			path: "/"
		});
	}
};

/**
 * Waiting Back Drop
 * @author 신춘호(sch0718@naver.com)
 * @dependency jQuery
 */
var Waiting = {
	defaults: {
		iconClass: "fa-fw",
		sizeClass: "fa-5x",
		isInit: false
	},
	create: function() {
		var me = this;
		if (me.defaults.isInit)
			return;

		var html = "<div id=\"waiting-body\" class=\"modal-backdrop fade in wait\">";
		html += "<div class=\"outer\">";
		html += "<div class=\"inner\">";
		html += "<span class=\"fa fa-spinner fa-spin " + me.defaults.iconClass + " " + me.defaults.sizeClass + "\"></span>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		$(html).appendTo(document.body);
		me.hide();
		me.defaults.isInit = true;
		return me;
	},
	show: function(second) {
		var me = this;
		if (!me.defaults.isInit)
			me.create();

		$("#waiting-body").show();
		return me;
	},
	hide: function() {
		var me = this;
		if (!me.defaults.isInit)
			return;

		$("#waiting-body").hide();
	}
};

/**
 * Ajax Wrapper
 * @author 신춘호(sch0718@naver.com)
 * @dependency jQuery
 */
var Ajax = {
	defaults: {
		url: null,
		type: "GET",
		data: null,
		traditional: true,
		success: function(data, textStatus, jqXHR) {},
		error: function(jqXHR, textStatus, errorThrown) {
			log.error(jqXHR.responseJSON.message);
		},
		beforeSend: function(jqXHR, settings) {}
	},
	ajax: function(options) {
		var me = this;
		if (typeof (options) == "string")
			options = JSON.parse(options);
		options = $.extend(true, {}, me.defaults, options);
		$.ajax(options);
	}
};

/**
 * jQuery Plugins
 */
jQuery.fn.extend({
	/**
	 * Designed Checkbox jQuery Plugin
	 * 
	 * <pre>
	 * ex)
	 * &lt;input type=&quot;checkbox&quot; name=&quot;check1&quot; value=&quot;1&quot; class=&quot;checkbox&quot; /&gt;
	 * $(&quot;input:checkbox.checkbox&quot;).checkbox();
	 * </pre>
	 * 
	 * @param options json type string or json object
	 * @author 신춘호(sch0718@naver.com)
	 * @dependency jQuery, bootstrap, font-awesome
	 */
	checkbox: function(command, options) {
		if (![ "update", "enable", "disable" ].includes(command) && isNull(options)) {
			options = command;
			command = "create";
		}
		var defaults = {
			button: {
				icon: "fa fa-check"
			}
		};
		if ("create" == command) {
			return this.each(function(index, element) {
				var me = $(this);

				if (me.data("init") == "true")
					return true;
				if (typeof (options) == "string")
					options = JSON.parse(options);
				options = $.extend(true, {}, defaults, options);

				generateComponent(me, options);
			});
		} else if ("update" == command) {
			return this.each(function(index, element) {
				var me = $(this);

				if (typeof (options) == "string")
					options = JSON.parse(options);
				options = $.extend(true, {}, defaults, options);

				renderComponent(me, options);
			});
		} else if ("disable" == command) {
			return this.each(function(index, element) {
				var me = $(this);

				me.parent().addClass("disabled");
			});
		} else if ("enable" == command) {
			return this.each(function(index, element) {
				var me = $(this);

				me.parent().removeClass("disabled");
			});
		}

		function generateComponent(element, options) {
			element.attr("autocomplete", "off");
			element.data("init", "true");
			var parent = element.parent();
			parent.attr("data-toggle", "buttons");
			element.wrap("<label class=\"btn btn-default checkbox fa-stack\"></label>");
			var label = element.parent();
			if (typeof (options.button.icon) == "object") {
				$.each(options.button.icon, function(index, value) {
					label.append("<span class=\"" + value + " fa-stack-" + (index + 1) + "x\" />");
				});
			} else {
				label.append("<span class=\"" + options.button.icon + " fa-stack-1x\" />");
			}
			
			renderComponent(element, options);
			
			element.bind("change", function(event) {
				if (element.prop("readonly") || element.prop("disabled")) return;
				
				renderComponent($(this), options);
				if ($(this).prop("checked")) {
					$(this).trigger("checkbox.checked");
				} else {
					$(this).trigger("checkbox.released");
				}
			});
		}
		
		function renderComponent(element, options) {
			var label = element.parent();
			label.toggleClass("active", element.prop("checked"));
			$(".fa-stack-1x", label).toggleClass(options.button.icon, element.prop("checked"));
			
			if (element.prop("readonly") || element.prop("disabled")) {
				element.parent().addClass("disabled");
			}
		}
	},
	/**
	 * jQuery Plugin bootstrap modal to easy create DOM
	 * 
	 * <pre>
	 * ex)
	 * 	$(&quot;#revisionModal&quot;).modalLayer({
	 * 		type: &quot;iframe&quot;
	 * 	});
	 * 	$(&quot;[data-target='#revisionModal'][data-toggle='modal']&quot;).bind(&quot;click&quot;, function(event) {
	 * 		event.preventDefault();
	 * 		var me = $(this);
	 * 		var target = $(me.data(&quot;target&quot;));
	 * 		var src = me.data(&quot;src&quot;);
	 * 		var title = me.data(&quot;title&quot;);
	 * 		$(&quot;.modal-title&quot;, target).text(title);
	 * 		$(&quot;iframe&quot;, target).prop(&quot;src&quot;, src);
	 * 	});
	 * 
	 * 	$(&quot;#sqlModal&quot;).modalLayer();
	 * 	$(&quot;[data-target='#sqlModal'][data-toggle='modal']&quot;).bind(&quot;click&quot;, function(event) {
	 * 		event.preventDefault();
	 * 		var me = $(this);
	 * 		var target = $(me.data(&quot;target&quot;));
	 * 		var href = me.attr(&quot;href&quot;);
	 * 		$(&quot;.modal-content&quot;, target).load(href);
	 * 	});
	 * 
	 * 	&lt;button class=&quot;btn btn-danger btn-sm&quot; data-toggle=&quot;modal&quot; data-target=&quot;#revisionModal&quot; data-src=&quot;revision&quot; data-tooltip=&quot;tooltip&quot; data-placement=&quot;top&quot; title=&quot;Revision&quot; data-title=&quot;UV(Unique Visitor)&quot;&gt;
	 * 		&lt;span class=&quot;glyphicon glyphicon-list-alt&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
	 * 	&lt;/button&gt;
	 * 	&lt;a href=&quot;sql?sqlId=UV&quot; class=&quot;btn btn-danger btn-sm&quot; data-toggle=&quot;modal&quot; data-target=&quot;#sqlModal&quot; data-tooltip=&quot;tooltip&quot; data-placement=&quot;top&quot; title=&quot;sql&quot; data-sqlId=&quot;UV&quot;&gt;
	 * 		&lt;span class=&quot;glyphicon glyphicon-list-alt&quot; aria-hidden=&quot;true&quot;&gt;&lt;/span&gt;
	 * 	&lt;/a&gt;
	 * </pre>
	 * 
	 * @param options json type string or json object
	 * @author 신춘호(sch0718@naver.com)
	 * @dependency jQuery, bootstrap
	 */
	modalLayer: function(command, options) {
		if (![ "destroy", "show", "hide" ].includes(command) && isNull(options)) {
			options = command;
			command = "create";
		}
		var defaults = {
			type: "normal",
			animate: true,
			size: "lg",
			tabIndex: -1,
			title: null,
			href: null,
			buttons: null,
			callback: null
		};
		if ("create" == command) {
			return this.each(function(index, element) {
				var me = $(element);

				if (typeof (options) == "string")
					options = JSON.parse(options);
				options = $.extend(true, {}, defaults, options);

				generateModal(me, options);
				eventBinding(me, options);
			});
		} else if ("show" == command) {
			return this.each(function(index, element) {
				var me = $(element);
				me.modal("show");
			});
		} else if ("hide" == command) {
			return this.each(function(index, element) {
				var me = $(element);
				me.modal("hide");
			});
		}

		function generateModal(target, options) {
			target.addClass("modal" + (options.animate ? " fade" : ""));
			target.attr("tabindex", options.tabIndex);
			target.attr("role", "dialog");
			target.attr("aria-labelledby", target.prop("id") + "-modalLabel");

			var html = "<div class=\"modal-dialog modal-" + options.size + "\" role=\"document\">";
			html += "<div class=\"modal-content\">";
			if ("iframe" == options.type) {
				html += "<div class=\"modal-header\">";
				html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">";
				html += "<span aria-hidden=\"true\">&times;</span>";
				html += "</button>";
				html += "<h4 class=\"modal-title\" id=\"" + target.prop("id") + "-modalLabel\">" + (!isNull(options.title) ? options.title : "") + "</h4>";
				html += "</div>";
				html += "<div class=\"modal-body\">";
				html += "<div class=\"embed-responsive embed-responsive-16by9\">";
				html += "<iframe name=\"modal-frame\" class=\"embed-responsive-item\"></iframe>";
				html += "</div>";
				html += "</div>";
				html += "<div class=\"modal-footer\">";
				html += "<div class=\"btn-group pull-right\" role=\"group\">";
				if (!isNull(options.buttons)) {
					if (typeof (options.buttons) == "array") {
						for ( var i in options.buttons) {
							var btn = options.buttons[i];
							html += "<button type=\"button\" id=\"modal-btn-" + i + "\" class=\"modal-button " + getStringDefault(btn.class) + "\">";
							if (!isNull(btn.icon)) {
								html += "<span class=\"" + btn.icon + "\"></span> ";
							}
							html += getStringDefault(btn.text);
							html += "</button>";
						}
					} else {
						var btn = options.buttons;
						html += "<button type=\"button\" id=\"modal-btn-0\" class=\"modal-button " + getStringDefault(btn.class) + "\">";
						if (!isNull(btn.icon)) {
							html += "<span class=\"" + btn.icon + "\"></span> ";
						}
						html += getStringDefault(btn.text);
						html += "</button>";
					}
				}
				html += "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">";
				html += "<span class=\"fa fa-times\"></span> 닫기";
				html += "</button>";
				html += "</div>";
				html += "</div>";
			} else {
				html += target.html();
			}
			html += "</div>";
			html += "</div>";
			target.empty();
			target.append(html);
		}

		function eventBinding(target, options) {
			target.bind("show.bs.modal", function(event) {
				if ((options.type == "normal" && !isNull(options.href)) || options.type == "iframe") {
					Waiting.show($(".modal-content", $(this)));
				}
			});

			target.bind("shown.bs.modal", function(event) {
				if (options.type == "normal" && !isNull(options.href)) {
					$(".modal-content", $(this)).empty();
					$(".modal-content", $(this)).load(options.href);
				} else if (options.type == "iframe") {
					var iframe = $("iframe", target);
					iframe.prop("src", options.href);
					if (!isNull(options.buttons)) {
						var buttonElements = getButtons($(this));
						buttonElements.unbind("click");
						if (typeof (options.buttons) == "array") {
							for ( var i in options.buttons) {
								var btn = options.buttons[i];
								if (!isNull(btn.callback) && typeof (btn.callback) == "function") {
									buttonElements.get(i).bind("click", btn.callback);
								}
							}
						} else {
							var btn = options.buttons;
							if (!isNull(btn.callback) && typeof (btn.callback) == "function") {
								buttonElements.bind("click", btn.callback);
							}
						}
					}
				}
				if (!isNull(options.callback) && typeof (options.callback) == "function") {
					options.callback($(this));
				}
				Waiting.hide($(".modal-content", $(this)));
			});
		}

		function getButtons(target) {
			return $(".modal-button", target);
		}
	},
	/**
	 * Form Objects serialize to Json
	 * 
	 * <pre>
	 * ex)
	 * &lt;form id=&quot;form&quot;&gt;
	 * 		&lt;input type=&quot;text&quot; name=&quot;text1&quot; value=&quot;value1&quot; /&gt;
	 * 		&lt;input type=&quot;text&quot; name=&quot;text2&quot; value=&quot;value2&quot; /&gt;
	 * &lt;/form&gt;
	 * 
	 * var json = $(&quot;#form&quot;).serializeJson();
	 * json =&gt; { text1: &quot;value1&quot;, text2: &quot;value2&quot; }
	 * </pre>
	 */
	serializeJson: function() {
		var arrayData = this.serializeArray();
		var objectData = {};

		$.each(arrayData, function() {
			var value;

			if (this.value != null) {
				value = this.value;
			} else {
				value = "";
			}

			if (objectData[this.name] != null) {
				if (!objectData[this.name].push) {
					objectData[this.name] = [ objectData[this.name] ];
				}

				objectData[this.name].push(value);
			} else {
				objectData[this.name] = value;
			}
		});

		return objectData;
	},
	/**
	 * Designed Tree Component jQuery Plugin
	 * @author 신춘호(sch0718@naver.com)
	 * @dependency jQuery, bootstrap, font-awesome
	 */
	tree: function(command, options) {
		if (![ "destroy", "getSelectedNode" ].includes(command) && (options == null || options == undefined)) {
			options = command;
			command = "create";
		}
		if ("create" == command) {
			return this.each(function(index, element) {
				var me = $(this);
				var defaults = {
					data: null,
					icon: {
						open: "fa fa-minus-square-o fa-fw",
						close: "fa fa-plus-square-o fa-fw",
						none: "fa fa-square-o fa-fw",
						node: null
					},
					mode: "click",
					showHiddenNode: false,
					nodeOpen: null,
					callback: null
				};
				if (typeof (options) == "string")
					options = JSON.parse(options);
				defaults = $.extend(true, {}, defaults, options);
				generateTree(me, defaults);
			});
		} else if ("destroy" == command) {
			return this.each(function(index, element) {
				var me = $(this);
				me.removeClass("tree");
				me.removeData("tree-defaults");
				me.empty();
			});
		} else if ("reload" == command) {
			return this.each(function(index, element) {
				var me = $(this);
				var defaults = getDefaults(me);
				if (typeof (options) == "string")
					options = JSON.parse(options);
				defaults = $.extend(true, {}, defaults, options);
				defaults.data = options.data;
				generateTree(me, defaults);
			});
		} else if ("getSelectedNode" == command) {
			var result = [];
			this.each(function(index, element) {
				var me = $(this);
				var selectedNode = me.find("a.node.on");
				if (selectedNode.length > 0) {
					var node = selectedNode.data("node");
					result.push(JSON.parse(decodeURI(node)));
				}
			});
			return result;
		} else if ("select" == command) {
			var nodeId = null;
			if (typeof (options) == "string")
				nodeId = options;
			else
				return null;

			this.each(function(index, element) {
				var me = $(this);
				var nodeObj = getNodeObj(nodeId, me);
				nodeObj.parents("li").each(function(i, e) {
					var nodeId = $(this).prop("id");
					nodeId = nodeId.replace("node-", "");
					expand(nodeId, me);
				});

				$("a.node", me).removeClass("on");
				nodeObj.children("a.node").addClass("on");
			});
		} else if ("addNode" == command) {
			this.each(function(index, element) {
				var defaults = JSON.parse(decodeURI($(element).data("tree-defaults")));
				var target = getNodeObj(options.targetId, $(element));
				var html = "";
				if (!target.data("has-child")) {
					target.data("has-child", true);
					target = $("<ul></ul>").appendTo(target);
				} else {
					target = $("ul", target);
				}
				target.append(generateNode(options.data, defaults));
				if (!isNull(options.data.nodeOpen) && typeof (options.data.nodeOpen) == "function") {
					$("#node-" + options.data.id + " > a.icon", target).bind(defaults.mode, function(event) {
						var nodeObj = $(this).parent();
						var node = JSON.parse(decodeURI($("a.node", nodeObj).data("node")));
						if (nodeObj.hasClass("node-close")) {
							expand(node.id, $(element));
						} else {
							collapse(node.id, $(element));
						}
						if (isNull(options.data.nodeOpen) && typeof (options.data.nodeOpen) == "function") {
							options.data.nodeOpen(node);
						}
					});
				}
				if (!isNull(options.data.callback) && typeof (options.data.callback) == "function") {
					$("#node-" + options.data.id + " > a.node", target).bind("click", function(event) {
						$("a.node", element).removeClass("on");
						$(this).addClass("on");
						options.data.callback(options.data);
					});
				}
			});
		} else if ("removeNode" == command) {
			this.each(function(index, element) {
				var nodeId = null;
				if (typeof (options) == "string")
					nodeId = options;
				else
					return null;

				var defaults = JSON.parse(decodeURI($(element).data("tree-defaults")));
				var target = getNodeObj(nodeId, $(element));
				$("#node-" + nodeId, target).remove();
			});
		} else if ("getNodeObj" == command) {
			var nodeId = null;
			if (typeof (options) == "string")
				nodeId = options;
			else
				return false;

			var result = [];
			this.each(function(index, element) {
				result.push(getNodeObj(nodeId, $(this)));
			});
			return result;
		} else if ("getNode" == command) {
			var nodeId = null;
			if (typeof (options) == "string")
				nodeId = options;
			else
				return null;

			var result = [];
			this.each(function(index, element) {
				var nodeData = getNodeObj(nodeId, $(this)).children("a.node").data("node");
				result.push(JSON.parse(decodeURI(nodeData)));
			});
			return result;
		} else if ("getParentNodeObj" == command) {
			var nodeId = null;
			if (typeof (options) == "string")
				nodeId = options;
			else
				return false;

			var result = [];
			this.each(function(index, element) {
				result.push(getParentNodeObj(nodeId, $(this)));
			});
			return result;
		} else if ("getParentNode" == command) {
			var nodeId = null;
			if (typeof (options) == "string")
				nodeId = options;
			else
				return false;

			var result = [];
			this.each(function(index, element) {
				var nodeData = getParentNodeObj(nodeId, $(this)).children("a.node").data("node");
				result.push(JSON.parse(decodeURI(nodeData)));
			});
			return result;
		} else if ("expand" == command) {
			var nodeId = null;
			if (typeof (options) == "string")
				nodeId = options;
			else
				return false;

			this.each(function(index, element) {
				expand(nodeId, $(this));
			});
		} else if ("collapse" == command) {
			var nodeId = null;
			if (typeof (options) == "string")
				nodeId = options;
			else
				return false;

			this.each(function(index, element) {
				collapse(nodeId, $(this));
			});
		}

		function generateTree(treeElement, defaults) {
			treeElement.addClass("tree");
			treeElement.data("tree-defaults", encodeURI(JSON.stringify(defaults)));

			var html = "<ul>";
			if (defaults.data == null || defaults.data == undefined)
				return false;
			if (Array.isArray(defaults.data)) {
				for (var i = 0; i < defaults.data.length; i++) {
					html += generateNode(defaults.data[i], defaults);
				}
			} else {
				html += generateNode(defaults.data, defaults);
			}
			html += "</ul>"
			treeElement.html(html);

			treeBindEvent(treeElement, defaults);
		}

		function treeBindEvent(treeElement, defaults) {
			$("a.icon", treeElement).bind(defaults.mode, function(event) {
				var nodeObj = $(this).parent();
				var node = JSON.parse(decodeURI($("a.node", nodeObj).data("node")));
				if (nodeObj.hasClass("node-close")) {
					if (node.leaf == "false")
						expand(node.id, treeElement);
				} else {
					collapse(node.id, treeElement);
				}
				if (isNull(defaults.nodeOpen) && typeof (defaults.nodeOpen) == "function") {
					defaults.nodeOpen(node);
				}
			});

			$("a.node", treeElement).bind("click", function(event) {
				$("a.node", treeElement).removeClass("on");
				$(this).addClass("on");
				if (!isNull(defaults.callback) && typeof (defaults.callback) == "function") {
					var node = JSON.parse(decodeURI($(this).data("node")));
					defaults.callback(node);
				}
			});
		}

		function generateNode(node, defaults) {
			var html = "";
			if (defaults.showHiddenNode || node.visible == "true") {
				var icon = $.extend(true, {}, defaults.icon, node.icon);
				html += "<li id=\"node-" + node.id + "\" class=\"node-close\" data-has-child=\"" + (!(node.children == null || node.children == undefined || node.children.length == 0)) + "\">";
				html += "<a href=\"javascript: void(0);\" class=\"icon\">";
				html += "<span class=\"" + (node.leaf == "true" ? icon.none : icon.close) + "\" aria-hidden=\"true\"></span>";
				html += "</a>";
				html += "<a href=\"javascript: void(0);\" class=\"node " + (node.enable == "true" ? "enable" : "disable") + "\" title=\"" + node.comment + "\" data-node=\"" + encodeURI(JSON.stringify(node)) + "\">";
				if (!isNull(icon.node)) {
					html += "<span class=\"" + icon.node + "\" aria-hidden=\"true\"></span> ";
				}
				html += node.text;
				html += "</a>";
				if (node.leaf == "false" && !isNull(node.children)) {
					html += "<ul>";
					for (var i = 0; i < node.children.length; i++) {
						html += generateNode(node.children[i], defaults);
					}
					html += "</ul>";
				}
				html += "</li>";
			}
			return html;
		}

		function getNodeObj(nodeId, treeElement) {
			return $("#node-" + nodeId, treeElement);
		}

		function getParentNodeObj(nodeId, treeElement) {
			return $("#node-" + nodeId, treeElement).parent().parent();
		}

		function getDefaults(treeElement) {
			return JSON.parse(decodeURI(treeElement.data("tree-defaults")));
		}

		function expand(nodeId, treeElement) {
			var defaults = getDefaults(treeElement);
			var nodeObj = getNodeObj(nodeId, treeElement);
			// if (!nodeObj.data("has-child")) return false;

			var node = JSON.parse(decodeURI($("a.node", nodeObj).data("node")));
			var iconObj = nodeObj.children("a.icon").children("span");
			var icon = $.extend(true, {}, defaults.icon, node.icon);
			if (nodeObj.hasClass("node-close")) {
				iconObj.removeClass(icon.close);
				iconObj.addClass(icon.open);
				nodeObj.removeClass("node-close");
				nodeObj.children("ul").slideDown(function() {
					$(this).show();
				});
				treeElement.trigger("tree.node.open", node);
			}
		}

		function collapse(nodeId, treeElement) {
			var defaults = getDefaults(treeElement);
			var nodeObj = getNodeObj(nodeId, treeElement);
			// if (!nodeObj.data("has-child")) return false;

			var node = JSON.parse(decodeURI($("a.node", nodeObj).data("node")));
			var iconObj = nodeObj.children("a.icon").children("span");
			var icon = $.extend(true, {}, defaults.icon, node.icon);
			iconObj.removeClass(icon.open);
			iconObj.addClass(icon.close);
			nodeObj.addClass("node-close");
			nodeObj.children("ul").slideUp(function() {
				$(this).hide();
			});
			treeElement.trigger("tree.node.close", node);
		}
	},
	limitedTextarea: function(command, options) {
		if ("update" != command && (options == null || options == undefined)) {
			options = command;
			command = "create";
		}
		if ("create" == command) {
			return this.each(function(index, element) {
				var me = $(element);
				var defaults = {
					unit: "bytes",
					limit: 2000
				};
				if (typeof (options) == "string")
					options = JSON.parse(options);
				defaults = $.extend(true, defaults, options);

				if (!me.hasClass("limited-textarea")) {
					me.addClass("limited-textarea");
					me.data("unit", defaults.unit);
					me.data("limit", defaults.limit);
					me.bind("keyup", function(event) {
						limitedTextareaUpdateTrigger(me, defaults);
					});
					me.bind("change", function(event) {
						limitedTextareaUpdateTrigger(me, defaults);
					});
					var html = "<label class=\"limited-textarea-label\"><span>0</span> / " + defaults.limit + " " + defaults.unit + "</label>";
					me.after(html);

					limitedTextareaUpdateTrigger(me, defaults);
				}
			});
		} else if ("update" == command) {
			return this.each(function(index, element) {
				var me = $(element);
				limitedTextareaUpdateTrigger(me);
			});
		}

		function limitedTextareaUpdateTrigger(obj, options) {
			var me = obj;
			var text = me.val();
			var unit = options != null && options != undefined ? options.unit : me.data("unit");
			var limit = options != null && options != undefined ? options.limit : me.data("limit");
			var length = -1;
			if ("bytes" == unit) {
				length = text.byteLength();
				while (limit < text.byteLength()) {
					length--;
					text = text.substring(0, length);
				}
				length = text.byteLength();
			} else {
				length = text.length;
				while (limit < text.length) {
					length--;
					text = text.substring(0, length);
				}
				length = text.length;
			}
			me.val(text);
			var target = $("span", me.next());
			target.text(length);
		}
	},
	tabPanel: function(command, options) {
		var defaults = {
			icon: null,
			closable: false
		};

		if ("destroy" == command) {
			return this.each(function(index, element) {
				destroy($(this));
			});
		} else if ("getTab" == command) {
			var tabId = null;
			if (typeof (options) == "string")
				tabId = options;
			else
				return false;

			var tabList = $("ul.nav.nav-tabs", this).first();
			return $("#tab-" + tabId);
		} else if ("selectTab" == command) {
			var tabId = null;
			if (typeof (options) == "string")
				tabId = options;
			else
				return false;

			var tabList = $("ul.nav.nav-tabs", this).first();
			return $("a[href='#tab-" + tabId + "']", tabList).tab("show");
		} else if ("addTab" == command) {
			if (typeof (options) == "string")
				options = JSON.parse(options);

			// var options = $.extend(true, {}, defaults, options);
			return addTab(this, defaults, options);
		} else if ("removeTab" == command) {
			var tabId = null;
			if (typeof (options) == "string")
				tabId = options;
			else
				return false;

			removeTab(this, tabId);
		} else {
			return this.each(function(index, element) {
				options = command;
				create($(this), options);
			});
		}

		function create(me, options) {
			var tabList = me.append("<ul class=\"nav nav-tabs\" role=\"tablist\"></ul>");
			var tabPanel = me.append("<div class=\"tab-content\"></div>");

			if (typeof (options) == "string")
				options = JSON.parse(options);

			var options = $.extend(true, {}, defaults, options);
			$.each(options.data, function(index, value) {
				addTab(me, options, value);
			});
		}

		function destroy(me) {
			me.empty();
		}

		function addTab(me, options, data) {
			var tabList = $("ul.nav.nav-tabs", me).first();
			var tabPanel = $("div.tab-content", me).first();

			var closable = isNull(data.closable) ? options.closable : data.closable;
			var icon = isNull(data.icon) ? options.icon : data.icon;

			var tabElement = $("#tab-" + data.id, tabPanel);
			if (tabElement.length == 0) {
				var html = "";
				html += "<li role=\"presentation\" class=\"" + (closable ? "closable" : "") + "\">";
				html += "<a href=\"#tab-" + data.id + "\" aria-controls=\"" + data.text + "\" role=\"tab\" data-toggle=\"tab\" title=\"" + data.comment + "\">";
				if (!isNull(icon)) {
					html += "<span class=\"" + icon + "\" aria-hidden=\"true\"></span> ";
				}
				html += data.text;
				html += "</a>";
				if (closable) {
					html += "<button type=\"button\" class=\"times\" aria-label=\"Close\"><span class=\"fa fa-times-circle\" aria-hidden=\"true\"></span></button>";
				}
				html += "</li>";
				tabList.append(html);
				tabPanel.append("<div role=\"tabpanel\" class=\"tab-pane fade\" id=\"tab-" + data.id + "\"></div>");
			}
			var selectedTab = me.tabPanel("selectTab", data.id);
			if (closable) {
				$("button.times", selectedTab.parent()).bind("click", function(event) {
					me.tabPanel("removeTab", data.id);
				});
			}
			return selectedTab;
		}

		function removeTab(me, tabId) {
			var tabList = $("ul.nav.nav-tabs", me).first();
			var tabPanel = $("div.tab-content", me).first();

			$("li > a[href='#tab-" + tabId + "']", tabList).parent().remove();
			$("#tab-" + tabId, tabPanel).remove();
		}
	},
	tick: function(options) {
		return this.each(function(index, element) {
			element = $(element);
			
			var defaults = {
				rotateText: null,
				period: 2000,
				loopNum: 0,
				text: "",
				isDeleting: false
			};

			if (typeof (options) == "string")
				options = JSON.parse(options);

			var options = $.extend(true, {}, defaults, options);

			if (!isNull(element.data("period"))) {
				options.period = element.data("period");
			}
			if (!isNull(element.data("rotate-text"))) {
				options.rotateText = element.data("rotate-text");
			}
			if (element.text() != "") {
				options.rotateText = element.text();
			}
			
			tick();
			
			function tick() {
				var fullText = options.rotateText;
	
				if (options.isDeleting) {
					options.text = fullText.substring(0, options.text.length - 1);
				} else {
					options.text = fullText.substring(0, options.text.length + 1);
				}
	
				element.text(options.text);
			
				var delta = 200 - Math.random() * 100;

				if (options.isDeleting) {
					delta /= 2;
				}

				if (!options.isDeleting && options.text === fullText) {
					delta = options.period;
					options.isDeleting = true;
				} else if (options.isDeleting && options.text === "") {
					options.isDeleting = false;
					options.loopNum += 1;
					delta = 500;
				}

				setTimeout(function() {
					tick();
				}, delta);
			}
		});
	},
	dependency: function() {
		var defaults = {
			radio: {
				prop: "value",
				triggerAction: function(trigger, value) {
					trigger.prop("disabled", !value);
				}
			},
			checkbox: {
				prop: "checked",
				triggerAction: function(trigger, value) {
					trigger.prop("disabled", !value);
				}
			},
			select: {
				prop: "value",
				triggerAction: function(trigger, value) {
					trigger.prop("disabled", !value);
				}
			}
		};
		
		return this.each(function(index, element) {
			var me = $(this);

			generate(me);
		});
		
		function generate(element) {
			if (element.is(":input")) {
				var trigger = $(element.data("dependency-trigger"));
				var target = $(element.data("dependency-target"));
				
				if (!isNull(trigger)) {
					if (element.is(":radio")) {
						element.bind("change", function(event) {
							var action = {
								triggerAction: $(this).data("dependency-trigger-action")
							};
							action = $.extend(true, {}, defaults.radio, action);
							if (typeof action.triggerAction == "function") {
								action.triggerAction(trigger, $(this).prop(action.prop) == "true" ? true : false);
							} else if (typeof action.triggerAction == "string") {
								eval(action.triggerAction)($(this), trigger);
							}
						});
					} else if (element.is(":checkbox")) {
						element.bind("change", function(event) {
							var action = {
								triggerAction: $(this).data("dependency-trigger-action")
							};
							action = $.extend(true, {}, defaults.checkbox, action);
							if (typeof action.triggerAction == "function") {
								action.triggerAction(trigger, $(this).prop(action.prop));
							} else if (typeof action.triggerAction == "string") {
								eval(action.triggerAction)($(this), trigger);
							}
						});
					} else if (element.is("select")) {
						element.bind("change", function(event) {
							var action = {
								triggerAction: $(this).data("dependency-trigger-action")
							};
							action = $.extend(true, {}, defaults.select, action);
							if (typeof action.triggerAction == "function") {
								action.triggerAction(trigger, $(this).prop(action.prop) == "true" ? true : false);
							} else if (typeof action.triggerAction == "string") {
								eval(action.triggerAction)($(this), trigger);
							}
						});
					} else if (element.is(":text") || element.is("textarea")) {
						element.bind("keyup", function(event) {
							var action = {
								triggerAction: $(this).data("dependency-trigger-action")
							};
							if (typeof action.triggerAction == "string") {
								eval(action.triggerAction)($(this), trigger);
							}
						});
					}
				}
				
				if (!isNull(target)) {
					if (target.is(":radio")) {
						target.bind("change", function(event) {
							var action = {
								targetAction: element.data("dependency-target-action")
							};
							if (typeof action.targetAction == "function") {
								action.targetAction(element, $(this).prop(action.prop) == "true" ? true : false);
							} else if (typeof action.targetAction == "string") {
								eval(action.targetAction)(element, $(this));
							}
						});
					} else if (target.is(":checkbox")) {
						log.debug("checkbox");
						target.bind("change", function(event) {
							var action = {
								targetAction: element.data("dependency-target-action")
							};
							action = $.extend(true, {}, defaults.checkbox, action);
							log.debug(action.targetAction);
							if (typeof action.action == "function") {
								action.targetAction(element, $(this).prop(action.prop));
							} else if (typeof action.action == "string") {
								eval(action.targetAction)(element, $(this));
							}
						});
					} else if (target.is("select")) {
						log.debug("select");
						action = $.extend(true, {}, defaults.select, action);
						target.bind("change", function(event) {
							if (typeof action.action == "function") {
								action.action(element, $(this).prop(action.prop) == "true" ? true : false);
							} else if (typeof action.action == "string") {
								eval(action.action)(element, $(this));
							}
						});
					} else {
						// TODO trigger와 action을 필수로 지정하도록 하고 그에 따른 실행이 가능하도록 한다.
					}
				}
			} else {
				$("[data-dependency-trigger]:input, [data-dependency-target]:input", element).each(function(index, element) {
					generate($(this));
				});
			}
		}
	},
	rating: function(command, options) {
		var defaults = {
			name: "rating",
			icon: {
				over: "fa fa-star fa-2x",
				out: "fa fa-star-o fa-2x"
			},
			size: 5,
			max: 10,
			min: 0,
			value: 0
		};
		
		if (![ "update", "enable", "disable" ].includes(command) && isNull(options)) {
			options = command;
			command = "create";
		}
		if ("create" == command || "update" == command) {
			return this.each(function(index, element) {
				var me = $(this);
	
				if (typeof (options) == "string")
					options = JSON.parse(options);
				options = $.extend(true, {}, defaults, options);
	
				generateComponent(me, options);
				eventBinding(me, options);
			});
		} else if ("disable" == command) {
			return this.each(function(index, element) {
				var me = $(this);
	
				me.addClass("disabled");
				$(":radio", me).prop("disabled", true);
			});
		} else if ("enable" == command) {
			return this.each(function(index, element) {
				var me = $(this);
	
				me.removeClass("disabled");
				$(":radio", me).prop("disabled", false);
			});
		}
		
		function generateComponent(element, options) {
			var html = "";
			for (var i = 0; i < options.size; i++) {
				var value = (options.min + options.max) / options.size * (i + 1);
				html += "<label class=\"btn btn-default\">";
				html += "<input type=\"radio\" name=\"" + options.name + "\" value=\"" + value + "\" autocomplete=\"off\" />";
				html += "</label>";
			}
			element.addClass("rating");
			element.attr("data-toggle", "buttons");
			element.html(html);
			markRating(options.value, element, options);
		}
		
		function eventBinding(element, options) {
			$(":radio", element).bind("change", function(event) {
				markRating($(this).val(), element, options);
			});
		}
		
		function markRating(value, element, options) {
			$(":radio", element).each(function (index, element) {
				if ($(this).prop("disabled")) return;
				
				if (parseInt($(this).val()) <= parseInt(value)) {
					$(this).parent().removeClass(options.icon.out).addClass(options.icon.over);
				} else {
					$(this).parent().removeClass(options.icon.over).addClass(options.icon.out);
				}
			});
		}
	}
});

function isNull(obj) {
	return obj == null || obj == undefined;
}

function getStringDefault(value, defaultValue) {
	return isNull(value) ? isNull(defaultValue) ? "" : defaultValue + "" : value + "";
}

$(document).ready(function() {
	/**
	 * Navigation Multi Depth Dropdown
	 */
	$(".navbar a.dropdown-toggle").bind("click", function(e) {
		var $el = $(this);
		var $parent = $(this).offsetParent(".dropdown-menu");
		$(this).parent("li").toggleClass("open");
		if (!$parent.parent().hasClass("nav")) {
			$el.next().css({
				"top": $el[0].offsetTop,
				"left": $parent.outerWidth() - 4
			});
		}
		$(".nav li.open").not($(this).parents("li")).removeClass("open");
		return false;
	});

	/**
	 * Scroll Top Wrapper
	 */
	$(document).bind("scroll", function() {
		if ($(window).scrollTop() > 100) {
			$(".scroll-top-wrapper").addClass("show");
		} else {
			$(".scroll-top-wrapper").removeClass("show");
		}
	});
	$(".scroll-top-wrapper").bind("click", scrollToTop);

	function scrollToTop() {
		verticalOffset = typeof (verticalOffset) != "undefined" ? verticalOffset : 0;
		var element = $("body");
		var offset = element.offset();
		var offsetTop = offset.top;
		$("html, body").animate({
			scrollTop: offsetTop
		}, 500, "linear");
	}
});