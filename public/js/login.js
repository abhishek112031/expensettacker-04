
function userLoginVerification(event) {
    event.preventDefault();

    const userLogInData = {
        email: document.getElementById('userEmail').value,
        password: document.getElementById('password').value
    }

    axios.post('http://localhost:3000/login', userLogInData)
        .then((response) => {
            if (response.status === 200) {
                alert(response.data.message);
                localStorage.setItem('token', response.data.token);
                window.location.href='http://localhost:3000/expenses'
            }

        })
        .catch(err => {
            console.log(err.response.data.message)
            document.body.innerHTML += `<div class="text-white text-center bg-danger">Error: ${err.response.data.message}</div>`
        })
}

document.getElementById('forgotpw').onclick= async function(){
    window.location.href='http://localhost:3000/forgotpassword'
}


