/*Controlleur de la page Mail*/
app.controller('MailCtrl', function ($scope, AnnonceFctr, toastr) {
    $scope.adresseMail = AnnonceFctr.selectedAnnonce.email;
    $scope.connexion = true;
});