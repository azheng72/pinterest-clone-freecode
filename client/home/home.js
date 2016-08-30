
var app=angular.module('app');

app.directive('home',function(){
    return {
        templateUrl:'/client/home/home.html',
        controller:HomeController
    };
});

var HomeController=['$scope','myAjax',function($scope,myAjax){

    
}];

