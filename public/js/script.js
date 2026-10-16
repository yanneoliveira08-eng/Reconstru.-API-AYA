const campoPesquisa = document.querySelector('#pesquisa');

if (campoPesquisa) {
    const produtos = document.querySelectorAll('.item-pesquisa');
    const mensagem = document.querySelector('#sem-resultados');

    campoPesquisa.addEventListener('input', () => {
        const termo = campoPesquisa.value
            .trim()
            .toLocaleLowerCase('pt-BR');

        let encontrados = 0;

        produtos.forEach(produto => {
            const nome = produto.dataset.nome || '';
            const categoria = produto.dataset.categoria || '';

            const corresponde =
                nome.includes(termo) ||
                categoria.includes(termo);

            produto.hidden = !corresponde;

            if (corresponde) {
                encontrados++;
            }
        });

        mensagem.hidden = encontrados > 0;
    });
}
