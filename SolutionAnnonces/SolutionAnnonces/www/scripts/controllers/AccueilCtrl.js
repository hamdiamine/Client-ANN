/*Controlleur de la page d'accueil*/
app.controller('AccueilCtrl', function ($scope, RegionFctr, AnnonceFctr, RechercheFctr, CategorieFctr, VilleFctr, MotifAbusFctr, toastr) {
    $scope.regions = [];
    $scope.selectedRegion = {};
    $scope.connexion = true;

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
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
    });
    /*************************************************************************************/

    /*Recuperation de la liste des villes*/
    VilleFctr.listAll().then(function (listVil) {
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
    });
    /*************************************************************************************/

    /*Recuperation de la liste des regions*/
    RegionFctr.listAll().then(function (listRg) {
        $scope.regions = listRg;
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
    });
    /*************************************************************************************/

    /*Recuperation de la liste des motifs*/
    MotifAbusFctr.listAll().then(function (listMt) {
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
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

    /*Selection d'une region a travers le combo*/
    $scope.setCodeRegion = function (code) {
        var region = null;
        for (var i = 0; i < $scope.regions.length; i++) {
            if ($scope.regions[i].code === code) {
                region = $scope.regions[i];
                break;
            }
        }
        $scope.setRegion(region);
    };
    /************************************************************************************/

});