app.factory('VilleFctr', function ($http, $q) {
    var factory = {
        villes: [],

        /*Liste des villes*/
        listAll: function () {
            var url = urlService + "/ville/all";
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_listvil);
                });
            return deferred.promise;
        }
        /*****************************************************************/
    };
    return factory;
});