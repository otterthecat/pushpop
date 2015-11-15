// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

// utility
// //////////////////////////////////////////////////////////
var getEmptySpy = function () {
	'use strict';

	return sinon.spy(function (data, title, url) {
		return {'data': data, 'url': url};
	});
};


// stubs
// /////////////////////////////////////////////////////////
var windowMock = {
	'onpopstate': function () {},
	'history': {
		'state': {},
		'pushState': getEmptySpy(),
		'replaceState': getEmptySpy()
	},
	'addEventListener': function (name, fn) {
		windowMock['on' + name] = fn;
	}
};

var watcherFn = sinon.spy(function (data) {
	'use strict';
	return data;
});

var stateGetter = sinon.spy(function (data) {
	'use strict';
	return data;
});

// modules to test
// /////////////////////////////////////////////////////////
var pushpop = require('../../lib/pushpop')(windowMock);

describe('pushpop', function(){
	'use strict';

	it('sets internal window property', function () {
		pushpop.window.should.deep.equal(windowMock);
	});

	describe('#push', function () {
		it('should call history\'s pushState function', function () {
			var url = '/my/url';
			var data = {'foo': 'bar'};
			var complex = {'data': data, 'url': url};
			pushpop.push(url, data);
			windowMock.history.pushState.should.have.been
				.calledWith(complex, '', url);
		});
	});

	describe('#replace', function () {
		it('should call history\'s replaceState', function () {
			var url = '/my/other/url';
			var data = {'bar': 'baz'};
			var complex = {'data': data, 'url': url};
			pushpop.replace(url, data);
			windowMock.history.replaceState.should.have.been
				.calledWith(complex, '', url);
		});
	});

	describe('#getState', function () {
		it('should return history state object', function () {
			pushpop.getState().should.deep.equal(windowMock.history.state);
		});

		it('should return callback\'s value if passed as argument', function () {
			pushpop.getState(stateGetter);
			stateGetter.should.have.been.calledWith(windowMock.history.state);
		});
	});

	describe('#watchState', function () {
		it('should set watcher to window\'s onpopstate', function () {
			pushpop.watchState(watcherFn);
			pushpop.window.onpopstate.should.deep.equal(watcherFn);
		});
	});
});
