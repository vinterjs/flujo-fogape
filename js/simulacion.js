$(document).ready(function(){
  //solo numeros
  $(".soloNumeros").inputFilter(function(value) {
    return /^-?\d*$/.test(value);
  });
});
  //rut
  var no_permitidas = [
    "!",
    '"',
    "$",
    "%",
    "&",
    "/",
    "(",
    ")",
    "=",
    "?",
    "Ã‚Â¿",
    "*",
    "Ã‚Â¨",
    "^",
    "{",
    "}",
    "Ãƒâ€¡",
    "ÃƒÂ§",
    "Ã‚Âª",
    "Ã‚Âº",
    ",",
    "Dead",
    "Ã‚Â´",
    "+",
    "`",
    "_",
    "@",
    "#",
    "|",
    "Ã‚Â¢",
    "Ã¢Ë†Å¾",
    "Ã‚Â¬",
    "ÃƒÂ·",
    "Ã¢â‚¬Â",
    "Ã¢â€° ",
    "Ã‚Â´"
  ];
  var no_permitidas_eventkey = [192, 222, 16, 220, 186, 187];
  var permitidas_eventkey = [190, 173, 110];
  $("#rut").keyup(function(e) {
    var valorRut = $("#rut").val();
    if (!e.charCode) {
      key = String.fromCharCode(e.which);
    } else {
      key = String.fromCharCode(e.charCode);
    }
    if (
      no_permitidas_eventkey.indexOf(e.keyCode) !== -1 ||
      no_permitidas.indexOf(e.key) !== -1
    ) {
      e.preventDefault();
    }
    if (
      e.keyCode !== 8 &&
      e.keyCode !== 9 &&
      e.keyCode !== 37 &&
      e.keyCode !== 39 &&
      e.keyCode !== 91 &&
      e.keyCode !== 86 &&
      e.keyCode !== 190
    ) {
      if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105) ||
        e.keyCode === 75 ||
        permitidas_eventkey.indexOf(e.keyCode) !== -1
      ) {
        console.log("k");
      } else {
        if (e.keyCode !== 13) {
          if (String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
            valorRut = valorRut.substr(0, valorRut.length - 1);
          }
        }
        vl(valorRut);
      }
    }
    vl(valorRut);
  });
