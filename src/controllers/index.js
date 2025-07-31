const { connectToDatabase } = require('../config/database');

class IndexController {
    constructor() {
        this.db = null;
        this.initDB();
    }

    async initDB() {
        try {
            this.db = await connectToDatabase();
            console.log('Database initialized');
        } catch (err) {
            console.error('Error initializing database:', err);
        }
    }

    async getStocks(req, res) {
        try {
            const sql = 'SELECT * FROM stock_details';
            const [results] = await this.db.query(sql);
            res.json(results);
        } catch (err) {
            console.error('Error fetching stock data:', err);
            res.status(500).send('Error fetching stock data');
        }
    }

    async createStock(req, res) {
        const {
            user_id,
            username,
            stock_symbol,
            stock_company_name,
            transaction_type,
            quantity,
            price,
            transaction_date,
            sector
        } = req.body;

        // Input validation
        if (
            !user_id ||
            !username ||
            !stock_symbol ||
            !stock_company_name ||
            !transaction_type ||
            !quantity ||
            !price ||
            !transaction_date
        ) {
            return res.status(400).send('Invalid input: All fields are required except sector');
        }

        console.log('Creating stock:', {
            user_id,
            username,
            stock_symbol,
            stock_company_name,
            transaction_type,
            quantity,
            price,
            transaction_date,
            sector
        });

        try {
            const sql = `
                INSERT INTO stock_details (
                    user_id, username, stock_symbol, stock_company_name, transaction_type,
                    quantity, price, transaction_date, sector
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            await this.db.query(sql, [
                user_id,
                username,
                stock_symbol,
                stock_company_name,
                transaction_type,
                quantity,
                price,
                transaction_date,
                sector || null // Allow sector to be optional
            ]);
            res.json({ message: 'Stock created successfully' });
        } catch (err) {
            console.error('Error creating stock:', err);
            res.status(500).send('Error creating stock');
        }
    }
}

module.exports = new IndexController();