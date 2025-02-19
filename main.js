/**
 * Processo principal 
 * Estudo do CRUD com MongoDB
 */

//importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database.js')

//teste de conexão
const app = async () => {
    await conectar()
    await desconectar()
}

console.clear()
app()
