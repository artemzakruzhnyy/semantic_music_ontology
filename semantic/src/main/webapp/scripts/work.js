getGenre();
getBands();
getSongs();
getBriefInfo();

function getGenre(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'work?getGenre=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('genre');
       var response = xhr.responseText;
       var genre = JSON.parse(response);
       var header = document.getElementById('header');
       var genreName = getCookie("album");
       header.innerHTML = genreName;
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

function getBands(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'work?getBands=1', true);
    xhr.send();
    xhr.onload = function() {
        var div = document.getElementById('band');
        var response = xhr.responseText;
        var bands = JSON.parse(response);
        for(var x = 0; x < bands.results.bindings.length; x++){
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

function getSongs(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'work?getSongs=1', true);
    xhr.send();
    xhr.onload = function() {
        var div = document.getElementById('members');
        var response = xhr.responseText;
        var songs = JSON.parse(response);
        for(var x = 0; x < songs.results.bindings.length; x++){
            var p = document.createElement('p');
            var a = document.createElement('a');
            var info = document.createElement('p');
            var songName = songs.results.bindings[x].label.value;
            a.id = songName.replace(/ /ig, '_');
    		a.innerHTML = songName;
    		a.onclick = function(){
                document.cookie = "song="+this.id;
            }
            a.href = songs.results.bindings[x].uri.value;
            a.target = "_blank";
    		p.appendChild(a);
    		div.appendChild(p);
        }
    }
}

function getBriefInfo(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'work?getBriefInfo=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('briefInfo');
       var response = xhr.responseText;
       var briefInfo = JSON.parse(response);
       var table = document.createElement('table');
       for(var i = 0; i < 4; i++){
           var col = document.createElement('col');
           col.width = "200px";
           table.appendChild(col);
       }
       for(var x = 0; x < briefInfo.results.bindings.length; x++){
           var trTitle = document.createElement('tr');
           var thTitle = document.createElement('th');
           thTitle.innerHTML = "Release Date";
           var thTitle1 = document.createElement('th');
           thTitle1.innerHTML = "Durability";
           var thTitle2 = document.createElement('th');
           thTitle2.innerHTML = "Language";
           var thTitle3 = document.createElement('th');
           thTitle3.innerHTML = "Wiki link";
           trTitle.appendChild(thTitle);
           trTitle.appendChild(thTitle1);
           trTitle.appendChild(thTitle2);
           trTitle.appendChild(thTitle3);
           table.appendChild(trTitle);

           var tr = document.createElement('tr');
           var tdCDate = document.createElement('td');
           tdCDate.innerHTML = briefInfo.results.bindings[x].releaseDate.value;
           tr.appendChild(tdCDate);

           var tdCountry = document.createElement('td');
           tdCountry.innerHTML = briefInfo.results.bindings[x].durability.value;
           tr.appendChild(tdCountry);

           var tdLanguage_Of_Songs = document.createElement('td');
           tdLanguage_Of_Songs.innerHTML = briefInfo.results.bindings[x].lang.value;
           tr.appendChild(tdLanguage_Of_Songs);

           var tdWiki_link = document.createElement('td');
           var aWiki_link = document.createElement('a');
           aWiki_link.innerHTML = "wiki link";
           aWiki_link.href = briefInfo.results.bindings[x].link.value;
           aWiki_link.target = "_blank";
           tdWiki_link.appendChild(aWiki_link)
           tr.appendChild(tdWiki_link);

           table.appendChild(tr);
           div.appendChild(table);
       }
    }
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}