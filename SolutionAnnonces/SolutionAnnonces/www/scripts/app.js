var app = angular.module('app', ['ngRoute', 'ngCordova', 'ngAnimate', 'toastr', 'ocNgRepeat']);

/*Centre dispatching des pages de l'application*/
app.config(function ($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'partial/accueil.html', controller: 'AccueilCtrl' })
      .when('/listOffre', { templateUrl: 'partial/listOffre.html', controller: 'ListOffreCtrl' })
      .when('/nvlAnnonce', { templateUrl: 'partial/nvlAnnonce.html', controller: 'NvlAnnonceCtrl' })
      .when('/detailAnnonce', { templateUrl: 'partial/detailAnnonce.html', controller: 'DetailAnnonceCtrl' })
      .when('/mail', { templateUrl: 'partial/mail.html', controller: 'MailCtrl' })
      .when('/abus', { templateUrl: 'partial/abus.html', controller: 'AbusCtrl' })
      .when('/authentification', { templateUrl: 'partial/authentification.html', controller: 'AuthentificationCtrl' })
      .when('/listDemande', { templateUrl: 'partial/listDemande.html', controller: 'ListDemandeCtrl' })
      .when('/listAnnoncesFav', { templateUrl: 'partial/listAnnoncesFav.html', controller: 'ListAnnoncesFavCtrl' })
      .when('/annonceEnLigne', { templateUrl: 'partial/annonceEnLigne.html', controller: 'AnnonceEnLigneCtrl' })
      .when('/listRecherche', { templateUrl: 'partial/listRecherche.html', controller: 'ListRechercheCtrl' })
      .when('/mapAnnonces', { templateUrl: 'partial/mapAnnonces.html', controller: 'MapAnnoncesCtrl' })
      .otherwise({ redirectTo: '/' });

    ['uiGmapGoogleMapApiProvider', function (GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
});
/***************************************************************************************************************************/