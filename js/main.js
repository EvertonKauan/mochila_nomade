const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    console.log(itens)
    
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existeNome = itens.find( item => item.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existeNome) {
        itemAtual.id = existeNome.id

        adicionaElementoExistente(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existeNome.id)] = itemAtual
    }

    else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : (0);

        criaElemento(itemAtual)

        itens.push(itemAtual)
        
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item) {

    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function adicionaElementoExistente(itemExistente) {
    document.querySelector("[data-id='"+itemExistente.id+"']").innerHTML = itemExistente.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "Deletar"
    elementoBotao.style.border = "2px solid #d81515"
    elementoBotao.style.backgroundColor = "#d81515"
    elementoBotao.style.color = "white"
    elementoBotao.style.borderRadius = "10px"
    elementoBotao.style.cursor = "pointer"

    elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
     
    console.log(id)
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
    //remover um item do array itens
}

const caixaPesquisa = document.getElementById("pesquisa");

// Sempre que algo for digitado em pesquisa, entrará nessa função
caixaPesquisa.addEventListener("input", function() {

  const textoPesquisadoMinusculo = caixaPesquisa.value.toLowerCase();
  const itensPesquisados = lista.getElementsByTagName("li");

  for (let i = 0; i < itensPesquisados.length; i++) {

    const item = itensPesquisados[i];
    const textoItem = item.textContent.toLowerCase();
    const textoItemSemDeletar = textoItem.replace("deletar", "");

    if (textoItemSemDeletar.includes(textoPesquisadoMinusculo)) {
      item.style.backgroundColor = "#af6893";
    } else {
      item.style.backgroundColor = "";
    }
  }

  if (caixaPesquisa.value === "") {
    for (let i = 0; i < itensPesquisados.length; i ++) {
        const item = itensPesquisados[i];
        item.style.backgroundColor = "";
    }
  }
});
