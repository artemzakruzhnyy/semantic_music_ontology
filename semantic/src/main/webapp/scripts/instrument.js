getBriefInfo();
getMusician();

function getBriefInfo(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'instrument?getBriefInfo=1', true);
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
           thTitle.innerHTML = "Type";
           var thTitle1 = document.createElement('th');
           thTitle1.innerHTML = "Model";
           var thTitle2 = document.createElement('th');
           thTitle2.innerHTML = "Brand";
           var thTitle3 = document.createElement('th');
           thTitle3.innerHTML = "Manufacturer country";

           trTitle.appendChild(thTitle);
           trTitle.appendChild(thTitle1);
           trTitle.appendChild(thTitle2);
           trTitle.appendChild(thTitle3);
           table.appendChild(trTitle);

           var tr = document.createElement('tr');
           var tdCDate = document.createElement('td');
           tdCDate.innerHTML = briefInfo.results.bindings[x].label.value;
           tr.appendChild(tdCDate);

           var tdCountry = document.createElement('td');
           tdCountry.innerHTML = briefInfo.results.bindings[x].model.value;
           tr.appendChild(tdCountry);

           var tdLanguage_Of_Songs = document.createElement('td');
           tdLanguage_Of_Songs.innerHTML = briefInfo.results.bindings[x].brend.value;
           tr.appendChild(tdLanguage_Of_Songs);

           var tdBirthPlace = document.createElement('td');
           tdBirthPlace.innerHTML = briefInfo.results.bindings[x].manufacturerCountry.value;
           tr.appendChild(tdBirthPlace);

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

function getMusician(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'instrument?getMusician=1', true);
    xhr.send();
    xhr.onload = function() {
       var div = document.getElementById('musician');
       var header = document.getElementById('header');
       var instrumentName = getCookie("instrument");
       header.innerHTML = instrumentName;
       var response = xhr.responseText;
       var musicians = JSON.parse(response);
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

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}