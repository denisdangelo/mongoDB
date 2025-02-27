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

// CRUD - Read - Função para listar todos os clientes cadastrados
const listarCliente = async () => {
    try {
        // A linha abaixo lista todos os clientes cadastrados por ordem alfabetica
        const cliente = await clienteModel.find().sort(
            {
                nomeCliente: 1
            }
        )
        console.log(cliente)
    } catch (error) {
        console.log(error)
    }
}

// CRUD - Read - Função para buscar um cliente especifico
const buscarCliente = async (nome) => {
    try {
        // find() buscar
        // nomecliente: new RegExp(nome)  filtro pelo nome
        // i insensitive (ignorar letras maiusculas ou minusculas)
        const cliente = await clienteModel.find({ nomeCliente: new RegExp(nome, 'i') })

        // calcular a similaridade entre os nomes retomados e o nome pesquisado
        const nomesClientes = cliente.map(cliente => cliente.nomeCliente)

        // validação se não existir o cliente pesquisado
        if (nomesClientes.length === 0) {
            console.log("Cliente não cadastrado.")
        } else {
            const match = stringSimilarity.findBestMatch(nome, nomesClientes)

            // Cliente com melhor similaridade
            const melhorCliente = cliente.find(cliente => cliente.nomeCliente === match.bestMatch.target)

            //Formatação da data
            const clienteFormatado = {
                nomeCliente: melhorCliente.nomeCliente,
                foneCliente: melhorCliente.foneCliente,
                cpf: melhorCliente.cpf,
                dataCadastro: melhorCliente.dataCadastro.toLocaleDateString("pt-BR")
            }
            console.log(clienteFormatado)  
        }
    } catch (error) {
        console.log(error)
    }
}

// CRUD Update - Função para alterar os dados de um cliente
// ATENÇÃO Obrigatoriamente o update precisa ser feito
// com base no ID de cliente
const  atualizarCliente = async (id, nomeCli, foneCli, cpfCli) => {
    try {
        const cliente = await clienteModel.findByIdAndUpdate(
            id,
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli,
                cpf: cpfCli
            },
            {
                new: true,
                runValidators: true
            }
        )
        // validação (retorno do banco)
        if(!cliente){
            console.log("Cliente não encontrado.")
        }else{
            console.log("Dados do cliente alterados com sucesso.")
        }
    } catch (error) {
        console.log(error)
        
    }
}

// CRUD - Delete - Função para excluir um cliente
// ATENÇÃO !!! - obrigatoriamente a exclusão e feita peli ID
const deletarCliente = async (id) => {
    try {
        // A linha abaixo exclui o cliente do banco de dados
        const cliente = await clienteModel.findByIdAndDelete(id)
        // validação
        if (!cliente) {
            console.log("Cliente não encontrado.")
        } else {
            console.log("Cliente Deletado.")            
        }
    } catch (error) {
        console.log(error)
    }
}


//execução da aplicação
const app = async () => {
    await conectar()
    // CRUD - Create
    await criarCliente("Patrick Silva", "11971263806", "687.998.710-55")

    // CRUD - Read (Exemplo 1 - Listar todos os clientes) 
    //await listarCliente()

    // CRUD - Update
    //await atualizarCliente('67b904c51f86f7a301468e72', 'Maria', '1199841247', '593.859.900-80')

    // CRUD - Read (Exemplo 2 - Buscar cliente)
    //await buscarCliente("Maria")

    // CRUD - Delete
    //await deletarCliente('67b90e41b6eb7c37751645ec')

    
    await desconectar()
}

console.clear()
app()
