app.factory('PhotoFctr', function ($http, $q) {
    var factory = {
        /*Liste des photos d'une annonce*/
        ListSelonAnn: function (idAnn) {
            var url = urlService + "/photo/allByAnn";
            var config = {
                params: { annonce: idAnn }
            };
            var deferred = $q.defer();
            $http.get(url, config)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_listphoto);
                });
            return deferred.promise;
        },
        /****************************************************************************/

        /*Creation d'une photo*/
        Create: function (photo) {
            var url = urlService + "/photo/create";
            var dataPht = photo;
            var deferred = $q.defer();
            $http.post(url, dataPht)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (data, status) {
                    deferred.reject('Problème de connexion');
                });
            return deferred.promise;
        },
        /********************************************************************************/

        /*Delete selon annonce*/
        DeleteByAnnonce: function (idAnn) {
            var url = urlService + "/photo/deletebyann";
            var config = {
                params: { annonce: idAnn }
            };
            var deferred = $q.defer();
            $http.delete(url, config)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (data, status) {
                    deferred.reject(_err_delphoto);
                });
            return deferred.promise;
        },
        /********************************************************************************/

        /*Suppression d'une photo*/
        Delete: function (id) {
            var url = urlService + "/photo/delete";
            var config = {
                params: { id: id }
            };
            var deferred = $q.defer();
            $http.post(url, config)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (data, status) {
                    deferred.reject('Problème de connexion');
                });
            return deferred.promise;
        }
        /*******************************************************************************/
    };
    return factory;
});