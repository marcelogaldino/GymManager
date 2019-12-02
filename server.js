const express = require("express") // importa o express - uma ferramenta um robusto sistema de roteamento e muito mais
const nunjucks = require("nunjucks") // importa o templete engine nunjucks - uma forma de manipular e renderizar o html com javascript
const routes = require("./routes")

const server = express()

server.use(express.static("public"))
server.use(routes)

server.set("view engine", "njk") // seta o html como uma view engine

nunjucks.configure("views", { // configura a pasta ("views"), no objeto declaramos que vamos usar o express e em qual variavel esta armazenado
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function() {
    console.log("server is running")
})