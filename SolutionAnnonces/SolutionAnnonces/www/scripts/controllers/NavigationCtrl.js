/*Cotrolleur pour la navigation a partir du menu gauche*/
app.controller('NavigationCtrl', function ($scope, AnnonceFctr, toastr) {
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
    /********************************************************************************************/

    /*Navigation depuis le menu principale et effets visuels*/
    $scope.NavigateTo = function (url) {
        if (url === "#/listOffre") {
            AnnonceFctr.selectedRecherche = null;
            AnnonceFctr.selectedRegion = null;
            AnnonceFctr.type = 0;
            AnnonceFctr.sortType = 0;
        }
        else if (url === "#/listDemande") {
            AnnonceFctr.selectedRecherche = null;
            AnnonceFctr.selectedRegion = null;
            AnnonceFctr.type = 1;
            AnnonceFctr.sortType = 0;
        }
        $scope.changeRoute(url);
        RetourPage();
    }
    /*******************************************************************************************/
});