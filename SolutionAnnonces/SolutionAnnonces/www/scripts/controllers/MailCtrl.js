﻿/*Controlleur de la page Mail*/
app.controller('MailCtrl', function ($scope, AnnonceFctr, toastr) {
    $scope.adresseMail = AnnonceFctr.selectedOffre.email;
});