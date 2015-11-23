/*Controlleur de la page d'accueil*/
app.controller('AccueilCtrl', function ($scope, RegionFctr, AnnonceFctr, RechercheFctr, CategorieFctr, VilleFctr, toastr) {
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

    /*Recuperation de la liste des categories*/
    CategorieFctr.listAll().then(function (listCat) {
        CategorieFctr.categories = listCat;
    }, function (msg) {
        toastr.error(msg, 'Erreur');
    });
    /*************************************************************************************/

    /*Recuperation de la liste des villes*/
    VilleFctr.listAll().then(function (listVil) {
        VilleFctr.villes = listVil;
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

    /*Selection d'une region a travers le combo*/
    $scope.setRegion = function (region) {
        $scope.selectedRegion = region;
        AnnonceFctr.selectedRegion = region;
        AnnonceFctr.selectedRecherche = null;
        AnnonceFctr.sortType = 0;
        $scope.changeRoute("#/listOffre");
    };
    /************************************************************************************/
});