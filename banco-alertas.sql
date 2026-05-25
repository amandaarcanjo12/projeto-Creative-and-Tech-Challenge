CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    senha_hash VARCHAR(255) NOT NULL,

    perfil VARCHAR(20)
    CHECK (perfil IN ('admin', 'moderador')),

    ativo BOOLEAN DEFAULT TRUE,

    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alertas (
    id SERIAL PRIMARY KEY,

    titulo VARCHAR(150) NOT NULL,

    tipo_ocorrencia VARCHAR(50) NOT NULL
    CHECK (
        tipo_ocorrencia IN (
            'Golpe Virtual',
            'Assalto',
            'Furto',
            'Roubo',
            'Tentativa de Golpe',
            'Fraude Bancária',
            'Outro'
        )
    ),

    descricao TEXT NOT NULL,

    bairro_regiao VARCHAR(100) NOT NULL,

    data_publicacao TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    status BOOLEAN DEFAULT FALSE,

    criado_por INT,

    CONSTRAINT chk_titulo
    CHECK (CHAR_LENGTH(titulo) >= 5),

    CONSTRAINT fk_usuario_alerta
    FOREIGN KEY (criado_por)
    REFERENCES usuarios(id)
    ON DELETE SET NULL
);


CREATE TABLE logs_acesso (
    id SERIAL PRIMARY KEY,

    usuario_id INT,

    acao VARCHAR(255) NOT NULL,

    ip_acesso VARCHAR(45),

    data_hora TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_log
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE SET NULL
);


CREATE INDEX idx_bairro
ON alertas(bairro_regiao);

CREATE INDEX idx_tipo_ocorrencia
ON alertas(tipo_ocorrencia);

CREATE INDEX idx_status
ON alertas(status);


INSERT INTO usuarios (
    nome,
    email,
    senha_hash,
    perfil
)
VALUES
(
    'Administrador',
    'admin@sistema.com',
    '$2y$10$hashseguroadmin',
    'admin'
),
(
    'Moderador',
    'moderador@sistema.com',
    '$2y$10$hashseguromoderador',
    'moderador'
);


INSERT INTO alertas (
    titulo,
    tipo_ocorrencia,
    descricao,
    bairro_regiao,
    status,
    criado_por
)
VALUES
(
    'Falso motoboy na Zona Sul',
    'Golpe Virtual',
    'Criminosos se passam por funcionários de banco e recolhem cartões.',
    'Zona Sul',
    TRUE,
    1
),
(
    'Furto em ponto de ônibus',
    'Furto',
    'Relatos frequentes de furto de celulares.',
    'Centro',
    FALSE,
    2
);

SELECT *
FROM alertas
WHERE status = TRUE;

SELECT *
FROM alertas
WHERE bairro_regiao = 'Centro';

SELECT *
FROM logs_acesso
ORDER BY data_hora DESC;

SELECT * FROM alertas;

SELECT * FROM usuarios;
