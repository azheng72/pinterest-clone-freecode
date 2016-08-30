var app=angular.module('app');

app.directive('mywins',function(){
    return {
        scope:{
          username:'=username'
        },
        templateUrl:'/client/mywins/mywins.html',
        controller:MywinsController
    };
});

 app.directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    scope.$apply(attrs.imageonload)(true);
                });
                element.bind('error', function(){
                  scope.$apply(attrs.imageonload)(false);
                });
            }
        };
    })

var MywinsController=['$scope','myAjax',function($scope,myAjax){
    
    $scope.mywins=[];
    $scope.iLikeIt=[];
    $scope.likeCount=[];
    
    $scope.imageonloadFn=function(x){  
        if(!x) $scope.$apply(()=>$scope.imageLoadSuccess=false);
        if(x) $scope.$apply(()=>$scope.imageLoadSuccess=true);
        console.log(x);
    };
    
    myAjax.get({category:'mywins',user:$scope.username})
    .$promise.then(function(response){
        console.log(response);
        $scope.mywins=response.mywins;
        // $scope.mywins.reverse();//recents wins load first
        $scope.likeCount=response.mywins.map(x=>x.like.length);
        $scope.iLikeIt=response.mywins.map(x=>x.like.includes($scope.username));
    },function(error){
    
    });
    
    $scope.add=function(image,snippet){
        myAjax.save({category:'mywins',user:$scope.username,directive:'add'},{image:image,snippet:snippet})
        .$promise.then(function(response){
            console.log(response);
            $scope.mywins.push(response);
            $scope.likeCount=response.mywins.map(x=>x.like.length);
            $scope.iLikeIt=response.mywins.map(x=>x.like.includes($scope.username));
        },function(error){
        
        });
    };
    $scope.delete=function(mywin,idx){
        myAjax.save({category:'mywins',user:$scope.username,directive:'delete'},{mywin:mywin})
        .$promise.then(function(response){
            console.log(response);
            $scope.mywins.splice(idx,1);
            $scope.likeCount=response.mywins.map(x=>x.like.length);
            $scope.iLikeIt=response.mywins.map(x=>x.like.includes($scope.username));
        },function(error){
        
        });
    };   
    $scope.clickLike=function(mywin,iLikeIt,idx){
        if(iLikeIt[idx]===true) {
            iLikeIt[idx]=false;
            $scope.likeCount[idx]--;
            myAjax.update({category:'mywins',user:$scope.username},{mywin,iLikeIt:false})
            .$promise.then(function(response){
                console.log(response);
            },function(error){
            
            });
        }
        else{
            iLikeIt[idx]=true;
            $scope.likeCount[idx]++;
            myAjax.update({category:'mywins',user:$scope.username},{mywin,iLikeIt:true})
            .$promise.then(function(response){
                console.log(response);
            },function(error){
            
            });
        }
    };
}];