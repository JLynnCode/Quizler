import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {

  let uniqueRandomItems = [];
  let selectedIndices = {};

  if(array.length < 2){
    return array;
  }
  if(numItems < 1 && numItems > array.length){
    numItems = Math.floor(Math.random() * array.length) + 1;
  }

  while(uniqueRandomItems.length < numItems){

    const i = Math.floor(Math.random() * array.length);

    if(typeof(selectedIndices[i]) === 'undefined'){

      uniqueRandomItems.push(array[i]);
      selectedIndices[i] = i;
    }
  }
  return uniqueRandomItems;
}

//========================================================================================================================================

export const createPrompt = ({numQuestions = 1, numChoices = 2} = {}) => {
  
  let createdPrompt = [];

  const createQuestionPrompt = (questionNumber) => ({
    type: 'input',
    name: `question-${(questionNumber)}`,
    message: `Enter question ${(questionNumber)}`
  });

  const createChoicePrompt = (questionNumber, choiceNumber) => ({
    type: 'input',
    name: `question-${(questionNumber)}-choice-${(choiceNumber)}`,
    message: `Enter answer choice ${(choiceNumber)} for question ${(questionNumber)}`
  })

  for(let questionNumber = 1; questionNumber <= numQuestions; questionNumber++){

    createdPrompt.push(createQuestionPrompt(questionNumber));

      for(let choiceNumber = 1; choiceNumber <= numChoices; choiceNumber++){

        createdPrompt.push(createChoicePrompt(questionNumber, choiceNumber));
      }
  }
  return createdPrompt;
}

//========================================================================================================================================

export const createQuestions = (obj = {}) => {
  
  let createdQuestions = [];
  let keys = Object.keys(obj);
  let currentChoices = [];

  //search for choices of the current question & store in an array
  function getChoices(c){

    currentChoices = [];

    for(let i = 0; i<= keys.length; i++){

      if(keys[i].includes(`question-${(c)}-choice`)){

        currentChoices.push(obj[keys[i]]);
      }
    }
    return currentChoices;
  }

  //loops through keys of received object
  for(let q = 1; q <= keys.length; q++){

    //if the next key is undefined, this index includes the current question number = create new question
    if(keys[q] === undefined || keys[q-1].includes(`question-${(q)}`)){

      createdQuestions.push({

        type: 'list',
        name: keys[q-1],
        message: obj[keys[q-1]],
        choices: getChoices(q)
      });
    }
  }

  return createdQuestions;
}

//========================================================================================================================================

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })