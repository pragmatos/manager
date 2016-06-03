const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const ChannelSchema = new Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},    
});


ChannelSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
module.exports = mongoose.model('channel', ChannelSchema);