app.factory('CategorieFctr', function ($http, $q) {
    var factory = {
        categories: [],

        /*Liste des catégories*/
        listAll: function () {
            var url = urlService + "/categories";//"/categorie/all";

            var deferred = $q.defer();
            if (factory.categories.length === 0) {
                $http.get(url)
               .success(function (data, status) {
                   factory.categories.push(null);
                   factory.categories = factory.categories.concat(data.categories);
                   deferred.resolve(factory.categories);
               }).error(function (error, status) {
                   deferred.reject(_err_listcat);
               });
            }
            else {
                deferred.resolve(factory.categories);
            }

            return deferred.promise;
        }
        /************************************************************/
    };
    return factory;
});
