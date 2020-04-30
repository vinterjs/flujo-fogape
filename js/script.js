//INIT
var $amount = $("#montoCreditoFo");
var input_fogape = false;
var select_uno = false;
var select_dos = false;
var montoMaximo = $("#monto-maximo-cred").val();
montoMaximo = montoMaximo.split("$").join("").split(".").join().split(",").join("");
var montoMinimo = 1000000;
$(document).ready(function(){
    console.log("Ready");
});
$(".input-fogape .msj-input").html("Ingresa un monto <strong>mínimo de $1.000.000 o máximo de $"+montoMaximo.replace(/([0-9])([0-9]{3})$/, "$1.$2")
.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".")+"</strong> para tu capital de trabajo.")

//input monto
$amount.on({
    "focusout": function(){
        var input_format = this.value;
        if(input_format === "$"){
            input_format = input_format.split("$").join("").split(".").join().split(",").join("");
            input_format = input_format.replace(/([0-9])([0-9]{3})$/, "$1.$2")
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
            this.value = "$"+input_format;
        }else{
            input_format = input_format.split("$").join("").split(".").join().split(",").join("");
        }
        minMax(input_format);
        simular();
    },
    "keyup": function(){
        if(this.value === "" || this.value === "$"){
            this.value = "$";
            $amount.removeClass("invalid valid");
        }else{
            this.value = formatMoney(this.value);
        }
        simular();
    }
});
function minMax(vl){
    var monto = vl;
    var mMax = montoMaximo
    mMax = mMax.replace(/([0-9])([0-9]{3})$/, "$1.$2")
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    monto = parseInt(monto.split("$").join("").split(".").join().split(",").join(""));
    if(monto < montoMinimo){
        $("#montoCreditoFo").addClass("invalid").removeClass("valid");
        $("#montoCreditoFo").parent().find(".msj-input").hide();
        $("#montoCreditoFo").parent().find(".msj-input-error").text("Debe ingresar un monto igual o superior a $1.000.000");
    }else if(monto > montoMaximo){
        $("#montoCreditoFo").addClass("invalid").removeClass("valid");
        $("#montoCreditoFo").parent().find(".msj-input").hide();
        $("#montoCreditoFo").parent().find(".msj-input-error").text("Debe ingresar un monto igual o menor a $"+mMax);
    }else if(monto > montoMinimo && monto < montoMaximo){
        $("#montoCreditoFo").addClass("valid").removeClass("invalid");
        //$("#montoCreditoFo").parent().find(".msj-input").show();
    }else{
        $("#montoCreditoFo").parent().find(".msj-input").show();
    }
}
function formatMoney(valor){
    var i2, j2, valor1, unformatted;
    if( valor.length > 0 && valor.startsWith("$") ){
        unformatted = valor.split("$")[1];
    }else{
        unformatted = valor;
    }
    var wopoints = unformatted.split(".");
    var restored_val = "";
    $.each(wopoints, function(i,e){
        index = i;
        restored_val += e;
    });
    i2 = String( parseInt( restored_val = Math.abs(Number(restored_val) || 0 ).toFixed(0) ) );
    j2 = i2.length;
    if(j2 > 3){
        j2 = j2 % 3;
    }else{
        j2 = 0;
    }
    if(j2 !== 0){
        valor1 = i2.substr(0, j2) + ".";
    }else{
        valor1 = "";
    }
    var valor_final = valor1 + i2.substr(j2).replace(/(\d{3})(?=\d)/g, "$1" + ".");
    var returned;
    if( valor_final != "0" ){
        returned = "$" + valor_final;
    }else{
        returned = "";
    }
    return returned;
}

//no letras ni caracteres especiales
$('.digDot').keydown(function(event){
    var no_permitidas = ['!', '"', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '*', '¨', '^', '{', '}', 'Ç', 'ç', 'ª', 'º', ',', 'Dead', '´', '+', '`', '_', '@', '#', '|', '¢', '∞', '¬', '÷', '”', '≠', '´'];
    var no_permitidas_eventkey = [192, 222, 16, 220, 187];
    var key;
    if( !event.charCode ){
        key = String.fromCharCode(event.which);
    }else{
        key = String.fromCharCode(event.charCode);
    }
    if( no_permitidas_eventkey.indexOf( event.keyCode ) !== -1 || no_permitidas.indexOf( event.key ) !== -1 ){
        $(this).blur();
    }
    if( event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 37 && event.keyCode !== 39 ){
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){
            return true;
        }else{
            event.preventDefault();
            return false;
        }
    }
});

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

