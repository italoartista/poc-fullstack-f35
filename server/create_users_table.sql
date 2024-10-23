CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

[
    {
        "id": 1,
        "email": "adiministradordecontas123@gmail.com",
        "senha": "$2b$10$Vt9AQRgTxvfwU2z/vplcQuqTi2HIVB6ZG2G35VpaXpm9Dow4QuDJy",
        "data_registro": "2024-10-23T14:16:09.299874"
    },
    {
        "id": 2,
        "email": "contatomarcosdgomes@gmail.com",
        "senha": "$2b$10$7vyS5dMQRP2b5cXQFUTn4us08Zca/o242dhUk/yLivAuuyU60/a/q",
        "data_registro": "2024-10-23T14:37:39.954982"
    }
]
