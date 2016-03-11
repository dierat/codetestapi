/************************************************************
  Challenge content
************************************************************/

const varDeclaration = {shouldHave: ['VariableDeclaration']};
const ifStatement = {shouldHave: ['IfStatement']};
const whileLoop = {shouldHave: ['WhileStatement']};
const forLoop = {shouldHave: ['ForStatement']};
const forLoopWithVar = {shouldHave: ['ForStatement', 'VariableDeclaration']};
const forLoopWithIf = {shouldHave: ['ForStatement', 'IfStatement']};
const whileWithForAndIf = {shouldHave: ['WhileStatement', 'ForStatement', 'IfStatement']};
const ifInFor = {structure: {type: "ForStatement", child: {type: "IfStatement", child: null}}};


const challenges = [
  {
    title: 'A simple variable declaration',
    description: 'Define a variable. That\'s all there is to it! You can assign it any value.',
    checks: varDeclaration
  },
  {
    title: 'Baby\'s first if statement',
    description: 'Use an if statement to check something, anything! You don\'t need to do anything special inside of the check, but you can if you want!',
    checks: ifStatement
  },
  {
    title: 'Once in a while loop',
    description: 'Please write a while loop. It doesn\'t need to do anything fancy. Just make sure it won\'t loop for infinity!',
    checks: whileLoop
  },
  {
    title: 'For what it\s worth',
    description: 'Write a for loop! Make sure you have a conditional that will make it stop at some point.',
    checks: forLoop
  },
  {
    title: 'For and var',
    description: 'Use your formidable programming powers to write both a for loop and a var statement! Please note that the variable declaration in the for loop declaration doesn\'t count (but putting a variable declaration in the body of the for loop does!).',
    checks: forLoopWithVar
  },
  {
    title: 'For and if',
    description: 'Write a for loop and an if statement! You can have one inside the other or one before the other; it doesn\'t matter as long as you have both.',
    checks: forLoopWithIf
  },
  {
    title: 'While and if a what for',
    description: 'Now it\'s getting complicated! Write a for loop, a while loop, and an if statement. They can be inside of each other or not; it\'s up to you!',
    checks: whileWithForAndIf
  },
  {
    title: 'An if in a for',
    description: 'Write a for loop with an if statement in the body! Please note that your code needs to have this structure to pass.',
    checks: ifInFor
  }
];


/************************************************************
  Translate tests to human-readable text
************************************************************/

const testMessages = {
  'shouldHave': 'should have',
  'shouldNotHave': 'should not have',
  'structure': 'should have the following structure:',
  'VariableDeclaration': 'a variable declaration',
  'IfStatement': 'an if statement',
  'WhileStatement': 'a while loop',
  'ForStatement': 'a for loop'
};


/************************************************************
  Track the current state of the app
************************************************************/

Session.setDefault({currentChallengeIndex: 0});
Session.setDefault({currentChallenge: challenges[0]});
Session.setDefault({passingTests: false});
Session.setDefault({currentTests: null});


/************************************************************
  Helpers to update information displayed to the user
************************************************************/

Template.userRole.helpers({
  currentChallenge(){
    return Session.get('currentChallenge');
  },


  passingTests(){
    return Session.get('passingTests');
  },


  allTests(){
    return Session.get('currentTests');
  },


  codeFeedback(){
    return "Keep going, you're almost there!!";
  }
});


/************************************************************
  Events to handle user interaction
************************************************************/

const getCurrentTests = function(){
  let allTests = [];
  const currentChallenge = Session.get('currentChallenge');

  // loop through the input and separate it out into individual tests
  if (currentChallenge.checks.shouldHave){
    const shouldHaves = currentChallenge.checks.shouldHave.map( (requirement)=>{
      return {shouldHave: [requirement]};
    } );
    allTests = allTests.concat( shouldHaves );
  }
  if (currentChallenge.checks.shouldNotHave){
    allTests = allTests.concat( currentChallenge.checks.shouldNotHave.map( (requirement)=>{
      return {shouldNotHave: [requirement]};
    } ) );
  }
  if (currentChallenge.checks.structure) allTests.push(currentChallenge.checks.structure);

  // convert the tests into human-friendly language to display on the screen
  allTests = allTests.map( (test)=>{
    const key = Object.keys(test)[0];
    const type = test[key];
    const verb = testMessages[key];
    const object = testMessages[type];
    return {
      test: test,
      message: `It ${verb} ${object}`,
      // track if this test is currently passing or failing
      state: 'failing'
    };
  } );

  Session.set('currentTests', allTests);
};
getCurrentTests();


Template.userRole.events({
  'keyup [data-role="code-input"]'(){
    const input = $('[data-role="code-input"]').val();
    const tests = Session.get('currentTests');
    tests.forEach( (testObj, index)=>{
      // check the code input against the test
      Meteor.call('analyzeCode', input, testObj.test, (err, result)=>{
        console.log("result = ", result);
        if (err) console.log(err);

        // update the test so it can update the DOM
        testObj.state = result ? 'passing' : 'failing';
        tests[index] = testObj;
        Session.set({currentTests: tests});

        // check if all the tests are passing and record the result
        const allTestsPassing = tests.reduce( (result, test)=>{
          return (result || test.state === 'passing') ? true : false;
        }, false );
        Session.set({passingTests: allTestsPassing});
      });
    } );
  },


  'click .next-button'(){
    // clear textarea
    $('[data-role="code-input"]').val('');
    Session.set({passingTests: false});

    // set up the state for the next challenge
    let nextChallengeIndex = Session.get('currentChallengeIndex') + 1;
    // if we've run out of challenges, loop back around to the first one
    if (nextChallengeIndex === challenges.length) nextChallengeIndex = 0;
    Session.set('currentChallengeIndex', nextChallengeIndex);
    Session.set('currentChallenge', challenges[nextChallengeIndex]);
    getCurrentTests();
  }
});
