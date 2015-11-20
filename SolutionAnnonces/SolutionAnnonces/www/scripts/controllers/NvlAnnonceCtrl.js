/*Controlleur de la page nouvelle annonce*/
app.controller('NvlAnnonceCtrl', function ($scope, $cordovaCamera, $cordovaFileTransfer, $cordovaFile, AnnonceFctr, CategorieFctr, VilleFctr, toastr) {
    $scope.nouvelAnnonce = { "etat": 0 };
    $scope.categories = CategorieFctr.categories;
    $scope.villes = VilleFctr.villes;
    $scope.selectedCategorie = {};
    $scope.selectedVille = {};
    $scope.newImg = {};
    $scope.inc = 0;
    $scope.date = new Date();

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

    /*Initialisation de la liste des image (pour test)*/
    $scope.listNewIm = [{ 'inc': 1, 'uri': 'http://lovezphone.e-monsite.com/medias/images/sell-galaxy-s3.jpg' },
                        { 'inc': 2, 'uri': 'http://lovezphone.e-monsite.com/medias/images/sell-galaxy-s3.jpg' },
                        { 'inc': 3, 'uri': 'http://lovezphone.e-monsite.com/medias/images/sell-galaxy-s3.jpg' },
                        { 'inc': 4, 'uri': 'http://lovezphone.e-monsite.com/medias/images/sell-galaxy-s3.jpg' }];


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
            $scope.newImg = { 'inc': $scope.inc, 'uri': imageURI };
            $scope.listNewIm.push($scope.newImg);

        }, function (err) {
            toastr.error("Une erreur est survenue lors du chargement de l'image: Code = " + err.code, "Erreur");
            console.log('Failed because: ');
            console.log(err);
        });
    };
    /************************************************************************************************************/
});