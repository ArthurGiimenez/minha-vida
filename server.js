const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const dbConfig = {
    user: 'sa',
    password: '988350784',
    server: 'DESKTOP-9HBCU9U',
    database: 'SITENOSSO',
    port: 1433,  // Porta padrão do SQL Server
    options: {
        encrypt: true,  // Pode ser necessário para conexões remotas
        enableArithAbort: true,  // Necessário para evitar alguns erros no SQL Server
        trustServerCertificate: true  // Adiciona essa linha para confiar no certificado autoassinado
    }
};

// Conectar ao banco de dados
sql.connect(dbConfig).catch(err => console.error('Database connection failed:', err));

// Endpoint para salvar uma tarefa
app.post('/api/tasks', async (req, res) => {
    const { date, description } = req.body;
    try {
        await sql.query`INSERT INTO Tasks (Dataa, Tarefas) VALUES (${date}, ${description})`;
        res.status(200).send('Task saved');
    } catch (err) {
        res.status(500).send('Error saving task');
    }
});

// Endpoint para obter tarefas para uma data específica
app.get('/api/tasks', async (req, res) => {
    const { date } = req.query;
    try {
        const result = await sql.query`SELECT Tarefas FROM Tasks WHERE Dataa = ${date}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error retrieving tasks');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
