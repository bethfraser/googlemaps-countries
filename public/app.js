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
  var countryInfo = document.getElementById('countryInfo');
  var bordersTitle = document.getElementById('bordersTitle');

  if(countryBorders.innerText === ""){
    countryBorders.style.display = "none";
    bordersTitle.style.display = "none";
  }

  var JSONcountry = localStorage.getItem('saved country');
  var countryToLoad = JSON.parse(JSONcountry);

  var makeList = function(name, population, capital){
    makeListItem("Country: ", name);
    makeListItem("Capital: ", capital);
    makeListItem("Population: ", population);
  }

  var makeListItem = function(description, data){
    var li = document.createElement('li');
    li.innerText = description + data;
    countryInfo.appendChild(li);
  }

  if (countryToLoad) {
    makeList(countryToLoad.countryname, Number(countryToLoad.countrypopulation).toLocaleString(), countryToLoad.countrycapital);
  }
  

  request.send(null);

  request.onload = function(){
    // if(request.status === 200){
    //   console.log('got the data');
    // }

    var regions = [];

    var countries = JSON.parse(request.responseText);
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
      
      countryInfo.innerText = "";
      countryBorders.innerText = "";

      for(country of countries){
        if(country.name == name){
          var population = country.population;
          var capital = country.capital;
          var countryToSave = {
            countryname: name,
            countrypopulation: population,
            countrycapital: capital
          }

          var countryString = JSON.stringify(countryToSave);
          localStorage.setItem("saved country", countryString);

          makeList(name, Number(population).toLocaleString(), capital);
        

          if(country.borders == false){
            countryBorders.style.display = "none";
            bordersTitle.style.display = "none";
          }
          else {
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
    }
    }
 }

 var filterCountries = function(){
  select.innerHTML = "";
  var region = regionSelect.selectedOptions[0].innerText;
  if (region === "Other"){
    region = "";
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
