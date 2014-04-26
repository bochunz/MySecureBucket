
function appendFileToList(filename) {
    var item_left = "<li class=\"list-group-item file-list-item\">";
    var iten_right = '<div class="btn-group btn-group-sm file-btns">' + 
                '<button type="button" class="btn btn-default file-dl-btn">' + 
                    '<i class="fa fa-cloud-download"></i>' + 
                '</button>' + 
                '<button type="button" class="btn btn-default file-rm-btn">' +
                    '<i class="fa fa-trash-o"></i>' +
                '</button>' +
            '</div>' +
        '</li>'
    $("#file-list").append(item_left + filename + iten_right);
}

function linkBtnsAndFiles() {
    $(".file-dl-btn").unbind( "click" );
    $(".file-dl-btn").click(function() {
        console.log('file-dl-btn clicked');
        var filename = $(this).parent().parent().text();
        console.log(filename);
        appendFileToList("a"+filename);
        linkBtnsAndFiles();
    })
    $(".file-rm-btn").unbind( "click" );
    $(".file-rm-btn").click(function() {
        console.log('file-rm-btn clicked');
        var thisli = $(this).parent().parent();
        thisli.remove();
        linkBtnsAndFiles();
    })
}

$(document).ready( function() {
    appendFileToList("aaa.pdf");

    linkBtnsAndFiles();
    $(".connected-bucket-name").html("Bucket: abc")
});