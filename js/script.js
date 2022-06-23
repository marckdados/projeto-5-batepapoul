let username;
const url = 'https://mock-api.driven.com.br/api/v6/uol/';
let conexao;
let statusMensagem = '';

let objMensagem = {

}

function perguntaUsuario(){
    const mensagem = document.querySelector('.caixa-mensagem').value;
    username = prompt('Qual seu nome ?');
    entrarSala();
}

function entrarSala(){
    const promisse = axios.post(`${url}participants`,{name:username});
    promisse.then(iniciarConexao);
    promisse.then(setInterval(pegarMensagens,3000));
}

function pegarMensagens(){
    const promisse = axios.get(`${url}messages`);
    promisse.then(renderizarMensagens);
}

function renderizarMensagens(resposta){
    const caixaMensagens = document.querySelector('.mensagens')
    
    for(let i = 0; i < resposta.data.length;i++){
        caixaMensagens.innerHTML += `
        <div class="mensagem ${resposta.data[i].type}">
            <span class="hour">(${resposta.data[i].time})</span>
            <span class="from">${resposta.data[i].from}</span>
            <span class="to">${resposta.data[i].to}</span>
            <span class="text">${resposta.data[i].text}</span>
        </div>`;  
    }

    scrollMensagem()
}

function scrollMensagem(){
    const elemento = document.querySelector('.mensagem:last-child');
    console.log(elemento)
    elemento.scrollIntoView(true);
}

function iniciarConexao(){
    conexao = setInterval(manterConexao, 5000);
}

function manterConexao(){
     const promisse = axios.post(`${url}status`,{name:username});
     promisse.then(console.log('To conectado'));
}

function pegarMensagemDigitada(){
     const mensagem = document.querySelector('.caixa-mensagem').value;
     
     const promisse = axios.post(`${url}messages`, objMensagem = {
        from:username,
        to: "Todos",
        text: mensagem,
        type: "message"
     });
     promisse.then(limparInput);
     promisse.catch(alertaEnviarMensagem);
}

function limparInput(){
    const mensagem = document.querySelector('.caixa-mensagem');
    mensagem.value = '';
}

function eventos(){
    document.addEventListener("keydown", function(evento){
        if(evento.key === "Enter"){
            pegarMensagemDigitada();
        }
    })
}

function alertaEnviarMensagem(){
    alert('Aconteceu um erro ao enviar a mensagem :(');
}

eventos();
perguntaUsuario();
