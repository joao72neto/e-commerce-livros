const { getSignup, getSignupAlt } = require("../../../backend/controller/controllerSignup");
const { buscarEnderecosClienteId } = require("../../../backend/model/modelAddress");
const { buscarCartoesClienteId } = require("../../../backend/model/modelCard");
const { buscarClienteId } = require("../../../backend/model/modelClientes");

//Mocando as função necessárias
jest.mock("../../../backend/model/modelAddress");
jest.mock("../../../backend/model/modelCard");
jest.mock("../../../backend/model/modelClientes");

//Testes
describe('Deve chamar as páginas se cadastro corretamente', () => {
    
    test('Deve chamar a página de cadastro de cliente corretamente', () => {

        //Criando um mock do req e res
        const req = {}
        const res = {render: jest.fn()}
    
        //Chamando a função controller para renderizar a tela de cadastro
        getSignup(req, res);
    
        //Validando os dados
        expect(res.render).toHaveBeenCalledWith('signup/signup');
    });

    test('Deve chamar a página de alteração de cliente corretamente', async () => {

        //Criando mocks para os testes
        const mockClienteId = 
        
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
                "clt_status": 1
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
                "clt_status": 1
            }
        ];

        const mockEnderecosClienteId = 
        [
            {
              "end_id": 1,
              "end_clt_id": 1,
              "end_nome": "Rua da Juda",
              "end_tipoResidencia": "Casa",
              "end_tipoLogradouro": "Rua",
              "end_logradouro": "Rua das Flores",
              "end_numero": 123,
              "end_bairro": "Centro",
              "end_cep": "12345678",
              "end_cidade": "São Paulo",
              "end_estado": "SP",
              "end_pais": "Brasil"
            },
            {
              "end_id": 2,
              "end_clt_id": 1,
              "end_nome": "Rua Legal",
              "end_tipoResidencia": "Apartamento",
              "end_tipoLogradouro": "Avenida",
              "end_logradouro": "Avenida Paulista",
              "end_numero": 456,
              "end_bairro": "Bela Vista",
              "end_cep": "87654321",
              "end_cidade": "São Paulo",
              "end_estado": "SP",
              "end_pais": "Brasil"
            }
        ];

        const mockCartoesClienteId = 
        [
            {
                "car_id": 1,
                "car_clt_id": 1,
                "car_nome": "João da Silva",
                "car_numero": "4111111111111111",
                "car_bandeira": "Visa",
                "car_cvv": "123",
                "car_principal": 1
              },
              {
                "car_id": 2,
                "car_clt_id": 1,
                "car_nome": "João da Silva",
                "car_numero": "5500000000000004",
                "car_bandeira": "Mastercard",
                "car_cvv": "456",
                "car_principal": 0
              }
        ];

        //Mocando todas as funções
        buscarCartoesClienteId.mockResolvedValue(mockCartoesClienteId);
        buscarEnderecosClienteId.mockResolvedValue(mockEnderecosClienteId);
        buscarClienteId.mockResolvedValue(mockClienteId);

        //Criando um mock do req e res
        const req = {
            params: {clt_id: 1}
        };

        const res = {render: jest.fn()};
    
        //Chamando a função controller para renderizar a tela de cadastro
        await getSignupAlt(req, res);

        //Validando a chamada
        expect(res.render).toHaveBeenCalledWith('signup/signup-alt', {
            cliente: mockClienteId,
            enderecos: mockEnderecosClienteId,
            cartoes: mockCartoesClienteId
        })

    });

});