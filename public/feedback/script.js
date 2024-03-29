const menuButton = document.querySelector('.menu-button');
  const menuList = document.querySelector('.menu-list');

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

  //Código do feedback
  const btnFeedback = document.getElementById('btnFeedback');
  let textoFeedback = document.getElementById('textoFeedback');

  btnFeedback.addEventListener('click', function (event) {
    event.preventDefault();
    alert("Feedback enviado com sucesso!")
  });

  // Código das estrelas 
  const ratingStars = document.getElementsByName('rating');
  let selectedRating;

  for (let i = 0; i < ratingStars.length; i++) {
    ratingStars[i].addEventListener('click', function () {
      selectedRating = this.value;
      console.log('Avaliação selecionada: ' + selectedRating);
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
  document.body.style.color = "aliceblue";
  localStorage.setItem("temaClaroLocal", "false");
  document.getElementById("temaBotao").textContent = "Tema Claro";
}

//Propriedade de ©GreenHub, Todos os direitos reservados, 2023