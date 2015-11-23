/*Controlleur de la page Recherche sauvegarder*/
app.controller('ListRechercheCtrl', function ($scope, RechercheFctr, RegionFctr, CategorieFctr, CompteFctr, AnnonceFctr, toastr) {
    $scope.Recherche = RechercheFctr.rechercheVide;
    $scope.Recherche.compte = CompteFctr.compte;
    $scope.recherches = [];
    $scope.rechercheASup = [];
    $scope.compte = CompteFctr.compte;
    $scope.regions = RegionFctr.regions;
    $scope.categories = CategorieFctr.categories;
    $scope.selectedRegion = {};
    $scope.selectedCategorie = {};
    $scope.showBtnSave = false;
    $scope.showBtnDelete = false;
    $scope.showBtnEdit = false;
    $scope.showBtnAdd = true;
    $scope.showRech = false;
    $scope.selectedCount = 0;
    $scope.mode = 0;

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
    /*********************************************************************************/

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

    /*Onload : Recuperation de la liste des recherche*/
    if ($scope.compte === null) {
        $scope.recherches = RechercheFctr.recherches;
    }
    else {
        RechercheFctr.ListSelonCpt($scope.compte).then(function (recherches) {
            $scope.recherches = recherches;
        }, function (msg) {
            toastr.error(msg, 'Erreur');
        });
    };
    /********************************************************************************/

    /*Creation de la recherche*/
    $scope.CreateUpdateRech = function () {
        if ($scope.Recherche.title === "") {
            toastr.error(_err_titrerech);
        }
        else {
            if ($scope.Recherche.compte === null) {
                if ($scope.mode === 0) {
                    RechercheFctr.recherches.push($scope.Recherche);
                    toastr.success(_suc_opesuc);
                }
                else {
                    for (var i = 0; i < $scope.recherches.length; i++) {
                        if ($scope.Recherche.title === $scope.recherches[i].title) {
                            $scope.recherches[i] = $scope.Recherche;
                            toastr.success(_suc_opesuc);
                            break;
                        }
                    }
                }
            }
            else {
                if ($scope.mode === 0) {
                    RechercheFctr.Create($scope.Recherche).then(function (recherche) {
                        $scope.Recherche = recherche;
                        RechercheFctr.recherche = recherche;
                        toastr.success(_suc_opesuc);
                        $scope.showDialog = false;
                    }, function (msg) {
                        toastr.error(msg, 'Erreur');
                    });
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
            }
            $scope.Recherche = RechercheFctr.rechercheVide;
            $scope.Recherche.compte = CompteFctr.compte;
            $scope.ShowHideSave();
        };
    };
    /*************************************************************************/

    /*Suppression des recherches en lot*/
    $scope.DeleteList = function () {
        var avecSuccess = false;
        RechercheFctr.recherchesASup = [];
        for (var j = 0; j < $scope.rechercheASup.length; j++) {
            for (var i = 0; i < $scope.recherches.length; i++) {
                if ($scope.recherches[i].title === $scope.rechercheASup[j].title) {
                    if ($scope.rechercheASup[j].compte === null) {
                        avecSuccess = true;
                    }
                    else {
                        RechercheFctr.recherchesASup.push($scope.rechercheASup[j]);
                    }
                    $scope.recherches.splice(i, 1);
                    $scope.selectedCount = $scope.selectedCount - 1;
                }
            }
        }
        $scope.rechercheASup = [];
        if (RechercheFctr.recherchesASup.length > 0) {
            RechercheFctr.DeleteEnLot().then(function (data) {
                avecSuccess = true;
            }, function (msg) {
                avecSuccess = false;
            });
        }

        if (avecSuccess) {
            $scope.showBtnSave = false;
            $scope.showBtnDelete = false;
            $scope.showBtnEdit = false;
            $scope.showBtnAdd = true;
            $scope.showRech = false;
            toastr.success(_suc_opesuc);
        }
        else {
            toastr.error(_err_delrech, 'Erreur');
        }
        $scope.Recherche = RechercheFctr.rechercheVide;
        $scope.Recherche.compte = CompteFctr.compte;
    };
    /*****************************************************************************************************/

    /*Afficher ou masquer les bouton de modification et de supppression selon la selection*/
    $scope.SelectRech = function ($event, recherche) {
        var check = $event.currentTarget;
        $scope.Recherche = RechercheFctr.rechercheVide;
        $scope.Recherche.compte = CompteFctr.compte;
        if (check.checked) {
            $scope.selectedCount = $scope.selectedCount + 1;
            $scope.rechercheASup.push(recherche);
        }
        else {
            $scope.selectedCount = $scope.selectedCount - 1;
        }

        if ($scope.selectedCount > 0) {
            $scope.showBtnDelete = true;
            $scope.showBtnAdd = false;
        }
        else {
            $scope.showBtnDelete = false;
            $scope.showBtnAdd = true;
        }

        if ($scope.selectedCount === 1) {
            $scope.showBtnEdit = true;
            $scope.Recherche = $scope.recherches[0];
            $scope.selectedRegion = $scope.recherches[0].region;
            $scope.selectedCategorie = $scope.recherches[0].categorie;
        }
        else {
            $scope.showBtnEdit = false;
        }
    };
    /****************************************************************************************************/

    /*Afficher ou masquer les boutons pour ajout criteres de recherche */
    $scope.ShowHideSave = function () {
        $scope.showBtnSave = !$scope.showBtnSave;
        $scope.showBtnAdd = !$scope.showBtnAdd;
        $scope.showBtnEdit = false;
        $scope.showBtnDelete = false;
        $scope.mode = 0;
    };
    /*******************************************************************************/

    /*Afficher ou masquer les boutons pour modification criteres de recherche */
    $scope.ShowModif = function () {
        $scope.showBtnSave = !$scope.showBtnSave;
        $scope.showBtnAdd = false;
        $scope.showBtnEdit = false;
        $scope.showBtnDelete = false;
        $scope.mode = 1;
    };
    /*******************************************************************************/

    /*Redirection vers le resultats de la recherche sauvegarder*/
    $scope.ShowResultatRecherche = function (recherche) {
        RechercheFctr.selectedRecherche = recherche;
        AnnonceFctr.selectedRecherche = recherche;
        AnnonceFctr.selectedRegion = null;
        $scope.changeRoute("#/listOffre");
    };
    /*****************************************************************************************************/
});
