app.controller('ListDemandeCtrl', function ($scope) {
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

    /*Redirection automatique vers liste des offres qui est devenu liste des annonces (Offre et demande)*/
    $scope.changeRoute("#/listOffre");
});