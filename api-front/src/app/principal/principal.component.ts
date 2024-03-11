import { Component } from '@angular/core';
import { Cliente } from './../modelo/Cliente';
import { ClienteService } from './../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  //Objeto do tipo Cliente
  cliente = new Cliente();

  //Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  //Variável para visibilidade da tabela
  tabela: boolean = true;

  constructor(private clienteService: ClienteService) {}

  //JSON de clientes
  clientes: Cliente[] = [];

  listarClientes(): void {
    this.clienteService
      .listarClientes()
      .subscribe((retorno) => (this.clientes = retorno));
  }

  cadastrarClientes(): void {
    this.clienteService.cadastrarClientes(this.cliente).subscribe((retorno) => {
      //cadastrar o cliente no vetor
      this.clientes.push(retorno);

      //limpar formulário
      this.cliente = new Cliente();

      //Mensagem
      alert('Cliente cadastrado com sucesso!');
    });
  }

  ngOnInit(): void {
    this.listarClientes();
  }

  //selecionar um cliente específico
  selecionarCliente(posicao: number): void {
    this.cliente = this.clientes[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }

  editarClientes(): void {
    this.clienteService.editarClientes(this.cliente).subscribe((retorno) => {
      let posicao = this.clientes.findIndex((obj) => {
        return obj.codigo == retorno.codigo;
      });

      this.clientes[posicao] = retorno;
      this.btnCadastro = true;
      this.tabela = true;

      this.cliente = new Cliente();

      alert('Cliente editado com sucesso!');
    });
  }

  removerClientes(): void {
    this.clienteService
      .removerClientes(this.cliente.codigo)
      .subscribe((retorno) => {
        let posicao = this.clientes.findIndex((obj) => {
          return obj.codigo == this.cliente.codigo;
        });

        this.clientes.splice(posicao, 1);
        this.cliente = new Cliente();
        this.btnCadastro = true;
        this.tabela = true;

        alert('Cliente removido com sucesso!');
      });
  }

  cancelar(): void {
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
  }
}
