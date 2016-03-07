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

  // define a variable to track if the shouldHaves are all present,
    // by default set to false
  // define a variable to track if none of the shouldNotHaves are present
    // by default set to false

  // for each of the object literals in parsed.body,
    // check if the type corresponds the values in functionality,
    // updating the tracking variables (defined above) if they fail

  // return false if either of the tracking variables are false, otherwise true
};
