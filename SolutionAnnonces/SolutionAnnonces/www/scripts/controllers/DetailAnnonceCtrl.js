/*Controlleur de la page détails annonce*/
app.controller('DetailAnnonceCtrl', function ($scope, AnnonceFctr, PhotoFctr, toastr) {
    $scope.selectedAnnonce = AnnonceFctr.selectedAnnonce;
    $scope.photos = [];
    $scope.showMenu = false;
    $scope.showDialog = false;

    /*Recuperation de la liste des photo de l'annonce*/

    PhotoFctr.ListSelonAnn($scope.selectedAnnonce.id).then(function (listPhoto) {
        $scope.photos = listPhoto;
    }, function (msg) {
        toastr.error(msg, 'Erreur');
    });
    /*******************************************************************************/

    /*Suppression de l'annonce et toutes ses dépendance*/
    $scope.DeleteAnnonce = function () {
        AnnonceFctr.DeleteWithDep($scope.selectedAnnonce.id).then(function (data) {
            if (data) {
                toastr.success(_suc_opesuc);
                $scope.ShowHideDialog();
            }
        }, function (msg) {
            toastr.error(msg, 'Erreur');
            $scope.ShowHideDialog();
        });
    };
    /****************************************************************************/



    /*Appel telephonique*/
    $scope.Call = function (number) {
        window.plugins.CallNumber.callNumber(function () { }, function (error) { alert(error) }, number);
    };
    /********************************************************************************/

    /*Partage de l'anonce sous divers forme */
    $scope.Share = function (message, subject, urlImg) {
        window.plugins.socialsharing.share(message, subject, urlImg, null);
    };
    /*******************************************************************************/

    /*Afficher ou masquer le menu droite*/
    $scope.ShowHideMenu = function () {
        $scope.showMenu = !$scope.showMenu;
    };
    /******************************************************************************/

    /*Afficher le dialogue de suppression*/
    $scope.ShowHideDialog = function () {
        $scope.showDialog = !$scope.showDialog
        $scope.showMenu = false;
    };
    /******************************************************************************/
});
