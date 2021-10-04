const client = require("./client")

async function dropTables() {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order
    try {
      await  client.query(`
      DROP TABLE IF EXISTS orders_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    console.log("---tables dropped---")
    } catch (error) {
      throw error; 
    }
  }
  
  async function createTables() {
    try {
      console.log("Starting to build tables...");
      // create all tables, in the correct order
  
      await  client.query(`
        CREATE TABLE users(
          id  SERIAL PRIMARY KEY, 
          username VARCHAR(255) UNIQUE NOT NULL, 
          password VARCHAR(255) NOT NULL
        );
        
      `) 
      await client.query(`
      CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          price MONEY,
          size VARCHAR(255) UNIQUE NOT NULL,
          color VARCHAR(255) UNIQUE NOT NULL,
          availability BOOLEAN DEFAULT TRUE,
          image TEXT
            )`)
      await client.query(`
      CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          “userId” INTEGER REFERENCES users(id),
          status BOOLEAN DEFAULT FALSE,
      )
      `)
      await client.query(`
      CREATE TABLE orders_products(
          id SERIAL PRIMARY KEY
      )
      `)
      console.log("---tables built---")
    } catch (error) {
        throw error;
      }
  }

    async function rebuildDB(){
      try{
        client.connect()
        await dropTables()
        await createTables()
      }
      catch(error){
        console.log("---error rebuildDb---")
        throw(error)
      }
    }

    module.exports = {
      rebuildDB
    }
    