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

  // define an object literal to hold the types of code in the 'code' input
  const codeTypes = {};

  // for each object literal's 'type' value in parsed.body,
  // add it to the code types object literal
  parsed.body.forEach((codeNode)=> codeTypes[ codeNode.type ] = true);

  // for each of the shouldHave's,
  functionality.shouldHave.forEach((type)=>{
    // if it isn't in the code types object literal, return false
    if ( !(type in codeTypes) ) return false;
  });

  // for each of the shouldNotHave's,
  functionality.shouldNotHave.forEach((type)=>{
    // if it's in the code types object literal, return false
    if (type in codeTypes) return false;
  });

  // if the function has not yet returned false, return true
  return true;
};
