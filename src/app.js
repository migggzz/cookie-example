import express from 'express';
import cookieParser from 'cookie-parser';

const PORT = 8080;
const cooks = 'variable cookie'

const app = express();

app.use(cookieParser('s3cr3t'));

app.get('/', (req, res) => {
    res.send('everything works fine fine');
} );

app.get('/preferences', (req, res) => {
    let preference = {
        language: 'en',
        mode: 'dark',
        login: 'true'
    }
    res.cookie('preferences', JSON.stringify(preference), { maxAge: 90000, httpOnly: true, signed:true }).send('saved preferences in cookie');
})

app.get('/control-panel', (req, res) => {
    if (req.signedCookies.preferences) {
        let modes = JSON.parse(req.signedCookies.preferences);
        res.send(`your configurations are: MODE = ${modes.mode}  LANGUAGE = ${modes.language}`);
    }
    else{
        res.send('you are not logged in');
    }
})


// set the cookie
app.get('/cookie/set', (req, res) => {
    res.cookie('name', cooks, { maxAge: 90000, httpOnly: true });
    res.cookie('cookie', 'oreo', { maxAge: 90000, httpOnly: true });
    res.send(`cookie set: ${cooks}`); 
});
//read the cookie
app.get('/cookie/get', (req, res) => {
    res.send(req.cookies);
})

//delete the cookie
app.get('/cookie/delete', (req, res) => {
    res.clearCookie('name')
    res.send('cookie deleted')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});