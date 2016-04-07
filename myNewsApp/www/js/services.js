var retrieveService = angular.module('MyServiceProvider', ['ionic'])
retrieveService.factory("BusinessInfoRetrieverService",['$http',function($http){
    return {
        getBusinessNews : function(){
              return $http.get('http://10.239.52.202:8080/SummlyREST/rest/summly/GetLatestBusinessNews').then(function(response){
              console.log(response)
              return response;
              });
        }
}}]);



