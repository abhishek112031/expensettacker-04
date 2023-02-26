
function sendLinkToUserMail(event){
    event.preventDefault();
    const email={
        email:document.getElementById('userEmail').value
    }
    axios.post('http://localhost:3000/forgotpassword',email)
    .then(resp=>{
        console.log("mail status===>>",resp.data.message)
        document.body.innerHTML += `<h3 class="text-center">${resp.data.message}</h3>`
    })
    .catch(err=>{
        console.log(err.response.data.message);
        document.body.innerHTML += `<h3 class="text-center">${err.response.data.message}</h3>`
    })
}
