/*Controlleur de la page détails annonce*/
app.controller('DetailAnnonceCtrl', function ($scope, $cordovaSocialSharing, $cordovaContacts, $cordovaEmailComposer, AnnonceFctr, PhotoFctr, CompteFctr, toastr) {
    $scope.selectedAnnonce = AnnonceFctr.selectedAnnonce;
    $scope.photoZoom = {};
    $scope.photos = [];
    $scope.showMenu = false;
    $scope.showDialog = false;
    $scope.showZoom = false;
    $scope.connexion = true;
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
    if ($scope.selectedAnnonce.photos === undefined) {
        PhotoFctr.ListSelonAnn($scope.selectedAnnonce.id).then(function (listPhoto) {
            $scope.photos = listPhoto;
            $scope.connexion = true;
        }, function (msg) {
            $scope.connexion = false;
        });
    }
    else {
        $scope.photos = $scope.selectedAnnonce
    }
    /****************************************************************************************/

    /*Initialise carousel pour ngrepeat*/
    $scope.carouselInitializer = function () {
        var owl = $("#owl-demo");

        owl.owlCarousel({
            items: 3, //10 items above 1000px browser width
            itemsDesktop: [1000, 5], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 3], // betweem 900px and 601px
            itemsTablet: [600, 2], //2 items between 600 and 0
            itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
        });

        // Custom Navigation Events
        $(".next").click(function () {
            owl.trigger('owl.next');
        })
        $(".prev").click(function () {
            owl.trigger('owl.prev');
        })
        $(".play").click(function () {
            owl.trigger('owl.play', 1000); //owl.play event accept autoPlay speed as second parameter
        })
        $(".stop").click(function () {
            owl.trigger('owl.stop');
        })
    };
    /******************************************************************/

    /*Suppression de l'annonce et toutes ses dépendance*/
    $scope.DeleteAnnonce = function () {
        AnnonceFctr.DeleteWithDep($scope.selectedAnnonce.id).then(function (data) {
            if (data) {
                toastr.success(_suc_opesuc);
                $scope.ShowHideDialog();
            }
            $scope.connexion = true;
        }, function (msg) {
            $scope.connexion = false;
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

    /*Affiche zoom*/
    $scope.ShowZoom = function (photo) {
        $scope.showZoom = !$scope.showZoom;
        $scope.photoZoom = photo;
    }
    /******************************************************************************/

    /*Hide zoom*/
    $scope.HideZoom = function () {
        $scope.showZoom = !$scope.showZoom;
    }
    /******************************************************************************/
});
