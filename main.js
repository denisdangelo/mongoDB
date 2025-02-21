/**
 * Processo principal 
 * Estudo do CRUD com MongoDB
 */

//importação do módulo de conexão (database.js- coloca o caminho do arquivo)
const { conectar, desconectar } = require('./database.js')

//importação do modelo de daos de clientes (precisa colocar o caminho completo do arquivo)
const clienteModel = require("./src/models/Clientes.js")

//CRUD Create (função para adicionar um novo cliente)
const criarCliente = async (nomeCli, foneCli) => {
    try {
        const novoCliente = new clienteModel(
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli
            }
        )

        //a linha abaixo salva os dados do cliente no banco
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso.")
        
    } catch (error) {
        console.log(error)
    }
}

//execução da aplicação
const app = async () => {
    await conectar()
    await criarCliente("Leandro Ramos", "99999-0000")
    await criarCliente("Sirlene Sanches", "01234-1234")
    await desconectar()
}

console.clear()
app()
