const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'floristeria',
    password: 'ClavePOST#1',
    port: 5432,
});


const getArreglosByCategory = async (req, res) => {
    const id = req.params.id;
    const consulta = `
      SELECT
        a.SKU 
      FROM arreglo AS a
      WHERE a.id_categoria = $1
    `;
  
    try {
      const response = await pool.query(consulta, [id]);
      const flores = response.rows;
  
      // Agregar la propiedad 'imagen' a cada arreglo con la ruta del archivo correspondiente
      const floresConImagen = flores.map(arreglo => ({
        ...arreglo,
        imagen: path.join(__dirname, '../imas', `${arreglo.sku}.jpeg`),
      }));
  
      // Leer el contenido de cada archivo de imagen y convertirlo a base64
      const floresConImagenBase64 = await Promise.all(
        floresConImagen.map(async arreglo => ({
          ...arreglo,
          imagen: fs.readFileSync(arreglo.imagen, { encoding: 'base64' }),
        }))
      );
  
      res.status(200).json(floresConImagenBase64);
    } catch (error) {
      console.error("Error en getArreglosByCategory:", error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };

const getArreglos = async (req, res) => {
    const consulta = `
    SELECT
       a.SKU 
    FROM arreglo AS a
  `;
    try {
        const response = await pool.query(consulta);
        const flores = response.rows;

        // Agregar la propiedad 'imagen' a cada restaurante con la ruta del archivo correspondiente
        const floresConImagen = flores.map(arreglo => ({
            ...arreglo,
            imagen: path.join(__dirname, '../imas', `${arreglo.sku}.jpeg`),
        }));

        // Leer el contenido de cada archivo de imagen y convertirlo a base64
        const floresConImagenBase64 = await Promise.all(
            floresConImagen.map(async arreglo => ({
                ...arreglo,
                imagen: fs.readFileSync(arreglo.imagen, { encoding: 'base64' }),
            }))
        );

        res.status(200).json(floresConImagenBase64);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}





module.exports = {
    getArreglosByCategory,
    getArreglos
};