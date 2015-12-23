/*Controlleur de la page liste annonces favoris*/
app.controller('ListAnnoncesFavCtrl', function ($scope, AnnonceFctr) {
    $scope.listAnn = AnnonceFctr.listAnnFav;
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
    /***************************************************************************/

    /*Naviguer vers la page details offre*/
    $scope.showDetails = function (annonce) {
        AnnonceFctr.selectedAnnonce = annonce;
        $scope.changeRoute("#/detailAnnonce");
    };
    /*************************************************************************/

    /*javascript utile pour la modification de l'image favoris dans la liste annonce*/
    $scope.favorisimage = function (annonce) {
        AnnonceFctr.ChangerImgFav(annonce);
        $scope.listAnn = AnnonceFctr.listAnnFav;
    };
    /*****************************************************************************/
});