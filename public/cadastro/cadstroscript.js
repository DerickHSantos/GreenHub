function validarNumero(input) {
  // Remove caracteres não numéricos usando expressão regular
  input.value = input.value.replace(/[^0-9]/g, '');
}

//Cadastrar novos usuários Pessoa Física no banco de dados
document.getElementById("cadastroPessoaFisicaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    //Verificar se o email já existe no banco de dados
    let email = document.getElementById("emailCadastro").value;
    fetch("/verificar-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //Converter para enviar
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.emailExists) {
            alert("O email inserido já está cadastrado. Por favor, escolha outro email.");
        } else {
  
      let nome = document.getElementById("nomeCadastro").value;
      let senha = document.getElementById("senhaCadastro").value;

      //Verificar se o CEP foi inserido corretamente e se pode ser encontrado
      let cep = document.getElementById("cepCadastro").value;
      pesquisacep(cep)
        .then((cepError) => {
          console.log(cepError);
          if (cepError) {
            alert("Cep não encontrado!");
            return;
          }
          //Continua com o envio do cadastro
          fetch("/cadastroPessoaFisica", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ nome, email, senha, cep })
            })
            .then(response => response.json())
            .then(data => {
              window.alert("Cadastro adicionado com sucesso!");
              document.getElementById("cadastroPessoaFisicaForm").reset();
              document.location.href = "/login/pessoaFisica.html";
            })
            .catch(error => {
              console.error("Erro ao adicionar cadastro.", error);
              window.alert("Erro ao enviar cadastro, por favor tente novamente.");
            });
        })
        .catch(error => {
          console.error("Erro ao verificar CEP.", error);
          window.alert("Erro ao verificar CEP, por favor tente novamente.");
        });
    }
  })});

    //Cadastrar novos usuários Empresa no banco de dados
document.getElementById("cadastroEmpresaForm").addEventListener("submit", function(event) {
  event.preventDefault();
  //Verificar se o email já existe no banco de dados
  let cnpj = document.getElementById("cnpjCadastro").value;
  let table = "empresa"
  fetch("/verificar-cnpj", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      //Converter para enviar
      body: JSON.stringify({ cnpj, table })
  })
  .then(response => response.json())
  .then(data => {
      if (data.cnpjExists) {
          alert("O CNPJ inserido já está cadastrado. Por favor, tente realizar o login.");
      } else {

    let nome = document.getElementById("nomeCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;

    //Verificar se o CEP foi inserido corretamente e se pode ser encontrado
    let cep = document.getElementById("cepCadastro").value;
    pesquisacep(cep)
      .then((cepError) => {
        console.log(cepError);
        if (cepError) {
          alert("Cep não encontrado!");
          return;
        }
        //Continua com o envio do cadastro
        fetch("/cadastroEmpresa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha, cep })
          })
          .then(response => response.json())
          .then(data => {
            window.alert("Cadastro adicionado com sucesso!");
            document.getElementById("cadastroEmpresaForm").reset();
            document.location.href = "/login/Empresa.html";
          })
          .catch(error => {
            console.error("Erro ao adicionar cadastro.", error);
            window.alert("Erro ao enviar cadastro, por favor tente novamente.", error);
          });
      })
      .catch(error => {
        console.error("Erro ao verificar CEP.", error);
        window.alert("Erro ao verificar CEP, por favor tente novamente.");
      });
  }
})});
  
  //Cadastrar novos usuários Indústria no banco de dados
