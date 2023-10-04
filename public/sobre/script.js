//Código do menu

const menuButton = document.querySelector('.menu-button');
const menuList = document.querySelector('.menu-list');
const imgFundo = document.querySelector('.containerImagemFundo1');

menuButton.addEventListener('click', function() {
  menuList.classList.toggle('open'); 
});

//Função de logout
function logout() {
fetch('/logout', {
  method: 'GET',
  credentials: 'same-origin'
})
.then(response => {
  if (response.ok) {
    //Redireciona o usuário para a página inicial
    window.location.href = '/index.html'; 
  } else {
    //Se erro
    console.error('Erro ao fazer logout:', response);
  }
})
.catch(error => {
  console.error('Erro ao fazer logout:', error);
});
}

let popUpAberto = null; // Armazena o ID do pop-up atualmente aberto

function abrirPopUp(botao) {
    // Fechar o pop-up atual antes de abrir um novo
    if (popUpAberto) {
        fecharPopUp(popUpAberto);
    }

    let popUpId = "popUp" + botao.id;
    let popUp = document.getElementById(popUpId);
    popUp.style.display = "grid";
    popUp.style.opacity = 1;
    popUpAberto = popUpId; // Atualiza o pop-up atualmente aberto

    // Agendar fechamento do pop-up após 3 segundos
    setTimeout(function () {
        fecharPopUp(popUpAberto);
    }, 3000);
}

function fecharPopUp(popUpId) {
    let popUp = document.getElementById(popUpId);
    popUp.style.display = "none";
    popUpAberto = null; // Nenhum pop-up aberto após fechar
}
  
  var idUsuario = "";
  //Declarar a variável do mapa globalmente
  var map; 
  //Após o login bem-sucedido
  axios.get('/usuario')
  .then(response => {
    
    document.getElementById("logout").style.display = "flex";
    // Pegar o cep do usuário
    const usuario = response.data;
    const cepUsuario = usuario.cepUsuarios;
    const nomeUsuario = usuario.nomeUsuarios;

    idUsuario = usuario.idUsuarios;
    document.getElementById("bemVindo").textContent = ("Seja bem-vind@ " + nomeUsuario + "!");
    document.getElementById("links").style.display = "none";

  })
  .catch(error => {
    console.error('Erro ao obter informações do usuário:', error);
  });

  //Setar tema Claro como padrão
function verificarTema(){
  if(localStorage.temaClaroLocal == undefined)
    localStorage.setItem("temaClaroLocal", "true");
  //Verificar se o usuário já tinha preferido o tema escuro
  if(localStorage.temaClaroLocal == "false")
    temaEscuro();
}

//Trocar entre tema claro e escuro ao apertar no botão que não é um botão e que na verdade está no menu superior
function trocarTema(){
  if (localStorage.temaClaroLocal == "true")
    temaEscuro();
  else
    temaClaro();
}

function temaClaro(){
  document.body.style.backgroundColor = "#ffffff";
  document.body.style.color = "black";
  localStorage.setItem("temaClaroLocal", "true");
  document.getElementById("temaBotao").textContent = "Tema Escuro";
}
function temaEscuro(){
  document.body.style.backgroundColor = "#161616";
  document.body.style.color = "aliceblue";
  localStorage.setItem("temaClaroLocal", "false");
  document.getElementById("temaBotao").textContent = "Tema Claro";
}