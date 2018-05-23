var $ = require('jquery')
import 'bootstrap'

var x = document.getElementById("location");
var cityLatLong = {}
var currentTempInCelsius

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function image(src, alt) {
    var img = document.createElement("IMG");
    img.src = src;
    img.alt = alt;
    $('#image')
        .html(img)
        .css('display', 'block');
}

function showPosition(position) {
    cityLatLong.latitude = position.coords.latitude
    cityLatLong.longitude = position.coords.longitude
    $.ajax({
        url: "https://fcc-weather-api.glitch.me/api/current?lat=" + cityLatLong.latitude + "&lon=" + cityLatLong.longitude,
        success: function (res) {
            console.log(res)
            $("#loading").css('display', 'none')
            $("#city").text(res.name)
            $("#country").text(" ," + res.sys.country)
            currentTempInCelsius = Math.round(res.main.temp * 10) / 10;
            $("#temperature").css('display', 'block')
            $("#temp").html(currentTempInCelsius)
            $("#comment")
                .html(res.weather[0].description)
                .css('display', 'block')
            $("#minMax")
                .html("<p class='text-center'><span class='font-weight-bold'>" + res.main.temp_min + "°</span> / <span class='text-muted'>" + res.main.temp_max + "°</span></p>")
                .css('display', 'block')
            image(res.weather[0].icon, res.weather[0].main)
        },
        cache: !1
    })
}

$("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    console.log(newTempUnit)
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
        var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
        $("#temp").text(fahTemp);
    } else {
        $("#temp").text(currentTempInCelsius);
    }
});

$(document).ready(function () {
    getLocation()
});
