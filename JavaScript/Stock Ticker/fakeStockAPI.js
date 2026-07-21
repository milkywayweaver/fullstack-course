const stockAPI = {
        name: 'Rhodes Island Pharmaceutical Inc.',
        symbol: 'RIP',
        price: () => {
            return Math.random()*3
        },
        time: () => {
            const date = new Date()
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    }
export default stockAPI