import http from 'node:http'
import { url } from 'node:inspector';
import { URL } from 'node:url'

const port = 3000

const status = {
    "status": "ok",
    "date": new Date().toISOString()
}

const produtos = [
    { id: 1, nome: "Sabonete" },
    { id: 2, nome: "Monitor" },
    { id: 3, nome: "Cadeira Gamer" }
]


const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    res.setHeader('Content-Type', 'application/json');

    if (req.method == "GET" && urlObj.pathname == "/contato") {
        return res.end(JSON.stringify({
            "numero_telefone": "67 99999-9999",
            "endereco": "Rua da Alegria, 99"
        }));
        res.statusCode = 200;
    }

    if (req.method == "GET" && urlObj.pathname == "/produtos") {
        return res.end(JSON.stringify(produtos));
        res.statusCode = 200;
    }

    if (req.method == "GET" && urlObj.pathname == "/status") {
        return res.end(JSON.stringify(status))
        res.statusCode = 200;
    }

    if (req.method == "GET" && urlObj.pathname == "/") {
        res.statusCode = 200;
        res.end(JSON.stringify({ "data": "Página Inicial" }));
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ "data": "Erro 404 - Página não encontrada" }))
    }

});

server.listen(port, () => {
    console.log("Servidor funcionando na porta ", port)
});