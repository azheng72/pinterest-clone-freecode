
var app=angular.module('app');

app.directive('login',function(){
    return {
        templateUrl:'/client/login/login.html',
        controller:LoginController
    };
});

var LoginController=['$scope','myAjax',function($scope,myAjax){
    $scope.login={};
    $scope.login.error=false;
    
    $scope.loginSubmit=function(){
        myAjax.login({username:$scope.login.username,password:$scope.login.password})
        .$promise.then(function(response){
            window.location='/';
        },function(error){
            $scope.login.error=true;
            if(error.status=='401')
                $scope.login.message='Incorrect username or password';
            if(error.status=='400')
                $scope.login.message='Invalid username or password';
        });
        
    };
    
}];

