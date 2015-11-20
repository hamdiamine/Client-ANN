/*Controlleur de la page Recherche sauvegarder*/
app.controller('ListRechercheCtrl', function ($scope, RechercheFctr, CompteFctr, toastr) {
    $scope.recherches = [];
    $scope.compte = CompteFctr.compte;
    $scope.showBtnSave = false;
    $scope.showBtnDelete = false;
    $scope.showBtnEdit = false;
    $scope.showBtnAdd = true;
    $scope.showRech = false;
    $scope.selectedCount = 0;

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
    }

    /********************************************************************************/

    /*Afficher ou masquer les boutons pour ajout modification criteres de recherche */
    $scope.ShowHideSave = function () {
        $scope.showBtnSave = !$scope.showBtnSave;
        $scope.showBtnAdd = !$scope.showBtnAdd;
        $scope.showBtnEdit = false;
        $scope.showBtnDelete = false;
    };
    /*******************************************************************************/

    /*Afficher ou masquer les bouton de modification et de supppression selon la selection*/
    $scope.SelectRech = function ($event) {
        var check = $event.currentTarget;
        if (check.checked) {
            $scope.selectedCount = $scope.selectedCount + 1;
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
        }
        else {
            $scope.showBtnEdit = false;
        }
    };
    /****************************************************************************************************/

    /*Redirection vers le resultats de la recherche sauvegarder*/
    $scope.ShowResultatRecherche = function (recherche) {
        RechercheFctr.selectedRecherche = recherche;
        $scope.changeRoute("#/listOffre");
    };
    /***********************************************************************************************************/
});
