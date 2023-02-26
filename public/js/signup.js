
function saveToServer(event){
    event.preventDefault();

    const userInfo={
        user:document.getElementById('userName').value,
        email:document.getElementById('userEmail').value,
        password:document.getElementById('password').value
    }

    axios.post('http://localhost:3000/sign-Up',userInfo)
    .then((response)=>{
        if(response.status===201){
            alert(response.data.message);
            window.location.href='http://localhost:3000/login';
        }


    })
    .catch(err=>{
      console.log(err);
      document.body.innerHTML+=`<div class="text-white text-center bg-danger">Error: ${err.response.data.message}</div>`
      // document.body.innerHTML+=`<h5 class="text-warning">Error:->>   ${err.response.data.message}</h5>`
    })

}
