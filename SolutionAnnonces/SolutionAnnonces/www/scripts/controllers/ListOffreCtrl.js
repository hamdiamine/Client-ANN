/*Controlleur de la page liste annonce*/
app.controller('ListOffreCtrl', function ($scope, AnnonceFctr, RechercheFctr, RegionFctr, CategorieFctr, CompteFctr, toastr) {
    $scope.selectedRecherche = RechercheFctr.selectedRecherche;
    $scope.Recherche = RechercheFctr.rechercheVide;
    $scope.Recherche.compte = CompteFctr.compte;
    $scope.listAnnP = [];
    $scope.regions = [];
    $scope.categories = [];
    //$scope.villes = [];
    $scope.selectedRegion = {};
    $scope.selectedCategorie = {};
    $scope.page = 1;
    $scope.sortType = 0;
    $scope.showBtn = true;
    $scope.ShowMenu = null;
    $scope.showRech = false;
    $scope.showDialog = false;
    $scope.connexion = true;
    $scope.devise = devise;
    $scope.showLoading = true;

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


    /*Recuperation de la liste des categories*/
    CategorieFctr.listAll().then(function (listCat) {
        $scope.categories = listCat;
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
    });
    /*************************************************************************************/

    /*Recuperation de la liste des villes*/
    /*
    VilleFctr.listAll().then(function (listVil) {
        $scope.villes = listVil;
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
    AnnonceFctr.ListAnnP($scope.page).then(function (annonces) {
        $scope.showLoading = false;
        $scope.listAnnP = annonces;
        AnnonceFctr.listAnn = annonces;
        $scope.page = $scope.page + 1;
        $scope.connexion = true;
        
    }, function (msg) {
        $scope.connexion = false;
        $scope.showLoading = false;
    });
    /**************************************************************************/

    /*Cumuler les offres par page lors du scrollbar*/
    $scope.addToListOfreP = function () {
        if ($scope.page > 1) {
            $scope.showLoading = true;
            AnnonceFctr.ListAnnP($scope.page).then(function (annonces) {
                $scope.showLoading = false;
                AnnonceFctr.listAnnP = AnnonceFctr.listAnnP.concat(annonces);
                AnnonceFctr.listAnn = $scope.listAnnP;
                $scope.page = $scope.page + 1;
                $scope.connexion = true;
            }, function (msg) {
                $scope.connexion = false;
                $scope.showLoading = false;
                toastr.error(msg, 'Erreur');
            });
        }
        
    };
    /*************************************************************************/

    /*Sort by date*/
    $scope.ListSortByDate = function () {
        AnnonceFctr.sortType = 0;
        if (AnnonceFctr.sortOrient === 1) {
            AnnonceFctr.sortOrient = -1;
        } else {
            AnnonceFctr.sortOrient = 1;
        }
        $scope.showLoading = true;
        $scope.page = 1;
        AnnonceFctr.ListAnnP($scope.page).then(function (annonces) {
            $scope.showLoading = false;
            $scope.listAnnP = annonces;
            AnnonceFctr.listAnn = $scope.listAnnP;
            $scope.connexion = true;
        }, function (msg) {
            $scope.connexion = false;
            $scope.showLoading = false;
            toastr.error(msg, 'Erreur');
        });
        $scope.ShowMenu = false;
    };
    /*************************************************************************/

    /*Sort by prix*/
    $scope.ListSortByPrix = function () {
        AnnonceFctr.sortType = 1;
        if (AnnonceFctr.sortOrient === 1) {
            AnnonceFctr.sortOrient = -1;
        } else {
            AnnonceFctr.sortOrient = 1;
        }
        $scope.showLoading = true;
        $scope.page = 1;
        AnnonceFctr.ListAnnP($scope.page).then(function (annonces) {
            $scope.showLoading = false;
            $scope.listAnnP = annonces;
            AnnonceFctr.listAnn = $scope.listAnnP;
            $scope.connexion = true;
        }, function (msg) {
            $scope.connexion = false;
            $scope.showLoading = false;
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
                toastr.success(_suc_opesuc);
                $scope.showDialog = false;
                $scope.ShowHideRech();
            }
            else {
                $scope.showLoading = true;
                RechercheFctr.Create($scope.Recherche).then(function (recherche) {
                    $scope.Recherche = recherche;
                    RechercheFctr.recherche = recherche;
                    toastr.success(_suc_opesuc);
                    $scope.showDialog = false;
                    $scope.ShowHideRech();
                    $scope.connexion = true;
                    $scope.showLoading = false;
                }, function (msg) {
                    $scope.connexion = false;
                    $scope.showLoading = false;
                    toastr.error(msg, 'Erreur');
                });
            }
            $scope.Recherche = RechercheFctr.rechercheVide;
            $scope.Recherche.compte = CompteFctr.compte;
        }
    };
    /*************************************************************************/

    /*Mise a jour de la recherche*/
    $scope.UpdateRecherche = function () {
        if ($scope.Recherche.titre === null) {
            toastr.error(_err_titrerech);
        }
        else {
            $scope.showLoading = true;
            RechercheFctr.Update($scope.Recherche).then(function (recherche) {
                $scope.Recherche = recherche;
                RechercheFctr.recherche = recherche;
                toastr.success(_suc_opesuc);
                $scope.showDialog = false;
                $scope.connexion = true;
                $scope.showLoading = false;
            }, function (msg) {
                $scope.connexion = false;
                $scope.showLoading = false;
                toastr.error(msg, 'Erreur');
            });
        }
    };
    /*************************************************************************/

    /*Lancer la recherche*/
    $scope.LancerRecherche = function () {
        AnnonceFctr.selectedRecherche = $scope.Recherche;
        $scope.page = 1;
        AnnonceFctr.sortType = 0;
        AnnonceFctr.sortOrient = 1;
        $scope.showLoading = true;
        AnnonceFctr.ListAnnP($scope.page).then(function (annonces) {
            $scope.showLoading = false;
            $scope.listAnnP = annonces;
            $scope.page = $scope.page + 1;
            AnnonceFctr.listAnn = $scope.listAnnP;
            $scope.ShowHideRech();
            $scope.connexion = true;
        }, function (msg) {
            $scope.connexion = false;
            $scope.showLoading = false;
            toastr.error(msg, 'Erreur');
        });
    };
    /************************************************************************/

    /*Naviguer vers la page details offre*/
    $scope.showDetails = function (annonce, index) {
        AnnonceFctr.selectedAnnonce = annonce;
        AnnonceFctr.index = index;
        $scope.changeRoute("#/detailAnnonce");
    };
    /*************************************************************************/

    /*javascript utile pour la modification de l'image favoris dans la liste annonce*/
    $scope.favorisimage = function (annonce) {
        AnnonceFctr.ChangerImgFav(annonce);
    };
    /*****************************************************************************/

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