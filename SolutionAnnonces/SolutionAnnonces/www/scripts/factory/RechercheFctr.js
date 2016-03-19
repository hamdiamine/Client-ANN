app.factory('RechercheFctr', function ($http, $q) {
    var factory = {
        recherches: [],
        recherchesASup: [],
        selectedRecherche: null,
        rechercheVide: {
            title: "",
            compte: null,
            motsCle: "",
            offre: false,
            demande: false,
            avecDesc: false,
            region: null,
            categorie: null,
            ville: null,
            particulier: false,
            professionnel: false,
            urgent: false,
            rayon: null,
            laptitude: null,
            longitude: null,
            prixMin: null,
            prixMax:null
        },
        /* Recuperation de la liste des recherches selon compte*/
        ListSelonCpt: function (compte) {
            var url = urlService + "/recherche/listcpt";
            var config = {
                params: { cpt: compte.id }
            };
            var deferred = $q.defer();
            $http.delete(url, config)
                .success(function (data, status) {
                    factory.recherches = data;
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_delphoto);
                });
            return deferred.promise;
        },
        /************************************************************/

        /*Creation de la recherche*/
        Create: function (recherche) {
            if (recherche.compte === null) {

            }
            else {
                var url = urlService + "/recherche/create";
                var deferred = $q.defer();
                $http.post(url, recherche)
                    .success(function (data, status) {
                        deferred.resolve(data);
                    }).error(function (error, status) {
                        deferred.reject(_err_crrech);
                    });
                return deferred.promise;
            }
        },
        /*********************************************************/

        /*Suppression de la recherche*/
        Delete: function (id) {
            var url = urlService + "/recherche/delete";
            var config = {
                params: { id: id }
            };
            var deferred = $q.defer();
            $http.delete(url, config)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_delrech);
                });
            return deferred.promise;
        },
        /*************************************************************************/

        /*Suppression des recherches en lot*/
        DeleteEnLot: function () {
            var url = urlService + "/recherche/deleteenlot";
            var config = {
                params: { recherches: factory.recherchesASup }
            };
            var deferred = $q.defer();
            $http.delete(url, config)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_delrech);
                });
            return deferred.promise;
        },
        /*************************************************************************/

        /*Mise à jour de la recherche*/
        Update: function (recherche) {
            var url = urlService + "/recherche/update";
            var deferred = $q.defer();
            $http.put(url, recherche)
                .success(function (data, status) {
                    deferred.resolve(data);
                }).error(function (error, status) {
                    deferred.reject(_err_uprech);
                });
            return deferred.promise;
        }
        /******************************************************************************/
    };
    return factory;
});