import esprima from 'esprima';

/*

'code' will be a string of raw JavaScript
'functionality' will be an object literal in the following format:
  {
    shouldHave: [],

    shouldNotHave: [],

    structure: [{
      ForStatement: [{
        IfStatement: [{
          WhileStatement: null
        }]
      }]
    }]
  }

'analyzeCode' will return true if the code passed in matches all the requirements
and false if it does not

*/
const analyzeCode = function(code, functionality){
  // parse the student-written code to more easily analyze what it contains
  const parsed = esprima.parse(code);

  // add each type from input code as keys to an object literal (for faster checking)
  const codeTypes = {};
  parsed.body.forEach((codeNode)=> codeTypes[ codeNode.type ] = true);

  // check if each shouldHave is in input code; if not, return false
  if (functionality.shouldHave){
    for (let i = 0; i < functionality.shouldHave.length; i++){
      const type = functionality.shouldHave[i];
      if ( !(type in codeTypes) ) return false;
    }
  }

  // check if each shouldNotHave isn't in input code; if not, return false
  if (functionality.shouldNotHave){
    for (let j = 0; j < functionality.shouldNotHave.length; j++){
      const type = functionality.shouldNotHave[j];
      if (type in codeTypes) return false;
    }
  }

  if (functionality.structure){
    // for each structural tree
    for (let k = 0; k < functionality.shouldNotHave.length; k++){
      const structure = functionality.structure[k];

      // declare a variable to track if the full tree structure has been found
      // look in parsed.body for an object with a type corresponding with the top of the structure
      // if you find one that matches, check that object's body and loop through looking for the next type
      // continue until you reach a value in the structure that is equal to null or until you can't find a type in the structure
      // if you reach a null value, set the found variable to true and break out of the for loop
      // if you get to the end of the trees in parsed.body without finding the full structure, return false from the top function
    }
  }

  // if the code input passed the checks, return true
  return true;
};

export {analyzeCode};


const forLoopWithIf = `
  for (let i = 0; i < 5; i++){
    if (i % 2 === 0) console.log(i);
  }
`;

console.log(esprima.parse(forLoopWithIf).body[0].body);
