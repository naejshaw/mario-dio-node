const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  };
  
  const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  };
  
  async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  async function getRandomBlock() {
    let random = Math.random();
    let result;
  
    switch (true) {
      case random < 0.33:
        result = "RETA";
        break;
      case random < 0.66:
        result = "CURVA";
        break;
      default:
        result = "CONFRONTO";
    }
  
    return result;
  }

  async function getRandomObject(){
    let random = Math.random();
    let result;
    switch (true) {
        case random < 0.5:
          result = "CASCO";
          break;
        default:
          result = "BOMBA";
      }
      return result;
  }

  async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
        diceResult + attribute
      }`
    );
  }
  
  async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
      console.log(`🏁 Rodada ${round}`);
  
      // sortear bloco
      let block = await getRandomBlock();
      console.log(`Bloco: ${block}`);
  
      // rolar os dados
      let diceResult1 = await rollDice();
      let diceResult2 = await rollDice();
  
      //teste de habilidade
      let totalTestSkill1 = 0;
      let totalTestSkill2 = 0;
  
      if (block === "RETA") {
        totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
  
        await logRollResult(
          character1.NOME,
          "velocidade",
          diceResult1,
          character1.VELOCIDADE
        );
  
        await logRollResult(
          character2.NOME,
          "velocidade",
          diceResult2,
          character2.VELOCIDADE
        );
      }
  
      if (block === "CURVA") {
        totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
  
        await logRollResult(
          character1.NOME,
          "manobrabilidade",
          diceResult1,
          character1.MANOBRABILIDADE
        );
  
        await logRollResult(
          character2.NOME,
          "manobrabilidade",
          diceResult2,
          character2.MANOBRABILIDADE
        );
      }
      
    //   TODO: Ajustar a lógica de arremesso de objetos e creditar um ponto ao vencedor do confronto

      if (block === "CONFRONTO") {
        let powerResult1 = diceResult1 + character1.PODER;
        let powerResult2 = diceResult2 + character2.PODER;
  
        console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
  
        await logRollResult(
          character1.NOME,
          "poder",
          diceResult1,
          character1.PODER
        );
  
        await logRollResult(
          character2.NOME,
          "poder",
          diceResult2,
          character2.PODER
        );
        let object = await getRandomObject();
        console.log(`Objeto: ${object}`);
        if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
          if(object === "CASCO"){
            character2.PONTOS -= 1;
            console.log(
                `${character1.NOME} acertou um ${object} no ${character2.NOME} e venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
            );
          }
          if(object === "BOMBA"){
            character2.PONTOS -= 2;
            console.log(
                `${character1.NOME} acertou um ${object} no ${character2.NOME} e venceu o confronto! ${character2.NOME} perdeu 2 pontos 🐢`
            );
          }
        }
  
        if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
            if(object === "CASCO"){
                character1.PONTOS -= 1;
                console.log(
                    `${character2.NOME} acertou um ${object} no ${character1.NOME} e venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
                );
              }
              if(object === "BOMBA"){
                character1.PONTOS -= 2;
                console.log(
                    `${character2.NOME} acertou um ${object} no ${character1.NOME} e venceu o confronto! ${character1.NOME} perdeu 2 pontos 🐢`
                );
              }
        }
  
        console.log(
          powerResult2 === powerResult1
            ? "Confronto empatado! Nenhum ponto foi perdido"
            : ""
        );
      }
  
      // verificando o vencedor
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto!`);
        character2.PONTOS++;
      }
  
      console.log("-----------------------------");
    }
  }
  
  async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);
  
    if (character1.PONTOS > character2.PONTOS)
      console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    else if (character2.PONTOS > character1.PONTOS)
      console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    else console.log("A corrida terminou em empate");
  }
  
  (async function main() {
    console.log(
      `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );
  
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
  })();