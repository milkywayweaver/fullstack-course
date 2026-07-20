let btnGen = document.querySelector('#btn-gen')
let inputLength = document.querySelector('#input-lenght')
let passFields = document.querySelectorAll('.password-field')
let availableChars = 'abcdefghijklmnopqrstuvwxyz'
availableChars += availableChars.toUpperCase()
availableChars += '0123456789'
availableChars += '~!@#$%^&*_-+=<>.?'

console.log(availableChars)
btnGen.addEventListener('click',function() {
    let passLength = inputLength.value
    console.log(passLength)
    if (passLength === '') {
        console.log('Password length is null, setting it to default value...')
        passLength = 6
    }
    console.log(`Initiating password generation sequence...`)
    for (let i = 0; i < passFields.length; i++) {
        console.log(`Generating ${i}th password...`)
        password = generatePassword(passLength)
        passFields[i].textContent = password
    }
})

function generatePassword(passLength) {
    let password = ''
    for (let i = 0; i < passLength; i++) {
        randomIndex = Math.floor(Math.random()*availableChars.length)
        password += availableChars[randomIndex]
    }
    console.log(`Password is ${password} .`)
    return password
}