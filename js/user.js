const nome = document.getElementById('user');
const email = document.getElementById('email')
const senha = document.getElementById('pass');

const login = document.getElementById('userLog');
const pass = document.getElementById('senhaLog');

function Cadastrar() {
    let contas = new Array()

    if (nome.value == '' || email.value == '' || senha.value == '') {
        alert('preencha os campos')
    } else {


        if (localStorage.hasOwnProperty('contas')) {
            contas = JSON.parse(localStorage.getItem('contas'))
            contas.push({ nome: nome.value, email: email.value, senha: senha.value })
            localStorage.setItem("contas", JSON.stringify(contas))

        } else {
            contas.push({ nome: nome.value, email: email.value, senha: senha.value })
            localStorage.setItem("contas", JSON.stringify(contas))
        }
    }
}

function Logar(event) {
    event.preventDefault()
    contas = JSON.parse(localStorage.getItem("contas"));

    let logou = 0;

    for(i = 0; i < contas.length; i++) {
        if (login.value == contas[i].email && pass.value == contas[i].senha) {
            logou = 1;
        }
    }

    console.log(logou)

    if(logou == 1) {
        swal("Logado com sucesso!");
        document.querySelector('.swal-button.swal-button--confirm').addEventListener('click', () => {
            window.location.href = window.location.origin
        })
    } else {
        swal("Login/Senha incorretos!", "Tente novamente.");
    }
}