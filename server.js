//Módulos utilizados
const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const crypto = require('crypto');
const axios = require('axios');

//Gerar chave de sessão criptografada
const generateSessionSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

//Gerar chave de senha criptografada
const generatePasswordSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

//Setup para usar o express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setup para usar cryto em sessões
const sessionSecret = generateSessionSecret();

//Uso de sessões
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
  })
);

//Informações do db
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'GreenHub'
});

//Conexão ao db
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

//Iniciar o servidor em localhost:3000
app.listen(3000, (err) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
  } else {
    console.log('Servidor rodando na porta 3000');
  }
});

//Preparar para pegar arquivos dentro da pasta 'public'
app.use(express.static('public'));

//Rota de enviar feedback ao db
app.post('/enviar-feedback', (req, res) => {
  //Pegar variáveis do site
  const { email, nota, comentario } = req.body;
  //Sintaxe mysql
  const sql = 'INSERT INTO feedbacks (notaFeedbacks, comentarioFeedbacks, emailFeedbacks) VALUES (?, ?, ?)';
  const values = [nota, comentario, email];

  //Tentar fazer o insert no db
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao enviar dados de feedback' });
      return;
    }

    console.log('Dados de feedback inseridos no banco de dados');
    res.status(200).json({ message: 'Dados de feedback enviados com sucesso' });
  });
});

//Rota de enviar novos Cadastros Pessoa Fisica
app.post('/cadastroPessoaFisica', (req, res) => {
  const { nome, email, cep, senha } = req.body;
  //criptografar senha
  const encryptedPassword = encryptPassword(senha);

  const sql = 'INSERT INTO usuarios (nomeUsuarios, emailUsuarios, cepUsuarios, senhaUsuarios) VALUES (?, ?, ?, ?)';
  const values = [nome, email, cep, encryptedPassword];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao enviar dados de pc' });
      return;
    }

    console.log('Dados de usuario inseridos no banco de dados');
    res.status(200).json({ message: 'Dados de usuario enviados com sucesso' });
  });
});

//Rota de enviar novos Cadastros Industria
app.post('/cadastroIndustria', (req, res) => {
  const { nome, cnpj, cep, senha } = req.body;
  //criptografar senha
  const encryptedPassword = encryptPassword(senha);

  const sql = 'INSERT INTO industria (nomeIndustria, cnpjIndustria, cepIndustria, senhaIndustria) VALUES (?, ?, ?, ?)';
  const values = [nome, cnpj, cep, encryptedPassword];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao enviar dados de pc' });
      return;
    }

    console.log('Dados de usuario inseridos no banco de dados');
    res.status(200).json({ message: 'Dados de usuario enviados com sucesso' });
  });
});

//Rota de enviar novos Cadastros Empresa
app.post('/cadastroEmpresa', (req, res) => {
  const { nome, cnpj, cep, senha } = req.body;
  //criptografar senha
  const encryptedPassword = encryptPassword(senha);

  const sql = 'INSERT INTO empresa (nomeEmpresa, cnpjEmpresa, cepEmpresa, senhaEmpresa) VALUES (?, ?, ?, ?)';
  const values = [nome, cnpj, cep, encryptedPassword];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao enviar dados de pc' });
      return;
    }

    console.log('Dados de usuario inseridos no banco de dados');
    res.status(200).json({ message: 'Dados de usuario enviados com sucesso' });
  });
});

//Rota de enviar novos Cadastros Centro de Reciclagem
app.post('/cadastroCentroReciclagem', (req, res) => {
  const { nome, cnpj, cep, senha } = req.body;
  //criptografar senha
  const encryptedPassword = encryptPassword(senha);

  const sql = 'INSERT INTO centroReciclagem (nomeCentroReciclagem, cnpjCentroReciclagem, cepCentroReciclagem, senhaCentroReciclagem) VALUES (?, ?, ?, ?)';
  const values = [nome, cnpj, cep, encryptedPassword];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao enviar dados de pc' });
      return;
    }

    console.log('Dados de usuario inseridos no banco de dados');
    res.status(200).json({ message: 'Dados de usuario enviados com sucesso' });
  });
});

