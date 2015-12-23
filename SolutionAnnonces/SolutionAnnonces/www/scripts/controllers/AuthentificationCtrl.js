/*Controlleur de la page Abus*/
app.controller('AuthentificationCtrl', function ($scope, CompteFctr, toastr) {
    $scope.mail = null;
    $scope.mdp = null;
    $scope.compte = CompteFctr.compte;
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

    /*Se connecter*/
    $scope.Connecte = function () {
        CompteFctr.Authentification($scope.mail, $scope.mdp).then(function (compte) {
            $scope.connexion = true;
            if (compte === null || compte === "") {
                toastr.error(_err_conn, 'Erreur');
            }
            else {
                toastr.success(_suc_opesuc);
            }

        }, function (msg) {
            $scope.connexion = false;
            toastr.error(msg, 'Erreur');
        });
        $scope.changeRoute("#/");
    };
    /********************************************************************/

    /*Se deconnecter*/
    $scope.Deconnecte = function () {

    };
    /*******************************************************************/
});