//Funções para mock
const { getAddress, getAddressAlt, getAddressAdd } = require("../../../backend/controller/controllerAddress");
const { buscarEnderecosClienteId, buscarEnderecoId } = require("../../../backend/model/modelAddress");

//Definindo um endereço para realizar o mock
jest.mock("../../../backend/model/modelAddress");

describe('Devem exibir as páginas dos endereços', () => {

    //Criando mocks para os testes
    const mockEnderecoId = 
    [
        {
            "end_id": 1,
            "end_clt_id": 1,
            "end_nome": "João Silva",
            "end_tipoResidencia": "Casa",
            "end_tipoLogradouro": "Rua",
            "end_logradouro": "Rua das Flores",
            "end_numero": 123,
            "end_bairro": "Centro",
            "end_cep": "12345678",
            "end_cidade": "São Paulo",
            "end_estado": "SP",
            "end_pais": "Brasil"
        }
    ];

    buscarEnderecoId.mockResolvedValue(mockEnderecoId);
    
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

    buscarEnderecosClienteId.mockResolvedValue(mockEnderecosClienteId);


    //Testes
    test('Deve retornar a página de endereços de um cliente', async () => {

        //Criando um mock para req e res
        const req = {params: {clt_id: 1}}
        const res = {render: jest.fn()};
    
        //Chamando a função do controller
        await getAddress(req, res);
    
        //Verificando
        expect(res.render).toHaveBeenCalledWith('address/address-main', {enderecos: mockEnderecosClienteId});
    
    });

    test('Deve retornar a página de alteração de um endereço', async () => {

        //Criando um mock para req e res
        const req = {params: {end_id: 1}}
        const res = {render: jest.fn()};
    
        //Chamando a função do controller
        await getAddressAlt(req, res);
    
        //Verificando
        expect(res.render).toHaveBeenCalledWith('address/address-alt', {enderecos: mockEnderecoId});

    }); 

    test('Deve retornar a página de cadastro de endereços', async () => {

        //Criando um mock para req e res
        const req = {params: {clt_id: 1}}
        const res = {render: jest.fn()};
    
        //Chamando a função do controller
        await getAddressAdd(req, res);
    
        //Verificando
        expect(res.render).toHaveBeenCalledWith('address/address-add', {enderecos: mockEnderecosClienteId});

    }); 
});



