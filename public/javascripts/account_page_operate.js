let different_pages = $('.account-main-side')[0].childNodes;
let name_of_pages = $('.account-profile-information ul li');

$(document).ready(function(){
    let name_of_pages = $('.account-profile-information ul li');
    console.log(name_of_pages)

    $(name_of_pages).click(function(){
        console.log($(this));
        name_of_pages.each(function(){
            $(this).removeClass("clicked");
        });
        $(this).addClass("clicked");
    });
});

function show_current_page(pageToShow){
    $(pageToShow).show();
    different_pages.forEach(function(element){
        let nameOfClass = element.className;
        if(nameOfClass !== pageToShow.slice(1)){
            nameOfClass = '.'+nameOfClass
            $(nameOfClass).hide()
        }
    })
}

$('.user-main-page').on( "click", function(){
    show_current_page('.main-page');
});

$('.user-update-page').on( "click", function(){
    show_current_page('.update-page');
});

$('.user-current-booking-page').on( "click", function(){
    show_current_page('.current-booking-page');
});

$('.user-completed-booking-page').on( "click", function(){
    show_current_page('.completed-booking-page');
});