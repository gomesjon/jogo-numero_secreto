let listaDeNumerosSorteados = [];
let numeroMaximo = parseInt(10);
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do número secreto";
// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um número de 1 a 10";

function exibirMensagemNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

// as linhas abaixo servem para fazer uma narrativa da parte escrita do site, o código comentado 
//não funciona em alguns navegadores    
    // responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirMensagemNaTela("h1", "jogo do número secreto");
    exibirMensagemNaTela("p",`Escolha um número de 1 a ${numeroMaximo}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirMensagemNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas >1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirMensagemNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
        document.getElementById("butonChutar").setAttribute("disabled", true);
    }else{
        if (chute > numeroSecreto) {
            exibirMensagemNaTela("p", "O Número secreto é menor");
        } else{
            // exibirMensagemNaTela("h1", "Ops!");
            exibirMensagemNaTela("p", "O Número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }   
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt((Math.random() * numeroMaximo) + 1);
    let quantidadeDeNumeroEscolhidos = listaDeNumerosSorteados.length;

    if (quantidadeDeNumeroEscolhidos == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {

    numeroSecreto = gerarNumeroAleatorio();
    document.getElementById("reiniciar").setAttribute("disabled",true);
    document.getElementById("butonChutar").removeAttribute("disabled", false);
    exibirMensagemInicial();
    tentativas = 1;
    limparCampo();
}