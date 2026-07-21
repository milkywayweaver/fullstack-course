import stockAPI from "./fakeStockAPI.js";

const valueEls = document.querySelectorAll('.value')
const arrowEl = document.querySelector('#price-arrow')

let prevPrice = 0
renderTicks()

setInterval(() => {
    if (!document.hidden) {
        renderTicks()
    }
    },1500)

function renderTicks() {
    let {name,symbol,price,time} = stockAPI

    const currentPrice = price()
    const arrow = (currentPrice > prevPrice) ? 1 : (currentPrice < prevPrice) ? -1 : 0
    console.log(arrow)
    switch (arrow) {
        case 1:
            arrowEl.textContent = 'arrow_outward'
            arrowEl.style.color = 'var(--green)'
            arrowEl.style.transform = 'rotate(0deg)'
            break
        case -1:
            arrowEl.textContent = 'arrow_outward'
            arrowEl.style.color = 'var(--red)'
            arrowEl.style.transform = 'rotate(90deg)'
            break
        default:
            arrowEl.textContent = 'remove'
            arrowEl.style.color = 'var(--mauve)'
            break
    }
    prevPrice = currentPrice

    valueEls[0].textContent = name
    valueEls[1].textContent = symbol
    valueEls[2].textContent = currentPrice.toFixed(3)
    valueEls[3].textContent = time()
}
