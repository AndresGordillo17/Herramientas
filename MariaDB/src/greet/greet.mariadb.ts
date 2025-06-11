// Importa funciones y tipos necesarios del paquete 'mariadb' para conectar a la base de datos
import { createConnection, Connection, ConnectionConfig } from 'mariadb'

// Importa dotenv para cargar variables de entorno desde un archivo .env
import dotenv from 'dotenv'

// Carga las variables de entorno definidas en .env a process.env
dotenv.config()

// Configuración para la conexión a la base de datos usando las variables de entorno
const dbConfig: ConnectionConfig = {
  host: process.env.DB_HOST!,          // Dirección del servidor de la base de datos
  user: process.env.DB_USER!,          // Usuario para la conexión
  password: process.env.DB_PASSWORD!,  // Contraseña del usuario
  port: Number(process.env.DB_PORT),   // Puerto donde escucha la base de datos (convertido a número)
  database: process.env.DB_NAME!,      // Nombre de la base de datos
  connectTimeout: 10000                // Tiempo máximo de espera para la conexión en milisegundos (10 segundos)
}

// Variable para almacenar la conexión activa a la base de datos
let connection: Connection

// Función asincrónica que establece la conexión con la base de datos
async function connectToDatabase(): Promise<void> {
  try {
    // Intenta crear una conexión con los datos de configuración
    connection = await createConnection(dbConfig)
    console.log('Conexión a la base de datos establecida')
  } catch (error) {
    // Si falla la conexión, muestra el error en consola
    console.error('Error conectando a la base de datos:', error)
  }
}

// Llama a la función para conectar al iniciar el módulo
connectToDatabase()

// Define el tipo para los parámetros que usará la clase Greet (para inserciones o actualizaciones)
export type Param = {
  greet: string       // Texto de saludo
  language: string    // Idioma del saludo
}

// Define el tipo que representará resultados estadísticos
export type StatsResult = {
  total: number                           // Total de registros en la tabla
  byLanguage: { language: string; count: number }[] // Conteo agrupado por idioma
}

// Clase con métodos estáticos para manejar operaciones CRUD y estadísticas en la tabla "regards"
export class Greet {
  // Obtiene todos los registros de saludos
  static async findAll() {
    return await connection.query('SELECT id, greet, language FROM regards')
  }

  // Busca un registro por su ID
  static async findById(id: number) {
    const rows = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]               // Parámetro para prevenir inyección SQL
    )
    return rows[0] || null   // Retorna el primer resultado o null si no existe
  }

  // Crea un nuevo registro con los datos recibidos en param
  static async create(param: Param) {
    // Inserta un nuevo saludo y retorna el id generado (nota: 'RETURNING id' no es soportado en MariaDB, puede requerir ajuste)
    const [{ id }] = await connection.query(
      'INSERT INTO regards (greet, language) VALUES (?, ?) RETURNING id',
      [param.greet, param.language]
    ) as any

    // Consulta el registro recién creado para devolverlo completo
    const [created] = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]
    ) as any

    return created
  }

  // Actualiza un registro existente identificado por id con nuevos datos en param
  static async update(id: number, param: Param) {
    // Ejecuta la actualización
    const res = await connection.query(
      'UPDATE regards SET greet = ?, language = ? WHERE id = ?',
      [param.greet, param.language, id]
    ) as any

    // Si no se afectaron filas, el registro no existe, retorna null
    if (res.affectedRows === 0) return null

    // Recupera y retorna el registro actualizado
    const [updated] = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]
    ) as any

    return updated
  }

  // Elimina un registro por id, retorna true si se eliminó alguno
  static async remove(id: number) {
    const res = await connection.query(
      'DELETE FROM regards WHERE id = ?',
      [id]
    ) as any

    return res.affectedRows > 0
  }

  // Obtiene estadísticas: total de registros y conteo agrupado por lenguaje
  static async stats(): Promise<StatsResult> {
    // Consulta el conteo por lenguaje agrupado
    const rows = await connection.query(
      'SELECT language, COUNT(*) AS count FROM regards GROUP BY language'
    ) as any[]

    // Suma total de todos los registros
    const total = rows.reduce((sum, r) => sum + Number(r.count), 0)

    // Retorna el resultado con total y el array de conteos por lenguaje
    return {
      total,
      byLanguage: rows.map(r => ({
        language: r.language,
        count: Number(r.count)
      }))
    }
  }
}
