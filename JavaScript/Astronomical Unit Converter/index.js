const initValueEl = document.querySelector('#init-value')
const initUnitEl = document.querySelector('#init-unit')
const unitEls = document.querySelectorAll('.unit')
const valueEls = document.querySelectorAll('.value')
const smallUnitEls = document.querySelectorAll('.unit-small')
const copyBtns = document.querySelectorAll('.copy-btn')
const popupEl = document.querySelector('#copy-popup')

const availableUnits = ['pc','ly','au','km','Re']
let initValue = Number(initValueEl.value)
let initUnit = initUnitEl.value
let targetUnits = availableUnits.filter(item => item !== initUnit)
renderResult()


initValueEl.addEventListener('input',function() {
    initValue = Number(initValueEl.value)
    renderResult()
})

initUnitEl.addEventListener('change',function() {
    initUnit = initUnitEl.value
    targetUnits = availableUnits.filter(item => item !== initUnit)
    renderResult()
})
for (let i = 0; i< copyBtns.length; i++) {
    copyBtns[i].addEventListener('click',function() {
        navigator.clipboard.writeText(valueEls[i].textContent)
        console.log(`Copied ${valueEls[i].textContent} ${targetUnits[i]}`)

        // Trigger animation
        popupEl.style.visibility = 'visible'
        popupEl.classList.remove('popup-anim')
        void popupEl.offsetWidth;
        popupEl.classList.add('popup-anim')
    })
}
popupEl.addEventListener('animationend',function() {
    popupEl.style.visibility = 'hidden'
})

function renderResult() {
    for (let i = 0; i < targetUnits.length; i++) {
        targetValue = convertDistance(initValue,initUnit,targetUnits[i])
        if (targetUnits[i] === 'Re') {
            unitEls[i].innerHTML = `R<sub>earth</sub>`
        } else {
            unitEls[i].textContent = targetUnits[i]
        }
        valueEls[i].textContent = targetValue.toExponential(3)
        smallUnitEls[i].textContent = targetUnits[i]
    }
}
function convertDistance(value,initUnit,targetUnit) {
    switch (initUnit) {
        case 'pc':
            initMeter = value*3.086e16
            break
        case 'ly':
            initMeter = value*9.461e15
            break
        case 'au':
            initMeter = value*1.496e11
            break
        case 'km':
            initMeter = value*1e3
            break
    }
    switch (targetUnit) {
        case 'pc':
            targetValue = initMeter/3.086e16
            break
        case 'ly':
            targetValue = initMeter/9.461e15
            break
        case 'au':
            targetValue = initMeter/1.496e11
            break
        case 'km':
            targetValue = initMeter/1e3
            break
        case 'Re':
            targetValue = (initMeter)/(6.378e6*2*Math.PI)
            break
    }
    return targetValue
}