var view = document.getElementById('content-os');
var viewButtons = document.getElementById('container-buttons');

var btnDelete = document.getElementById('btn-delete');
var btnEdit = document.getElementById('btn-edit');
var selectOS = document.getElementById('select-list');

var nothing = document.getElementById('nothing');


function detalhes(id){
    viewEditBtn.style.display="none";
    newOS.style.display='none';
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
    btnEdit.setAttribute('onclick', 'editOS("'+id+'")');
    view.style.display = "inline-block";
    viewButtons.style.display = "block";

    nothing.style.display = 'none';
}

function deleteOS(id, lista) {
    var xhr = new XMLHttpRequest();
    var url = "https://appsinaltelecom.herokuapp.com/admin/order/";
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
                        nothing.style.display = 'block';
                    })
                    .catch(function(error){
                        alert(error);
                    });
            }
        }
    }

    xhr.send();
}

// View lançamento de nova OS.

var newOS = document.getElementById('new-os');

var contentNewOs = document.getElementById('content-new-os');

var labelNewOs = document.createElement('h4');
labelNewOs.innerHTML = 'Nova OS';

var newNome = document.createElement('input');
newNome.setAttribute('class','select-new-os');
newNome.setAttribute('id','newNome');

var newEnd = document.createElement('input');
newEnd.setAttribute('class','select-new-os');
newEnd.setAttribute('id','newEnd');

var newBairro = document.createElement('input');
newBairro.setAttribute('class','select-new-os');
newBairro.setAttribute('id','newBairro');

var newRef = document.createElement('input');
newRef.setAttribute('class','select-new-os');
newRef.setAttribute('id','newRef');

var newComodato = document.createElement('input');
newComodato.setAttribute('class','select-new-os');
newComodato.setAttribute('id','newComodato');

var newLogin = document.createElement('input');
newLogin.setAttribute('class','select-new-os');
newLogin.setAttribute('id','newLogin');

var newSenha = document.createElement('input');
newSenha.setAttribute('class','select-new-os');
newSenha.setAttribute('id','newSenha');

var newPlano = document.createElement('input');
newPlano.setAttribute('class','select-new-os');
newPlano.setAttribute('id','newPlano');

var newStatus = document.createElement('input');
newStatus.setAttribute('class','select-new-os');
newStatus.setAttribute('id','newStatus');

var newResponsavel = document.createElement('input');
newResponsavel.setAttribute('class','select-new-os');
newResponsavel.setAttribute('id','newResponsavel');

contentNewOs.appendChild(labelNewOs);

contentNewOs.appendChild(document.createTextNode('Nome:'));
contentNewOs.appendChild(document.createElement('br'));
contentNewOs.appendChild(newNome);
contentNewOs.appendChild(document.createElement('br'));

contentNewOs.appendChild(document.createTextNode('Endereço:'));
contentNewOs.appendChild(document.createElement('br'));
contentNewOs.appendChild(newEnd);
contentNewOs.appendChild(document.createElement('br'));

contentNewOs.appendChild(document.createTextNode('Bairro:'));
contentNewOs.appendChild(document.createElement('br'));
contentNewOs.appendChild(newBairro);
contentNewOs.appendChild(document.createElement('br'));

contentNewOs.appendChild(document.createTextNode('Referencia:'));
contentNewOs.appendChild(document.createElement('br'));
contentNewOs.appendChild(newRef);
contentNewOs.appendChild(document.createElement('br'));

contentNewOs.appendChild(document.createTextNode('Comodato:'));
contentNewOs.appendChild(document.createElement('br'));
contentNewOs.appendChild(newComodato);
contentNewOs.appendChild(document.createElement('br'));

contentNewOs.appendChild(document.createTextNode('Login:'));
contentNewOs.appendChild(newLogin);

contentNewOs.appendChild(document.createTextNode('Senha:'));
contentNewOs.appendChild(newSenha);
contentNewOs.appendChild(document.createElement('br'));

contentNewOs.appendChild(document.createTextNode('Plano:'));
contentNewOs.appendChild(newPlano);

contentNewOs.appendChild(document.createTextNode('Status:'));
contentNewOs.appendChild(newStatus);
contentNewOs.appendChild(document.createElement('br'));

contentNewOs.appendChild(document.createTextNode('Responsavel:'));
contentNewOs.appendChild(newResponsavel);
contentNewOs.appendChild(document.createElement('br'));

function viewNewOS() { 
        viewEditBtn.style.display="none";
        nothing.style.display='none';
        view.innerHTML="";
        view.style.display="none";
        viewButtons.style.display="none";
        newOS.style.display='block';
}

//promisse para nova OS;

var lancaNovaOs = function(data){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        var url = "https://appsinaltelecom.herokuapp.com/admin/order";

        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve('Ordem de Serviço Lançada com Sucesso!');
                }else{
                    reject('Erro no Lançamento da Ordem de Serviço');
                }
            }
        }

        xhr.send(JSON.stringify(data));
    });
}

//função para lançar a OS;

function reloadOsList(){

    obterArray()
        .then(function(response){
            gerarList("Em Aberto");
        })
        .catch(function(error){
            alert(error);
        });

    newNome.value = '';
    newEnd.value = '';
    newBairro.value = '';
    newRef.value = '';
    newComodato.value = '';
    newLogin.value = '';
    newSenha.value = '';
    newPlano.value = '';
    newStatus.value = '';
    newResponsavel.value = '';
}

