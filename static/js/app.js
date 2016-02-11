var myApp = angular.module('myApp', [])

myApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

myApp.factory('notify', ['$window', function(win){
	var msgs = []
	return function(msg){
		msgs.push(msg);
		if(msgs.length == 3){
			win.alert(msgs.join("\n"));
			msgs=[];
		}
	}
}]);

myApp.factory('homeCall', ['$http', function($http){
	var urlBase = '/createuser';
	var homeCall = {}
	homeCall.homePost = function(username, password){
		userInfo = {
			'email': username,
			'password': password
		}
		return $http.post(urlBase, userInfo)
	}
	return homeCall
}]);	

myApp.controller('GreetingController', ['$scope', '$interval', 'notify', 'homeCall', function($scope, $interval, notify, homeCall) {
  $scope.greeting = 'Hola!';
  $scope.customGreeting = "Oui Oui";
  $scope.homeData;
  $scope.changeGreeting = function(){
  	$scope.greeting = $scope.customGreeting;
  }
  $scope.callNotify = function(msg){
  	notify(msg);
  }
  $scope.updateTime = function(){
  	$scope.currTime = new Date().toJSON().slice(0,19)
  }
  $scope.getHome = function(username, password){
    homeCall.homePost(username, password)
        .success(function (response) {
        	console.log(response);
            $scope.email = response.Email;
            $scope.password = response.Password;
        })
        .error(function (error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
  }
  $interval($scope.updateTime, 1000);

}]);