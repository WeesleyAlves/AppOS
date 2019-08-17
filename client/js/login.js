var buttonLogin = document.getElementById('buttonLogin');
var inputUser = document.getElementById('inputUser');
var inputPass = document.getElementById('inputPass');

buttonLogin.setAttribute("onclick","logar()");


var xhr = new XMLHttpRequest();
var url = "https://appsinaltelecom.herokuapp.com/login/";

function logar() {

    var userLogin = inputUser.value;

    if(userLogin==""){
        alert("Preencha o usuario, por favor!");
    }

    xhr.open('GET', url+userLogin, true );

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && userLogin != "") {
            if(xhr.status == 200){
                if(xhr.response != ""){
                var user = JSON.parse(xhr.response);

                    if(user.pass==inputPass.value){

                        window.localStorage.setItem('user', user.nome);
                        if(user.type=="admin"){
                            window.location.replace("./pages/admin.html");
                        };
                    }else{
                        alert("Usuario ou senha incorretos!");
                    }
                }else{
                    alert("Usuario ou senha incorretos!");
                }  
            } else {
                alert("Erro de Conexão");
            }
        }
    }
    xhr.send();
}
