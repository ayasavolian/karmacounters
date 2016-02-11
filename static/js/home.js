var myApp = angular.module('Home', [])

myApp.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

myApp.directive('scrolly', function () {
  return {
    restrict: 'A',
    link: function ($window) {
        var raw = document.getElementById('second');
        $(window).scroll(function() {
          if($(document).scrollTop() > raw.scrollHeight-50){
            document.getElementById('top-bar-container').style.color = "#f16529";
            $('#second-header').fadeIn( 1600, function() {});
            $('#second-section-body').fadeIn( 1600, function() {});  
            $('#second-down-arrow').fadeIn( 1600, function() {}); 
          }
          else if($(document).scrollTop() < raw.scrollHeight){
            document.getElementById('top-bar-container').style.color = "#fff";           
          }

        //   console.log("test");
        //   console.log(window.scrollTop);
        //   console.log($(document).scrollTop());
        //   console.log(raw.scrollHeight);
        // });
        // $('body').bind('scroll', function () {
        //     console.log('in scroll');
        //     console.log(raw.scrollTop + raw.offsetHeight);
        //     console.log(raw.scrollHeight);
        //     if (raw.scrollTop + raw.offsetHeight == raw.scrollHeight) { //at the bottom
        //         scope.$apply(attrs.scrolly);
        //     }
        });
    }
  }
});

myApp.directive('moveArrowLocation', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm) {
      $elm.on('click', function() {
        console.log("test");
        if($elm[0].id == "first-down-arrow")
          $("body").animate({scrollTop: $('#second').offset().top + 40}, "slow");
        else if($elm[0].id == "second-down-arrow")
          $("body").animate({scrollTop: $('#third').offset().top + 40}, "slow");
      });
    }
  }
});

// myApp.factory('addTitle', ['$timeout', '$interval', function($timeout, $interval){
//   $interval($scope.updateTime, 1000);
//   return function addTitleLetters(title){
//     var finalTitle = "";
//     console.log("test");
//     for(var x = 0; x < title.length; x++){
//       $timeout(function() {
//         finalTitle = finalTitle + title[x];
//         console.log(x);
//         if(finalTitle.length== title.length)
//           return finalTitle;
//       }, 500);
//     }
//   }
// }]);


myApp.controller('HomeCtrl', ['$scope', '$interval', function($scope, $interval) {

  var secondTitleLength = "To help you become happier and more successful.";

  $scope.test = "test";
  $scope.arrows = [];
  $scope.arrows.push('first-down-arrow');
  $scope.secondTitle = "";
  $scope.titleLocation = 0;
  $scope.addTitle = function(){
    // $scope.$apply(function(){
    $scope.secondTitle += secondTitleLength[$scope.titleLocation];
    $scope.titleLocation++;
  }
  $('#first-title-line').fadeIn( 800, function() {
    console.log("faded in");
    $interval($scope.addTitle, 50, secondTitleLength.length)
  });


}]);

myApp.controller('SecondCtrl', [ '$scope', function($scope) {
  $scope.secondSectionBody = 'Are you unhappy with your job? Okay, if not, do you know someone that is unhappy with their job? '+
  'When they speak about it Mondays sound torturous, while Fridays seem like the second coming of Jesus. If that person you know is ' +
  'you, you’re not the only one.\n \nBeing a millennial in Silicon Valley, not only have I dreaded a previous job, but also have seen ' +
  'friends become unsatisfied with their jobs and eventually become extremely unhappy...';
  $scope.arrows = [];
  $scope.arrows.push('second-down-arrow');

}]);