//Rota de fazer Login
app.post('/loginPessoaFisica', (req, res) => {
  const{ email, senha } = req.body;
  //criptografia
  const encryptedPassword = encryptPassword(senha);

  const sql = 'SELECT * FROM usuarios WHERE emailUsuarios = ? AND senhaUsuarios = ?';
  const values = [email, encryptedPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao consultar login:', err);
      res.status(500).json({ error: 'Erro ao consultar login' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciais inválidas' });
    } else {
      const usuario = results[0];

      //Iniciar sessão
      req.session.usuario = usuario;
      res.status(200).json(usuario);
    }
  });
});

app.post('/loginEmpresa', (req, res) => {
  const{ cnpj, senha } = req.body;
  //criptografia
  const encryptedPassword = encryptPassword(senha);

  const sql = 'SELECT * FROM empresas WHERE cnpjEmpresas = ? AND senhaEmpresas = ?';
  const values = [cnpj, encryptedPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao consultar login:', err);
      res.status(500).json({ error: 'Erro ao consultar login' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciais inválidas' });
    } else {
      const usuario = results[0];

      //Iniciar sessão
      req.session.usuario = usuario;
      res.status(200).json(usuario);
    }
  });
});

app.post('/loginIndustria', (req, res) => {
  const{ cnpj, senha } = req.body;
  //criptografia
  const encryptedPassword = encryptPassword(senha);

  const sql = 'SELECT * FROM industria WHERE cnpjIndustria = ? AND senhaIndustria = ?';
  const values = [cnpj, encryptedPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao consultar login:', err);
      res.status(500).json({ error: 'Erro ao consultar login' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciais inválidas' });
    } else {
      const usuario = results[0];

      //Iniciar sessão
      req.session.usuario = usuario;
      res.status(200).json(usuario);
    }
  });
});

app.post('/loginCentroReciclagem', (req, res) => {
  const{ cnpj, senha } = req.body;
  //criptografia
  const encryptedPassword = encryptPassword(senha);

  const sql = 'SELECT * FROM centroReciclagem WHERE cnpjCentroReciclagem = ? AND senhaCentroReciclagem = ?';
  const values = [cnpj, encryptedPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao consultar login:', err);
      res.status(500).json({ error: 'Erro ao consultar login' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciais inválidas' });
    } else {
      const usuario = results[0];

      //Iniciar sessão
      req.session.usuario = usuario;
      res.status(200).json(usuario);
    }
  });
});

app.post('/loginIndustria', (req, res) => {
  const{ cnpj, senha } = req.body;
  //criptografia
  const encryptedPassword = encryptPassword(senha);

  const sql = 'SELECT * FROM industria WHERE cnpjIndustria = ? AND senhaIndustria = ?';
  const values = [cnpj, encryptedPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erro ao consultar login:', err);
      res.status(500).json({ error: 'Erro ao consultar login' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciais inválidas' });
    } else {
      const usuario = results[0];

      //Iniciar sessão
      req.session.usuario = usuario;
      res.status(200).json(usuario);
    }
  });
});

//Rota de Verificar se email existe no db
app.post('/verificar-email', (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT COUNT(*) AS count FROM usuarios WHERE emailUsuarios = ?';
  const values = [email];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao consultar email no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao verificar email' });
      return;
    }

    const count = result[0].count;
    const emailExists = count > 0;

    res.status(200).json({ emailExists });
  });
});

//Rota de Verificar se cnpj existe no db
app.post('/verificar-cnpj', (req, res) => {
  //Obtem o cnpj e a tabela que haverá a busca
  const { cnpj, table } = req.body;
  //Obtem a tupla que será pesquisada
  const column = ("cnpj" + table);
  const sql = 'SELECT COUNT(*) AS count FROM ? WHERE ? = ?';
  const values = [table, column, cnpj];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao consultar email no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao verificar email' });
      return;
    }

    const count = result[0].count;
    const cnpjExists = count > 0;

    res.status(200).json({ cnpjExists });
  });
});

