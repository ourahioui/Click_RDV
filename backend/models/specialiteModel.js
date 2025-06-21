import db from "../db.js";

const SpecialiteModel = {
    allSpecialites() {
        return db('specialites').select('id', 'specialite');
    }
};

export default SpecialiteModel;
