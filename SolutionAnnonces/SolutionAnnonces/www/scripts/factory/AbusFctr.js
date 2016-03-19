app.factory('AbusFctr', function ($http, $q) {
    var factory = {

        /*Creation d'un abus*/
        Create: function (abus) {
            var url = urlService + "/createabus";
            var deferred = $q.defer();
            $http.post(url, abus)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_crabus);
                });
            return deferred.promise;
        }
        /********************************************************************************/
    };
    return factory;
});