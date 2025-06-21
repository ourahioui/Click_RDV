import db from "../db.js";

const VilleModel = {
    allvilles(){
        return db('villes').select('id', 'ville');
    }
}
export default VilleModel;