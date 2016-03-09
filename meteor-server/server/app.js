import esprima from 'esprima';

/*

'code' will be a string of raw JavaScript
'functionality' will be an object literal in the following format:
  {
    shouldHave: [],

    shouldNotHave: [],

    structure: {
      type: 'ForStatement',
      child:
      {
        type: 'IfStatement',
        child:
        {
          type: 'WhileStatement',
          child: null
        }
      }
    }
  }

'analyzeCode' will return true if the code passed in matches all the requirements
and false if it does not

*/

// declare a recursive function that accepts the current structure node and current parsed code node
const searchStructure = function(parsedNode, compareNode){
  // loop through the parsedNode's body array
  for (let l = 0; l < parsedNode.length; l++){
    // if the type matches the type of the current compareNode
    if (parsedNode[l].type === compareNode.type){
      // if that compareNode has no child,
      if (!compareNode.child){
        // return true
        return true;
      } else {
        let body = parsedNode[l].body || parsedNode[l].consequent;
        if (body){
          if (body.type === 'BlockStatement'){
            body = body.body;
          } else {
            body = [body];
          }
          const foundAll = searchStructure(body, compareNode.child);
          if (foundAll) return true;
        } else {console.log("can't continue with parsedNode!");}
      }
    }
  }
  return false;
};



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
    const matches = searchStructure(parsed.body, functionality.structure);
    if (!matches) return false;
  }

  // if the code input passed the checks, return true
  return true;
};

export {analyzeCode};
