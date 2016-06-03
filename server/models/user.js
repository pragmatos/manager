const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    login: {type: String, required: true},
    pass: {type: String, required: true},
    email: {type: String, required: true},
    admin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},    
});

UserSchema.methods.test = function(a){
	console.log(a);
}

UserSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
module.exports = mongoose.model('user', UserSchema);