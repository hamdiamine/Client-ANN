/*Variables globales*/
var urlService = "http://197.7.58.195:8081";
var devise = "€";
/****************************************************************************/

/*Messages*/
var _err_listofr = "Impossible de récupérer la liste des offres";
var _err_listdem = "Impossible de récupérer la liste des demandes";
var _err_listreg = "Impossible de récupérer la liste des régions";
var _err_listcat = "Impossible de récupérer la liste des catégories";
var _err_listvil = "Impossible de récupérer la liste des villes";
var _err_listphoto = "Impossible de récupérer les photos";
var _err_crann = "Problème lors de la création de l'annonce";
var _err_crrech = "Problème lors de la création de la recherche";
var _err_delphoto = "Problème lors de la suppression des photos";
var _err_delann = "Problème lors de la suppression de l'annonce";
var _err_delrech = "Problème lors de la suppression de la recherche";
var _err_uprech = "Problème lors de la mise à jour de la recherche";
var _suc_opesuc = "Opération effectuer avec succès";
var _war_gps = "L'option POSITION n'est pas activer, la fonction de géolocalisation ne sera pas disponible";
var _err_touschamps = "Veuillez renseigner tous les champs obligatoires (*)";
var _err_titrerech = "Veuillez renseigner le titre de la recherche"
/****************************************************************************/

/*javascript utile pour la modification de l'image favoris dans la liste annonce*/
function favorisimage(img) {
    var t = img.src;
    var t2 = img.src.match(/jaime.png/);
    img.src = img.src.match(/jaime.png/) ?
              img.src.replace(/jaime.png/, "jaimepas.png") :
              img.src.replace(/jaimepas.png/, "jaime.png");
}
/*****************************************************************************/

/*javascript du slide des image détails annonces*/
$(".start-slide").click(function () {
    $("#myCarousel").carousel('cycle');
});
// Stops the carousel
$(".pause-slide").click(function () {
    $("#myCarousel").carousel('pause');
});
// Cycles to the previous item
$(".prev-slide").click(function () {
    $("#myCarousel").carousel('prev');
});
// Cycles to the next item
$(".next-slide").click(function () {
    $("#myCarousel").carousel('next');
});
// Cycles the carousel to a particular frame 
$(".slide-one").click(function () {
    $("#myCarousel").carousel(0);
});
$(".slide-two").click(function () {
    $("#myCarousel").carousel(1);
});
$(".slide-three").click(function () {
    $("#myCarousel").carousel(2);
});

function previousImg() {
    $("#myCarousel").carousel('prev');
}

function nextImg() {
    $("#myCarousel").carousel('next');
}
/************************************************/

/*Afficher le menu principal à gauche avec l'animation*/
function AfficheMenu() {
    var article = $("#principal");
    article.attr("class", "articleafter");

    var princ = $('#menuP');
    princ.attr("class", "menu menuafter");
}
/******************************************************************************/

/*MAsquer le menu principal à gauche et faire retourner la page a son etat d'affichage normal*/
function RetourPage() {
    var article = $("#principal");
    article.attr("class", "retour");

    var princ = $('#menuP');
    princ.attr("class", "menu");
}

/**********************************************************************************************/

/*Util pour le dropdown list*/
function showHideListCombo(id) {
    var t = $(id);

    if (t.attr("class").match(/affichcombo/)) {
        t.attr("class", "chosen-drop");
    }
    else {
        t.attr("class", "chosen-drop affichcombo");
    }
}
/**********************************************************************************************/

/*Gestion des exception*/
function decodeExp(exp) {
    /*TODO : HKH : 17-11-2015 : Gérer les exceptions par type et par code*/
    return exp.message;
}
/**********************************************************************************************/