const db = require("../database/database");

    // Pokemon in database class
class Pokemon {


    // Get all pokemon associated with user
    static async getUserFavorites(userId){
        const result = await db.query(`SELECT api_id FROM pokemon 
        INNER JOIN user_pokemon 
        ON pokemon.pokemon_id = user_pokemon.pokemon_id 
        WHERE user_id = $1`, [userId]);
        return result.rows;
    }

    static async addUserFavorite(userId, pokemonId){

        const pokemonExists = await db.query(`
        SELECT * FROM pokemon
        WHERE api_id=$1`, [pokemonId]);

        let selectedPokemonId = pokemonExists.rows.length != 0 
        ? pokemonExists.rows[0].pokemon_id 
        : null;

        if(!selectedPokemonId){
            const createPokemon = await db.query(`
            INSERT INTO pokemon (api_id) 
            VALUES ($1) 
            RETURNING pokemon_id`, [pokemonId]);
            
            selectedPokemonId = createPokemon.rows[0].pokemon_id;
        }

        const result = await db.query(`
        INSERT INTO user_pokemon (user_id, pokemon_id) 
        VALUES ($1, $2)
        RETURNING user_id, pokemon_id`, [userId, selectedPokemonId]);

        return result.rows[0];
    }   

    static async removeUserFavorite(userId, pokemonId){
        const pokemonExists = await db.query(`
        SELECT * FROM pokemon
        WHERE api_id=$1`, [pokemonId]);

        let selectedPokemonId = pokemonExists.rows.length != 0 
        ? pokemonExists.rows[0].pokemon_id 
        : null;

        if(selectedPokemonId){
            const result = await db.query(`
            DELETE FROM user_pokemon
            WHERE (user_id=$1 AND pokemon_id=$2)`,[userId, selectedPokemonId]);
    
            return result;
        }
    }
}

module.exports = Pokemon;