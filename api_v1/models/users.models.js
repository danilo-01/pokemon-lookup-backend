const db = require("../database/database");

class User {
    // Users


    // Get one user by id from users table
    static async getOne(id){
        const result = await db.query(`
            SELECT * FROM users
            WHERE user_id = $1`, [id]);
        
        return result;
    }

    // Get all users in users table
    static async getAll(){
        const result = await db.query(`
            SELECT * FROM users`);
        
        return result;
    }
}

module.exports = {
    User,
}