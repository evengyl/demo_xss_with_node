const express = require("express")
const app = express()
const helmet = require("helmet")
const port = process.env.PORT || 3000

//------------------------------------------------------
app.use(helmet()) //après avoir montrer les erreurs !!!!
//------------------------------------------------------

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies for form http post


app.use(express.static('content')); // define static content for css, pictures, scripts...
app.engine('html', require('ejs').renderFile); // view engine for nodeJS 


app.get('/', (req, res, next) => { 
   res.render("index.ejs")
})


app.post("/", (req, res, next) => {

    const {login, pwd} = {...req.body}

    if(login.length > 0 && pwd.length > 0)
    {
        console.log(req.body)
        res.send(login) //si on envoi le <script>alert('tutu')</script> -> va déclencher le alert !!!
    }
    else{
        throw new Error("Body de request vide")
    }
    res.end()
}) //<script>alert('tutu')</script>
// <img src="https://via.placeholder.com/150">
/*
<script type='text/javascript'>
        const xhr = new XMLHttpRequest();
    xhr.open(`GET`, `https://pokeapi.co/api/v2/pokemon/ditto`, true);
    xhr.send();

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4)
        {
            let response = xhr.responseText;
            document.body.innerHTML = response;
        }
    }
    </script>
*/



app.use((err, req, res, next) => {
    res.status(500).json({
        message : err.message
    })
})


app.listen(port, console.log(`Les serveur Express écoute sur le port ${port}`))
