//Modulos necessários
const { getCard, getCardAdd, getCardAlt } = require("../../../backend/controller/controllerCard");
const { buscarCartoesClienteId, buscarCartaoId } = require("../../../backend/model/modelCard");

//Mocando os repositórios
jest.mock("../../../backend/model/modelCard");


//Tetes
describe('Deve retornar as páginas referentes aos cartões', () => {

    //Mocando os dados para os testes
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
    ]

    buscarCartoesClienteId.mockResolvedValue(mockCartoesClienteId);

    const mockCartaoId = 
    [
        {
            "car_id": 1,
            "car_clt_id": 102,
            "car_nome": "Maria Oliveira",
            "car_numero": "5500000000000004",
            "car_bandeira": "Mastercard",
            "car_cvv": "456",
            "car_principal": 0
          }
    ]

    buscarCartaoId.mockResolvedValue(mockCartaoId);
    

    test('Deve retornar a página dos cartões dos clientes', async () => {
        
        //Criando um mock para req e res
        const req = {params: {clt_id: 1}}
        const res = {render: jest.fn()};
    
        //Chamando a função do controller
        await getCard(req, res);
    
        //Verificando
        expect(res.render).toHaveBeenCalledWith('card/card-main', {cartoes: mockCartoesClienteId});
    });

    test('Deve retornar a página de alteração de cartões', async () => {

        //Criando um mock para req e res
        const req = {params: {clt_id: 1}}
        const res = {render: jest.fn()};
    
        //Chamando a função do controller
        await getCardAdd(req, res);
    
        //Verificando
        expect(res.render).toHaveBeenCalledWith('card/card-add', {cartoes: mockCartoesClienteId});
    });

    test('Deve retorna a página de alteração de cartão', async () => {

        //Criando um mock para req e res
        const req = {params: {car_id: 1}}
        const res = {render: jest.fn()};
    
        //Chamando a função do controller
        await getCardAlt(req, res);
    
        //Verificando
        expect(res.render).toHaveBeenCalledWith('card/card-alt', {cartao: mockCartaoId});
    });
});