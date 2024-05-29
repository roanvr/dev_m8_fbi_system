import path from 'path';
import jwt from 'jsonwebtoken';
import { agents } from '../data/agentes.js';
process.loadEnvFile();
const __dirname = import.meta.dirname;

const secretKey = process.env.SECRET_KEY;

const home = (req,res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

const signInFunction = (req,res) => {
    try {
        const { email, password } = req.query;
        const agent = agents.find((agent)=> {
            return agent.email===email && agent.password === password;
        });
        let token = jwt.sign({email}, secretKey, {expiresIn: '60s'});
        agent
        ? res.send(`<a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>Bienvenido, ${email}.
        <script>
        sessionStorage.setItem('token', JSON.stringify("${token}"))
        </script>
        `)
        : res.send('Usuario o contraseña incorrecta');
    } catch (error) {
        console.log(error.message);
    };
};

const dashboardController = (req,res) => {
    const {token} = req.query;
    jwt.verify(token,secretKey, (error,data)=> {
        if(error){res.status(401).send(`No autorizado ${error.message}`)
        }else {
        res.send(`Bienvenido ${data.email}`)
    }});
    res.send(`Bienvenido <b>${email}</b>`)
}

export { home, signInFunction, dashboardController }