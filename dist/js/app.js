function APIFactory(t){var a=this;return a.query="yoga",factory={},factory.data=[],factory.meta=[],factory.articles=[],factory.get=function(a){this.url="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=351d9caa421f4a98b47ec5de671b2a2e&q="+a,t.get(this.url).then(function(t){factory.data.push(t.data),factory.articles.unshift(t.data.response.docs),factory.meta.push(t.data.response.meta)})},factory.get(a.query),factory}function MainCtrl(t,a){t.settingsOpen=!1,t.hideTopics=!0,t.onlyImages=!0,t.hideArticle=function(a){return!(!t.hideTopics||!t.isType(a,"timestopic"))||(!(!t.onlyImages||a.multimedia[1])||void 0)},t.meta=factory.meta,t.articles=factory.articles,t.isType=function(t,a){return t.type_of_material===a},t.toggle=function(a){t[a]===!0?t[a]=!1:t[a]=!0},t.query="",t.querySaved=!0,t.search=function(){t.toggle("querySaved"),t.querySaved&&""!==t.query&&a.get(t.query)}}var app=angular.module("NYT-API",[]);app.factory("APIFactory",APIFactory),APIFactory.$inject=["$http"],app.controller("MainCtrl",MainCtrl),MainCtrl.$inject=["$scope","APIFactory"];