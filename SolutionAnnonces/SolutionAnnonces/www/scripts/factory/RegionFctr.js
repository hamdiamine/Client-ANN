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
        }
        /******************************************************************/
    };
    return factory;
});