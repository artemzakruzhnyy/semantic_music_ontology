getBriefInfo();
getBands();
getInstrument();
getGenre();
getAlbums();

function getBriefInfo(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'musician?getBriefInfo=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('briefInfo');
       var response = xhr.responseText;
       var briefInfo = JSON.parse(response);
       var table = document.createElement('table');
       for(var i = 0; i < 7; i++){
           var col = document.createElement('col');
           col.width = "200px";
           table.appendChild(col);
       }
       for(var x = 0; x < briefInfo.results.bindings.length; x++){
           var trTitle = document.createElement('tr');
           var thTitle = document.createElement('th');
           thTitle.innerHTML = "First Name";
           var thTitle1 = document.createElement('th');
           thTitle1.innerHTML = "Second Name";
           var thTitle2 = document.createElement('th');
           thTitle2.innerHTML = "Birth date";
           var thTitle3 = document.createElement('th');
           thTitle3.innerHTML = "Birth Place";
           var thTitle4 = document.createElement('th');
           thTitle4.innerHTML = "Gender";
           var thTitle5 = document.createElement('th');
           thTitle5.innerHTML = "Country";
           var thTitle6 = document.createElement('th');
           thTitle6.innerHTML = "City";
           trTitle.appendChild(thTitle);
           trTitle.appendChild(thTitle1);
           trTitle.appendChild(thTitle2);
           trTitle.appendChild(thTitle3);
           trTitle.appendChild(thTitle4);
           trTitle.appendChild(thTitle5);
           trTitle.appendChild(thTitle6);
           table.appendChild(trTitle);

           var tr = document.createElement('tr');
           var tdCDate = document.createElement('td');
           tdCDate.innerHTML = briefInfo.results.bindings[x].firstName.value;
           tr.appendChild(tdCDate);

           var tdCountry = document.createElement('td');
           tdCountry.innerHTML = briefInfo.results.bindings[x].secondName.value;
           tr.appendChild(tdCountry);

           var tdLanguage_Of_Songs = document.createElement('td');
           tdLanguage_Of_Songs.innerHTML = briefInfo.results.bindings[x].birthDate.value;
           tr.appendChild(tdLanguage_Of_Songs);

           var tdBirthPlace = document.createElement('td');
           tdBirthPlace.innerHTML = briefInfo.results.bindings[x].birthPlace.value;
           tr.appendChild(tdBirthPlace);

           var tdGender = document.createElement('td');
           tdGender.innerHTML = briefInfo.results.bindings[x].gender.value;
           tr.appendChild(tdGender);

           var tdCountryMusician = document.createElement('td');
           tdCountryMusician.innerHTML = briefInfo.results.bindings[x].countryMusician.value;
           tr.appendChild(tdCountryMusician);

           var tdCityMusician = document.createElement('td');
           tdCityMusician.innerHTML = briefInfo.results.bindings[x].cityMusician.value;
           tr.appendChild(tdCityMusician);

           /*var tdWiki_link = document.createElement('td');
           var aWiki_link = document.createElement('a');
           aWiki_link.innerHTML = "wiki link";
           aWiki_link.href = briefInfo.results.bindings[x].link.value;
           aWiki_link.target = "_blank";
           tdWiki_link.appendChild(aWiki_link)
           tr.appendChild(tdWiki_link);*/

           table.appendChild(tr);
           div.appendChild(table);
       }
    }
}

function getBands(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'musician?getBand=1', true);
    xhr.send();
    xhr.onload = function() {
        var div = document.getElementById('band');
        var response = xhr.responseText;
        var bands = JSON.parse(response);
        var header = document.getElementById('header');
        var musicianName = getCookie("musician");
        header.innerHTML = musicianName;
        var len = bands.results.bindings.length;
        if(len > 0){
           var p = document.createElement('p');
           p.innerHTML = "Member of Band:"
           div.appendChild(p);
        }
        for(var x = 0; x < len; x++){
            var p = document.createElement('p');
            var a = document.createElement('a');
            var info = document.createElement('p');
            var bandName = bands.results.bindings[x].label.value;
            a.id = bandName.replace(/ /ig, '_');
    		a.innerHTML = bandName;
    		a.onclick = function(){
                document.cookie = "band="+this.id;
            }
    		a.href = "band.html";
    		p.appendChild(a);
    		div.appendChild(p);
        }
    }
}

function getInstrument(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'musician?getInstrument=1', true);
    xhr.send();
    xhr.onload = function() {
        var div = document.getElementById('instrument');
        var response = xhr.responseText;
        var instruments = JSON.parse(response);
        var len = instruments.results.bindings.length;
        var p = document.createElement('p');
        if(len > 0){
           p.innerHTML = "Play on:";
        }else {
            p.innerHTML = "Play on: Vocalist";
        }
        div.appendChild(p);
        for(var x = 0; x < instruments.results.bindings.length; x++){
            var p = document.createElement('p');
            var a = document.createElement('a');
            var instrumentName = instruments.results.bindings[x].label.value;
            a.id = instrumentName.replace(/ /ig, '_');
    		a.innerHTML = instrumentName;
    		a.onclick = function(){
                document.cookie = "instrument="+this.id;
            }
    		a.href = "instrument.html";
    		p.appendChild(a);
    		div.appendChild(p);
        }
    }
}

function getGenre(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'musician?getGenre=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('genre');
       var response = xhr.responseText;
       var genre = JSON.parse(response);
       for(var x = 0; x < genre.results.bindings.length; x++){
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

function getAlbums(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'musician?getAlbums=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('albums');
       var response = xhr.responseText;
       var albums = JSON.parse(response);
       var len = albums.results.bindings.length;
       if(len > 0){
           var p = document.createElement('p');
           p.innerHTML = "Solo albums:"
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

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}