function criarOS(){
    var arrayPost = {
      "nomeCliente" : newNome.value,
      "endereco" : newEnd.value,
      "bairro" : newBairro.value,
      "ref" : newRef.value,
      "comodato" : newComodato.value,
      "login" : newLogin.value,
      "senha" : newSenha.value,
      "plano" : newPlano.value,
      "statusCliente" : newStatus.value,
      "responsavel" : newResponsavel.value,
      "criador" : window.localStorage.getItem('user'),
      "statusOS":"Em Aberto",
      "finalizadaEm": "",
      "solucao" : " "
    }

    lancaNovaOs(arrayPost)
        .then(function(response){
            alert(response);
            reloadOsList();
        })
        .catch(function(error){
            alert(error);
        });
    
}

var viewEditBtn = document.getElementById("container-buttons-edit");
var btnCancel = document.getElementById("btn-cancel");
var btnConcluir = document.getElementById("btn-post");


var editNome = document.createElement('input');
var editEnd = document.createElement('input');
var editBairro = document.createElement('input');
var editRef = document.createElement('input');
var editComodato = document.createElement('input');
var editLogin = document.createElement('input');
var editSenha = document.createElement('input');
var editPlano = document.createElement('input');
var editStatus = document.createElement('input');
var editResponsavel = document.createElement('input');

function editOS(id){
    view.innerHTML="";
    viewButtons.style.display="none";

    var labelEditOS = document.createElement('h4');
    labelEditOS.innerHTML = 'Editar OS';

    
    editNome.setAttribute('class','select-new-os');
    editNome.setAttribute('id','editNome');
    editNome.value=osArray[id].nomeCliente;

    
    editEnd.setAttribute('class','select-new-os');
    editEnd.setAttribute('id','editEnd');
    editEnd.value = osArray[id].endereco;

    
    editBairro.setAttribute('class','select-new-os');
    editBairro.setAttribute('id','editBairro');
    editBairro.value = osArray[id].bairro;

    
    editRef.setAttribute('class','select-new-os');
    editRef.setAttribute('id','editRef');
    editRef.value=osArray[id].ref;

    
    editComodato.setAttribute('class','select-new-os');
    editComodato.setAttribute('id','editComodato');
    editComodato.value=osArray[id].comodato;

    
    editLogin.setAttribute('class','select-new-os');
    editLogin.setAttribute('id','editLogin');
    editLogin.value = osArray[id].login;

    
    editSenha.setAttribute('class','select-new-os');
    editSenha.setAttribute('id','editSenha');
    editSenha.value = osArray[id].senha;

    
    editPlano.setAttribute('class','select-new-os');
    editPlano.setAttribute('id','editPlano');
    editPlano.value = osArray[id].plano;

    
    editStatus.setAttribute('class','select-new-os');
    editStatus.setAttribute('id','editStatus');
    editStatus.value = osArray[id].statusCliente;

   
    editResponsavel.setAttribute('class','select-new-os');
    editResponsavel.setAttribute('id','editResponsavel');
    editResponsavel.value = osArray[id].responsavel;

    view.appendChild(labelEditOS);

    view.appendChild(document.createTextNode('Nome:'));
    view.appendChild(document.createElement('br'));
    view.appendChild(editNome);
    view.appendChild(document.createElement('br'));

    view.appendChild(document.createTextNode('Endereço:'));
    view.appendChild(document.createElement('br'));
    view.appendChild(editEnd);
    view.appendChild(document.createElement('br'));

    view.appendChild(document.createTextNode('Bairro:'));
    view.appendChild(document.createElement('br'));
    view.appendChild(editBairro);
    view.appendChild(document.createElement('br'));

    view.appendChild(document.createTextNode('Referencia:'));
    view.appendChild(document.createElement('br'));
    view.appendChild(editRef);
    view.appendChild(document.createElement('br'));

    view.appendChild(document.createTextNode('Comodato:'));
    view.appendChild(document.createElement('br'));
    view.appendChild(editComodato);
    view.appendChild(document.createElement('br'));

    view.appendChild(document.createTextNode('Login:'));
    view.appendChild(editLogin);

    view.appendChild(document.createTextNode('Senha:'));
    view.appendChild(editSenha);
    view.appendChild(document.createElement('br'));

    view.appendChild(document.createTextNode('Plano:'));
    view.appendChild(editPlano);

    view.appendChild(document.createTextNode('Status:'));
    view.appendChild(editStatus);
    view.appendChild(document.createElement('br'));

    view.appendChild(document.createTextNode('Responsavel:'));
    view.appendChild(editResponsavel);
    view.appendChild(document.createElement('br'));

    
    
    
    btnCancel.setAttribute("onclick","detalhes("+id+")");

    

    btnConcluir.setAttribute("onclick","gerarArrayEdit('"+osArray[id]._id+"','"+id+"')");

    
    viewEditBtn.style.display="inline-block";

}

var updateOS = function(id, array){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        var url = "https://appsinaltelecom.herokuapp.com/admin/order/"+id;

        xhr.open("PUT", url, true);
        xhr.setRequestHeader('Content-type','application/json');

        xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve('Editado com sucesso');
                }else{
                    reject('Falha ao editar');
                }
            }
        }

        xhr.send(JSON.stringify(array));
    });
};

function gerarArrayEdit(id, idArray) {
        var data = {
            "nomeCliente" : editNome.value,
            "endereco" : editEnd.value,
            "bairro" : editBairro.value,
            "ref" : editRef.value,
            "comodato" : editComodato.value,
            "login" : editLogin.value,
            "senha" : editSenha.value,
            "plano" : editPlano.value,
            "statusCliente" : editStatus.value,
            "responsavel" : editResponsavel.value
        }

        updateOS(id, data)
            .then(function(response){
                alert(response);
                
                obterArray()
                    .then(function(response){
                        gerarList("Em Aberto");
                        detalhes(idArray);
                    })
                    .catch(function(error){
                        alert(error);
                    });

            })
            .catch(function(error){
                alert(error);
            });

    }

