// Declare App
var app = angular.module('NYT-API', []);

// Customer Factory
app.factory('APIFactory', APIFactory);

APIFactory.$inject = ['$http'];

function APIFactory($http) {
	var dataEntry = 0,
		self = this;
		self.query = 'yoga';
		factory = {};
		factory.data = [];
		factory.meta = [];
		factory.articles = [];

	factory.get = function(query) {
		this.url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
				   'api-key=351d9caa421f4a98b47ec5de671b2a2e' +
				   '&q=' + query;
		$http.get(this.url).then(function(response) {
			factory.data.push(response.data);
			factory.articles.unshift(response.data.response.docs);
			factory.meta.push(response.data.response.meta);
		});
	};
	factory.get(self.query);
	return factory;
}

// Main Controller
app.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'APIFactory'];

function MainCtrl (self, API) {

	self.settingsOpen = false;
	self.hideTopics = true;
	self.onlyImages = true;
	self.hideArticle = function(article) {
		if (self.hideTopics && self.isType(article,'timestopic')) {
			return true;
		}
		if (self.onlyImages && !article.multimedia[1]) {
			return true;
		}
	};


	self.meta = factory.meta;
	self.articles = factory.articles;
	self.isType = function(article, topic) {
		if (article.type_of_material === topic) {
			return true;
		} else { return false; }
	};
	self.toggle = function(bool) {
		if (self[bool] === true) { self[bool] = false; }
		else {self[bool] = true;}
	};
	self.query = '';
	self.querySaved = true;
	self.search = function() {
		self.toggle('querySaved');
		if(self.querySaved) {
			if(self.query !== '') {
				API.get(self.query);
			}
		}


	};
}
