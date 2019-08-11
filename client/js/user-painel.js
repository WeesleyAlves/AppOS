var container = document.getElementById("container-user-info");

var painelDadosNewUser = document.createElement('div');

var newuserNome = document.createElement('input');
var newuserUser = document.createElement('input');
var newuserSenha = document.createElement('input');
var newuserTipo = document.createElement('select');

newuserNome.setAttribute('class','input-new-user');
    
newuserUser.setAttribute('class','input-new-user');

newuserSenha.setAttribute('class','input-new-user');

newuserTipo.setAttribute('id','select-new-user');

var option1 = document.createElement('option');
option1.setAttribute('value','admin');
option1.innerHTML='Admin';
newuserTipo.appendChild(option1);

var option2 = document.createElement('option');
option2.setAttribute('value','tec');
option2.innerHTML='Tecnico';
newuserTipo.appendChild(option2);

var button = document.createElement('div');
button.setAttribute('id','button-new-user');
button.innerHTML = 'Criar';
button.setAttribute('onclick','criarUser()');

painelDadosNewUser.setAttribute('class','new-user-painel');
painelDadosNewUser.appendChild(document.createTextNode('Nome:'));
painelDadosNewUser.appendChild(document.createElement('br'));
painelDadosNewUser.appendChild(newuserNome);
painelDadosNewUser.appendChild(document.createElement('br'));
painelDadosNewUser.appendChild(document.createTextNode('Usuario:'));
painelDadosNewUser.appendChild(document.createElement('br'));
painelDadosNewUser.appendChild(newuserUser);
painelDadosNewUser.appendChild(document.createElement('br'));
painelDadosNewUser.appendChild(document.createTextNode('Senha:'));
painelDadosNewUser.appendChild(document.createElement('br'));
painelDadosNewUser.appendChild(newuserSenha);
painelDadosNewUser.appendChild(document.createElement('br'));
painelDadosNewUser.appendChild(document.createTextNode('Tipo:'));
// painel.appendChild(document.createElement('br'));
painelDadosNewUser.appendChild(newuserTipo);
painelDadosNewUser.appendChild(button);

painelDadosNewUser.style.display = 'none';

container.appendChild(painelDadosNewUser);

function newUserPainel() {

    if(painelDadosNewUser.style.display == 'block'){
        painelDadosNewUser.style.display = 'none';
    }else{
        painelDadosNewUser.style.display = 'block';
    }
    
}

var newUser = function(newUser) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:3001/admin/user";
        var data = JSON.stringify(newUser);

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","application/json");

        xhr.onreadystatechange = function() {
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve("ok");
                }else{
                    reject("fail");
                }
            }
        }

        xhr.send(data);
    });
}

// newUser(arrayTeste)
//     .then(function(response){
//         alert(response);
//     })
//     .catch(function(error){
//         console.log(error);
//     });

function criarUser(){
    
    var data = {
        "nome": newuserNome.value,
        "user": newuserUser.value,
        "pass": newuserSenha.value,
        "type": newuserTipo.value
    }

    newUser(data)
        .then(function(response){
            alert(response);
            painelDadosNewUser.style.display = "none";
        })
        .catch(function(error){
            alert(error)
        });
}