var app=angular.module('app');

app.directive('signup',function(){
    return {
        templateUrl:'/client/signup/signup.html',
        controller:SignupController
    };
});

var SignupController=['$scope','myAjax',function($scope,myAjax){
    $scope.signup={};
    $scope.signup.error=false;
    
    $scope.signupSubmit=function(){
        myAjax.signup({username:$scope.signup.username,password:$scope.signup.password})
        .$promise.then(function(response){
            window.location='/';
        },function(error){
            $scope.signup.error=true;
            if(error.status=='422')
                $scope.signup.message='Username already existed';
            if(error.status=='400')
                $scope.signup.message='Invalid username or password';
        });
        
    }

    
}];
