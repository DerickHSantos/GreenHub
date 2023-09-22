
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
        

  //Código do menu

  const menuButton = document.querySelector('.menu-button');
  const menuList = document.querySelector('.menu-list');
  const imgFundo = document.querySelector('.containerImagemFundo1');

  menuButton.addEventListener('click', function() {
    imgFundo.style.display = (imgFundo.style.display === 'none') ? 'block' : 'none';
    if(imgFundo.style.display === 'block'){
      menuList.style.padding = 0;
    }else if(imgFundo.style.display === 'none'){
      menuList.style.padding = '3%';
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

//Propriedade de ©TechGrenn, Todos os direitos reservados, 2023