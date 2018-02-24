getGenre();
getPerformance();
getMusician();
getAlbums();
getBriefInfo();
getSingles();

function getBriefInfo(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'band?getBriefInfo=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('briefInfo');
       var response = xhr.responseText;
       var briefInfo = JSON.parse(response);
       var table = document.createElement('table');
       for(var i = 0; i < 5; i++){
           var col = document.createElement('col');
           col.width = "200px";
           table.appendChild(col);
       }
       for(var x = 0; x < briefInfo.results.bindings.length; x++){
           var trTitle = document.createElement('tr');
           var thTitle = document.createElement('th');
           thTitle.innerHTML = "Creation Date";
           var thTitle1 = document.createElement('th');
           thTitle1.innerHTML = "City";
           var thTitle2 = document.createElement('th');
           thTitle2.innerHTML = "Country";
           var thTitle3 = document.createElement('th');
           thTitle3.innerHTML = "Language of sounds";
           var thTitle4 = document.createElement('th');
           thTitle4.innerHTML = "Wiki link";
           trTitle.appendChild(thTitle);
           trTitle.appendChild(thTitle1);
           trTitle.appendChild(thTitle2);
           trTitle.appendChild(thTitle3);
           trTitle.appendChild(thTitle4);
           table.appendChild(trTitle);

           var tr = document.createElement('tr');
           var tdCDate = document.createElement('td');
           tdCDate.innerHTML = briefInfo.results.bindings[x].creationDate.value;
           tr.appendChild(tdCDate);

           var tdCity = document.createElement('td');
           tdCity.innerHTML = briefInfo.results.bindings[x].city.value;
           tr.appendChild(tdCity);

           var tdCountry = document.createElement('td');
           tdCountry.innerHTML = briefInfo.results.bindings[x].country.value;
           tr.appendChild(tdCountry);

           var tdLanguage_Of_Songs = document.createElement('td');
           tdLanguage_Of_Songs.innerHTML = briefInfo.results.bindings[x].language_Of_Songs.value;
           tr.appendChild(tdLanguage_Of_Songs);

           var tdWiki_link = document.createElement('td');
           var aWiki_link = document.createElement('a');
           aWiki_link.innerHTML = "wiki link";
           aWiki_link.href = briefInfo.results.bindings[x].wiki_link.value;
           aWiki_link.target = "_blank";
           tdWiki_link.appendChild(aWiki_link)
           tr.appendChild(tdWiki_link);

           table.appendChild(tr);
           div.appendChild(table);
       }
    }
}

function getMusician(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'band?getBand=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('members');
       var header = document.getElementById('header');
       var bandName = getCookie("band");
       header.innerHTML = bandName;
       var response = xhr.responseText;
       var musicians = JSON.parse(response);
       var len = musicians.results.bindings.length;
       if(len > 0){
           var p = document.createElement('p');
           p.innerHTML = "Musicians:"
           div.appendChild(p);
       }
       for(var x = 0; x < musicians.results.bindings.length; x++){
           var p = document.createElement('p');
           var a = document.createElement('a');
           var musicianName = musicians.results.bindings[x].label.value
           a.id = musicianName.replace(/ /ig, '_');
           a.innerHTML = musicianName;
    	   a.onclick = function(){
    	       document.cookie = "musician="+this.id;
    	   }
    	   a.href = "musician.html";
           p.appendChild(a)
           div.appendChild(p);
       }
    }
}

function getPerformance(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'band?getPerformance=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('performances');
       var response = xhr.responseText;
       var performance = JSON.parse(response);
       var len = performance.results.bindings.length;
       if(len > 0){
           var p = document.createElement('p');
           p.innerHTML = "Performances:"
           div.appendChild(p);
       }
       for(var x = 0; x < len; x++){
           var p = document.createElement('p');
           var a = document.createElement('a');
           var performanceName = performance.results.bindings[x].label.value;
           a.innerHTML = performanceName;
           a.href = "performance.html";
           a.id = performanceName.replace(/ /ig, '_');
           a.onclick = function(){
               document.cookie = "performance="+this.id;
           }
           p.appendChild(a)
           div.appendChild(p);
       }
    }
}

function getAlbums(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'band?getAlbums=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('albums');
       var response = xhr.responseText;
       var albums = JSON.parse(response);
       var len = albums.results.bindings.length;
       if(len > 0){
           var p = document.createElement('p');
           p.innerHTML = "Albums:"
           div.appendChild(p);
       }
       for(var x = 0; x < len; x++){
           var p = document.createElement('p');
           var a = document.createElement('a');
           var albumName = albums.results.bindings[x].label.value;
           a.id = albumName.replace(/ /ig, '_');
           a.onclick = function(){
               document.cookie = "album="+this.id;
           }
           a.innerHTML = albums.results.bindings[x].label.value;
           a.href = "work.html";
           p.appendChild(a)
           div.appendChild(p);
       }
    }
}

function getSingles(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'band?getSingle=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('single');
       var response = xhr.responseText;
       var single = JSON.parse(response);
       var len = single.results.bindings.length;
       if(len > 0){
           var p = document.createElement('p');
           p.innerHTML = "Singles:"
           div.appendChild(p);
       }
       for(var x = 0; x < len; x++){
           var p = document.createElement('p');
           var a = document.createElement('a');
           var singleName = single.results.bindings[x].label.value;
           a.id = singleName.replace(/ /ig, '_');
           a.onclick = function(){
               document.cookie = "single="+this.id;
           }
           a.innerHTML = singleName;
           a.target = "_blank";
           a.href = single.results.bindings[x].uri.value;
           p.appendChild(a)
           div.appendChild(p);
       }
    }
}

function getGenre(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'band?getGenre=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('genre');
       var response = xhr.responseText;
       var genre = JSON.parse(response);
       var len = genre.results.bindings.length;
       if(len > 0){
           var p = document.createElement('p');
           p.innerHTML = "Genre:"
           div.appendChild(p);
       }
       for(var x = 0; x < len; x++){
           var p = document.createElement('p');
           var a = document.createElement('a');
           a.innerHTML = genre.results.bindings[x].label.value;
           a.onclick = function(){
               document.cookie = "genre="+this.innerHTML;
           }
           a.href = "genre.html";
           p.appendChild(a)
           div.appendChild(p);
       }
    }
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}