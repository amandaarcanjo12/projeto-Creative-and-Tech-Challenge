    async function executarAnalise() {
    const input = document.getElementById('text-input').value.trim();
    const display = document.getElementById('result-display');

    if(input === "") {
        alert("Por favor, cole um conteúdo suspeito para análise.");
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/api/verificar?busca=${encodeURIComponent(input)}`);
        const dados = await resposta.json();

        if(dados.suspeito) {
            display.style.color = "#ef4444";
            display.innerHTML = `<strong>⚠️ ALTA SUSPEITA DETECTADA:</strong> Este dado ou padrão já foi relatado ${dados.totalOcorrencias} vez(es) na nossa plataforma comunitária.`;
        } else {
            const gatilhos = ["pix", "urgente", "ganhou", "sorteio", "clique aqui", "bloqueio"];
            let riscoLocal = gatilhos.some(termo => input.toLowerCase().includes(termo));

            if (riscoLocal) {
                display.style.color = "#f59e0b";
                display.innerHTML = "<strong>⚠️ AVISO PREVENTIVO:</strong> Não encontramos denúncias idênticas no banco, mas a mensagem contém termos comuns em fraudes.";
            } else {
                display.style.color = "#10b981";
                display.innerHTML = "<strong>✅ NENHUM PADRÃO CRÍTICO:</strong> O conteúdo não consta no banco de relatos recentes e não possui gatilhos evidentes.";
            }
        }
    } catch (error) {
        console.error('Erro ao conectar à API:', error);
        display.innerHTML = "Erro ao conectar com o servidor de verificação.";
    }
}