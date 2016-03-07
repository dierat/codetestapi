import esprima from 'esprima';

/*

'code' will be a string of raw JavaScript
'functionality' will be an object literal in the following format:
  {
    shouldHave: [],
    shouldNotHave: [],
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

  // if the code input passed the checks, return true
  return true;
};
