app.factory('MotifAbusFctr', function ($http, $q) {
    var factory = {
        motifs: [],

        /*Liste des Motifs*/
        listAll: function () {
            var url = urlService + "/motifabus";
            var deferred = $q.defer();
            if (factory.motifs.length === 0) {
                $http.get(url)
                    .success(function (data, status) {
                        factory.motifs = data.motifsAbus;
                        deferred.resolve(factory.motifs);
                    }).error(function (error, status) {
                        deferred.reject(_err_listmotif);
                    });
            } else {
                deferred.resolve(factory.motifs);
            }
            return deferred.promise;
        }
        /************************************************************/
    };
    return factory;
});