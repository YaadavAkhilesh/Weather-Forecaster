$(document).ready(function () {
    const API_KEY = "c1fe14a6142a47a70cd4cc5b608fb41a";
  
    async function getWeather(city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`;
  
      showLoader();
  
      const response = await fetch(url);
      const data = await response.json();
  
      hideLoader();
  
      bindData(data)
    }
  
    function showLoader() {
      $(".loader").css('display', 'block');
      $(".search-icon").css('display', 'none');
    }
  
    function hideLoader() {
      $(".loader").css('display', 'none');
      $(".search-icon").css('display', 'block');
    }
  
    function bindData(data) {
      if (data.cod == "404") {
        $(".error").addClass('error-animation');
        return;
      } else {
        $(".error").removeClass('error-animation');
      }
      $('.weather-img').removeClass("in");
      $('.temprature').removeClass("in");
      $(".city").removeClass("in");
      $(".sub-text").removeClass("in");
  
      $('.weather-img').addClass("out");
      $('.temprature').addClass("out");
      $(".city").addClass("out");
      $(".sub-text").addClass("out");
  
      setTimeout(() => {
        $("#temprature").text(data.main.temp);
        $("#city").text(data.name);
        $("#humidity").text(data.main.humidity);
        $("#wind").text(data.wind.speed);
  
        changeImages(data)
  
        $('.weather-img').removeClass("out");
        $('.temprature').removeClass("out");
        $(".city").removeClass("out");
        $(".sub-text").removeClass("out");
  
        $('.weather-img').addClass("in");
        $('.temprature').addClass("in");
        $(".city").addClass("in");
        $(".sub-text").addClass("in");
      }, "2200");
  
    }
  
    function changeImages(data) {
      if (data.weather[0].main == "Clouds") {
        $('#weather-img').attr('src', 'images/clouds.png');
      }
      else if (data.weather[0].main == "Clear") {
        $('#weather-img').attr('src', 'images/clear.png');
      }
      else if (data.weather[0].main == "Rain") {
        $('#weather-img').attr('src', 'images/rain.png');
      }
      else if (data.weather[0].main == "Drizzle") {
        $('#weather-img').attr('src', 'images/drizzle.png');
      }
      else if (data.weather[0].main == "Mist") {
        $('#weather-img').attr('src', 'images/mist.png');
      }
      else if (data.weather[0].main == "Fog") {
        $('#weather-img').attr('src', 'images/fog.png');
      }
    }
  
    $('#input-form').submit(function (e) {
      e.preventDefault();
      if ($("#search-input").val() == "") {
        return;
      }
      getWeather($("#search-input").val());
    })
  
  });