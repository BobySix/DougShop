class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();
        if (this.validarCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
        }
        this.listar();
        this.cancelar();
    }

    listar() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valorProduto;

            td_id.classList.add('center')

            let imgEdit = document.createElement('img');
            imgEdit.src = './img/icon-produto/edit.svg';
            imgEdit.setAttribute("onclick", "produto.editar(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement('img')
            imgDelete.src = './img/icon-produto/delete.svg'
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");


            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(produto) {
        produto.valorProduto = parseFloat(produto.valorProduto)
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valorProduto = produto.valorProduto;
            }
        }
    }

    editar(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valorProduto;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valorProduto = document.getElementById('valor').value;

        return produto;
    }

    validarCampos(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += 'Informe o nome do Produto \n'
        }

        if (produto.valorProduto == '') {
            msg += 'Informe o preço do Produto \n'
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {

        let sweet = swal({
            title: "Deseja deletar esse produto?",
            text: "Esse produto será deletado permanentemente, bye!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Produto deletado com sucesso!", {
                icon: "success",
              });
            } else {
              swal("Seu produto não será deletado!");
            }
          });

        if (sweet) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i);
                }
                console.log(this.arrayProdutos)
            }
        }
    }
}

var produto = new Produto();