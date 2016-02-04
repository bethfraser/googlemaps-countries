Array.prototype.contains = function ( needle ) {
 for (i in this) {
   if (this[i] == needle) return true;
 }
 return false;
}

window.onload = function(){

  var url = "https://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest();
  request.open("GET", url);

  var select = document.getElementById('countryDropdown');
  var regionSelect = document.getElementById('regionDropdown');
  var bordersTitle = document.getElementById('bordersTitle');
  var map = document.getElementById('map');
  var info = document.getElementById('info');

  if(countryBorders.innerText === ""){
    countryBorders.style.display = "none";
    bordersTitle.style.display = "none";
  }

  var JSONcountry = localStorage.getItem('saved country');
  var countryToLoad = JSON.parse(JSONcountry);

  var makeList = function(name, population, capital){
    population = Number(population).toLocaleString();
    return "<h3>Country: " + name + "<br>" +
    "Capital: " + capital + "<br>" + 
    "Population: " + population + "</h3>";
  }

  var makeMap = function(country){
    var content = makeList(country.name, country.population, country.capital);
      info.innerHTML = "";
    if(country.latlng != false){
      map.style.display = "block";
      var coords = { lat: country.latlng[0], lng: country.latlng[1]};
      var newmap = new Map(coords, 5);
      newmap.addInfoWindow(coords, content);
    }
    else{
      map.style.display = "none";
      info.innerHTML = content;

    }
  }

  if (countryToLoad) {
    makeMap(countryToLoad);
  }
  

  request.send(null);

  request.onload = function(){
    // if(request.status === 200){
    //   console.log('got the data');
    // }

    var regions = [];

    var countries = JSON.parse(request.responseText);

    var makeBordersItems = function(country){

      if(country.borders == false){
        countryBorders.style.display = "none";
        bordersTitle.style.display = "none";
        return;
      }

      var borders = country.borders
      for(var border of borders){

        for (country of countries){
          if(country.alpha3Code === border){
           countryBorders.style.display = "block";
           bordersTitle.style.display = "inline-block";
           var button = document.createElement('button');
           button.innerText = country.name;
           countryBorders.appendChild(button);
         }
       }
     }

   }

   if(countryToLoad){
   makeBordersItems(countryToLoad);
    }

   for(country of countries){
    var listItem = document.createElement("option");
    listItem.innerText = country.name;
    select.appendChild(listItem);

    if(!regions.contains(country.region)){
      regions.push(country.region);
    }
  }   

  for(region of regions){
    var listItem = document.createElement("option");
    listItem.innerText = region || "Other";
    regionSelect.appendChild(listItem);
  }


  var loadCountryData = function(){

    var name = select.selectedOptions[0].innerText;
    countryBorders.innerText = "";

    for(country of countries){
      if(country.name == name){
        var population = country.population;
        var capital = country.capital;
        var borders = country.borders;
        var countryToSave = {
          name: name,
          population: population,
          capital: capital,
          borders: borders,
          latlng: country.latlng
        }

        var countryString = JSON.stringify(countryToSave);
        localStorage.setItem("saved country", countryString);

        makeBordersItems(country);
        makeMap(country);
      }
    }
  }

  var filterCountries = function(){
    select.innerHTML = "";
    var region = regionSelect.selectedOptions[0].innerText;
    if (region === "Other"){
      region = "";
    }
    if (region === "Filter by Region:"){
      for(country of countries){
        var listItem = document.createElement("option");
        listItem.innerText = country.name;
        select.appendChild(listItem);
      }
    }
    for(country of countries){
      if(country.region === region){
        var listItem = document.createElement("option");
        listItem.innerText = country.name;
        select.appendChild(listItem);
      }
    }
  }

  select.onchange = loadCountryData;
  regionSelect.onchange = filterCountries;
}

};

// show little people for population
// bordering countries
//flags? wikipedia
// 
