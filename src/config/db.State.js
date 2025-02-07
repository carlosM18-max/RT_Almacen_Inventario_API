import fs from 'fs';
import path from 'path';

// TODO: configuracion del estado de la base de datos terminada.
const DB_STATE_FILE = path.join(process.cwd(), 'dbState.json');

export const getDbState = () => {
  if (fs.existsSync(DB_STATE_FILE)) {
    try {
      const data = fs.readFileSync(DB_STATE_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer dbState.json:', error);
      return { initialized: false };
    }
  }
  return { initialized: false };
};

export const setDbState = (state) => {
  fs.writeFileSync(DB_STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
};

export const resetDbState = () => {
  if (fs.existsSync(DB_STATE_FILE)) {
    fs.unlinkSync(DB_STATE_FILE);
  }
};