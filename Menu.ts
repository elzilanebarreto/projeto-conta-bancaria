import leia = require('readline-sync');
import { colors } from './src/util/Colors';
import {Conta} from './src/model/Conta';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from './src/controller/ContaController';

export function main(){

    // Instância da Classe ContaController
    let contas: ContaController = new ContaController();

    // Variáveis Auxiliares
    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tiposContas = ['Conta Corrente', 'Conta Poupanca'];

    console.log("\nCriar Contas\n");

    let contaCor1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
    contas.cadastrar(contaCor1);

    let contaCor2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
    contas.cadastrar(contaCor2);

    let contaPou1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
    contas.cadastrar(contaPou1);

    let contaPou2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Juliana Ramos", 8000, 15);
    contas.cadastrar(contaPou2);

    contas.listarTodas();


    while (true){

        //Colocando as cores
        console.log(colors.bg.black, colors.fg.yellow, 
                    "*****************************************************");
        console.log("                                                     ");
        console.log("             🏦 BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ",
        colors.reset);


        console.log(colors.bg.black, colors.fg.blue, 'Entre com a opcao desejada: ', colors.reset);
        opcao = leia.questionInt('');

        if (opcao == 9){
            console.log(colors.fg.greenstrong,
                '\nBanco do Brazil com Z - O seu Futuro comeca aqui!');
            sobre();
            console.log(colors.reset, '');
            process.exit(0);
        }

        switch (opcao){
            case 1:
                console.log(colors.fg.whitestrong, '\n\nCriar Conta\n\n', colors.reset);

                console.log('Digite o Numero da Agencia: ');
                agencia = leia.questionInt('');

                console.log('Digite o Nome do Titular da conta: ');
                titular = leia.question('');

                console.log('\nDigite o tipo de Conta: ');
                tipo = leia.keyInSelect(tiposContas, '', {cancel: false}) + 1;

                console.log('\n Digite o Saldo da conta (R$): ');
                saldo = leia.questionFloat('');

                switch(tipo){
                    case 1: 
                        console.log('Digite o Limite da Conta (R$): ');
                        limite = leia.questionFloat('');
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite)
                        )

                        break;
                    
                    case 2:
                        console.log('Digite o Dia do Aniversario da Conta Poupanca: ');
                        aniversario = leia.questionFloat('');
                        contas.cadastrar(
                            new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario)
                        )
                        break;

                }

                keyPress();
                break;
            
            case 2:
                console.log(colors.fg.whitestrong,
                    '\n\nListar todas as Contas\n\n', colors.reset);

                    contas.listarTodas();

                keyPress();
                break;

            case 3:
                console.log(colors.fg.whitestrong,
                    '\n\nConsultar dados da Conta - por numero\n\n', colors.reset);

                console.log('Digite o numero da Conta: ');
                numero = leia.questionInt('');
                contas.procurarPorNumero(numero);

                keyPress();
                break;
            
            case 4:
                console.log(`${colors.fg.whitestrong}\n\nAtualizar dados da Conta\n\n ${colors.reset}`);

                console.log('Digite o numero da Conta: ');
                numero = leia.questionInt('');

                let conta = contas.buscarNoArray(numero);

                if(conta != null){
                    console.log('Digite o numero da agencia: ');
                    agencia = leia.questionInt('');

                    console.log('Digite o Nome do Titular da conta: ');
                    titular = leia.question('');

                    tipo = conta.tipo;

                    console.log('\nDigite o Saldo da conta (R$): ');
                    saldo = leia.questionFloat('');

                    switch(tipo){
                        case 1:
                            console.log('Digite o Limite a Conta (R$): ');
                            limite = leia.questionFloat('');

                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite)
                            );
                            break;
                        case 2:
                            console.log('Digite o Dia do Aniversario da Conta Poupanca: ');
                            aniversario = leia.questionInt('');
                            contas.atualizar(
                                new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario)
                            );
                            break;
                    }


                } else{
                    console.log(`${colors.fg.red} \nA Conta numero: ${numero} nao foi encontrada! ${colors.reset}`);
                }

                
                keyPress();    
                break;

            case 5:
                console.log(colors.fg.whitestrong,
                    '\n\nApagar uma Conta\n\n', colors.reset);
                
                console.log('Digite o numero da Conta: ');
                numero = leia.questionInt('');
                contas.deletar(numero);

                keyPress();
                break;

            case 6:
                console.log(colors.fg.whitestrong,
                    '\n\nSaque\n\n', colors.reset);
                
                console.log('Digite o numero da Conta: ');
                numero = leia.questionInt('');

                console.log('\nDigite o valor do Saque (R$): ');
                valor = leia.questionFloat('');

                contas.sacar(numero, valor);
                    
                keyPress();    
                break;
            
            case 7:
                console.log(colors.fg.whitestrong,
                    '\n\nDeposito\n\n', colors.reset);
                
                console.log('Digite o numero da Conta: ');
                numero = leia.questionInt('');    
                
                console.log('Digite o valor do Deposito (R$): ');
                valor = leia.questionFloat('');
                
                contas.depositar(numero, valor);
                    
                keyPress();    
                break;
            
            case 8:
                console.log(colors.fg.whitestrong,
                    '\n\nTransferencia entre Contas\n\n', colors.reset);
                
                console.log('Digite o numero da Conta de Origem: ');
                numero = leia.questionInt('');
                
                console.log('Digite o numero da Conta de Destino: ');
                numeroDestino = leia.questionInt('');

                console.log('\nDigite o valor do Deposito (R$): ');
                valor = leia.questionFloat('');

                contas.transferir(numero, numeroDestino, valor);
                
                keyPress();    
                break;

            default:
                console.log(colors.fg.whitestrong,
                    '\n\nOpcao invalida!\n', colors.reset);
                
                keyPress();    
                break;
        }

    }
}

function sobre(): void{
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}

function keyPress(): void{
    console.log(colors.reset, '');
    console.log('\nPressione enter para continuar...');
    leia.prompt();
}

main();