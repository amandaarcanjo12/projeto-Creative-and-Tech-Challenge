async function analisarTexto() {
    const input = document.getElementById('input-golpe').value.trim();
    const painel = document.getElementById('painel-resultado');

    if (input === "") {
        alert("Por favor, digite ou cole algum conteúdo para analisar.");
        return;
    }

    painel.style.borderColor = "var(--borda)"; 
    painel.style.backgroundColor = "transparent";
    painel.innerHTML = `
        <div style="font-size: 45px; color: var(--texto-cinza); margin-bottom: 10px;">
            <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
        <div class="resultado-status" id="status-texto">Analisando...</div>
        <p style="color: var(--texto-cinza); font-size: 13px; margin-top: 8px;" id="detalhe-texto">
            Consultando nosso banco de dados comunitário e cruzando padrões de fraude...
        </p>
    `;

    try {
    
        const resposta = await fetch(`http://localhost:3000/api/verificar?busca=${encodeURIComponent(input)}`);
        
        if (!resposta.ok) {
            throw new Error("Erro na comunicação com o servidor.");
        }

        const dados = await resposta.json();

       
        if (dados.suspeito) {
           
            painel.style.borderColor = "#ef4444"; 
            painel.style.backgroundColor = "rgba(239, 68, 68, 0.05)";
            painel.innerHTML = `
                <div style="font-size: 45px; color: #ef4444; margin-bottom: 10px;">
                    <i class="fa-solid fa-shield-virus"></i>
                </div>
                <div class="resultado-status" id="status-texto" style="color: #ef4444; font-weight: bold;">
                    Alta Suspeita de Golpe!
                </div>
                <p style="color: var(--texto-cinza); font-size: 13px; margin-top: 8px;" id="detalhe-texto">
                    Este padrão, link ou identificador já foi relatado <strong>${dados.totalOcorrencias} vez(es)</strong> pela nossa comunidade. Evite fornecer dados ou realizar qualquer tipo de pagamento.
                </p>
            `;
        } else {
          
            const gatilhos = ["pix", "urgente", "ganhou", "sorteio", "clique aqui", "bloqueio", "ted", "vaga", "atualização", "banco"];
            let contemGatilhoLocal = gatilhos.some(termo => input.toLowerCase().includes(termo));

            if (contemGatilhoLocal) {
               
                painel.style.borderColor = "#f59e0b"; 
                painel.style.backgroundColor = "rgba(245, 158, 11, 0.05)";
                painel.innerHTML = `
                    <div style="font-size: 45px; color: #f59e0b; margin-bottom: 10px;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div class="resultado-status" id="status-texto" style="color: #f59e0b; font-weight: bold;">
                        Aviso Preventivo
                    </div>
                    <p style="color: var(--texto-cinza); font-size: 13px; margin-top: 8px;" id="detalhe-texto">
                        Não encontramos denúncias idênticas no banco de dados, mas o texto contém termos de urgência ou transações frequentemente associadas a fraudes eletrônicas. Proceda com cautela.
                    </p>
                `;
            } else {
               
painel.style.borderColor = "#10b981"; 
painel.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
painel.innerHTML = `
    <div style="font-size: 45px; color: #10b981; margin-bottom: 10px;">
        <i class="fa-solid fa-shield-halved"></i> <i class="fa-solid fa-check" style="font-size: 30px; margin-left: -15px;"></i>
    </div>
    <div class="resultado-status" id="status-texto" style="color: #10b981; font-weight: bold;">
        Nenhum Padrão Crítico
    </div>
    <p style="color: var(--texto-cinza); font-size: 13px; margin-top: 8px;" id="detalhe-texto">
        O conteúdo analisado não consta na nossa base de dados atual e não apresenta gatilhos textuais evidentes de golpes conhecidos.
    </p>
`;
            }
        }

    } catch (error) {
        console.error("Erro na integração:", error);
        painel.style.borderColor = "#ef4444";
        painel.style.backgroundColor = "rgba(239, 68, 68, 0.05)";
        painel.innerHTML = `
            <div style="font-size: 45px; color: #ef4444; margin-bottom: 10px;">
                <i class="fa-solid fa-cloud-arrow-down"></i>
            </div>
            <div class="resultado-status" id="status-texto" style="color: #ef4444; font-weight: bold;">
                Falha na Verificação
            </div>
            <p style="color: var(--texto-cinza); font-size: 13px; margin-top: 8px;" id="detalhe-texto">
                Não foi possível estabelecer conexão com a central de análise. Certifique-se de que o servidor back-end Node.js está ativo no terminal.
            </p>
        `;
    }
}