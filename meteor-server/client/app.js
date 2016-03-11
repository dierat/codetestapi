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
  Track current challenge the user is on
************************************************************/

Session.setDefault({currentChallengeIndex: 0});
Session.setDefault({currentChallenge: challenges[0]});
Session.setDefault({passingTests: false});


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
  codeFeedback(){
    return "Keep going, you're almost there!!";
  }
});


/************************************************************
  Events to handle user interaction
************************************************************/

Template.userRole.events({
  'click .next-button'(){
    let nextChallengeIndex = Session.get('currentChallengeIndex') + 1;
    // if we've run out of challenges, loop back around to the first one
    if (nextChallengeIndex === challenges.length) nextChallengeIndex = 0;
    Session.set('currentChallengeIndex', nextChallengeIndex);
    Session.set('currentChallenge', challenges[nextChallengeIndex]);
  }
});
