app.controller('MapAnnoncesCtrl', function ($scope, AnnonceFctr, RechercheFctr, CategorieFctr, RegionFctr, CompteFctr, toastr) {

    $scope.Recherche = RechercheFctr.rechercheVide;
    $scope.Recherche.compte = CompteFctr.compte;
    $scope.geo = [AnnonceFctr.lp, AnnonceFctr.lg];
    $scope.Recherche.laptitude = AnnonceFctr.lp;
    $scope.Recherche.longitude = AnnonceFctr.lg;
    $scope.listAnn = [];
    $scope.selectedRegion = {};
    $scope.selectedCategorie = {};
    $scope.page = 0;
    $scope.sortType = 0;
    $scope.showRech = false;
    $scope.showBtn = true;
    $scope.regions = RegionFctr.regions;
    $scope.categories = CategorieFctr.categories;

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

    /*Selection d'une region a travers le combo*/
    $scope.setRegion = function (region) {
        $scope.selectedRegion = region;
        $scope.Recherche.region = region;
        showHideListCombo('#listReg');
    };
    /************************************************************************************/

    /*Selection d'une categarie depuis le combo*/
    $scope.setCategorie = function (categorie) {
        $scope.selectedCategorie = categorie;
        $scope.Recherche.categorie = categorie;
        showHideListCombo('#listCat');
    };
    /******************************************************************************/

    /*Lancer la recherche*/
    $scope.LancerRecherche = function () {
        AnnonceFctr.selectedRecherche = $scope.Recherche;
        $scope.page = 0;
        AnnonceFctr.sortType = 0;
        AnnonceFctr.ListoffreP($scope.page).then(function (anns) {
            $scope.listAnn = anns;
            $scope.ShowHideRech();
        }, function (msg) {
            toastr.error(msg, 'Erreur');
            $scope.ShowHideRech();
        });

    };
    /************************************************************************/

    /*Afficher ou masquer le bouton de sauvegarde dans la bar en haut*/
    $scope.ShowHideBtn = function () {
        $scope.showBtn = !$scope.showBtn;
    };
    /************************************************************************/

    /*Afficher ou masquer le bouton recherche*/
    $scope.ShowHideRech = function () {
        $scope.showRech = !$scope.showRech;
        $scope.ShowHideBtn();
    };
    /************************************************************************/
});