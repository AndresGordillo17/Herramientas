let pingButton = document.querySelector('#pingButton')


pingButton.addEventListener('click', getPingFromWebService)

function getPingFromWebService(){
  const url = 'http://localhost:3000/ping'
  //Encadenar los datos de la url con la respuesta 
  fetch (url).then((response) => {
    console.log(response)
  })
}