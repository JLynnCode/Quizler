import fs from 'fs'

// takes 2 parameters, array and numItems

// array should default to an empty array
// if array has length 0 or 1, then simply return it

// numItems must be checked to ensure it is a number in the range 1 to array.length(inclusive)
// if numItems is outside the correct range, then it should be set to a random number within the correct range

// should always return an array
// should not mutate the array passed in
// should return a random array if possible (size > 1)
// should return an array of the passed in length

// takes a numItems amount of randomly selected unique items from array, and stores them in a new array
// returns the new array
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

// 1) Should return an array even if passed in undefined or no object
// 2) Should always have at least one question and two choices with it
// 3) Should default to 1 question and 2 choices
// 4) Should always return an array of length numQuestions + (numQuestions * numChoices)
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

    // createdPrompt.push({
    //   type: 'input',
    //   name: `question-${(questionNumber)}`,
    //   message: `Enter question ${(questionNumber)}`
    // });

    createdPrompt.push(createQuestionPrompt(questionNumber));

      for(let choiceNumber = 1; choiceNumber <= numChoices; choiceNumber++){

        createdPrompt.push(createChoicePrompt(questionNumber, choiceNumber));
      }
  }
  return createdPrompt;
}

// 5) Should return an array even if passed in undefined or no object
// 6) Should return an empty array if no object is provided
// 7) Should return question objects with their corresponding question and choices
export const createQuestions = () => {
  // TODO implement createQuestions
}

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