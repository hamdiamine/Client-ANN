app.factory('VilleFctr', function ($http, $q) {
    var factory = {
        villes: [],

        /*Liste des villes*/
        listAll: function () {
            var url = urlService + "/villes";
            var deferred = $q.defer();
            if (factory.villes.length === 0) {
                $http.get(url)
                .success(function (data, status) {
                    factory.villes.push(null);
                    factory.villes = factory.villes.concat(data.villes);
                    deferred.resolve(factory.villes);
                }).error(function (error, status) {
                    deferred.reject(_err_listvil);
                });
            } else {
                deferred.resolve(factory.villes);
            }
            
            return deferred.promise;
        }
        /*****************************************************************/
    };
    return factory;
});