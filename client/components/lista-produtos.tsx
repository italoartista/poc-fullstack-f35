

const produtos = [
    {
        id: 1,
        nome: 'Produto 1',
        preco: 100
    },
    {
        id: 2,
        nome: 'Produto 2',
        preco: 200
    },
    {
        id: 3,
        nome: 'Produto 3',
    }
]


export default function ListaProdutos() {
    return (
        <div>
            <h1>Lista de Produtos</h1>
            <ul>
                {
                    produtos.map(produto => (
                        <li key={produto.id}>
                            {produto.nome} - R$ {produto.preco}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}