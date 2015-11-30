/*Controlleur de la page nouvelle annonce*/
app.controller('NvlAnnonceCtrl', function ($scope, $cordovaCamera, $cordovaFileTransfer, $cordovaFile, $cordovaGeolocation, AnnonceFctr, CategorieFctr, RegionFctr, VilleFctr, toastr) {
    $scope.nouvelAnnonce = { "etat": 0 };
    $scope.categories = CategorieFctr.categories;
    $scope.villes = VilleFctr.villes;
    $scope.selectedCategorie = {};
    $scope.selectedVille = {};
    $scope.inc = 0;
    $scope.date = new Date();
    $scope.geo = [AnnonceFctr.lp, AnnonceFctr.lg];
    $scope.photos = [];

    /*Initialise carousel pour ngrepeat*/
    $scope.carouselInitializer = function () {
        var owl = $("#owl-demo");

        owl.owlCarousel({
            items: 10, //10 items above 1000px browser width
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
    /*************************************************************************************/

    /*Selection d'une categarie depuis le combo*/
    $scope.setCategorie = function (categorie) {
        $scope.selectedCategorie = categorie;
        $scope.nouvelAnnonce.categorie = categorie;
        showHideListCombo('#listCat');
    };
    /******************************************************************************/

    /*Selection d'une ville depuis le combo*/
    $scope.setVille = function (ville) {
        $scope.selectedVille = ville;
        $scope.nouvelAnnonce.ville = ville;
        $scope.nouvelAnnonce.region = ville.region;
        if ($scope.nouvelAnnonce.region === null) {
            RegionFctr.getByVil(ville.id).then(function (rg) {
                $scope.nouvelAnnonce.region = rg;
            }, function (msg) {
                toastr.error(msg, 'Erreur');
            });
        }
        showHideListCombo('#listVil');
    };
    /*****************************************************************************/

    /*Validation de la creation d'une annonce*/
    $scope.createAnnonce = function () {
        AnnonceFctr.Create($scope.nouvelAnnonce).then(function (nvlAnn) {
            $scope.nouvelAnnonce = nvlAnn;
            AnnonceFctr.selectedAnnonce = nvlAnn;
            toastr.success(_suc_opesuc);
        }, function (msg) {
            toastr.error(msg, 'Erreur');
        });
    };
    /*****************************************************************************/

    /*Rafraichissement des coordonnées GEO*/
    $scope.RafraichGeo = function () {
        if ($scope.lp === null) {
            AnnonceFctr.RecupCoordGeo();
            $scope.geo = [AnnonceFctr.lp, AnnonceFctr.lg];
        }

    }
    /************************************************************************************************************/

    /*importer photo depuis gallery*/
    $scope.importPhoto = function () {
        var options = {
            quality: 50,
            targetWidth: 800,
            targetHeight: 800,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
            $scope.inc = $scope.inc + 1;
            $cordovaFileTransfer.download(imageURI, cordova.file.dataDirectory + $scope.inc + ".jpg", {}, true).then(
                           function (fileEntry) {
                               alert("transfert : " + fileEntry.nativeURL)
                               $scope.newImg = {};
                               $scope.newImg = { 'inc': $scope.inc, 'uri': fileEntry.nativeURL };
                               $scope.listNewIm.push($scope.newImg);
                           },
                           function (error) {
                               toastr.error(error, 'Erreur');
                           }
                       );


        }, function (err) {
            toastr.error("Une erreur est survenue lors du chargement de l'image: Code = " + err.code, "Erreur");
            console.log('Failed because: ');
            console.log(err);
        });
    };
    /******************************************************************************************************/

    /*prendre photo depuis camera*/
    $scope.capturePhoto = function () {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
        };

        $cordovaCamera.getPicture(options).then(function (imageURI) {
            $scope.newImg = {};
            $scope.inc = $scope.inc + 1;
            $scope.newImg = { 'num': $scope.inc, 'uri': imageURI };
            $scope.photos.push($scope.newImg);

        }, function (err) {
            toastr.error("Une erreur est survenue lors du chargement de l'image: Code = " + err.code, "Erreur");
        });
    };
    /************************************************************************************************************/
});