email = "admin@gmail.com"
password = "1234"

const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        data:
        {
            email: email,
            password: password
        }
    })
};

url = 'http://localhost:1323/login'

fetch(url, options)
    .then((res) => {
        return res.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);
    })
    .catch(error => console.log('Error:', error));