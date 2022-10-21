"use strict";
let Data = document.getElementById('data');
let pacotes = document.getElementById('pacotes');
let botao_cadastrar = document.getElementById('btn');
let Nome = document.getElementById('nome');
let Descricao = document.getElementById('descricao');
let array_dos_pacotes = [];
// pega dados da API
fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
    .then(Response => Response.json())
    .then(Result => {
    console.log(Result);
    for (let index = 0; index < Result.length; index++) {
        array_dos_pacotes[index] = new Pacote(Result[index].nome, Result[index].descricao, new Date(Result[index].data), Result[index].status, Result[index].id);
    }
    fazer_pacote();
});
// Gerador de HTML para pacotes
const fazer_pacote = () => {
    let lista = ``;
    for (let index = 0; index < array_dos_pacotes.length; index++) {
        lista += `<div class="pacote_x"><div class="titulo_x"><P>${array_dos_pacotes[index]._nome}</P></div><p class="texto1">${array_dos_pacotes[index]._descricao}</p><div class="data2"><P>${array_dos_pacotes[index]._data}</P></div><button onclick='editar("${array_dos_pacotes[index]._nome}","${array_dos_pacotes[index]._descricao}","${array_dos_pacotes[index]._data}","${array_dos_pacotes[index]._status}","${array_dos_pacotes[index]._id}")' class="editar">Editar</button><button id="excluir" onClick="Apagar()" class="excluir">Excluir </button></div> `;
    }
    pacotes.innerHTML = lista;
    console.log('deu certo');
};
class Pacote {
    constructor(_nome, _descricao, _data, _status, _id) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
    //GET = Permissão de leitura.
    get _nome() {
        return this.nome;
    }
    get _descricao() {
        return this.descricao;
    }
    get _data() {
        return this.data;
    }
    get _status() {
        return this.status;
    }
    get _id() {
        return this.id;
    }
    //SET = permissão de escrita.
    set _nome(__nome) {
        this.nome == __nome;
    }
    set _descricao(__descricao) {
        this.descricao == __descricao;
    }
    set _data(__data) {
        this.data == __data;
    }
    set _status(__status) {
        this.status == __status;
    }
    set _id(__id) {
        this.id == __id;
    }
}
let boxativo = document.getElementById('boxativo');
let boxinativo = document.getElementById('boxinativo');
let boxSelecionado;
let box;
const cadastrar = () => {
    if (boxativo.checked) {
        boxSelecionado = true;
        console.log(boxSelecionado);
    }
    else if (boxinativo) {
        boxSelecionado = false;
        console.log(boxSelecionado);
    }
    let criar_Pacote = new Pacote(Nome.value, Descricao.value, Data.value, box, array_dos_pacotes.length);
    array_dos_pacotes.push(criar_Pacote);
    fazer_pacote();
};
//Botao Excluir
const Apagar = (index) => {
    array_dos_pacotes.splice(index, 1);
    fazer_pacote();
};
// Botao editar
let idd;
const editar = (nome, descricao, data, status, id) => {
    Nome.value = nome;
    Descricao.value = descricao;
    Data.value = data;
    idd = id;
    botao_cadastrar.innerHTML = "<button class= 'Ajustar' onclick='ajustar()'>Ajustar</button>";
};
const ajustar = () => {
    let devolver = new Pacote(Nome.value, Descricao.value, Data.value, false, idd);
    array_dos_pacotes.splice(idd - 1, 1, devolver);
    fazer_pacote();
};
