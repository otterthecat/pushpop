var Pushpop = function  (win) {
	'use strict';

	this.window = win;
	this.history = this.window.history;
	this.hasPopState = typeof this.window.onpopstate !== 'undefined';

	this.checkCompatability = function (action, url, obj) {

		if(this.hasPopState) {
			this.history[action + 'State']({
				'url': url,
				'data': obj
			}, '', url);
		}
		else {
			this.window.location = url;
		}
	};
};

Pushpop.prototype.push = function (url, obj) {
	'use strict';
	this.checkCompatability('push', url, obj);
};

Pushpop.prototype.replace = function (url, obj) {
	'use strict';
	this.checkCompatability('replace', url, obj);
};

Pushpop.prototype.getState = function (fn) {
	'use strict';

	if(!this.hasPopState) {
		return false;
	}

	return fn ? fn(this.history.state) : this.history.state;
};

Pushpop.prototype.watchState = function (fn) {
	'use strict';

	if(!this.hasPopState){
		return false;
	}

	this.window.onpopstate = fn;
};

module.exports = function (win) {
	'use strict';
	return new Pushpop(win);
};