$("#rut").focusout(function() {
  var vrt = $(this).val();
  $(this).val(formatear(vrt));
  if (!$(this).val()) {
    $("#rut").removeClass("invalid valid");
  }
});
function quitar_formato(rut) {
  rut = rut
    .split(" ")
    .join("")
    .split("-")
    .join("")
    .split(".")
    .join("");
  return rut;
}
function formatear(vv) {
  var iniVal = this.quitar_formato(vv);
  var rut_2 = iniVal.substring(0, iniVal.length - 1),
    f = "";
  while (rut_2.length > 3) {
    f = "." + rut_2.substr(rut_2.length - 3) + f;
    rut_2 = rut_2.substring(0, rut_2.length - 3);
  }
  if ($.trim(rut_2) === "") {
    return "";
  } else {
    var ok = rut_2 + f + "-" + iniVal.charAt(iniVal.length - 1);
    if (valida(ok)) {
      $("#rut")
        .removeClass("invalid")
        .addClass("valid");
    } else {
      $("#rut")
        .removeClass("valid")
        .addClass("invalid");
    }
    return rut_2 + f + "-" + iniVal.charAt(iniVal.length - 1);
  }
}
function quitar_formato(rut) {
  rut = rut
    .split(" ")
    .join("")
    .split("-")
    .join("")
    .split(".")
    .join("");
  return rut;
}
function valida(rutValidar) {
  if (
    !/[0-9]{1,3}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}/.test(rutValidar) ||
    /^00*/.test(rutValidar)
  ) {
    $("#rut")
      .removeClass("valid")
      .addClass("invalid");
  } else {
    $("#rut")
      .removeClass("invalid")
      .addClass("valid");
  }
  var tmp = rutValidar.split("-");
  var dv_2 = tmp[1],
    rut_v2 = tmp[0].split(".").join("");
  if (dv_2 === "K" || dv_2 === "k") {
    dv_2 = "k";
  } else {
    dv_2 = parseInt(tmp[1]);
  }
  return dv(rut_v2) === dv_2;
}
function vl(vl) {
  var rut = vl;
  while (rut.charAt(0) === "0") {
    rut = rut.substr(1);
  }
  $("#rut").val(rut);
}
//modal
if ($(".js-modal").length) {
    $('.icon-close').addClass('srt');
    $('.icon-close').addClass('srt-close');
    $("body").on("click", ".js-modal", function(event) {
        event.preventDefault();
        if ($(".modal").hasClass("modal--active")) {
            $(".modal").removeClass("modal--active");
        }
        var target = $(this).attr("href");
        $(target).addClass("modal--active");
    });
    $(".modal").on("click", ".modal__btn, .js-close-modal", function() {
        $(this)
            .parents(".modal")
            .removeClass("modal--active");
    });
    $("body").on("click", function(event) {
        var element = $(event.target);
        if ($(element).hasClass("modal-out")) {
            $(element).removeClass("modal--active");
        }
    });
}
//focus para el label
$(".input-std label").click(function() {
    $(this)
        .parent()
        .find("input")
        .focus();
});
//focus para el label
$(".input-std-textarea label").click(function() {
  $(this)
    .parent()
    .find("textarea")
    .focus();
});
//contador textarea
$(".input-std-textarea > textarea").keyup(function() {
  var valor = $(this).val().length;
  $(this)
    .parent()
    .find(".contador-text")
    .find("span")
    .text(valor);
});
//resize textarea
(function($) {
  $(".resize-textarea")
    .each(function() {
      var $this = $(this);
      $this.css("min-height", $this.css("height"));
      $this.css("overflow", "hidden");
    })
    .on("input paste", function() {
      var $this = $(this);
      var offset = $this.innerHeight() - $this.height();
      if ($this.innerHeight < this.scrollHeight) {
        $this.height(this.scrollHeight - offset);
      } else {
        $this.height(1);
        $this.height(this.scrollHeight - offset);
      }
    });
})(jQuery);
//mail
$(".email").focusout(function() {
    isMail($(this).val(), $(this));
});
function isMail(mail, el) {
    var rg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!rg.test(mail)) {
        if (mail == "") {
            el.removeClass("invalid valid");
            return false;
        } else {
            el.removeClass("valid").addClass("invalid");
            return false;
        }
    } else {
        el.removeClass("invalid").addClass("valid");
        return true;
    }
}
//validacion enviar correo
$("#enviarCorreo").focusout(function(){
    if( $(this).hasClass("valid") ){
        $("#enviarEmail").removeClass("disabled");
    }else if( $(this).hasClass("invalid") ){
        $("#enviarEmail").addClass("disabled");
    }
});
//boton disabled
$(".btn-std").click(function() {
    if ($(this).hasClass("disabled")) {
        return false;
    }
});
//botones redirect
$("#goBack").click(function(){
    window.location.href = "index.html";
});
$("#goFoward").click(function(){
    $(".confirmar, .confirma-datos, .second-step, .declaracion-margenes").removeClass("hidden-block");
    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    $(".btn-end").hide();
});
//SELECT
if ($(".select--style").length) {
  $(".select--style").each(function() {
    styledSelect($(this));
  });

  $(".select--style").on("click", ".select__input", function() {
    var self = $(this);
    $(".select--style")
      .find("ul:first")
      .stop()
      .slideUp(1);
    self
      .parent()
      .find("ul:first")
      .stop()
      .slideToggle();
    self.children(".select__line").toggleClass("line--active");
  });
  $(".select--style").on("click", ".select-value", function() {
    var self = $(this);
    var index = self.parent().index();
    var parent = self.parents(".select--style");
    parent.find(".select-value").removeClass("active");
    parent
      .find("ul:first")
      .stop()
      .slideUp();
    parent.find("select:first")[0].selectedIndex = index;
    self.addClass("active");
    self
      .parent()
      .parent()
      .parent()
      .children(".select__input")
      .children(".select__line")
      .removeClass("line--active");
    if (self.text() === "") {
      self
        .parent()
        .parent()
        .parent()
        .children(".select__input")
        .children("label")
        .removeClass("label--active");
    } else {
      self
        .parent()
        .parent()
        .parent()
        .children(".select__input")
        .children("label")
        .addClass("label--active");
    }
  });
  $(".select__input select").change(function() {
    //console.log("change");
    if ($(this).val() !== "null") {
      $(this)
        .next("label")
        .addClass("label--active");
    } else {
      $(this)
        .next("label")
        .removeClass("label--active");
      $(this).focusout();
    }
  });
  $(".select--style li").click(function() {
    $(this)
      .parent()
      .parent()
      .find("select")
      .trigger("change");
  });
}

