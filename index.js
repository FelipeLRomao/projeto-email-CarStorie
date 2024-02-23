// Importar a função enviarEmail do arquivo envia-email.js
const enviarEmail = require('./envia-email');

// Função para verificar o dia da semana atual
function verificarDiaDaSemana() {
  const hoje = new Date();
  const diaDaSemana = hoje.getDay(); // Onde Domingo = 0, Segunda = 1, etc.
  return diaDaSemana === 1; // Retorna true se for Segunda-Feira
}

// Função para montar o corpo do e-mail
function montarCorpoDoEmail() {
  // Personalize esta mensagem conforme necessário
  const mensagem = `Prezado cliente,

Confira os nossos novos veículos e os mais vendidos do mês!

Veja também as condições especiais de aquisição que preparamos para você.

Aguardamos a sua visita.

Atenciosamente,
Equipe CarStore`;

  return mensagem;
}

// Função para enviar o e-mail para cada um dos clientes da lista
function enviarEmailsParaClientes(listaDeClientes) {
  listaDeClientes.forEach(cliente => {
    if (cliente.queroReceber) {
      const mensagem = montarCorpoDoEmail();
      // Usar a função enviarEmail do arquivo envia-email.js
      const sucesso = enviarEmail(cliente.email, mensagem);
      if (sucesso) {
        console.log(`E-mail enviado com sucesso para ${cliente.email}`);
      } else {
        console.log(`Erro ao enviar e-mail para ${cliente.email}`);
      }
    }
  });
}

// Lista de clientes 
const listaDeClientes = [
  { email: "cliente1@example.com", queroReceber: true },
  { email: "cliente2@example.com", queroReceber: false },
  { email: "cliente3@example.com", queroReceber: true },
  { email: "cliente4@example.com", queroReceber: true },
  { email: "cliente5@example.com", queroReceber: true }
];

// Teste para verificar o dia da semana:
console.log("Dia da semana é segunda-feira?", verificarDiaDaSemana()); // Deveria imprimir true se hoje fosse segunda-feira

// Teste para montar o corpo do e-mail:
console.log(montarCorpoDoEmail()); // Deve imprimir a mensagem do corpo do e-mail

// Teste para enviar e-mail para clientes:
enviarEmailsParaClientes(listaDeClientes); // Deve tentar enviar e-mails para os clientes da lista

// Teste para um caso de sucesso no envio de e-mail:
const sucesso = enviarEmail("cliente1@example.com", "Olá! Este é um e-mail de teste.");
console.log("E-mail enviado com sucesso?", sucesso); // Deve imprimir true se o e-mail for enviado com sucesso

// Teste para um caso de falha no envio de e-mail:
const falha = enviarEmail("cliente2@example.com", "Este e-mail vai falhar.");
console.log("Erro ao enviar e-mail?", !falha); // Deve imprimir true se ocorrer uma falha ao enviar o e-mail
