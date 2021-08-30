const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
// const message1 = document.querySelector('.message1') if it was a class
// message1.textContent = "Hello there"


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''
    const address = search.value
    // Used to be 
    // fetch('http://localhost:3001/weather?address=' + address)
    fetch('/weather?address=' + address)
    .then(response => {
        response.json()
            .then(data => {
                if(data.error){
                    message1.textContent = data.error
                }
                else{
                    message1.textContent = "Location : " + data.location
                    message2.textContent = "Forecast : " + data.forecast
                }
            })
    })
})