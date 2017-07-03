/**
 * Created by indigo on 7/2/17.
 */

$(window).on('load', function() {

    $('#gallery').poptrox({
        // caption: function($a) { return $a.next('h3').text(); },
        // overlayColor: '#2c2c2c',
        // overlayOpacity: 0.85,
        // popupCloserText: '',
        // popupLoaderText: '',
        usePopupCaption: true,
        // usePopupDefaultStyling: false,
        usePopupEasyClose: false,
        usePopupNav: true,
    });

});

// $(document).ready(function(){
//     var dir = "../gallery/";
//     var fileextension = ".jpg";
//     $.ajax({
//         //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//         url: dir,
//         success: function (data) {
//             //List all .png file names in the page
//             $(data).find("a:contains(" + fileextension + ")").each(function () {
//                 var filename = this.href.replace(window.location.host, "").replace("http://", "");
//                 $("body").append("<img src='" + dir + filename + "'>");
//             });
//         }
//     });
// });
