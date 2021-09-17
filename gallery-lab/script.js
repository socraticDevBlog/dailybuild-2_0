$(function() {

    // each comic image is built in a loop
    // javascript builts a HTML stringg
    // kinda hacky...
    var html = "";
    $.each(comicsArr, function( index, value ) {
        html += '<img src="images/' + value.imgFilename + '"/>'
    });

    // gallery div is selected by ID
    // html gallery code is injected in div
    $('#gallery').html(html);
});

// each image is a json object with its informations
const firstComic = {
"imgFilename":"smile1.png",
"title":"first nice smile",
"description":"a first smile is a first impression"
};

const secondComic = {
"imgFilename":"smile2.png",
"title":"second nice smile",
"description":"a second first impression"
};

const thirdComic = {
"imgFilename":"smile3.jpg",
"title":"third nice smile",
"description": "a third impression"
};

// put all images object-items in an array
const comicsArr = [firstComic, secondComic, thirdComic]