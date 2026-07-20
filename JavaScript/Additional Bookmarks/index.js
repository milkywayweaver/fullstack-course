const inputField = document.querySelector('#input-link') 
const submitBtn = document.querySelector('#btn-submit')
const saveBtn = document.querySelector('#btn-save')
const clearBtn = document.querySelector('#btn-clear')
const listEl = document.querySelector('#list-link')

// Get saved links from local storage
let linkArray = JSON.parse(localStorage.getItem('addBookmark'))
if (linkArray) {
    console.log(`Link array found with values of ${linkArray}`)
    for (let i = 0; i < linkArray.length; i++) {
        renderLink(linkArray[i])
    console.log('Link array is null, creating an empty array...')
    }
} else {
    linkArray = []
    }

// Submit link functionalities
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const link = inputField.value
        triggerSubmit(link)
        inputField.value = ''
    }
})

submitBtn.addEventListener('click',function() {
    const link = inputField.value
    triggerSubmit(link)
    inputField.value = ''
})

// browser.tabs.query is async function and needs to be wrapped in async
// it also needs await to tell JS to wait
saveBtn.addEventListener('click', async function(link) {
    const tabs = await browser.tabs.query({active:true, currentWindow:true})
    triggerSubmit(tabs[0].url)
})

function triggerSubmit(link) {
    linkArray.push(link)
    if (link !== '') {
        localStorage.setItem('addBookmark',JSON.stringify(linkArray))
    }
    renderLink(link)
}

function renderLink(link) {
    const itemEl = document.createElement('li')
    const linkEl = document.createElement('a')
    linkEl.setAttribute('href',link)
    linkEl.textContent = link
    
    itemEl.appendChild(linkEl)
    listEl.appendChild(itemEl)
}

// Clear functionalities
clearBtn.addEventListener('dblclick',function() {
    localStorage.removeItem('addBookmark')
    while (listEl.firstChild) {
        listEl.removeChild(listEl.firstChild)
    }
})