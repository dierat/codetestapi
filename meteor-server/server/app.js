import esprima from 'esprima';

/*

'code' will be a string of raw JavaScript
'functionality' will be an object literal in the following format:
  {
    shouldHave: [],
    shouldNotHave: [],
  }
'analyzeCode' should return true if the code passed in matches all the requirements
and false if it does not

*/
const analyzeCode = function(code, functionality){
  // parse the student-written code to more easily analyze what it contains
  const parsed = esprima.parse(code);

  // add each type from input code to an object literal (for faster checking)
  const codeTypes = {};
  parsed.body.forEach((codeNode)=> codeTypes[ codeNode.type ] = true);

  // check if each shouldHave is in input code, otherwise return false
  functionality.shouldHave.forEach((type)=>{
    if ( !(type in codeTypes) ) return false;
  });

  // check if each shouldNotHave isn't in input code, otherwise return false
  functionality.shouldNotHave.forEach((type)=>{
    if (type in codeTypes) return false;
  });

  // if the function has not yet returned false, return true
  return true;
};
