document.getElementById('bbt').addEventListener('click', function() {
    console.log('entered function')
    fetch('/get')
        .then(res => res.json())
        .then(data => document.getElementById('show').innerHTML = `
        The following cookie was set: <br>
        { <br>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p> <br> } `);
});

