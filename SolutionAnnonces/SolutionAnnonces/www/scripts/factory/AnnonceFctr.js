app.factory('AnnonceFctr', function ($http, $q) {
    var factory = {
        selectedRegion: {},
        selectedAnnonce: {},
        sortType: 0,
        /*Liste des offres paginer selon la région*/
        ListoffreP: function (p) {
            var url = null;
            var config = {};
            if (factory.selectedRegion === null) {
                url = urlService + "/annonce/allofrp";
                config = {
                    params: { page: p, sort: factory.sortType }
                };
            }
            else {
                url = urlService + "/annonce/allofrregp";
                config = {
                    params: { reg: factory.selectedRegion.id, page: p, sort: factory.sortType }
                };
            }

            var deferred = $q.defer();
            $http.get(url, config)
                .success(function (data, status) {
                    deferred.resolve(data.content);
                }).error(function (error, status) {
                    deferred.reject(_err_listofr);
                });
            return deferred.promise;
        },
        /***********************************************************************/

        /*Liste selon recherche*/
        ListSelonRech: function(recherche){
            var url = urlService + "/annonce/researchcrt";
            var config = {
                params: { recherche: recherche }
            };
            var deferred = $q.defer();
            $http.get(url, config)
                .success(function (data, status) {
                    deferred.resolve(data.content);
                }).error(function (error, status) {
                    deferred.reject(_err_listofr);
                });
            return deferred.promise;
        },
        /***********************************************************************/

        /*Liste des demandes paginée*/
        ListDemandeP: function (p) {
            var url = urlService + "/annonce/alldemp";
            var config = {
                params: { page: p }
            };
            var deferred = $q.defer();
            $http.get(url, config)
                .success(function (data, status) {
                    deferred.resolve(data.content);
                }).error(function (error, status) {
                    deferred.reject(_err_listdem);
                });
            return deferred.promise;
        },
        /***********************************************************************/

        /*Creation d'une annonce*/
        Create: function (annonce) {
            var url = urlService + "/annonce/create";
            var deferred = $q.defer();
            $http.post(url, annonce)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_crann);
                });
            return deferred.promise;
        },
        /********************************************************************************/

        /*Mise à jour d'une annonce*/
        Update: function (annonce) {
            var url = urlService + "/annonce/update";
            var deferred = $q.defer();
            $http.put(url, annonce)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject("Problème lors de la mise à jour de l'annonce");
                });
            return deferred.promise;
        },
        /******************************************************************************/

        /*Suppression d'une anonce*/
        Delete: function (id) {
            var url = urlService + "/annonce/delete";
            var config = {
                params: { id: id }
            };
            var deferred = $q.defer();
            $http.delete(url, config)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject("Problème lors de la suppression de l'annonce");
                });
            return deferred.promise;
        },
        /*************************************************************************/

        /*Suppression d'une annonce avec tous ces dependance*/
        DeleteWithDep: function (id) {
            var url = urlService + "/annonce/deletewithdep";
            var config = {
                params: { id: id }
            };
            var deferred = $q.defer();
            $http.delete(url, config)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject("Problème lors de la suppression de l'annonce");
                });
            return deferred.promise;
        }
        /*************************************************************************/
    };
    return factory;
});
