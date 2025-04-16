// Funcionalidades da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const opProdTable = document.getElementById('opProdTable').querySelector('tbody');
    const centroCustoTable = document.getElementById('centroCustoTable').querySelector('tbody');
    const paradasTable = document.getElementById('paradasTable').querySelector('tbody');
    const noResultsDiv = document.getElementById('noResults');
    
    // Carregar dados nas tabelas
    function carregarDados() {
        // Limpar tabelas
        opProdTable.innerHTML = '';
        centroCustoTable.innerHTML = '';
        paradasTable.innerHTML = '';
        
        // Carregar operações de produção
        pipaData.operacoesProd.forEach(op => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${op.codigo}</td>
                <td>${op.descricao}</td>
            `;
            row.dataset.type = 'op-prod';
            opProdTable.appendChild(row);
        });
        
        // Carregar centros de custo
        pipaData.centrosCusto.forEach(centro => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${centro.codigo}</td>
                <td>${centro.descricao}</td>
            `;
            row.dataset.type = 'centro-custo';
            centroCustoTable.appendChild(row);
        });
        
        // Carregar paradas
        pipaData.paradas.forEach(parada => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${parada.codigo}</td>
                <td>${parada.descricao}</td>
            `;
            row.dataset.type = 'paradas';
            paradasTable.appendChild(row);
        });
    }
    
    // Função de pesquisa
    function pesquisar() {
        const termo = searchInput.value.trim().toLowerCase();
        const filtroAtivo = document.querySelector('.filter-btn.active').dataset.filter;
        let resultadosEncontrados = false;
        
        // Ocultar mensagem de nenhum resultado
        noResultsDiv.classList.add('hidden');
        
        // Função para destacar texto correspondente
        function destacarTexto(texto, termo) {
            if (!termo) return texto;
            const regex = new RegExp(`(${termo})`, 'gi');
            return texto.replace(regex, '<span class="highlight">$1</span>');
        }
        
        // Pesquisar em operações de produção
        const rowsOpProd = opProdTable.querySelectorAll('tr');
        rowsOpProd.forEach(row => {
            const codigo = row.cells[0].textContent.toLowerCase();
            const descricao = row.cells[0].nextElementSibling.textContent.toLowerCase();
            const corresponde = codigo.includes(termo) || descricao.includes(termo);
            
            if ((filtroAtivo === 'all' || filtroAtivo === 'op-prod') && (corresponde || !termo)) {
                row.style.display = '';
                if (termo) {
                    row.cells[0].innerHTML = destacarTexto(row.cells[0].textContent, termo);
                    row.cells[1].innerHTML = destacarTexto(row.cells[1].textContent, termo);
                    resultadosEncontrados = true;
                } else {
                    resultadosEncontrados = true;
                }
            } else {
                row.style.display = 'none';
            }
        });
        
        // Pesquisar em centros de custo
        const rowsCentroCusto = centroCustoTable.querySelectorAll('tr');
        rowsCentroCusto.forEach(row => {
            const codigo = row.cells[0].textContent.toLowerCase();
            const descricao = row.cells[0].nextElementSibling.textContent.toLowerCase();
            const corresponde = codigo.includes(termo) || descricao.includes(termo);
            
            if ((filtroAtivo === 'all' || filtroAtivo === 'centro-custo') && (corresponde || !termo)) {
                row.style.display = '';
                if (termo) {
                    row.cells[0].innerHTML = destacarTexto(row.cells[0].textContent, termo);
                    row.cells[1].innerHTML = destacarTexto(row.cells[1].textContent, termo);
                    resultadosEncontrados = true;
                } else {
                    resultadosEncontrados = true;
                }
            } else {
                row.style.display = 'none';
            }
        });
        
        // Pesquisar em paradas
        const rowsParadas = paradasTable.querySelectorAll('tr');
        rowsParadas.forEach(row => {
            const codigo = row.cells[0].textContent.toLowerCase();
            const descricao = row.cells[0].nextElementSibling.textContent.toLowerCase();
            const corresponde = codigo.includes(termo) || descricao.includes(termo);
            
            if ((filtroAtivo === 'all' || filtroAtivo === 'paradas') && (corresponde || !termo)) {
                row.style.display = '';
                if (termo) {
                    row.cells[0].innerHTML = destacarTexto(row.cells[0].textContent, termo);
                    row.cells[1].innerHTML = destacarTexto(row.cells[1].textContent, termo);
                    resultadosEncontrados = true;
                } else {
                    resultadosEncontrados = true;
                }
            } else {
                row.style.display = 'none';
            }
        });
        
        // Mostrar mensagem se não houver resultados
        if (!resultadosEncontrados && termo) {
            noResultsDiv.classList.remove('hidden');
        }
    }
    
    // Inicializar a aplicação
    carregarDados();
    
    // Event listeners
    searchButton.addEventListener('click', pesquisar);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            pesquisar();
        }
    });
    
    // Filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            // Executar pesquisa com o novo filtro
            pesquisar();
        });
    });
    
    // Pesquisa em tempo real (opcional, descomente se desejar)
    // searchInput.addEventListener('input', debounce(pesquisar, 300));
    
    // Função de debounce para limitar chamadas de função
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
});
