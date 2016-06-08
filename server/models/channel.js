const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const ChannelSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    href: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    type: { type: String, default: 'TV' },
    creator: { type: Schema.Types.ObjectId, ref: 'Users' },
    createdAt: {type: Date, default: Date.now},    
});


module.exports = mongoose.model('Channel', ChannelSchema);