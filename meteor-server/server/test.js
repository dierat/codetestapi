import {analyzeCode} from "./app";


const varDeclaration = `var x = false;`;

const ifStatement = `
  if (true){
    console.log("it's true!");
  }
`;

const whileLoop = `
  while (true){
    console.log("it's true!");
  }
`;

const forLoop = `
  for (let i = 0; i < 5; i++){
    console.log(i);
  }
`;

const forLoopWithIf = `
  for (let i = 0; i < 5; i++){
    if (i % 2 === 0) console.log(i);
  }
`;
