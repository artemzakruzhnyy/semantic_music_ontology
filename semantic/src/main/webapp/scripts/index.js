getBands();

function getBands(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'music?getBands=1', true);
    xhr.send();
    xhr.onload = function() {
        var div = document.getElementById('bands');
        var response = xhr.responseText;
        if(response != ""){
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
}

