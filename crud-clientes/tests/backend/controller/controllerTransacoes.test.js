//Módulos necessários
const { getTransacoes } = require('../../../backend/controller/constrollerTransacoes');
const { buscarTransacoesClienteId } = require('../../../backend/model/modelTransacoes');

jest.mock('../../../backend/model/modelTransacoes');

//Páginas
test('Deve testar a exibição das transações dos clientes', async () => {
    const mockTransacoes = [
        {
            trs_id: 1, 
            trs_clt_id: 1, 
            trs_dataHora: '2025-03-04 08:30:00', 
            trs_tipo: 'compra',
            trs_status: 'confirmado',
            trs_acao: 'Compra de livros'
        }
    ]

    buscarTransacoesClienteId.mockResolvedValue(mockTransacoes);

    //Criando um mock para req e res
    const req = {params: {clt_id: 1}};
    const res = {render: jest.fn()};

    //Chamando a função para pegar as transações
    await getTransacoes(req, res);

    //Verificando se res.render foi chamado corretamente
    expect(res.render).toHaveBeenCalledWith('transacoes', {transacoes: mockTransacoes});

});