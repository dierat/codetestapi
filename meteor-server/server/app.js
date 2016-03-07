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

  // for each of the shouldHave's,
    // if it does not exist in parsed.body,
    // return false

  // for each of the object literals in parsed.body,
    // if the type corresponds the values in shouldNotHave,
    // return false

  // if the function has not yet returned false, return true
};
