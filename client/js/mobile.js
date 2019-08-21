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

        os.setAttribute('onclick', 'openDetalhes("'+osArray.indexOf(osItem)+'")');
        
        
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


// ------------------- VIEW OS ------------------

var container = document.getElementById('container-viewOs');
var view = document.getElementById('content-OS');
var containerFechamento = document.getElementById('container-fecharOs');
var textSolucao = document.getElementById("text-solucao");
var textMaterial = document.getElementById("text-material");
var btnResolve = document.getElementById("btn-resolve");
var btnFecharOs = document.getElementById("btn-fechar");


function closeView(viewClose) {
    if(viewClose == "detalhes"){
        container.style.display = "none";
    }else if (viewClose == "fechamento") {
        containerFechamento.style.display = "none";
        textSolucao.value="";
    }
    
}

function openDetalhes(id) {

    view.innerHTML = "";
    var nomeCliente = document.createElement('div');
    nomeCliente.setAttribute('class','text-view');
    nomeCliente.setAttribute('id','nomeCliente-view');

    var endereco = document.createElement('div');
    endereco.setAttribute('class','text-view');
    endereco.setAttribute('id','endereco-view');
    
    var bairro = document.createElement('div');
    bairro.setAttribute('class','text-view');
    bairro.setAttribute('id','bairro-view');

    var ref = document.createElement('div');
    ref.setAttribute('class','text-view');
    ref.setAttribute('id','ref-view');

    var comodato = document.createElement('div');
    comodato.setAttribute('class','text-view');
    comodato.setAttribute('id','comodato-view');

    var login = document.createElement('div');
    login.setAttribute('class','text-view');
    login.setAttribute('id','login-view');

    var senha = document.createElement('div');
    senha.setAttribute('class','text-view');
    senha.setAttribute('id','senha-view');

    var plano = document.createElement('div');
    plano.setAttribute('class','text-view');
    plano.setAttribute('id','plano-view');

    var statusCliente = document.createElement('div');
    statusCliente.setAttribute('class','text-view');
    statusCliente.setAttribute('id','statusCliente-view');

    var responsavel = document.createElement('div');
    responsavel.setAttribute('class','text-view');
    responsavel.setAttribute('id','responsavel-view');

    var criador = document.createElement('div');
    criador.setAttribute('class','text-view');
    criador.setAttribute('id','criador-view');

    var solucao = document.createElement('div');
    solucao.setAttribute('class','text-view');
    solucao.setAttribute('id','solucao-view');

    var finalizadaEm = document.createElement('div');
    finalizadaEm.setAttribute('class','text-view');
    finalizadaEm.setAttribute('id','finalizadaEm-view');

    var createdAt = document.createElement('div');
    createdAt.setAttribute('class','text-view');
    createdAt.setAttribute('id','createdAt-view');

    var _id = document.createElement('div');
    _id.setAttribute('class','text-view');
    _id.setAttribute('id','id-view');

    nomeCliente.appendChild(document.createTextNode(osArray[id].nomeCliente));
    endereco.appendChild(document.createTextNode(osArray[id].endereco));
    bairro.appendChild(document.createTextNode("Bairro: "+osArray[id].bairro));
    ref.appendChild(document.createTextNode("Ref: "+osArray[id].ref));
    comodato.appendChild(document.createTextNode("Comodato: "+osArray[id].comodato));
    login.appendChild(document.createTextNode("Login: "+osArray[id].login));
    senha.appendChild(document.createTextNode("Senha: "+osArray[id].senha));
    plano.appendChild(document.createTextNode("Plano: "+osArray[id].plano));
    statusCliente.appendChild(document.createTextNode("Status: "+osArray[id].statusCliente));
    responsavel.appendChild(document.createTextNode("Responsavel: "+osArray[id].responsavel));
    criador.appendChild(document.createTextNode("Aberta por: "+osArray[id].criador));
    solucao.appendChild(document.createTextNode("Solução: "+osArray[id].solucao));
    finalizadaEm.appendChild(document.createTextNode("Finalizada em: "+osArray[id].finalizadaEm));
    createdAt.appendChild(document.createTextNode("Aberta Em: "+osArray[id].createdAt));
    _id.appendChild(document.createTextNode("ID: "+osArray[id]._id));

    view.appendChild(nomeCliente);
    view.appendChild(endereco);
    view.appendChild(bairro);
    view.appendChild(ref);
    view.appendChild(comodato);
    view.appendChild(login);
    view.appendChild(senha);
    view.appendChild(plano);
    view.appendChild(statusCliente);
    view.appendChild(responsavel);
    view.appendChild(criador);
    view.appendChild(createdAt);
    view.appendChild(finalizadaEm);
    view.appendChild(solucao);
    view.appendChild(_id);

    btnResolve.setAttribute('onclick','openFechamento("'+osArray[id]._id+'")');

    container.style.display = "block";
}

function openFechamento(id) {
    container.style.display = "none";
    btnFecharOs.setAttribute('onclick','fecharOS("'+id+'")');
    containerFechamento.style.display = "block";
}

var fechamento = function(idOs, data){

    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        var url = "https://appsinaltelecom.herokuapp.com/admin/order/"+idOs;

        xhr.open("PUT", url, true);
        xhr.setRequestHeader('Content-Type','application/json');

        xhr.onreadystatechange = function() {
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve(
                        "Ordem de Serviço Finalizada com Sucesso!"
                    );
                }else{
                    reject(
                        "!Falha ao finalizar Ordem de Serviço!"
                    );
                }
            }
        }

        xhr.send(JSON.stringify(data));
    });
}

function fecharOS(idOS) {
    var dateAtual = new Date();
    dateFormat = dateAtual.getDate()+"/"+dateAtual.getMonth()+"/"+dateAtual.getFullYear()+" - "+dateAtual.getHours()+":"+dateAtual.getMinutes()+" - Por: "+window.localStorage.getItem('user');

    var data = {
        "statusOS":"Finalizada",
        "solucao":textSolucao.value,
        "finalizadaEm":dateFormat,
        "materialUtilizado":textMaterial.value,
    }     

    fechamento(idOS, data)
        .then(function(response){
            alert(response);
            containerFechamento.style.display = "none";
            reloadOsList();
        })
        .catch(function(error){
            alert(error);
        });
}

