const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const TypeSchema = new Schema({
    name: { type: String, required: true },
    createdAt: {type: Date, default: Date.now},    
});


module.exports = mongoose.model('Type', TypeSchema);