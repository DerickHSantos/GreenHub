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

axios.get('/usuario')
  .then(response => {
    document.getElementById("logout").style.display = "flex";

    //Pegar o nome do usuário
    const usuario = response.data;
    const nomeUsuario = usuario.nomeUsuarios;
    document.getElementById("bemVindo").textContent = ("Seja bem-vind@ " + nomeUsuario + "!");
    document.getElementById("links").style.display = "none";
  })
  .catch(error => {
    console.log(usuario);
    //Se ocorrer um erro na requisição, exibir mensagem que nao esta logado
  });


  document.addEventListener('DOMContentLoaded', function () {

    // Código das estrelas 
    const ratingStars = document.getElementsByName('rating');
    let selectedRating;

    for (let i = 0; i < ratingStars.length; i++) {
      ratingStars[i].addEventListener('click', function () {
        selectedRating = this.value;
        console.log('Avaliação selecionada: ' + selectedRating);
      });
    }
       

  //Código do menu

  const menuButton = document.querySelector('.menu-button');
  const menuList = document.querySelector('.menu-list');
  const imgFundo = document.querySelector('.containerImagemFundo1');

  menuButton.addEventListener('click', function() {
    imgFundo.style.display = (imgFundo.style.display === 'none') ? 'block' : 'none';
    if(imgFundo.style.display === 'block'){
      menuList.style.padding = '0';
    }else if(imgFundo.style.display === 'none'){
      menuList.style.padding = '1%';
    }
    menuList.classList.toggle('open'); 
  });
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
  document.body.style.color = "aliceblue !important;";
  localStorage.setItem("temaClaroLocal", "false");
  document.getElementById("temaBotao").textContent = "Tema Claro";
}

  //Código do feedback
  btnFeedback.addEventListener('click', function (event) {
    event.preventDefault();

    let email = document.getElementById('emailFeedback').value;
    let comentario = document.getElementById('textoFeedback').value;
    let nota = selectedRating;
    if (email != "" && nota != "" && typeof nota !== 'undefined'){
      //Continua com o envio do cadastro
      console.log(email, nota, comentario)
      fetch("/enviar-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, nota, comentario })
      })
      .then(response => response.json())
      .then(data => {
        window.alert("Feedback enviado com sucesso!");
        document.getElementById("feedbackForm").reset();
        selectedRating = "";
      })
      .catch(error => {
        console.error("Erro ao adicionar cadastro.", error);
        window.alert("Erro ao enviar cadastro, por favor tente novamente.");
        document.getElementById("feedbackForm").reset();
      });
      
    }
    else
    alert("Você precisa informar seu email e dar uma nota!")

  })

//Propriedade de ©TechGrenn, Todos os direitos reservados, 2023