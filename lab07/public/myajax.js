"use strict";

$( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
        // event.preventDefault();
    } );
} );

// Setup function to be run when the document is ready.
$(document).ready(function () {

    $("button").click( function () {

        $("#lol").show();

        $(".top-demo div").each(function() {
            $(this).circulate({
                speed: Math.floor(Math.random()*300) + 100,
                height: Math.floor(Math.random()*1000) - 470,
                width: Math.floor(Math.random()*1000) - 470
            });
        }).click(function() {
            $(this).circulate({
                speed: Math.floor(Math.random()*300) + 100,
                height: Math.floor(Math.random()*1000) - 470,
                width: Math.floor(Math.random()*1000) - 470
            });
        });

        function startBallOne() {
            $("#orange-ball").circulate({
                speed: 4000,
                height: 100,
                width: -700,
                sizeAdjustment: 40,
                loop: true,
                zIndexValues: [1, 1, 3, 3]
            });
        }
        
        function startBallTwo() {
            $("#blue-ball").circulate({
                speed: 4000,
                height: 120,
                width: -700,
                sizeAdjustment: 35,
                loop: true,
                zIndexValues: [2, 2, 2, 2]
            })
        }
        
        function startBallThree() {
            $("#green-ball").circulate({
                speed: 4000,
                height: 140,
                width: -700,
                sizeAdjustment: 30,
                loop: true,
                zIndexValues: [3, 3, 1, 1]
            }).fadeIn();
        }
                
        startBallOne();
        setTimeout(startBallTwo, 2000);
        setTimeout(startBallThree, 4000);
    });

    // Request web content (asynchronously) and handle result using promises.
    $("input").click(
        function () {
            $(this).hasClass("submit")
                console.log('AJAX request issued...');
                // jQuery/AJAX deferred is similar to JavaScript promises, but we
                // cast it to a standard promise/A+ in this example.
                let jsPromise = Promise.resolve($.ajax({
                    url: "/hello",
                    type: "GET",
                    data: {
                        name: "lab 07..."
                    }
                }));
            jsPromise.then(function (result) {
                console.log('AJAX request succeeded...');
                 $(document.createElement('div'))
                    .addClass('newstuff')
                    .html("<h2><em>" + result.content + "   " + "</h2></em>")
                    .css({
                        "position":"relative", 
                        "z-index":"1000",
                        "display": "inline"
                    })
                    .appendTo('p');
            }, function (xhr) {
                console.log('AJAX request failed...');
                $("section").html("<p>" + xhr.statusText + "</p>" + "<h1> WELL GOOD JOB YOU BROKE EVERYTHING <p> HOPE YOU'RE PROUD OF YOURSELF </h1>");
            });
        }
    );
    $("a").click(
        function () {
            $(this).hasClass("submit")
                console.log('AJAX request issued...');
                // jQuery/AJAX deferred is similar to JavaScript promises, but we
                // cast it to a standard promise/A+ in this example.
                let jsPromise = Promise.resolve($.ajax({
                    url: "/hello",
                    type: "GET",
                    data: {
                        name: "lab 07..."
                    }
                }));
            jsPromise.then(function (result) {
                console.log('AJAX request succeeded...');
                $(".newstuff").last("div").remove(); //alert($('.test').html().substring(0,$('.test').html().length - 1));
            }, function (xhr) {
                console.log('AJAX request failed...');
                $("section").html("<p>" + xhr.statusText + "</p>" + "<h1> WELL GOOD JOB YOU BROKE EVERYTHING <p> HOPE YOU'RE PROUD OF YOURSELF </h1>");
            });
        }
    );
});
