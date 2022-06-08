
console.log('client side  js');
fetchApi =(address) => {
    console.log('api is calling');
    fetch(`http://api.weatherstack.com/current?access_key=1745af03f9440e47fe2b935381f322b3&query=${address}`).then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})
}


const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    submitform(e);
});

submitform = (e) =>{
    e.preventDefault();
    console.log('formsubmitted');
    const address = document.querySelector('input').value
    fetchApi(address);
}