//slider linked up with number input
    //use HTML ID's
const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
//create variable for including uppercase by bringing #includeUppercase into this file through the DOM
const includeUppercaseElement = document.getElementById('includeUppercase')
//add includeNumbersElement, and includeSymbolsElement by referencing their id from HTML
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
//creates a variable form by giving it the same value as passwordGeneratorForm in HTML
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')
//create a set of variables with the charCode identification numbers for our array and random number generator to choose from
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)
//EVENT LISTNERS
    //adds event listner for when either the slider or the number input is changed. 
        //creates function for linking the two together
characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)
//prevents the form from refreshing the page if the form is submitted by the button
form.addEventListener('submit', e => {
  e.preventDefault()
  //this variable characterAmount is 
  const characterAmount = characterAmountNumber.value
  //create variable called includeUppercase which will be equal to the id in the HTML includeUppercase
  // .checked tells us true or false if the box is checked
  const includeUppercase = includeUppercaseElement.checked
  //repeat the above variable two more times to indicate for includeNumbers, and includeSymbols
  const includeNumbers = includeNumbersElement.checked
  //repeated
  const includeSymbols = includeSymbolsElement.checked
  //this function takes the number of characters, symbols, and numbers
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  //display our password from our random generator
  passwordDisplay.innerText = password
})

//create the function generatePassword
    //include a character amount, include uppercase, numbers, and symbols
function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
  //variable that stores all our passwords
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    //we need to create a random value my multiplying a rounded integer with the characterAmount
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    //push the password characters into the empy array above
      //we want to turn the charcodes into a string with  .String and feed our charcode value into it
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}
//a function that writes charCode arrays for us from low to high
function arrayFromLowToHigh(low, high) {
  //define variable array as an array in order to push for loop into
  const array = []
  //our for loop looping through from our low value to our high value of each of our charCode Arrays
  for (let i = low; i <= high; i++) {
    //push this for each loop into the above array
    array.push(i)
  }
  return array
}
 //defines the function syncCharacterAmount
function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}