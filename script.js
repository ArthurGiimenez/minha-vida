// Data inicial para o contador
const dataInicial = new Date('2023-09-16T00:00:00');
const anosSpan = document.getElementById('anos');
const mesesSpan = document.getElementById('meses');
const diasSpan = document.getElementById('dias');
const horasSpan = document.getElementById('horas');
const minutosSpan = document.getElementById('minutos');
const segundosSpan = document.getElementById('segundos');

function atualizarContador() {
    const agora = new Date();
    
    // Calcular anos completos
    let anos = agora.getFullYear() - dataInicial.getFullYear();
    let meses = agora.getMonth() - dataInicial.getMonth();
    let dias = agora.getDate() - dataInicial.getDate();

    // Ajuste para garantir que o ano seja completo
    if (meses < 0 || (meses === 0 && dias < 0)) {
        anos--;
        meses += 12;
    }

    // Ajuste para garantir que o mês seja completo
    if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
        meses--;
    }

    // Calcular horas, minutos e segundos
    const horas = agora.getHours() - dataInicial.getHours();
    const minutos = agora.getMinutes() - dataInicial.getMinutes();
    const segundos = agora.getSeconds() - dataInicial.getSeconds();

    // Atualizar o conteúdo dos spans
    anosSpan.textContent = anos;
    mesesSpan.textContent = meses;
    diasSpan.textContent = dias >= 0 ? dias : 0;  // Certifique-se de que dias não seja negativo
    horasSpan.textContent = horas >= 0 ? horas : (horas + 24); // Ajuste para horas negativas
    minutosSpan.textContent = minutos >= 0 ? minutos : (minutos + 60); // Ajuste para minutos negativos
    segundosSpan.textContent = segundos >= 0 ? segundos : (segundos + 60); // Ajuste para segundos negativos
}

setInterval(atualizarContador, 1000);




// Galeria de Fotos
let indiceImagem = 0;
const imagens = document.querySelectorAll('.gallery-image');

function mostrarImagem(index) {
    const totalImagens = imagens.length;
    const offset = -index * 100; // Calcula o deslocamento necessário para centralizar a imagem

    imagens.forEach((img) => {
        img.style.transform = `translateX(${offset}%)`;
    });
}

function mudarImagem(direcao) {
    indiceImagem = (indiceImagem + direcao + imagens.length) % imagens.length;
    mostrarImagem(indiceImagem);
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarImagem(indiceImagem);
});



// Função para criar e animar emojis
function criarEmoji() {
    const emojiContainer = document.querySelector('.emoji-container');
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent = '❤️'; // Emoji de coração

    // Posição inicial aleatória no eixo X
    emoji.style.left = Math.random() * 100 + 'vw';

    // Tamanho aleatório para variar o efeito
    emoji.style.fontSize = Math.random() * 2 + 1 + 'rem';

    // Adiciona o emoji ao contêiner
    emojiContainer.appendChild(emoji);

    // Remove o emoji após a animação terminar
    setTimeout(() => {
        emoji.remove();
    }, 5000); // Duração da animação (5s)
}

// Função para iniciar o efeito de cachoeira
function iniciarCachoeira() {
    const numeroEmojis = 50; // Reduzido o número de emojis criados por vez

    // Cria um certo número de emojis de uma vez
    for (let i = 0; i < numeroEmojis; i++) {
        setTimeout(criarEmoji, i * 200); // Distribui a criação de emojis no tempo
    }

    // Para e reinicia a cachoeira após 5 segundos
    setTimeout(() => {
        document.querySelector('.emoji-container').innerHTML = ''; // Limpa os emojis
        setTimeout(iniciarCachoeira, 10000); // Reinicia a cachoeira após 5 segundos
    }, 10000);
}

// Inicia a cachoeira ao carregar a página
document.addEventListener('DOMContentLoaded', iniciarCachoeira);



// Função para o calendario









