//Pegar do form
  document.getElementById("redefinirPessoaFisicaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("redefinirEmail").value;
    let cep = document.getElementById("redefinirCep").value;
    let senha = document.getElementById("redefinirSenha").value;

    //Rota de redefinir senha para pessoa física
    fetch("/redefinirPessoaFisica", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, senha, cep})
    })
    .then(response => {
        if (!response.ok) {
          throw new Error("Credenciais inválidas");
        }
        return response.json();
      })
      .then(data => {
        if (data.message === "Senha redefinida com sucesso") {
            alert("Senha redefinida com sucesso!");
            document.location.href = "/login/pessoaFisica.html";
          } else {
            throw new Error("Erro ao redefinir senha");
          }
      })
      .catch(error => {
        console.error("Erro ao redefinir senha:", error);
        window.alert("Credenciais inválidas. Por favor, tente novamente.");
    });
  })

  //Pegar do form
  document.getElementById("redefinirEmpresaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let cnpj = document.getElementById("redefinirCNPJ").value;
    let cep = document.getElementById("redefinirCep").value;
    let senha = document.getElementById("redefinirSenha").value;

    //Rota de redefinir senha para Empresa
    fetch("/redefinirEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({cnpj, senha, cep})
    })
    .then(response => {
        if (!response.ok) {
          throw new Error("Credenciais inválidas");
        }
        return response.json();
      })
      .then(data => {
        if (data.message === "Senha redefinida com sucesso") {
            alert("Senha redefinida com sucesso!");
            document.location.href = "/login/empresa.html";
          } else {
            throw new Error("Erro ao redefinir senha");
          }
      })
      .catch(error => {
        console.error("Erro ao redefinir senha:", error);
        window.alert("Credenciais inválidas. Por favor, tente novamente.");
    });
  })

    //Pegar do form
    document.getElementById("redefinirIndustriaForm").addEventListener("submit", function(event) {
      event.preventDefault();
      let cnpj = document.getElementById("redefinirCNPJ").value;
      let cep = document.getElementById("redefinirCep").value;
      let senha = document.getElementById("redefinirSenha").value;
  
      //Rota de redefinir senha para Industria
      fetch("/redefinirIndustria", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({cnpj, senha, cep})
      })
      .then(response => {
          if (!response.ok) {
            throw new Error("Credenciais inválidas");
          }
          return response.json();
        })
        .then(data => {
          if (data.message === "Senha redefinida com sucesso") {
              alert("Senha redefinida com sucesso!");
              document.location.href = "/login/industria.html";
            } else {
              throw new Error("Erro ao redefinir senha");
            }
        })
        .catch(error => {
          console.error("Erro ao redefinir senha:", error);
          window.alert("Credenciais inválidas. Por favor, tente novamente.");
      });
    })

      //Pegar do form
  document.getElementById("redefinirCentroReciclagemForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let cnpj = document.getElementById("redefinirCNPJ").value;
    let cep = document.getElementById("redefinirCep").value;
    let senha = document.getElementById("redefinirSenha").value;

    //Rota de redefinir senha para pessoa física
    fetch("/redefinirCentroReciclagem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({cnpj, senha, cep})
    })
    .then(response => {
        if (!response.ok) {
          throw new Error("Credenciais inválidas");
        }
        return response.json();
      })
      .then(data => {
        if (data.message === "Senha redefinida com sucesso") {
            alert("Senha redefinida com sucesso!");
            document.location.href = "/login/centroReciclagem.html";
          } else {
            throw new Error("Erro ao redefinir senha");
          }
      })
      .catch(error => {
        console.error("Erro ao redefinir senha:", error);
        window.alert("Credenciais inválidas. Por favor, tente novamente.");
    });
  })

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