/*Controlleur de la page nouvelle annonce*/
app.controller('NvlAnnonceCtrl', function ($scope, $cordovaCamera, $cordovaFileTransfer, $cordovaFile, $cordovaGeolocation, AnnonceFctr, CategorieFctr, RegionFctr, VilleFctr, PhotoFctr, toastr) {
    $scope.nouvelAnnonce = { "etat": 0 };
    $scope.categories = [];
    $scope.villes = [];
    $scop.regions = [];
    $scope.selectedCategorie = {};
    $scope.selectedVille = {};
    $scope.inc = 0;
    $scope.date = new Date();
    $scope.geo = [AnnonceFctr.lp, AnnonceFctr.lg];
    $scope.photos = [];
    $scope.connexion = true;
    $scope.showApercus = false;

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

    /*Recuperation de la liste des categories*/
    CategorieFctr.listAll().then(function (listCat) {
        $scope.categories = listCat;
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
    });
    /*************************************************************************************/

    /*Recuperation de la liste des villes*/
    VilleFctr.listAll().then(function (listVil) {
        $scope.villes = listVil;
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
    });
    /*************************************************************************************/

    /*Recuperation de la liste des regions*/
    RegionFctr.listAll().then(function (listRg) {
        $scope.regions = listRg;
        $scope.connexion = true;
    }, function (msg) {
        $scope.connexion = false;
    });
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
        var i;
        for (i = 0; i < RegionFctr.regions.length; pas++) {
            if (RegionFctr.regions[i]._id === ville.regid) {
                $scope.nouvelAnnonce.region = region;
            }
        }
        showHideListCombo('#listVil');
    };
    /*****************************************************************************/

    /*Validation de la creation d'une annonce*/
    $scope.createAnnonce = function () {
        $scope.nouvelAnnonce.photos = $scope.photos;
        AnnonceFctr.Create($scope.nouvelAnnonce).then(function (nvlAnn) {
            $scope.nouvelAnnonce = nvlAnn;
            AnnonceFctr.selectedAnnonce = nvlAnn;
            toastr.success(_suc_opesuc);
            $scope.changeRoute("#/detailAnnonce");
            $scope.connexion = true;
        }, function (msg) {
            $scope.connexion = false;
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

    /*importer photo depuis gallery ou appareil photo*/
    $scope.addPhoto = function (type) {
        var options = {
            quality: 60,
            destinationType: Camera.DestinationType.DATA_URL,
            //allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: photoWidth,
            targetHeight: photoHeigth,
            //popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        if (type === "CAMERA") {
            options.sourceType = Camera.PictureSourceType.CAMERA;
        } else if (type === "PHOTOLIBRARY") {
            options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        }
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.newImg = { num: $scope.photos.length+1};
            $scope.newImg = { 'uri': "data:image/jpeg;base64," + imageData };
            if ($scope.photos.length === 0) {
                $scope.newImg.princ = 1;
            }
            else {
                $scope.newImg.princ = 0;
            }
            $scope.photos.push($scope.newImg);

        }, function (err) {
            toastr.error("Une erreur est survenue lors du chargement de l'image: Code = " + err.code, "Erreur");
        });
    };
    /******************************************************************************************************/

    /*Afficher le popup de l'aperçus*/
    $scope.showHideApercus = function () {
        $scope.showApercus = !$scope.showApercus;
    }
    /***************************************************************************************************/
});