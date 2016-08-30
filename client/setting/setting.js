'use strict'
var app=angular.module('app');

app.directive('setting',function(){
    return {
    templateUrl:'/client/setting/setting.html',
    controller:SettingController
    };
});

var SettingController=['$scope','myAjax',function($scope,myAjax){
    $scope.userInfo={};
    
    myAjax.personalinfo()
    .$promise.then(function(response){
        $scope.userInfo.name=response.name;
        $scope.userInfo.city=response.city;
        $scope.userInfo.state=response.state;
    },function(error){
        
    });
    
    $scope.saveUserInfo=function(){
        myAjax.saveUserInfo({name:$scope.userInfo.name,city:$scope.userInfo.city,state:$scope.userInfo.state})
        .$promise.then(function(response){
            console.log(response);
        },function(error){
            //$scope.login.status=error.status;
        });
    }
}];
