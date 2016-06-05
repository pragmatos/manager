const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const bcrypt      = require('bcrypt-nodejs');


const UserSchema = new Schema({
    name: {type: String, required: true},
    login: {type: String, required: true},
    pass: {type: String, required: true},
    email: {type: String, required: true},
    admin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},    
});

UserSchema.pre('save', function (next){

    var user = this;

    bcrypt.hash(user.pass, null, null, function(err, hash){
        
        if(err) return next(err);

        user.pass = hash;
        next();
    });
});

UserSchema.methods.comparePass = function(pass){

    return bcrypt.compareSync(pass, this.pass); 

}
module.exports = mongoose.model('User', UserSchema);