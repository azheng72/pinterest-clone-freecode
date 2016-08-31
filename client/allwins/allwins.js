var app=angular.module('app');

app.directive('allwins',function(){
    return {
        scope:{
          username:'=username'
        },
        templateUrl:'/client/allwins/allwins.html',
        controller:AllwinsController
    };
});

var AllwinsController=['$scope','myAjax',function($scope,myAjax){
    $scope.allwins=[];
    $scope.iLikeIt=[];
    $scope.likeCount=[];
    
    myAjax.get({category:'allwins',user:$scope.username})
    .$promise.then(function(response){
        console.log(response);
        $scope.allwins=response.allwins;
        $scope.allwins.reverse();
        $scope.likeCount=response.allwins.map(function(x) {return x.like.length});
        $scope.iLikeIt=response.allwins.map(function(x) {return x.like.includes($scope.username)});
    },function(error){
    
    });
    
    if($scope.username){
        $scope.clickLike=function(allwin,iLikeIt,idx){
            if(iLikeIt[idx]===true) {
                iLikeIt[idx]=false;
                $scope.likeCount[idx]--;
                myAjax.update({category:'allwins',user:$scope.username},{allwin,iLikeIt:false})
                .$promise.then(function(response){
                    console.log(response);
                },function(error){
                
                });
            }
            else{
                iLikeIt[idx]=true;
                $scope.likeCount[idx]++;
                myAjax.update({category:'allwins',user:$scope.username},{allwin,iLikeIt:true})
                .$promise.then(function(response){
                    console.log(response);
                },function(error){
                
                });
            }
        };
    }
}];