/* o context endereça o desenho que vai acontecer dentro do Canvas colocando no 2d ele vai entender que a tratativa para o arquivo será 2d
cria elemento que irá rodar o jogo */         
let canvas = document.getElementById("snake"); 
let context = canvas.getContext("2d"); //....
let box = 32;


let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
/*precisamos criar uma variavel que contenha a a direção para a cobrinha ganhar seu movimento. 
podemos criar tanto como left, right , down, up  , mais neste caso estamos criando como right. */
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    /* função que vai começar nosso canvas , vai desenhar e definir cor */
    context.fillStyle = "orange"; /* cor do quadrado onde a */
     /* desenha o quadrado usando x e y e as largura e altura setadas */
    context.fillRect(0, 0, 16*box, 16*box); 
}


/* a cobrinha vai ser um array de coordenadas . 
    quando adicionamos um elemento, retiramos o ultimo , isso vai fazer com que ela ande. 
    como a cobrinha vai ser array vamos utilizar o for para percorrer todo o array e
    depois implementar.  */
function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "purple";  /*cor da cobrinha */
         /*passas o context novamente só que desta vez ele estará ligado a cobrinha */
         /* nosso retangulo FillRect onde vai estar nosso jogo 4 parametros posição x, y altura e largura*/
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "black"; /*cor do alvo do alimento da cobrinha*/
    context.fillRect(food.x, food.y, box, box);
}

/*a função é chamada apartir de um evento quando acontece:*/
document.addEventListener('keydown', update);

/*precisamos detectar o valor da peça pois precisamos que ela ande , então o jogo precisa captar o codigo do botão 
e tranfere o local para a funçao , assim criamos um evento de escuta.   */


function update(event){
    /*a direção não pode ser oposta do que , a direção nao
    pode ser a oposta dela mesma no caso condição 
    repete para as demais posições.*/
    if(event.keyCode == 37 && direction != "right") direction = 'left';
    if(event.keyCode == 38 && direction != "down") direction = 'up';
    if(event.keyCode == 39 && direction != "left") direction = 'right';
    if(event.keyCode == 40 && direction != "up") direction = 'down';
}

/* criamos um função que atualiza nosso jogo de tempos em tempos para que a cobrinha consiga mexer 
neste intervalo.  precisamos da função*/

function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Fim de jogo !! ');
            alert
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

/*abaixo iremos colocar as condicionais para os movimentos.
 **por exemplo se a cobra estiver para o lado direito ele vai adicionar 1 quadradinho para o lado direito 
 ** se tiver do lado esquerdo vai diminuir um quadradinho para o lado esquerdo  .  */

 /* é um plano cartesiano para direita aumenta para esquerda diminui . Então
 vamos diminuir dandoa impressão que realmente ela esta indo para esquerda */

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){

         /*pop tira o último elemento da lista*/

        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }
/*método unshift adiciona como primeiro quadradinho da cobrinha*/
    snake.unshift(newHead); 
}

/* aqui estou passando o intervalo de 100 ms para nossa inicializar jogo reiniciar a cada 100 ms */
let jogo = setInterval(iniciarJogo, 100);