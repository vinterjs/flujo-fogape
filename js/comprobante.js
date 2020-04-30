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
$(".btn-std").click(function(e) {
    if ($(this).hasClass("disabled")) {
        return false;
    }
});
//btn print
if(document.getElementById("imprimir-voucher")){
    document.getElementById("imprimir-voucher").addEventListener("click", function(){
        window.print();
    });
}