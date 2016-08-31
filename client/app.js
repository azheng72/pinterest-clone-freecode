var app=angular.module('app',['ngResource','ngRoute','wu.masonry']);

app.factory('myAjax', ['$resource', function($resource) {
return $resource('/:category/:user', null,
    {
        'update': { method:'PUT' },
        'login':  {method:'POST',params:{category:'login'}},
        'logout':  {method:'POST',params:{category:'logout'}},
        'signup':  {method:'POST',params:{category:'signup'}},
        'personalinfo':  {method:'POST',params:{category:'personalinfo'}},
        'saveUserInfo':  {method:'POST',params:{category:'saveUserInfo'}}
    });
}]);

app.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          template: '<home></home>'
        }).
        when('/signup', {
          template: '<signup></signup>'
        }).
        when('/login', {
          template: '<login></login>'
        }).
        when('/allwins', {
          template: '<allwins username="username"></allwins>'
        }).
        when('/mywins', {
          template: '<mywins username="username"></mywins>'
        }).
        when('/setting', {
          template: '<setting></setting>'
        }).
        otherwise('/home');
    }
  ]);
  
app.directive('app',function($compile){
    return {
        templateUrl:'/client/app.html',
        controller:AppController
    };
});

var AppController=['$scope','myAjax','$element','$compile','$location',function($scope,myAjax,$element,$compile,$location){
  
    $scope.alreadyLogin=true;
    myAjax.personalinfo()
    .$promise.then(function(response){
                        $scope.username=response.username;
                        $scope.name=response.name;
                  },function(error){
                        $scope.alreadyLogin=false;
                        $location.path('/');
                        $scope.active['home']='active'; //initialization

                  })
    // .then(function(){
    //       // # append DOM element <div ng-view></div> to <app></app> after 
    //       // personalInfo ajax is called and returned username.
    //       var el = $compile( "<div ng-view></div>" )( $scope );
    //       $element.parent().append( el );
    // });
    
    $scope.logout=function(){
      myAjax.logout()
      .$promise.then(function(response){
          $scope.message='logout success';
          window.location='/'; //redirect
      },function(error){
          $scope.username=error.status;
      });
    };
    
    $scope.active={};
    $scope.navClick=function(name){  //nav bar dynameic click
      $scope.active={};
      $scope.active[name]='active';
    }
    $scope.active[window.location.hash.replace(/#!\//,'')]='active'; //initialization
}];

