async function enviarDenuncia(event) {
    event.preventDefault();

    const dados = {
        tipoFraude: document.getElementById('tipo-fraude').value,
        canal: document.getElementById('canal').value,
        identificador: document.getElementById('identificador').value,
        descricao: document.getElementById('descricao').value
    };

    try {
        const resposta = await fetch('http://localhost:3000/api/denunciar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            document.getElementById('form-content').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
        } else {
            alert('Ocorreu um erro ao enviar o relato. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Não foi possível conectar ao servidor back-end.');
    }
}