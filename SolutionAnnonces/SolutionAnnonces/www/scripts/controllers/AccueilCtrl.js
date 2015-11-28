﻿/*Controlleur de la page d'accueil*/
app.controller('AccueilCtrl', function ($scope, $cordovaGeolocation, RegionFctr, AnnonceFctr, RechercheFctr, CategorieFctr, VilleFctr, MotifAbusFctr, toastr) {
    $scope.regions = [];
    $scope.selectedRegion = {};

    /*Redirection*/
    $scope.changeRoute = function (url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        };
    };
    /*************************************************************************************/

    $scope.MapAnnonces = function () {
        $scope.changeRoute("#/mapAnnonces");
    }

    /*Recuperation de la liste des categories*/
    CategorieFctr.listAll().then(function (listCat) {

    }, function (msg) {
        toastr.error(msg, 'Erreur');
    });
    /*************************************************************************************/

    /*Recuperation de la liste des villes*/
    VilleFctr.listAll().then(function (listVil) {

    }, function (msg) {
        toastr.error(msg, 'Erreur');
    });
    /*************************************************************************************/

    /*Recuperation de la liste des regions*/
    RegionFctr.listAll().then(function (listRg) {
        $scope.regions = listRg;
    }, function (msg) {
        toastr.error(msg, 'Erreur');
    });
    /*************************************************************************************/

    /*Recuperation de la liste des motifs*/
    MotifAbusFctr.listAll().then(function (listMt) {

    }, function (msg) {
        toastr.error(msg, 'Erreur');
    });
    /*************************************************************************************/

    /*Recuperer coordonnées GEO*/
    AnnonceFctr.RecupCoordGeo();
    /************************************************************************************/

    /*Selection d'une region a travers le combo*/
    $scope.setRegion = function (region) {
        $scope.selectedRegion = region;
        AnnonceFctr.selectedRegion = region;
        AnnonceFctr.selectedRecherche = null;
        AnnonceFctr.type = 0;
        AnnonceFctr.sortType = 0;
        $scope.changeRoute("#/listOffre");
    };
    /************************************************************************************/
});