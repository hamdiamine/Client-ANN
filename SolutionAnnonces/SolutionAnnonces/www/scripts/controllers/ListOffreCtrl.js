/*Controlleur de la page liste annonce*/
app.controller('ListOffreCtrl', function ($scope, AnnonceFctr, RechercheFctr, RegionFctr, CategorieFctr, CompteFctr, toastr) {
    $scope.selectedRecherche = RechercheFctr.selectedRecherche;
    $scope.Recherche = { 'title': "", 'compte': CompteFctr.compte };
    $scope.listOfrP = [];
    $scope.regions = RegionFctr.regions;
    $scope.categories = CategorieFctr.categories;
    $scope.selectedRegion = {};
    $scope.selectedCategorie = {};
    $scope.page = 0;
    $scope.sortType = 0;
    $scope.showBtn = true;
    $scope.ShowMenu = null;
    $scope.showRech = false;
    $scope.showDialog = false;

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
    /***************************************************************************/

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

    /*Onload : Recuperation de la liste des offre selon region*/
    if (RechercheFctr.selectedRecherche === null) {
        AnnonceFctr.ListoffreP($scope.page).then(function (offres) {
            $scope.listOfrP = offres;
        }, function (msg) {
            toastr.error(msg, 'Erreur');
        });
    }
    else {

        AnnonceFctr.ListSelonRech($scope.selectedRecherche).then(function (offres) {
            $scope.listOfrP = offres;
        }, function (msg) {
            toastr.error(msg, 'Erreur');
        });
        RechercheFctr.selectedRecherche = null;
    };
    /**************************************************************************/

    /*Cumuler les offres par page lors du scrollbar*/
    $scope.AddToListOfreP = function () {
        $scope.page = $scope.page + 1;
        OffreFctr.listOfrP($scope.page).then(function (offres) {
            $scope.listOfrP += offres;
        }, function (msg) {
            toastr.error(msg, 'Erreur');
        });
    };
    /*************************************************************************/

    /*Sort by date*/
    $scope.ListSortByDate = function () {
        if (AnnonceFctr.sortType === 1) {
            AnnonceFctr.sortType = 2;
        } else {
            AnnonceFctr.sortType = 1;
        }
        AnnonceFctr.ListoffreP($scope.page).then(function (offres) {
            $scope.listOfrP = offres;
        }, function (msg) {
            toastr.error(msg, 'Erreur');
        });
        $scope.ShowMenu = false;
    };
    /*************************************************************************/

    /*Sort by prix*/
    $scope.ListSortByPrix = function () {
        if (AnnonceFctr.sortType === 3) {
            AnnonceFctr.sortType = 4;
        } else {
            AnnonceFctr.sortType = 3;
        }
        AnnonceFctr.ListoffreP($scope.page).then(function (offres) {
            $scope.listOfrP = offres;
        }, function (msg) {
            toastr.error(msg, 'Erreur');
        });
        $scope.ShowMenu = false;
    };
    /*************************************************************************/

    /*Creation de la recherche*/
    $scope.CreateRecherche = function () {
        if ($scope.Recherche.title === "") {
            toastr.error(_err_titrerech);
        }
        else {
            if ($scope.Recherche.compte === null) {
                RechercheFctr.recherches.push($scope.Recherche);
            }
            else {
                RechercheFctr.Create($scope.Recherche).then(function (recherche) {
                    $scope.Recherche = recherche;
                    RechercheFctr.recherche = recherche;
                    toastr.success(_suc_opesuc);
                    $scope.showDialog = false;
                }, function (msg) {
                    toastr.error(msg, 'Erreur');
                });
            }

        };
    };
    /*************************************************************************/

    /*Mise a jour de la recherche*/
    $scope.UpdateRecherche = function () {
        if ($scope.Recherche.titre === null) {
            toastr.error(_err_titrerech);
        }
        else {
            RechercheFctr.Update($scope.Recherche).then(function (recherche) {
                $scope.Recherche = recherche;
                RechercheFctr.recherche = recherche;
                toastr.success(_suc_opesuc);
                $scope.showDialog = false;
            }, function (msg) {
                toastr.error(msg, 'Erreur');
            });
        }
    };
    /*************************************************************************/

    /*Naviguer vers la page details offre*/
    $scope.showDetails = function (offre) {
        AnnonceFctr.selectedAnnonce = offre;
        $scope.changeRoute("#/detailAnnonce");
    };
    /*************************************************************************/

    /*Afficher ou masquer le bouton de sauvegarde dans la bar en haut*/
    $scope.ShowHideBtn = function () {
        $scope.showBtn = !$scope.showBtn;
    };
    /************************************************************************/

    /*Afficher ou masquer le menu à droite*/
    $scope.ShowHideMenu = function () {
        $scope.ShowMenu = !$scope.ShowMenu;
    };
    /************************************************************************/

    /*Afficher ou masquer le bouton recherche*/
    $scope.ShowHideRech = function () {
        $scope.showRech = !$scope.showRech;
        $scope.ShowHideBtn();
        $scope.ShowMenu = false;
    };
    /************************************************************************/

    /*Reintialiser l'affichage des bouton*/
    $scope.ForcedRech = function () {
        $scope.showRech = true;
        $scope.showBtn = false;
    }
    /************************************************************************/

    /*Afficher le dialogue de sauvegarde*/
    $scope.ShowHideDialog = function () {
        $scope.showDialog = !$scope.showDialog;
        $scope.ShowMenu = false;
    };
    /******************************************************************************/
});