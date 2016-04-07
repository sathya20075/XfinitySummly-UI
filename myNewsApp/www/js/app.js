(function(){
 var NewsApp = angular.module('myNewsApp', ['ionic'])

 NewsApp.config(function($stateProvider,$urlRouterProvider){
      
      $stateProvider.state('app',{
          cache : false,
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: ''
      });
      $stateProvider.state('app.top_news', {
          cache : false,
          url: '/top_news',
          views: {
            'menuContent': {
              templateUrl: 'templates/top_news.html',
              controller: 'BusinessNewsShow'
            }
          }
      });

      $stateProvider.state('app.NewsCard',{
          url: '/NewsCard',
          views: {
            'menuContent': {
               templateUrl: 'templates/NewsCard.html',
               controller: 'NewsController'
              }
           
            }          
      });

      $stateProvider.state('app.SportsNewsCard',{
          url: '/SportsNewsCard',
          views: {
            'menuContent': {
               templateUrl: 'templates/SportsNewsCard.html',
               controller: 'NewsController'
              }           
            }          
      });

      $stateProvider.state('app.NewsSummary',{
        url: '/NewsSummary/:contentId',
        templateUrl: 'templates/NewsSummary.html',
        controller: 'SummaryController'
      });

      $urlRouterProvider.otherwise('/app/top_news');
  });
 
 NewsApp.factory('NewsService',['$http',function($http){
    var news = [];
    var sportsnews = [];
    return {
          GetNews: function(){
            return $http.get("http://10.239.52.202:8080/SummlyREST/rest/summly/GetLatestBusinessNews").then(function(response){
              news = response;
              console.log(news);
              return response;
            });
          }, 
            GetSportsNews: function(){
              return $http.get("http://10.239.52.202:8080/SummlyREST/rest/summly/GetLatestSportsNews").then(function(response){
              sportsnews = response;
              console.log(sportsnews);
              return response;
            });
          },
           GetBusinessNews: function(contentid){
            for(i=0;i<news.length;i++){
                if(news[i].contentId == contentid){
                    return news[i];
                }
            }
          } 
        }      
  }]);

 NewsApp.controller('NewsController',['$scope','NewsService', function($scope,NewsService){
      NewsService.GetNews().then(function(news){
            $scope.news = news.data.Business;            
      });
      NewsService.GetSportsNews().then(function(sportsnews){
            $scope.sportsNews = sportsnews.data.Sports;            
      });

  }]);

  NewsApp.controller('SportsNewsController',['$scope','NewsService', function($scope,NewsService){
      NewsService.GetSportsNews().then(function(sportsnews){
            $scope.sportsNews = sportsnews.data.Sports;            
      });

  }]); 

 NewsApp.controller('SummaryController',['$stateParams','$scope','NewsService', function($stateParams,$scope,NewsService){
      var contentid = $stateParams.contentId;                  
      console.log("Inside NewsAppController::" +contentid);
      console.log(NewsService.GetBusinessNews(contentid));      
      $scope.bnews = NewsService.GetBusinessNews(contentid);
      
 }]);

 NewsApp.controller("BusinessNewsShow",["$scope",'NewsService',function($scope,NewsService){

    NewsService.GetNews().then(function(bus_resp){
        $scope.bus_resp = bus_resp.data.Business;
        console.log(bus_resp);
        $scope.loadBusinessNews = function(){
          for(i=0;i<bus_resp.data.length;i++){
                console.log(bus_resp.data.thumbNailImage);
                $scope.bus_resp.push({id: i});
                }
            }
        });
 }]);

 NewsApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    });
  })
}());
