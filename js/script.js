$(function() {
    const bar_links_open = $(".main-nav .list-links-bar i"),
        list_link = $(".links-self"),
        list_link_close_btn = $(".links-self .close-navbar"),
        choose_subject = $(".choose-subject"),
        btn_print = $(".print-table");
    let tl_gsap_nav = gsap.timeline({ paused: true });
    // Anamaition Navbar =======================================
    let list_animation = tl_gsap_nav.to(list_link, { height: "100%", duration: 0.3, ease: "bounce" })
        .to('.links-self .close-navbar', { opacity: 1, top: "60px", rotate: 360, duration: 0.3 })
        .to('.links-self .logo-link', { top: 0, opacity: 1, duration: 0.3 })
        .to('.links-self  .head-links ', { left: 0, opacity: 1, duration: 0.3 })
        .to('.links-self .outer-links li', { bottom: 0, opacity: 1, stagger: 0.3, duration: 0.3 });
    bar_links_open.on("click", () => {
        list_animation.play();
    });
    list_link_close_btn.on("click", () => {
        list_animation.reverse();
    });
    // Upload Photo Profile Section ====================================
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);

            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });
    // Form Profile =======================================================
    $('.change-data-self .form-profile').submit(function(cl) {
        cl.preventDefault();
        let formdataSer = $(this).serialize(),
            formdataInputs = {
                username: $(this.username).val(),
                password: $(this.password).val()
            };
        if (formdataInputs.username != '' || formdataInputs.password != '') {
            if (formdataInputs.username) {
                if (formdataInputs.username.length <= 2) {
                    $(this.username).removeClass('is-valid');
                    $(this.username).addClass('is-invalid');
                    $(this.username).after(`<div class="invalid-feedback">Username Not Less Than 2 Letters</div>`);
                    $(this.username).nextAll('.invalid-feedback,.valid-feedback').delay(2000).hide(200, function() {
                        $(this).remove();
                    });
                } else if (!(/^[a-zA-Z]/g.test(formdataInputs.username))) {
                    $(this.username).removeClass('is-valid');
                    $(this.username).addClass('is-invalid');
                    $(this.username).after(`<div class="invalid-feedback">Username Must Start Letters</div>`);
                    $(this.username).nextAll('.invalid-feedback,.valid-feedback').delay(2000).hide(200, function() {
                        $(this).remove();
                    });
                } else {
                    $(this.username).removeClass('is-invalid');
                    $(this.username).addClass('is-valid');
                    $(this.username).after(`<div class="valid-feedback">Good Username</div>`);
                    $(this.username).nextAll('.invalid-feedback,.valid-feedback').delay(2000).hide(200, function() {
                        $(this).remove();
                    });
                    $('.form-profile').prepend('<div class="alert alert-success">Success Update Username</div>');
                    $('.form-profile').find(".alert").delay(2000).slideUp(100);
                    console.log(formdataInputs.username)
                    setTimeout(() => {
                        $(this.username).removeClass('is-valid');
                        $(this.username).val('')
                    }, 2000)
                }
            }
            // For Password
            if (formdataInputs.password) {
                if (!(/[A-Z]/g).test(formdataInputs.password)) {
                    $(this.password).removeClass('is-valid');
                    $(this.password).addClass('is-invalid');
                    $(this.password).after(`<div class="invalid-feedback">Must Be Capital , Small Letter And Numbers</div>`);
                    $(this.password).nextAll('.invalid-feedback,.valid-feedback').delay(2000).hide(200, function() {
                        $(this).remove();
                    });
                } else if (!(/[a-z]/g).test(formdataInputs.password)) {
                    $(this.password).removeClass('is-valid');
                    $(this.password).addClass('is-invalid');
                    $(this.password).after(`<div class="invalid-feedback">Must Be Capital , Small Letter And Numbers</div>`);
                    $(this.password).nextAll('.invalid-feedback,.valid-feedback').delay(2000).hide(200, function() {
                        $(this).remove();
                    });
                } else if (!(/[0-9]/g).test(formdataInputs.password)) {
                    $(this.password).removeClass('is-valid');
                    $(this.password).addClass('is-invalid');
                    $(this.password).after(`<div class="invalid-feedback">Must Be Capital , Small Letter And Numbers</div>`);
                    $(this.password).nextAll('.invalid-feedback,.valid-feedback').delay(2000).hide(1200, function() {
                        $(this).remove();
                    });
                } else {
                    $(this.password).removeClass('is-invalid');
                    $(this.password).addClass('is-valid');
                    $(this.password).after(`<div class="valid-feedback">Good Password</div>`);
                    $(this.password).nextAll('.invalid-feedback,.valid-feedback').delay(2000).hide(200, function() {
                        $(this).remove();
                    });
                    $('.form-profile').prepend('<div class="alert alert-success">Success Update Password</div>');
                    $('.form-profile').find(".alert").delay(2000).slideUp(100);
                    console.log(formdataInputs.password)
                    setTimeout(() => {
                        $(this.password).removeClass('is-valid');
                        $(this.password).val('')
                    }, 2000)
                }
            }
        } else {
            $('.form-profile').prepend('<div class="alert alert-danger">Empty Fields</div>');
            $('.form-profile').find(".alert").delay(2000).slideUp(100)
        }
    });
    // Section Registeration , Choose Subject
    choose_subject.checkboxpicker({
        baseGroupCls: 'btn-group radio-subject',
        baseCls: 'btn btn-radio p-0 pr-1 pl-1'
    });
    choose_subject.on('change', function() {

        if ($(this).is(":checked")) {
            let name_subject = $(this).parent().parent().find('td:first-child').text();
            $(this).attr('value', 'true');
            console.log(name_subject)
        } else {
            $(this).attr('value', 'false');
        }
    });
    // Section Current Page
    btn_print.on("click", () => {
        window.print();
    });
});