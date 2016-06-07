const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const PlaylistSchema = new Schema({
    channel: { type: Schema.Types.ObjectId, ref: 'Channel' },
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    added: { type: Date, default: Date.now },    
});


module.exports = mongoose.model('Playlist', PlaylistSchema);