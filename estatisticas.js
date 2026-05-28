 Chart.defaults.color = '#9ca3af';
        Chart.defaults.borderColor = '#1e293b';

        const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
        new Chart(ctxLinha, {
            type: 'line',
            data: {
                labels: ['Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter', 'Qua'],
                datasets: [{
                    label: 'Denúncias Recebidas',
                    data: [420, 510, 310, 280, 640, 790, 842],
                    borderColor: '#10b981', 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
        new Chart(ctxPizza, {
            type: 'doughnut',
            data: {
                labels: ['WhatsApp / Redes', 'Falso E-commerce', 'Falsas Centrais', 'Outros'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#10b981', 
                        '#3b82f6', 
                        '#ef4444', 
                        '#4b5563'  
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, boxWidth: 12 }
                    }
                }
            }
        });