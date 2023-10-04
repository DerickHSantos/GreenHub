function validarNumero(input) {
  // Remove caracteres não numéricos usando expressão regular
  input.value = input.value.replace(/[^0-9]/g, '');
}

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


//Enviar novos pontos de coleta para o banco de dados
document.getElementById("adicionarMarcadorForm").addEventListener("submit", function(event){
    event.preventDefault();
    let dbNome = document.getElementById("inserirTitulo").value;
    let dbCep = document.getElementById("inserirCep").value;
    
    //Enviar requisição POST para a rota "/enviar-feedback" setado no node.js
    fetch("/enviar-coleta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      //Converter para enviar
      body: JSON.stringify({ dbNome, dbCep })
    })
    .then(response => response.json())
    .then(data => {
      window.alert("Ponto de Coleta adicionado com sucesso!");
      document.getElementById("inserirCep").value = "";
      document.getElementById("inserirTitulo").value = "";
    })
    .catch(error => {
      console.error("Erro ao adicionar ponto de coleta.", error);
      window.alert("Erro ao enviar pc, por favor tente novamente.");
    });
  });

//Apenas gerar o relatório uma vez para ter menos poluição visual
let relatorioGerado = false;

  document.getElementById("gerarRelatorio").addEventListener("submit", function(event){
    event.preventDefault();
    if (relatorioGerado === false)
    {
    //Fazer requisição GET para obter os feedbacks
    fetch('/feedbacks')
    .then(response => response.json())
    .then(feedbacks => {
      console.log(feedbacks);
      //Mostrar os feedbacks em formato de lista
      const feedbackList = document.getElementById('feedback-list');
      feedbacks.forEach(feedback => {
        const listItem = document.createElement('li');
        listItem.textContent = `Email: ${feedback.emailFeedbacks}, Nota: ${feedback.notaFeedbacks}, Comentário: ${feedback.comentarioFeedbacks}`;
        feedbackList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Erro ao obter os feedbacks:', error);
    });
    relatorioGerado = true;
  }
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