// Función que genera el Select con Estilos.
// Ahora se usa esta función para la carga inicial
function styledSelect(el) {
var self = el;
var newListString = "<ul>";
var oldListString = self.html();
var selector = self.find("select");
var firstElement = 1;
var oldList = self.find("ul:first");
if (oldList.length > 0) {
  //console.log("erased!");
  //console.log(oldList);
  oldList.remove();
}

selector.find("option").each(function() {
  var optionLabel = $(this).text();
  if (firstElement) {
    --firstElement;
    newListString += "<li><a class='select-value active'>";
  }
  else{
    newListString += "<li><a class='select-value'>";
  }
  newListString += optionLabel;
  newListString += "</a></li>";
});

newListString += "</ul>";
self.html(oldListString + newListString);
}
// Fin función
    //validacion telefono
  $(".input-std input.telefono").focusout(function() {
    if ($(this).val()) {
      if ($(this).val().length < 8) {
        $(this)
          .addClass("invalid")
          .removeClass("valid");
      } else {
        $(this)
          .removeClass("invalid")
          .addClass("valid");
      }
    } else {
      $(this).removeClass("invalid valid");
    }
  });
//btn print
if(document.getElementById("imprimir-voucher")){
    document.getElementById("imprimir-voucher").addEventListener("click", function(){
        window.print();
    });
}
(function($) {
    $.fn.inputFilter = function(inputFilter) {
      return this.on(
        "input keydown keyup mousedown mouseup select contextmenu drop",
        function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
            this.value = "";
          }
        }
      );
    };
  })(jQuery);

//preexistencias
$("input[name='preexistencias']").click(function(){
  $(".preexistencias").find(".error-span").css("display","none");
  if( $("#preesi").is(':checked') ){
    $(".declarar-preexistencia").slideDown();
  }else{
    $(".declarar-preexistencia").slideUp();
  }
});

//validacion form
var aut_banco = false;
var dec_covid = false;
var man_prorr = false;
var mand_susc = false;
var preex = false;
var preex_text = false;
var con_cond = false
var confir = true;

$("#telefono-end, #email-end").focusout(function(){
  var fono = $("#telefono-end");
  var mail = $("#email-end");
  if(fono.hasClass("valid") && mail.hasClass("valid")){
    confir = true;
  }else{
    confir = false;
  }
  validar();
});

