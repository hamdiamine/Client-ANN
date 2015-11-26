app.factory('RegionFctr', function ($http, $q) {
    var factory = {
        regions: [],
        /*Liste des regions*/
        listAll: function () {
            var url = urlService + "/region/all";
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data, status) {
                    factory.regions = data;
                    deferred.resolve(factory.regions);
                }).error(function (error, status) {
                    deferred.reject(_err_listreg);
                });
            return deferred.promise;
        },
        /******************************************************************/

        /*Get region d'une ville*/
        getByVil: function (idVil) {
            var url = urlService + "/region/getbyville";
            var config = {
                params: { idVil: idVil }
            };
            var deferred = $q.defer();
            $http.get(url, config)
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