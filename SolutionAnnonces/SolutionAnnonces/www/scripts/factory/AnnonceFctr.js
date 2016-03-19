app.factory('AnnonceFctr', function ($http, $q, $cordovaGeolocation, PhotoFctr) {
    var factory = {
        selectedRegion: {},
        selectedAnnonce: {},
        selectedRecherche: null,
        type: 0,
        listAnn: [],
        sortType: 0,
        sortOrient: 1,
        lp: null,
        lg: null,
        listAnnFav: [],
        index:0,

        /*Calcul des limite des coordonnées geo */
        GetLimiteGeo: function (lp, lg, ray) {
            // 1° de latitude = 111,11 Km, on fait donc un produit en croix 
            var offSetLat = ray / 111.11;

            // 1° de longitude à 'latitude' degrés de latitude correspond à 
            // OneLongitudeDegree mètres. On passe à la méthode Math.Cos 
            // des radians
            var oneLongitudeDegree = 111.11 * Math.cos(lp * Math.PI / 180);

            // Produit en croix pour trouver le nombre de degrés de longitude auquel 
            // correspond la longueur de notre rayon
            var offSetLong = ray / oneLongitudeDegree;

            return {
                lpmin: latitude - offSetLat,
                lpmax: latitude + offSetLat,
                lgmin: longitude - offSetLong,
                lgmax: longitude + offSetLong
            };
        },
        /***********************************************************************/

        /*Liste des offres paginer selon la région*/
        ListAnnP: function (p) {
            var url = null;
            var config = {};
            if (factory.selectedRecherche != null) {
                factory.selectedRecherche.page = p;
                factory.selectedRecherche.sortType = factory.sortType;
                factory.selectedRecherche.sortOrient = factory.sortOrient;
                var tt = JSON.stringify(factory.selectedRecherche)
                url = urlService + "/rechannonce/" + tt;
                /*
                config = {
                    params: {
                        mCle: factory.selectedRecherche.motsCle,
                        ofr: factory.selectedRecherche.offre,
                        dem: factory.selectedRecherche.demande,
                        aDesc: factory.selectedRecherche.avecDesc,
                        reg: factory.selectedRecherche.region != null ? factory.selectedRecherche.region.id : null,
                        cat: factory.selectedRecherche.categorie != null ? factory.selectedRecherche.categorie.id : null,
                        vil: factory.selectedRecherche.ville != null ? factory.selectedRecherche.ville.id : null,
                        part: factory.selectedRecherche.particulier,
                        prof: factory.selectedRecherche.professionnel,
                        urg: factory.selectedRecherche.urgent,
                        ray: factory.selectedRecherche.rayon,
                        lp: factory.lp,
                        lg: factory.lg,
                        page: p,
                        sort: factory.sortType
                    }
                }; */
            }
            else if (factory.selectedRegion != null) {
                url = urlService + "/offresbyreg/" + factory.selectedRegion._id + "/" + p + "/" + factory.sortType + "/" + factory.sortOrient;
                /*
                config = {
                    params: { reg: factory.selectedRegion.id, page: p, sort: factory.sortType }
                };
                */
            }
            else {
                url = urlService + "/annoncesbytype/" + factory.type + "/" + p + "/" + factory.sortType + "/" + factory.sortOrient;
                /*
                config = {
                    params: { type: factory.type, page: p, sort: factory.sortType }
                };
                */
            }

            var deferred = $q.defer();
            $http.get(url)
                .success(function (data, status) {
                    deferred.resolve(data.annonces);
                }).error(function (error, status) {
                    deferred.reject(_err_listofr);
                });
            return deferred.promise;
        },
        /***********************************************************************/

        /*Liste des demandes paginée*/
        ListDemandeP: function (p) {
            var url = urlService + "/demandes/" + p;
            /*
            var config = {
                params: { page: p }
            };
            */
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
            annonce.laptitude = factory.lp;
            annonce.longitude = factory.lg;
            annonce.archived = 0;
            var url = urlService + "/addAnn";
            var deferred = $q.defer();
            $http.post(url, annonce)
                .success(function (data, status) {
                    /*
                    data.photos = [];
                    for (var i = 0; i < photos.length; i++) {
                        var ph = photos[i];
                        ph.annonce = { 'id': data.id };
                        ph.num = i;
                        PhotoFctr.UploadPhoto(ph).then(function (nvlPh) {
                            data.photos.push(nvlPh);
                        }, function (msg) {

                        });
                    }
                    */
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
        },
        /*************************************************************************/
        /*Recuperation des coordonnees geo*/
        RecupCoordGeo: function () {
            var posOptions = { timeout: 10000, enableHighAccuracy: false };
            $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                  factory.lp = position.coords.latitude
                  factory.lg = position.coords.longitude
              }, function (err) {
                  toastr.error("Impossible de récupérer les coordonnées de géolocalisation");
              });
        },
        /************************************************************************************************************/

        /*Changer image fav*/
        ChangerImgFav: function (annonce) {
            var url = $("#im_" + annonce._id).attr("src");
            var t2 = url.match("jaime.png");
            if (t2 === null) {
                var nvl = url.replace("jaimepas.png", "jaime.png");
                $("#im_" + annonce._id).attr("src", nvl);
                factory.listAnnFav.push(annonce);
            }
            else {
                var nvl = url.replace("jaime.png", "jaimepas.png");
                $("#im_" + annonce._id).attr("src", nvl);
                for (var i = 0; i < factory.listAnnFav.length; i++) {
                    if (annonce._id === factory.listAnnFav[i]._id) {
                        factory.listAnnFav.splice(i, 1);
                    }
                }

            }
        }
        /************************************************************************************************************/
    };
    return factory;
});