//boton disabled
$(".btn-std").click(function(e) {
    if ($(this).hasClass("disabled")) {
      return false;
    }
  });

//no letras ni caracteres especiales
$('.digDot').keydown(function(event){
    var no_permitidas = ['!', '"', '$', '%', '&', '/', '(', ')', '=', '?', '¿', '*', '¨', '^', '{', '}', 'Ç', 'ç', 'ª', 'º', ',', 'Dead', '´', '+', '`', '_', '@', '#', '|', '¢', '∞', '¬', '÷', '”', '≠', '´'];
    var no_permitidas_eventkey = [192, 222, 16, 220, 187];
    var key;
    if( !event.charCode ){
        key = String.fromCharCode(event.which);
    }else{
        key = String.fromCharCode(event.charCode);
    }
    if( no_permitidas_eventkey.indexOf( event.keyCode ) !== -1 || no_permitidas.indexOf( event.key ) !== -1 ){
        $(this).blur();
    }
    if( event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 37 && event.keyCode !== 39 ){
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)){
            return true;
        }else{
            event.preventDefault();
            return false;
        }
    }
});

function formatMoney(valor){
    var i2, j2, valor1, unformatted;
    if( valor.length > 0 && valor.startsWith("$") ){
        unformatted = valor.split("$")[1];
    }else{
        unformatted = valor;
    }
    var wopoints = unformatted.split(".");
    var restored_val = "";
    $.each(wopoints, function(i,e){
        index = i;
        restored_val += e;
    });
    i2 = String( parseInt( restored_val = Math.abs(Number(restored_val) || 0 ).toFixed(0) ) );
    j2 = i2.length;
    if(j2 > 3){
        j2 = j2 % 3;
    }else{
        j2 = 0;
    }
    if(j2 !== 0){
        valor1 = i2.substr(0, j2) + ".";
    }else{
        valor1 = "";
    }
    var valor_final = valor1 + i2.substr(j2).replace(/(\d{3})(?=\d)/g, "$1" + ".");
    var returned;
    if( valor_final != "0" ){
        returned = "$" + valor_final;
    }else{
        returned = "";
    }
    return returned;
}

 //condiciones
 if ($(".js-accordion").length) {
    $(".js-accordion--active .box__body").hide();
    $(".js-accordion").on("click", ".js-accordion__trigger", function() {
      $(this)
        .parents(".js-accordion")
        .toggleClass("js-accordion--active"),
        $(this)
          .next()
          .slideToggle();
    });
  }

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
  // FunciÃ³n que genera el Select con Estilos.
// Ahora se usa esta funciÃ³n para la carga inicial
function styledSelect(el) {
    var self = el;
    var selector = self.find("select");
    var list = document.createElement("ul");
    var firstElement = 1;
    var oldList = self.find("ul:first");
    if (oldList.length > 0) {
      console.log("erased!");
      console.log(oldList);
      oldList.remove();
    }
  
    selector.find("option").each(function() {
      var optionLabel = $(this).text();
      var listItem = document.createElement("li");
      var listLink = document.createElement("a");
      var listLinkText = document.createTextNode(optionLabel);
      if (firstElement) {
        --firstElement;
        listLink.classList.add("active");
      }
      listLink.classList.add("select-value");
      listLink.appendChild(listLinkText);
      listItem.appendChild(listLink);
      list.appendChild(listItem);
    });
  
    self.append(list);
  }

$(".select.numCuotas ul li").click(function(){
    select_uno = true;
    simular();
});
$(".select.fechaVen ul li").click(function(){
    select_dos = true;
    simular();
});
function simular(){
    if( $("#montoCreditoFo").val() == "$" ){
        input_fogape = false;
    }else{
        if( $("#montoCreditoFo").hasClass("valid") ){
            input_fogape = true;
        }else{
            input_fogape = false;
        }
    }
    if(select_uno && select_dos && input_fogape){
        $("#simularFogape").removeClass("disabled");
    }else{
        $("#simularFogape").addClass("disabled");
    }
  }
$("#simularFogape").click(function(){
    if($(this).hasClass("disabled")){
        return false;
    }else{
        window.location.href = "simulacion.html";
    }
})