const chai = require('chai');
const http = require('chai-http'); // Extensão da lib chai p/ simular requisições http
const subSet = require('chai-subset'); // Extensao da lib chai p/ verificar objetos

const boletoService = require('../boletoService'); // Arquivo a ser testado

chai.use(http);
chai.use(subSet);

// O atributo do objeto será testado para verificar se ele existe
// O atributo recebe uma função, e ela deve retornar true para o teste passar

describe('Teste das funcoes', (req, res) => {

    let barCode = ''

    it('Código boleto', async () => {

        barCode = '03399632906400000000600125201020456140000017832'
        expect(await boletoService.validateBoleto(barCode)).toEqual({
            boleto: {
                barCode: '99632906400000000600125201020456140000017832',
                amount: '178.32',
                expirationCode: '2013-02-19'
            }
        })
    });

    it('Código concessionária', async () => {

        barCode = '817700000000010936599702411310797039001433708311'
        expect(await boletoService.validateBoleto(barCode)).toEqual({
            "concessionaria": {
                "productId": "0",
                "segmentId": "2",
                "realValurOrReferenceId": "9",
                "geralDigitChecker": "1",
                "amount": "10.00",
                "companyId": "9365",
                "cnpjMF": "93659970",
                "freeField": "2411310797039001433708311",
                "barCode": "817700000000010936599702411310797039001433708311"
            }
        })
    });

});