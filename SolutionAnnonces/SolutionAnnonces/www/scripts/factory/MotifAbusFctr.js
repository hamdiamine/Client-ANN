app.factory('MotifAbusFctr', function ($http, $q) {
    var factory = {
        motifs: [],

        /*Liste des Motifs*/
        listAll: function () {
            var url = urlService + "/motifabus/all";
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data, status) {
                    factory.motifs = data;
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_listmotif);
                });
            return deferred.promise;
        }
        /************************************************************/
    };
    return factory;
});