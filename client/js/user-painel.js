var container = document.getElementById("container-user-info");

// Criação e montagem do painel para criação de novos usuarios

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

var labelNewUser = document.createElement('h4');
labelNewUser.innerHTML ='Novo Usuario';

painelDadosNewUser.appendChild(labelNewUser);
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
painelDadosNewUser.appendChild(newuserTipo);
painelDadosNewUser.appendChild(button);
painelDadosNewUser.style.display = 'none';

container.appendChild(painelDadosNewUser);


//Promise e função para criar o usuario.

var newUser = function(newUser) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        var url = "https://appsinaltelecom.herokuapp.com/admin/user";
        var data = JSON.stringify(newUser);

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type","application/json");

        xhr.onreadystatechange = function() {
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve("Usuario criado com sucesso.");
                }else{
                    reject("Erro na criação do usuario");
                }
            }
        }

        xhr.send(data);
    });
}

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
            reload();
            painelDadosNewUser.style.display = "none";
        })
        .catch(function(error){
            alert(error)
        });
}

//Criação do painel para deletar usuario.

var painelDelUser = document.createElement('div');
painelDelUser.setAttribute('class','new-user-painel');
painelDelUser.setAttribute('id','del-user-painel');

var selectAllUsers = document.createElement('select');
selectAllUsers.setAttribute('id','select-del-user');

var buttonDelUser = document.createElement('div');
buttonDelUser.setAttribute('id','button-del-user');
buttonDelUser.innerHTML = 'Deletar';
buttonDelUser.setAttribute('onclick','deleteUser()');

var labelDelUser = document.createElement('h4');
labelDelUser.innerHTML ='Deletar Usuario';

painelDelUser.appendChild(labelDelUser);
painelDelUser.appendChild(document.createTextNode('Nome do usuario:'));
painelDelUser.appendChild(document.createElement('br'));
painelDelUser.appendChild(selectAllUsers);
painelDelUser.appendChild(document.createElement('br'));
painelDelUser.appendChild(buttonDelUser);
container.appendChild(painelDelUser);

painelDelUser.style.display="none";

//Criação de promises para deletar usuario

var allUsers = [];

var arrayUsers = function(){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        var url = "https://appsinaltelecom.herokuapp.com/admin/";

        xhr.open("GET", url+"allUsers", true);

        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve(
                        JSON.parse(xhr.response)
                    );
                }else{
                    reject(
                        'Erro na requisição de usuarios'
                    );
                }
            }
        }

        xhr.send();
    });
};

var delUser = function(nome) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        var url = "https://appsinaltelecom.herokuapp.com/admin/user/"+nome;

        xhr.open("DELETE", url, true);

        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    resolve('Usuario deletado com sucesso.');
                }else{
                    reject('Erro na exclusão do usuario.');
                }
            }
        }

        xhr.send();
    });
}

// funções gerais.

function reload(){
    selectAllUsers.innerHTML ='';
    arrayUsers()
        .then(function(response){
            allUsers = response;
            allUsers.forEach(user => {
                var option = document.createElement('option');
                option.setAttribute('value',user.nome);
                option.innerHTML= user.nome;
                selectAllUsers.appendChild(option);
            });
        })
        .catch(function(error){
            console.warn(error);
        });

    newuserNome.value = '';
    newuserUser.value = '';
    newuserSenha.value = '';
    newuserTipo.value = '';

}

reload();

//funcões para deletar usuario.

function deleteUser() {
    delUser(selectAllUsers.value)
        .then(function(response){
            alert(response);
            reload();
            painelDelUser.style.display = 'none';
        })
        .catch(function(error){
            alert(error);
        });
}

// Controle de exibição dos painels

function newUserPainel() {
    if(painelDadosNewUser.style.display == 'block'){
        painelDadosNewUser.style.display = 'none';
    }else{
        painelDadosNewUser.style.display = 'block';
        painelDelUser.style.display = 'none';
    }
    
}

function delUserPainel() {
    if(painelDelUser.style.display == 'none'){
        painelDelUser.style.display = 'block';
        painelDadosNewUser.style.display = 'none';
    }else{
        painelDelUser.style.display = 'none';
    }
    
}


