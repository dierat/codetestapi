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

  // for each object literal's 'type' value in parsed.body,
    // add it to the code types object literal

  // for each of the shouldHave's,
    // if it isn't in the code types object literal,
    // return false

  // for each of the shouldNotHave's,
    // if it's in the code types object literal,
    // return false

  // if the function has not yet returned false, return true
};
