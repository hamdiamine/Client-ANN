/*Controlleur de la page Abus*/
app.controller('AbusCtrl', function ($scope, AbusFctr, AnnonceFctr, MotifAbusFctr, toastr) {
    $scope.selectedMotif = {};
    $scope.abus = { annonce: { id: AnnonceFctr.selectedAnnonce.id } };
    $scope.motifs = MotifAbusFctr.motifs;
    $scope.connexion=true;

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

    /*Selection d'une region a travers le combo*/
    $scope.setMotif = function (motif) {
        $scope.selectedMotif = motif;
        $scope.abus.motifAbus = motif;
        showHideListCombo('#listMotif');
    };
    /************************************************************************************/

    /*Creation d'un abus*/
    $scope.CreateAbus = function () {
        AbusFctr.Create($scope.abus).then(function (nvlAbus) {
            $scope.abus = nvlAbus;
            $scope.connexion = true;
            toastr.success(_suc_opesuc);
        }, function (msg) {
            $scope.connexion = false;
            toastr.error(msg, 'Erreur');
        });
        $scope.changeRoute("#/detailAnnonce");
    };
    /*****************************************************************************/
});