//Verificar se o login foi autorizado
const verificaAutenticacao = (req, res, next) => {
  if (req.session.usuario) {
    next();
  } else {
    res.status(401).json({ error: 'Acesso não autorizado' });
  }
};

//Verificar se o usuário é um Administrador autorizado
const verificaAutenticacaoAdmin = (req, res, next) => {
  const usuario = req.session.usuario;
  if (usuario && usuario.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: 'Acesso não autorizado' });
  }
};

//Rota de enviar novos Agendamentos
app.post('/enviarAgendamento', (req, res) => {
  const { dataAgendamento, horarioAgendamento, idUsuario } = req.body;

  const sql = 'INSERT INTO agendamento (dataAgendamento, horarioAgendamento, idUsuario) VALUES (?, ?, ?)';
  const values = [dataAgendamento, horarioAgendamento, idUsuario];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao enviar dados de pc' });
      return;
    }

    console.log('Dados de agendamento inseridos no banco de dados');
    res.status(200).json({ message: 'Dados de agendamento enviados com sucesso' });
  });
});


//Rota de enviar novos Pontos de Coleta apenas para Admins
app.post('/enviar-coleta', verificaAutenticacaoAdmin, (req, res) => {
  const { dbNome, dbCep } = req.body;
  const sql = 'INSERT INTO pontosColeta (nomePontosColeta, cepPontosColeta) VALUES (?, ?)';
  const values = [dbNome, dbCep];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao enviar dados de pc' });
      console.log('Dados de pc nao inseridos no banco de dados');
      return;
    }

    console.log('Dados de pc inseridos no banco de dados');
    res.status(200).json({ message: 'Dados de pc enviados com sucesso' });
  });
});

//Rota para retornar as informações do usuário logado
app.get('/usuario', verificaAutenticacao, (req, res) => {
  //Acessar os dados do usuário na sessão
  const usuario = req.session.usuario;
  res.json(usuario);
});

//Rota para obter os pontos de coleta da visão do usuário convencional
app.get('/pontosColeta', (req, res) => {
  const sql = 'SELECT cepPontosColeta, nomePontosColeta FROM pontosColeta;';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar usuários que querem reciclar:', err);
      res.status(500).json({ error: 'Erro ao consultar usuários que querem reciclar' });
      return;
    }

    res.status(200).json(results);
  });
});

//Rota para obter os pontos de coleta da visão dos Centros de Reciclagem
app.get('/pontosColetaCentroReciclagem', (req, res) => {
  const sql = 'SELECT cepUsuarios FROM usuarios WHERE querReciclar = true; ';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar pontos de coleta:', err);
      res.status(500).json({ error: 'Erro ao consultar pontos de coleta' });
      return;
    }

    res.status(200).json(results);
  });
});

//Rota de redefinir senha Pessoa Fisica
app.post('/redefinirPessoaFisca', (req, res) => {
  const { email, senha, cep } = req.body;
  const sql = 'UPDATE usuarios SET senhaUsuarios = ? WHERE emailUsuarios = ? AND cepUsuarios = ?';
  const encryptedPassword = encryptPassword(senha);
  const values = [encryptedPassword, email, cep];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao redefinir senha:', err);
      res.status(500).json({ error: 'Erro ao redefinir senha' });
      return;
    }

    if (result.affectedRows === 0) {
      console.log('Nenhuma senha redefinida no banco de dados');
      res.status(400).json({ error: 'Falha ao redefinir senha. Verifique as credenciais fornecidas.' });
      return;
    }

    console.log('Senha redefinida no banco de dados');
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  });
});

