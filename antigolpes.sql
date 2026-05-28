CREATE TABLE IF NOT EXISTS relatos (
    id SERIAL PRIMARY KEY,
    tipo_fraude VARCHAR(50) NOT NULL,
    canal VARCHAR(50) NOT NULL,
    identificador VARCHAR(255),
    descricao TEXT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_relatos_identificador ON relatos (identificador);

INSERT INTO relatos (tipo_fraude, canal, identificador, descricao) VALUES 
('whatsapp', 'whatsapp', '+55 11 99999-0000', 'Tentativa de golpe fingindo ser um familiar pedindo Pix urgente.'),
('ecommerce', 'instagram', 'www.loja-falsa-promocao.com', 'Anúncio de telemóvel com 80% de desconto. O site clona cartões.'),
('banco', 'ligacao', '0800-000-0000', 'Falsa central telefónica a pedir para transferir dinheiro para uma conta de segurança.');

SELECT * FROM relatos