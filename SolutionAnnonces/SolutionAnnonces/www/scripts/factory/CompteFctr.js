app.factory('CompteFctr', function ($http, $q) {
    var factory = {
        compte: null,

        /*Authentification*/
        Authentification: function (mail, passwd) {
            var url = urlService + "/compte/authentification";
            var config = {
                params: { login: mail, mdp: passwd }
            };
            var deferred = $q.defer();
            $http.get(url, config)
                .success(function (data, status) {
                    factory.compte = data;
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject('');
                });
            return deferred.promise;
        }
        /**************************************************************/
    };
    return factory;
});