import express from 'express';
import session from 'express-session';

const PORT = 8080;
const cooks = 'variable cookie'

const app = express();

app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.send('everything works fine fine');
} );

app.get('/preferences', (req, res) => {
    let preference = {
        language: 'en',
        mode: 'dark',
        login: 'true'
    }
    req.session.preferences = JSON.stringify(preference);
    res.send('saved preferences in cookie');
})

app.get('/control-panel', (req, res) => {
    if (req.session.preferences) {
        let modes = JSON.parse(req.session.preferences);
        res.send(`your configurations are: MODE = ${modes.mode}  LANGUAGE = ${modes.language}`);
    }
    else{
        res.send('you are not logged in');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err=>{
        if(err) return res.send('error');
        res.send('logged out');
    });
    
})


// // set the cookie
// app.get('/cookie/set', (req, res) => {
//     res.cookie('name', cooks, { maxAge: 90000, httpOnly: true });
//     res.cookie('cookie', 'oreo', { maxAge: 90000, httpOnly: true });
//     res.send(`cookie set: ${cooks}`); 
// });
// //read the cookie
// app.get('/cookie/get', (req, res) => {
//     res.send(req.cookies);
// })

// //delete the cookie
// app.get('/cookie/delete', (req, res) => {
//     res.clearCookie('name')
//     res.send('cookie deleted')
// })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});