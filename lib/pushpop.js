var Pushpop = function  (win) {
	'use strict';

	this.window = win;
	this.history = this.window.history;
	this.hasPopState = typeof this.window.onpopstate !== 'undefined';

	this.updateState = function (action, url, obj) {
		this.history[action + 'State']({
			'url': url,
			'data': obj
		}, '', url);
	};
};

Pushpop.prototype.push = function (url, obj) {
	'use strict';
	return this.updateState('push', url, obj);
};

Pushpop.prototype.replace = function (url, obj) {
	'use strict';
	return this.updateState('replace', url, obj);
};

Pushpop.prototype.getState = function (fn) {
	'use strict';

	return typeof fn === 'function' ? fn(this.history.state) : this.history.state;
};

Pushpop.prototype.watchState = function (fn) {
	'use strict';

	return this.window.addEventListener('popstate', fn);
};

Pushpop.prototype.ignoreState = function (fn) {
	'use strict';

	return this.window.removeEventListener('popstate', fn);
};

module.exports = function (win) {
	'use strict';
	var pp = new Pushpop(win);
	return pp.hasPopState ? pp : false;

};