document.getElementById("cadastroIndustriaForm").addEventListener("submit", function(event) {
  event.preventDefault();
  //Verificar se o email já existe no banco de dados
  let cnpj = document.getElementById("cnpjCadastro").value;
  let table = "industria"
  fetch("/verificar-cnpj", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      //Converter para enviar
      body: JSON.stringify({ cnpj, table })
  })
  .then(response => response.json())
  .then(data => {
      if (data.cnpjExists) {
          alert("O CNPJ inserido já está cadastrado. Por favor, tente realizar o login.");
      } else {

    let nome = document.getElementById("nomeCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;

    //Verificar se o CEP foi inserido corretamente e se pode ser encontrado
    let cep = document.getElementById("cepCadastro").value;
    pesquisacep(cep)
      .then((cepError) => {
        console.log(cepError);
        if (cepError) {
          alert("Cep não encontrado!");
          return;
        }
        //Continua com o envio do cadastro
        fetch("/cadastroIndustria", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha, cep })
          })
          .then(response => response.json())
          .then(data => {
            window.alert("Cadastro adicionado com sucesso!");
            document.getElementById("cadastroIndustriaForm").reset();
            document.location.href = "/login/industria.html";
          })
          .catch(error => {
            console.error("Erro ao adicionar cadastro.", error);
            window.alert("Erro ao enviar cadastro, por favor tente novamente.", error);
          });
      })
      .catch(error => {
        console.error("Erro ao verificar CEP.", error);
        window.alert("Erro ao verificar CEP, por favor tente novamente.");
      });
  }
})});

  //Cadastrar novos usuários Centro de Reciclagem no banco de dados
  document.getElementById("cadastroCentroReciclagemForm").addEventListener("submit", function(event) {
    event.preventDefault();
    //Verificar se o email já existe no banco de dados
    let cnpj = document.getElementById("cnpjCadastro").value;
    let table = "centroReciclagem"
    fetch("/verificar-cnpj", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //Converter para enviar
        body: JSON.stringify({ cnpj, table })
    })
    .then(response => response.json())
    .then(data => {
        if (data.cnpjExists) {
            alert("O CNPJ inserido já está cadastrado. Por favor, tente realizar o login.");
        } else {
  
      let nome = document.getElementById("nomeCadastro").value;
      let senha = document.getElementById("senhaCadastro").value;
  
      //Verificar se o CEP foi inserido corretamente e se pode ser encontrado
      let cep = document.getElementById("cepCadastro").value;
      pesquisacep(cep)
        .then((cepError) => {
          console.log(cepError);
          if (cepError) {
            alert("Cep não encontrado!");
            return;
          }
          //Continua com o envio do cadastro
          fetch("/cadastroIndustria", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ nome, email, senha, cep })
            })
            .then(response => response.json())
            .then(data => {
              window.alert("Cadastro adicionado com sucesso!");
              document.getElementById("cadastroCentroReciclagemForm").reset();
              document.location.href = "/login/industria.html";
            })
            .catch(error => {
              console.error("Erro ao adicionar cadastro.", error);
              window.alert("Erro ao enviar cadastro, por favor tente novamente.", error);
            });
        })
        .catch(error => {
          console.error("Erro ao verificar CEP.", error);
          window.alert("Erro ao verificar CEP, por favor tente novamente.");
        });
    }
  })});
  
//Verificar CEP
//Via CEP
function pesquisacep(valor) {
    cep = valor.replace(/\D/g, "");
  
    //Verificar se o Campo CEP é válido
    if (cep.length !== 8) {
      alert("O CEP deve conter 8 dígitos!");
      return Promise.reject("CEP inválido"); 
    }
  
    //API dos Correios
    const url = `https://viacep.com.br/ws/${cep}/json/`;
  
    //Verificar o CEP
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //Se erro, mostrar erro
        if (data.erro) {
          alert("CEP não encontrado!");
          //Interromper execução
          throw new Error("CEP não encontrado");
          return true;
        } 
        else
        {
            return false;
        }
    })
    //Se der erro, deu erro
    .catch((error) => {
        console.log("Ocorreu um erro na requisição:", error);
        throw error;
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

}
function temaEscuro(){
  document.body.style.backgroundColor = "#161616";
  document.body.style.color = "aliceblue";
  localStorage.setItem("temaClaroLocal", "false");
}

//Propriedade de ©GreenHub, Todos os direitos reservados, 2023