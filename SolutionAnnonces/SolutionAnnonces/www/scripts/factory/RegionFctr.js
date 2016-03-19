app.factory('RegionFctr', function ($http, $q) {
    var factory = {
        regions: [],
        /*Liste des regions*/
        listAll: function () {
            var url = urlService + "/regions";
            var deferred = $q.defer();
            if (factory.regions.length===0) {
                $http.get(url)
                .success(function (data, status) {
                    factory.regions.push(null);
                    factory.regions = factory.regions.concat(data.regions);
                    deferred.resolve(factory.regions);
                }).error(function (error, status) {
                    deferred.reject(_err_listreg);
                });
            } else {
                deferred.resolve(factory.regions);
            }
            
            return deferred.promise;
        },
        /******************************************************************/

        /*Get region d'une ville*/
        getByVil: function (idVil) {
            var url = urlService + "/regionbyville/" + idVil;
            /*
            var config = {
                params: { idVil: idVil }
            };
            */
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_listreg);
                });
            return deferred.promise;
        }
        /*****************************************************************/
    };
    return factory;
});