$("#autorizoBanco").click(function(){
  if($(this).is(':checked')){
    aut_banco = true;
    $("#autorizoBanco").parent().find(".error-span").css("display","none");
  }else{
    aut_banco = false;
  }
  validar();
});
$("#decCovid").click(function(){
  if($(this).is(':checked')){
    dec_covid = true;
    $("#decCovid").parent().find(".error-span").css("display","none");
  }else{
    dec_covid = false;
  }
  validar();
});
$("#manProrr").click(function(){
  if($(this).is(':checked')){
    man_prorr = true;
    $("#manProrr").parent().find(".error-span").css("display","none");
  }else{
    man_prorr = false;
  }
  validar();
});
$("#mandSusc").click(function(){
  if($(this).is(':checked')){
    mand_susc = true;
    $("#mandSusc").parent().find(".error-span").css("display","none");
  }else{
    mand_susc = false;
  }
  validar();
});
$("input[name='preexistencias']").click(function(){
 if($(this).val() == "no"){
   preex = true;
 }else if($(this).val() == "si"){
   if(preex_text){
    preex = true;
   }else{
     preex = false;
   }
 }
 validar();
});
$("#preexText").focusout(function(){
  if($(this).val()){
    preex_text = true;
    preex = true;
    $(".preexistencias").find(".error-span").css("display","none");
   }else{
     preex_text = false;
     preex = false;
   }
   validar();
});
$("#conCond").click(function(){
  if($(this).is(':checked')){
    con_cond = true;
    $("#conCond").parent().find(".error-span").css("display","none");
  }else{
    con_cond = false;
  }
  validar();
});
function validar(){
  if(aut_banco && dec_covid && man_prorr && mand_susc && preex && con_cond && confir){
    console.log("validado");
    $("#end-btn").removeClass("disabled");
  }else{
    console.log("no valida");
    $("#end-btn").addClass("disabled");
  }
}
$("#end-btn").click(function(){
  if($(this).hasClass("disabled")){
    estados();
    return false;
  }else{
    console.log("ir a comprobante");
    //window.location.href = "comprobante.html";
  }
});
function estados(){
  if( !aut_banco ){
    $("#autorizoBanco").parent().find(".error-span").css("display","block");
    $('html, body').animate({scrollTop: $("#autorizoBanco").offset().top}, 1000);
  }else{
    $("#autorizoBanco").parent().find(".error-span").css("display","none");
  }

  if(!dec_covid){
    $("#decCovid").parent().find(".error-span").css("display","block");
    $('html, body').animate({scrollTop: $("#decCovid").offset().top}, 1000);
  }else{
    $("#decCovid").parent().find(".error-span").css("display","none");
  }

  if(!man_prorr){
    $("#manProrr").parent().find(".error-span").css("display","block");
    $('html, body').animate({scrollTop: $("#manProrr").offset().top}, 1000);
  }else{
    $("#manProrr").parent().find(".error-span").css("display","none");
  }

  if(!mand_susc){
    $("#mandSusc").parent().find(".error-span").css("display","block");
    $('html, body').animate({scrollTop: $("#mandSusc").offset().top}, 1000);
  }else{
    $("#mandSusc").parent().find(".error-span").css("display","none");
  }

  if(!preex){
    $(".preexistencias").find(".error-span").css("display","block");
    $('html, body').animate({scrollTop: $(".preexistencias").offset().top}, 1000);
  }else{
    $(".preexistencias").find(".error-span").css("display","none");
  }

  if(!preex && !preex_text){
    $(".preexistencias").find(".error-span").css("display","block");
    //$('html, body').animate({scrollTop: $("#preexText").offset().top}, 1000);
  }else{
    $(".preexistencias").find(".error-span").css("display","none");
  }

  if(!con_cond){
    $("#conCond").parent().find(".error-span").css("display","block");
  }else{
    $("#conCond").parent().find(".error-span").css("display","none");
  }

  if( !$("#email-end").hasClass("valid") && $("#email-end").val() ){
    $("#email-end").addClass("invalid");
    $('html, body').animate({scrollTop: $("#email-end").offset().top}, 1000);
  }

  if( !$("#telefono-end").hasClass("valid") && $("#telefono-end").val() ){
    $("#telefono-end").addClass("invalid");
    $('html, body').animate({scrollTop: $("#telefono-end").offset().top}, 1000);
  }
}