//Rota de redefinir senha Empresa
app.post('/redefinirEmpresa', (req, res) => {
  const { cnpj, senha, cep } = req.body;
  const sql = 'UPDATE empresa SET senhaEmpresa = ? WHERE cnpjEmpresa = ? AND cepEmpresa = ?';
  const encryptedPassword = encryptPassword(senha);
  const values = [encryptedPassword, cnpj, cep];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao redefinir senha:', err);
      res.status(500).json({ error: 'Erro ao redefinir senha' });
      return;
    }

    if (result.affectedRows === 0) {
      console.log('Nenhuma senha redefinida no banco de dados');
      res.status(400).json({ error: 'Falha ao redefinir senha. Verifique as credenciais fornecidas.' });
      return;
    }

    console.log('Senha redefinida no banco de dados');
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  });
});

//Rota de redefinir senha Industria
app.post('/redefinirIndustria', (req, res) => {
  const { cnpj, senha, cep } = req.body;
  const sql = 'UPDATE industria SET senhaIndustria = ? WHERE cnpjIndustria = ? AND cepIndustria = ?';
  const encryptedPassword = encryptPassword(senha);
  const values = [encryptedPassword, cnpj, cep];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao redefinir senha:', err);
      res.status(500).json({ error: 'Erro ao redefinir senha' });
      return;
    }

    if (result.affectedRows === 0) {
      console.log('Nenhuma senha redefinida no banco de dados');
      res.status(400).json({ error: 'Falha ao redefinir senha. Verifique as credenciais fornecidas.' });
      return;
    }

    console.log('Senha redefinida no banco de dados');
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  });
});

//Rota de redefinir senha Centro Reciclagem
app.post('/redefinirCentroReciclagem', (req, res) => {
  const { cnpj, senha, cep } = req.body;
  const sql = 'UPDATE centroReciclagem SET senhaCentroReciclagem = ? WHERE cnpjCentroReciclagem = ? AND cepCentroReciclagem = ?';
  const encryptedPassword = encryptPassword(senha);
  const values = [encryptedPassword, cnpj, cep];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao redefinir senha:', err);
      res.status(500).json({ error: 'Erro ao redefinir senha' });
      return;
    }

    if (result.affectedRows === 0) {
      console.log('Nenhuma senha redefinida no banco de dados');
      res.status(400).json({ error: 'Falha ao redefinir senha. Verifique as credenciais fornecidas.' });
      return;
    }

    console.log('Senha redefinida no banco de dados');
    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  });
});

//Rota para obter os feedbacks apenas para Admins
app.get('/feedbacks', verificaAutenticacaoAdmin, (req, res) => {
  const sql = 'SELECT * FROM feedbacks';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao consultar feedbacks:', err);
      res.status(500).json({ error: 'Erro ao consultar feedbacks' });
      return;
    }

    res.status(200).json(results);
  });
});

//Rota de 'ping' que uma pessoa quer reciclar
app.post('/querReciclar', (req, res) => {
  const { idUsuario } = req.body;
  const sql = 'UPDATE usuarios SET querReciclar = true WHERE idUsuarios = ?';
  const values = [idUsuario];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao mandar requisição "querReciclar":', err);
      res.status(500).json({ error: 'Erro ao mandar requisição "querReciclar"' });
      return;
    }

    if (result.affectedRows === 0) {
      console.log('Nenhuma "querReciclar" foi alterada no banco de dados');
      res.status(400).json({ error: 'Falha ao alterar "querReciclar". Verifique as credenciais fornecidas.' });
      return;
    }

    console.log('"querReciclar" foi alterada no banco de dados');
    res.status(200).json({ message: '"querReciclar" foi alterada no banco de dados' });
  });
});

const passwordSecret = generatePasswordSecret();
//Função para criptografar a senha
const encryptPassword = (password) => {
  const secret = "çgr3ENHu8!";
  const cipher = crypto.createCipher('aes256', secret);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Rota para fazer logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao encerrar a sessão:', err);
      res.status(500).json({ error: 'Erro ao fazer logout' });
      return;
    }
    res.status(200).json({ message: 'Logout realizado com sucesso' });
  });
});

//Propriedade de ©TechGrenn, Todos os direitos reservados, 2023