const { getPassword } = require("../../../backend/controller/controllerPassword");


//Testes
test('Deve chamar a tela de senha corretamente', () => {

    //Criando um mock do req e res
    const req = {}
    const res = {render: jest.fn()}

    //Chamando a função controller para renderizar a tela de senha
    getPassword(req, res);

    //Validando os dados
    expect(res.render).toHaveBeenCalledWith('clientes', {clientes: mockClientes});
    
});