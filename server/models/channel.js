const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const ChannelSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    href: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    creator: { type: Schema.Types.ObjectId, ref: 'Users' },
    createdAt: {type: Date, default: Date.now},    
});


ChannelSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
module.exports = mongoose.model('Channel', ChannelSchema);