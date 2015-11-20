app.factory('CategorieFctr', function ($http, $q) {
    var factory = {
        categories: [],

        /*Liste des catégories*/
        listAll: function () {
            var url = urlService + "/categorie/all";
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_listcat);
                });
            return deferred.promise;
        }
        /************************************************************/
    };
    return factory;
});
