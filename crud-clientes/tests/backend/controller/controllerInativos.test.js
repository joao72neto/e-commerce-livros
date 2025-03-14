const { getInativos } = require("../../../backend/controller/controllerInativos");
const { buscarClientesInativos } = require("../../../backend/model/modelClientes");

jest.mock("../../../backend/model/modelClientes")


test('Deve testar a exibição dos clientes inativos', async () => {

    //Criando um mock dos dados de um cliente inativo
    const mockClientes = 
    [
        {
            "clt_id": 1,
            "clt_nome": "João",
            "clt_genero": "M",
            "clt_dataNasc": "2004-03-08",
            "clt_cpf": "45532564356",
            "clt_telefone": "5511987654356",
            "clt_email": "joao72neto@gmail.com",
            "clt_senha": "12345678",
            "clt_ranking": 0,
            "clt_status": 0
        },
        {
            "clt_id": 2,
            "clt_nome": "Maria",
            "clt_genero": "F",
            "clt_dataNasc": "1990-07-15",
            "clt_cpf": "12345678901",
            "clt_telefone": "5511987654321",
            "clt_email": "maria.silva@example.com",
            "clt_senha": "password123",
            "clt_ranking": 5,
            "clt_status": 0
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