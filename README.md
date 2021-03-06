# Code Test API

This is an API for checking if a string of JavaScript code contains specific or structure functionality. This is intended primarily for the purpose of analyzing a learning programmer's code to determine if they're using the intended tools at their disposal for the problem given to them.


# How to get it running on your machine

- [Clone the repo to your machine](https://help.github.com/articles/cloning-a-repository/).
- [Install Meteor](https://www.meteor.com/install) (if you don't have it)
- Navigate to the repo folder in your terminal.
- Type `npm install`.
- Type `meteor`.
- Visit `http://localhost:3000` in your browser - it should be there!


# How to use the code in your own project

The function 'analyzeCode' accepts two parameters - a string of JavaScript code and an object literal. The object should have a structure similar to this:

```
{
  shouldHave: [],
  shouldNotHave: [],
  structure: {}
}
```

The arrays for the `shouldHave` and `shouldNotHave` keys should contain strings that describe what the program should and should not have (respectfully). Please note that each key is optional; you only need to pass in the functionality checks that you want.

This is the list of strings the program will look for to understand what you're checking for in the shouldHave and shouldNotHave arrays:

- 'VariableDeclaration'
- 'IfStatement'
- 'WhileStatement'
- 'ForStatement'

For the structure object literal, you can add nested objects that describe the structure that the input code should have. For example, if you want to check for a for loop with an if statement inside and a while loop inside of the if statement, you should call the function like so:

```
analyzeCode(inputCode, {
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
});
```
