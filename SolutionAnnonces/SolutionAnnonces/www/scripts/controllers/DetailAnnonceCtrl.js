/*Controlleur de la page détails annonce*/
app.controller('DetailAnnonceCtrl', function ($scope, $cordovaSocialSharing, $cordovaContacts, $cordovaEmailComposer, AnnonceFctr, PhotoFctr, CompteFctr, toastr) {
    $scope.selectedAnnonce = AnnonceFctr.selectedAnnonce;
    $scope.photos = [];
    $scope.showMenu = false;
    $scope.showDialog = false;
    $scope.devise = devise;
    $scope.compte = CompteFctr.compte;
    $scope.contact = {
        "displayName": AnnonceFctr.selectedAnnonce.pseudo,
        "phoneNumbers": [
            {
                "value": AnnonceFctr.selectedAnnonce.numTel,
                "type": "mobile"
            }
        ],
        "emails": [
            {
                "value": AnnonceFctr.selectedAnnonce.email,
                "type": "home"
            }
        ]
    };

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

    /*Creation contact*/
    $scope.CreateContact = function () {
        $cordovaContacts.save($scope.contact).then(function (result) {
            toastr.success(_suc_opesuc);
            $scope.showMenu = false;
        }, function (err) {
            toastr.error(err.message, 'Erreur');
            $scope.showMenu = false;
        });
    }
    /***************************************************************************/

    /*Appel telephonique*/
    $scope.Call = function () {
        window.plugins.CallNumber.callNumber(function () {
        }, function (error) {
            toastr.error(error.message, 'Erreur')
        }, $scope.selectedAnnonce.numTel);
    };
    /********************************************************************************/

    /*Partage de l'anonce sous divers forme */
    $scope.Share = function (message, subject, urlImg) {
        $cordovaSocialSharing.share(message, subject, null, urlImg).then(function (result) {
            // Success!
        }, function (err) {
            toastr.error(err.message, 'Erreur')
        });
    };
    /*******************************************************************************/


    /*Envoi mail*/
    $scope.EnvoiMail = function () {
        $cordovaEmailComposer.isAvailable().then(function () {
            var email = {
                to: AnnonceFctr.selectedAnnonce.email,
                isHtml: true
            };
            $cordovaEmailComposer.open(email).then(null, function () {
                // user cancelled email
            });
        }, function () {
            toastr("Service mailing de l'appareil n'est pas valable")
        });
        
    }
    /****************************************************************************/

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
