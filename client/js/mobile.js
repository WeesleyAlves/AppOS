// ==================== OS LIST ===================================

var list = document.getElementById("os-list");
var selectList = document.getElementById("select-list");

var osArray = [];

var url = "https://appsinaltelecom.herokuapp.com/admin/order"

var obterArray = function () {
    return new Promise(function(resolve, reject){
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    resolve(osArray = JSON.parse(xhr.response));
                }else{
                    reject('Erro na Requisição');
                }
            }
        }
        xhr.send();
    });
}

function gerarList(tipo){
    osArray.sort(function(a, b) {
        return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
    });

    
    list.innerHTML ="";

    osArray.forEach(osItem => {
        let os = document.createElement("li");
            if(osItem.statusOS=="Em Aberto") {
                os.style.backgroundColor = "#fbc9c9";
            }else if(osItem.statusOS=="Finalizada"){
                os.style.backgroundColor = "#c2f3c3";
            }

        os.setAttribute('onclick', 'detalhes("'+osArray.indexOf(osItem)+'")');
        
        
        if(tipo =="Em Aberto" || tipo =="Finalizada"){
            if(osItem.statusOS==tipo){
            os.setAttribute('class','order-li');

            let titulo = document.createElement("div");
            titulo.setAttribute('class','titulo-os');
            
            let endereco = document.createElement("div");
            endereco.setAttribute('class','endereco-os');

            let login = document.createElement("div");
            login.setAttribute('class','login-os');
            
            let plano = document.createElement("div");
            plano.setAttribute('class','plano-os');
                        
            titulo.appendChild( document.createTextNode("["+osItem.statusCliente+"] "+osItem.nomeCliente) );
            endereco.appendChild( document.createTextNode(osItem.endereco) )
            login.appendChild( document.createTextNode("Login: "+osItem.login) );
            plano.appendChild( document.createTextNode("Plano: "+osItem.plano) );
            os.appendChild(titulo);
            os.appendChild(endereco);
            os.appendChild(login);
            os.appendChild(plano);

            list.appendChild(os);
            }
        } else {
            os.setAttribute('class','order-li');

            let titulo = document.createElement("div");
            titulo.setAttribute('class','titulo-os');
            
            let endereco = document.createElement("div");
            endereco.setAttribute('class','endereco-os');

            let login = document.createElement("div");
            login.setAttribute('class','login-os');
            
            let plano = document.createElement("div");
            plano.setAttribute('class','plano-os');
                        
            titulo.appendChild( document.createTextNode("["+osItem.statusCliente+"] "+osItem.nomeCliente) );
            endereco.appendChild( document.createTextNode(osItem.endereco) )
            login.appendChild( document.createTextNode("Login: "+osItem.login) );
            plano.appendChild( document.createTextNode("Plano: "+osItem.plano) );
            os.appendChild(titulo);
            os.appendChild(endereco);
            os.appendChild(login);
            os.appendChild(plano);

            list.appendChild(os);
        }
    });
}

obterArray()
    .then(function(response){
        gerarList("Em Aberto");
    })
    .catch(function(error){
        alert(error);
    });

selectList.addEventListener('change', function(){
    gerarList(this.value);
});

function buscarCliente(){
    var total = 0;
    var resultadoBusca = [];
    var busca = document.getElementById("input-search");
    if(busca.value == "" || busca.value == " " || busca.value == null) {
        alert("Campo de Busca Vazio!");
    }else {
        for(var i=0; i<osArray.length;i++){
            if(osArray[i].login==busca.value){
                resultadoBusca.push(osArray[i]);
                total++;
            }
        }

        if(total!=0){

            list.innerHTML="";

            resultadoBusca.forEach(retorno => {

                let os = document.createElement("li");
                
                if(retorno.statusOS=="Em Aberto") {
                    os.style.backgroundColor = "#fbc9c9";
                }else if(retorno.statusOS=="Finalizada"){
                    os.style.backgroundColor = "#c2f3c3";
                }

                os.setAttribute('onclick', 'detalhes("'+osArray.indexOf(retorno)+'")');
                
                os.setAttribute('class','order-li');

                let titulo = document.createElement("div");
                titulo.setAttribute('class','titulo-os');
                
                let endereco = document.createElement("div");
                endereco.setAttribute('class','endereco-os');

                let login = document.createElement("div");
                login.setAttribute('class','login-os');
                
                let plano = document.createElement("div");
                plano.setAttribute('class','plano-os');
                            
                titulo.appendChild( document.createTextNode("["+retorno.statusCliente+"] "+retorno.nomeCliente) );
                endereco.appendChild( document.createTextNode(retorno.endereco) )
                login.appendChild( document.createTextNode("Login: "+retorno.login) );
                plano.appendChild( document.createTextNode("Plano: "+retorno.plano) );
                os.appendChild(titulo);
                os.appendChild(endereco);
                os.appendChild(login);
                os.appendChild(plano);

                list.appendChild(os);
                
            })
        } 
    }
}

function reloadOsList(){

    obterArray()
        .then(function(response){
            gerarList("Em Aberto");
        })
        .catch(function(error){
            alert(error);
        });
    }