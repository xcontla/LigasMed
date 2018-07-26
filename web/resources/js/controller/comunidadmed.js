/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var name = "comunidadMed";
var requires = [];
var comunidadMed = null;

comunidadMed = angular.module(name, requires);

comunidadMed.constant('mainURL', {
    contextPath: "/ComunidadMED",
    //path: "132.248.47.175:8080",
});

comunidadMed.factory("medSvc", function ($http, $q, mainURL) {
    var saveData = {};
    function set(data) {
        saveData = data;
    }
    function get() {
        return saveData;
    }
    return {
        set: set,
        get: get,
        postInfo: function (id,llave) {

            var deffered = $q.defer();
            $http.post(mainURL.contextPath + '/init?llave='+id+'&llave2='+llave)
                    .success(function (data) {
                        console.log(data);
                        deffered.resolve(data);
                    })
                    .error(function (error) {
                        console.log(error);
                        deffered.reject(error);

                    });
            return deffered.promise;
        },
        postInfo2: function (post) {

            var deffered = $q.defer();
            $http.post(mainURL.contextPath + '/init',post)
                    .success(function (data) {
                        deffered.resolve(data);
                    })
                    .error(function (error) {
                        console.log(error);
                        deffered.reject(error);

                    });
            return deffered.promise;
        }
    };
});

comunidadMed.controller("medCtrl", function ($scope, medSvc,$window) {
  
    $scope.cuestionarioHyM = function() {
        var identificador = "4S63EUQU";
        var llave = "$2a$10$81B2aSo2y5GU.fnSpUaETe8qRgYWeqZj6Fg0FcFIj3ujt30DfyK9u";
        console.log(identificador,llave);
        medSvc.postInfo(identificador,llave).then(
                function (data) {
                    console.log(data);
                    $window.location.href = data.location;
                },
                function (error) {
                    console.log("postInfo->Error: ", error);

                });;
    };
    
});
