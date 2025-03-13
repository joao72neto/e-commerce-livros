const { getInativos } = require("../../../backend/controller/controllerInativos");
const { buscarClientesInativos } = require("../../../backend/model/modelClientes");

jest.mock("../../../backend/model/modelClientes")

//TESTE 01
test('Retornar os clientes inativos e renderizar a página corretamente', async () => {

    //Criando um mock dos dados de um cliente inativo
    const mockClientes = [
        {
            clt_id: 1,
            clt_nome: 'João',
            clt_genero: 'M',
            clt_dataNasc: '2004-03-08',
            clt_cpf: '45532564356',
            clt_telefone: '5511987654356',
            clt_email: 'joao72neto@gmail.com',
            clt_senha: '12345678',
            clt_ranking: 0,
            clt_status: 0

        }
    ]

    buscarClientesInativos.mockResolvedValue(mockClientes);

    //Criando um mock do req e res, 
    const req = {params: {clt_id: 1}}
    const res = {render: jest.fn()}

    //Chamando a função controller para rendezar os clientes ativos
    await getInativos(req, res);

    //Validando os dados
    expect(res.render).toHaveBeenCalledWith('inativos', {inativos: mockClientes});

});