var Pushpop = function  (win) {
	'use strict';

	this.window = win;
	this.history = win.history;
};

Pushpop.prototype.push = function (url, obj) {
	'use strict';

	this.history.pushState({
		'url': url,
		'data': obj
	}, '', url);
};

Pushpop.prototype.replace = function (url, obj) {
	'use strict';

	this.history.replaceState({
		'url': url,
		'data': obj
	}, '', url);
};

Pushpop.prototype.getState = function (fn) {
	'use strict';
	return fn ? fn(this.history.state) : this.history.state;
};

Pushpop.prototype.watchState = function (fn) {
	'use strict';
	this.window.onpopstate = fn;
};

module.exports = new Pushpop(window);
