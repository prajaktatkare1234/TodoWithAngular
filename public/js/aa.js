var data_id;
$(document).ready(function() {
  // console.log("ghkjkjyudc");
    if (localStorage.getItem("type") == "grid_view") {
        $("#grid").hide();
        $("#list").show();
    } else {
        $("#grid").show();
        $("#list").hide();
    }
    get_card();


    $('body').on("click", "#logout", (function() {
        $.ajax({
            url: "/logout",
            type: "POST",

            success: function(response) {
                if (response.status == false) {
                    console.log(response);
                    // index();
                    window.location.hash="/signin";
                    // location.reload();
                }
            },
            complete: function(xhr, status) {
                console.log("the request is complete!");
            },
        });
    }));



    $('body').on("click", "#done", (function() {
        console.log("done    ...........................");
        var title = $("#title").val();
        var take_note = $("#take_note").val();
        // console.log("assakjaskjfksdlfjkdsl");
        if (title == "" && take_note == "") {
            return;
        }
        var obj = {
            title: title,
            take_note: take_note
        };
        $("#cards").empty();
        $.ajax({
            url: "/data_card",
            type: "POST",
            dataType: "JSON",
            data: obj,
            success: function(response) {
                console.log('the page was loaded', response);
                $('span').remove();
                var a = response.message;
                console.log(a);
                get_card();
                // console.log("obj", obj);
            },
            error: function(error) {
                console.log('the page was not loaded', error);
                console.log(obj);
            }
        });
    }));



    // $(document).on('click', "#div1", (function() {
    //     $("#div1").hide();
    //     $("#div2").show();
    // }));
    //
    //
    // $('body').click(function(event) {
    //     console.log(event);
    //     if (event.target.id == "take_note" || event.target.id == "title") {
    //         return;
    //     }
    //     $("#div1").show();
    //     $("#div2").hide();
    // });



  

    $(document).on('click', "#list", (function() {
        $("#list_cards").show();
        $("#list").hide();
        $("#grid").show();
        $("#cards").hide();
        localStorage.setItem("type", "list_v");
        get_card();
    }));


    $(document).on('click', "#grid", (function() {
        $("#list").show();
        $("#grid").hide();
        $('#list_cards').hide();
        $("#cards").show();
        localStorage.setItem("type", "grid_view");
        get_card();
    }));

});



function get_card() {
    $.ajax({
        url: "/get_data_card",
        type: "POST",
        success: function(response) {
            var i = response.data_info.length - 1;
            console.log(i);
            $("#cards").html("");
            $("#list_cards").html("");
            $("#title").val("");
            $("#take_note").val("");
            $("#title").css("height", "30px");
            $("#take_note").css("height", "30px");
            for (var x = i; x >= 0; x--) {
                data_id = response.data_info[x]._id;
                data_title = response.data_info[x].title;
                data_note = response.data_info[x].take_note;
                console.log(localStorage.getItem("type"));
                if (localStorage.getItem("type") == "list_v") {
                    list_view(data_id);
                } else {
                    division(data_id);
                }
            }
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },
    });
}




function division(data_id) {
    var div = $("<pre id='innerbox' class='col-sm-3' ><div id='title_div' onclick=pop('" + data_id + "') data-toggle='modal' data-target='#myModal'>" + data_title + "</div><div  id='note_div' onclick=pop('" + data_id + "') data-toggle='modal' data-target='#myModal'>" + data_note + "</div><div><a onclick=delete_card('" + data_id + "') id='delete'>" + 'delete' + "</a></div></pre>")

    $("#cards").append(div);



    var elem = document.querySelector('#cards');
    var pckry = new Packery(elem, {
        itemSelector: '#innerbox',
        gutter: 23
    });
    pckry.getItemElements().forEach(function(itemElem) {

        var draggie = new Draggabilly(itemElem);
        pckry.bindDraggabillyEvents(draggie);

    });

}

function list_view(data_id) {
    // $("#cards").css("height", "2px");
    var div = $("<pre id='innerbox1'><div id='title_div' onclick=pop('" + data_id + "') data-toggle='modal' data-target='#myModal' >" + data_title + "</div><div id='note_div' onclick=pop('" + data_id + "') data-toggle='modal' data-target='#myModal'>" + data_note + "</div><div><a onclick=delete_card('" + data_id + "') id='delete'>" + 'delete' + "</a></div></pre>")
    $("#list_cards").append(div);
}



var delete_card = function(data_id) {
    $.ajax({
        url: "/delete_data_card/" + data_id + "",
        type: "POST",
        success: function(response) {
            console.log(response);
            // $("#cards").empty();
            get_card();
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },
    });
}


function index() {

    $.ajax({
        url: "index.html",
        type: "GET",
        datatype: "html",
        success: function(response) {
            console.log('the page was loaded', response);
            $('body').html(response);
            console.log('the page was not loaded', response);
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },

    });
}

var pop = function(data_id) {
    $.ajax({
        url: "/get_card_notes/" + data_id + "",
        type: "POST",
        success: function(response) {
            $('.modal-title').text("");
            $('#para').html("");
            // console.log(response.message[0].take_note);
            $('.modal-title').text(response.message[0].title);
            $('#para').append(response.message[0].take_note);
            $("#update").attr('onclick', "update_card('" + data_id + "')")
            get_card();

        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },
    });
}

var update_card = function(data_id) {
    // console.log(obj);
    var title = $('.modal-title').html();
    var note = $('#para').html();
    var obj = {
        _id: data_id,
        title: title,
        take_note: note
    }
    console.log(obj);
    $.ajax({
        url: "/update_data_card/" + data_id + "",
        type: "POST",
        data: obj,
        success: function(response) {
            console.log(response);
            // $("#cards").empty();
            get_card();
        },
        complete: function(xhr, status) {
            console.log("the request is complete!");
        },
    });
}
