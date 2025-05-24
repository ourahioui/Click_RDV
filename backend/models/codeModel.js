// ca le model 

import { Model } from 'objection';

class Code extends Model {
  
  static get tableName() {
    return 'codes'; // Nom de la table dans la base de données
  }
  //  ------------------
  static get idColumn() {
    return 'id'; // Clé primaire (par défaut : 'id')
  }
  //  ------------------
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' }
      }
    };
  }
    


}

export default User;
