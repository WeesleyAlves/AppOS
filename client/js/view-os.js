var view = document.getElementById('content-os');
var viewButtons = document.getElementById('container-buttons');

var btnDelete = document.getElementById('btn-delete');
var btnEdit = document.getElementById('btn-edit');
var selectOS = document.getElementById('select-list');


function detalhes(id){
    view.innerHTML="";

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
    btnDelete.setAttribute('onclick', 'deleteOS("'+osArray[id]._id+'","'+selectOS.value+'")');
    btnEdit.setAttribute('onclick', 'editOS("'+osArray[id]._id+'")');
    view.style.display = "inline-block";
    viewButtons.style.display = "block";
}

function deleteOS(id, lista) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3001/admin/order/";
    xhr.open("DELETE", url+id, true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                obterArray()
                    .then(function(response){
                        gerarList(lista);
                        view.innerHTML="";
                        view.style.display="none";
                        viewButtons.style.display="none";
                        alert('Ordem de Serviço Removida');
                    })
                    .catch(function(error){
                        alert(error);
                    });
            }
        }
    }

    xhr.send();
}

