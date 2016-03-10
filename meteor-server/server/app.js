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

Please see the README for more information.
*/



// 'desiredTypes' will be an array of strings
// 'haveTypes' will be an object literal with keys for types of code found in input code
// 'desiredNot' is an optional boolean indicating that the 'desiredTypes' are actually
// undesired types and the code fails if these are present in the 'haveTypes'
const checkTypes = function(parsedCode, desiredTypes, desiredNot){
  for (let i = 0; i < desiredTypes.length; i++){
    const type = desiredTypes[i];
    const found = searchStructure(parsedCode, {type: type, child: null});
    if ((!found && !desiredNot) || (found && desiredNot)) return false;
  }

  return true;
};



// helper function for searching the structure of a code tree
// 'parsedNode' is the current node of the parsed input code
// 'compareNode' is the current node of the desired code structure
const searchStructure = function(parsedNode, compareNode){
  for (let l = 0; l < parsedNode.length; l++){

    let nextParsedNode = parsedNode[l];
    let nextCompareNode = compareNode;

    // if the two current nodes are of the same type
    if (nextParsedNode.type === compareNode.type){

      // if this is the last node in the comparison structure, the code passes
      if (!compareNode.child){
        return true;

      } else {
        nextCompareNode = nextCompareNode.child;
      }
    }

    // find the next child node in the code and call this function with it
    nextParsedNode = nextParsedNode.body || nextParsedNode.consequent;
    if (nextParsedNode){
      if (nextParsedNode.type === 'BlockStatement'){
        nextParsedNode = nextParsedNode.body;
      } else {
        // this function expects parsedNode to be an array
        nextParsedNode = [nextParsedNode];
      }

      return searchStructure(nextParsedNode, nextCompareNode);
    }
  }
};



const analyzeCode = function(code, functionality){
  // parse the student-written code to more easily analyze what it contains
  const parsed = esprima.parse(code);

  // add each type from input code as keys to an object literal (for faster checking)
  const codeTypes = {};
  parsed.body.forEach((codeNode)=> codeTypes[ codeNode.type ] = true);

  // check if each shouldHave is in input code; if not, return false
  if (functionality.shouldHave){
    if ( !checkTypes(parsed.body, functionality.shouldHave, false) ) return false;
  }

  // check if each shouldNotHave isn't in input code; if not, return false
  if (functionality.shouldNotHave){
    if ( !checkTypes(parsed.body, functionality.shouldNotHave, true) ) return false;
  }

  // check if desired structure exists in input code; if not, return false
  if (functionality.structure){
    const matches = searchStructure(parsed.body, functionality.structure);
    if (!matches) return false;
  }

  // if the code input passed all the checks, return true
  return true;
};



// export this module for other areas of the app to use
export {analyzeCode};
