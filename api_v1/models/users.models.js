const db = require("../database/database");
const JsToSQL = require("../helpers/jsToSQL.helpers")
class User {
    // Users


    // Get one user by id from users table
    static async getOne(id){
        const result = await db.query(`
            SELECT user_id, username, first_name, email FROM users
            WHERE user_id = $1`, [id]);
        
        return result;
    }

    // Get all users in users table
    static async getAll(){
        const result = await db.query(`
            SELECT user_id, username, first_name, email FROM users`);
        
        return result;
    }

    // Create a user
    static async create({username, firstName, email, password}){
        const result = await db.query(`
            INSERT INTO users (username, first_name, email, hashed_password)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, username, first_name, email`,
             [username, firstName, email, password]);
        
        return result;
    }   

    // Update a user
    static async updateInfo(id, data){
        const { username, firstName, email } = data;
        const {setString, vals} = JsToSQL.setString({username, firstName, email})

        const result = await db.query(`
            UPDATE users SET ${setString}
            WHERE user_id=$${vals.length + 1}
            RETURNING user_id, username, first_name, email`,
        [...vals, id]);

        return result;
    }
    // Update a users password

    // Delete a user
    static async delete(id){
        const result = await db.query(`
            DELETE FROM users
            WHERE user_id=$1
            RETURNING user_id`, [id]);

        return result;
    }

}

module.exports = {
    User,
}