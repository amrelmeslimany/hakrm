$(function() {
    const bar_links_open = $(".main-nav .list-links-bar i"),
        list_link = $(".links-self"),
        list_link_close_btn = $(".links-self .close-navbar"),
        form_profile = $("section.profile-content .change-data-self .form-profile"),
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
    form_profile.on("submit", function(cl) {
        cl.preventDefault();
        form_profile.prepend('<div class="alert alert-success">Updated Successed</div>');
        form_profile.find(".alert").delay(5000).slideUp(100)
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