const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HASH_ROUND = 10;

let playerSchema = mongoose.Schema({
    email : {
        type : String,
        require : [true, 'email harus diisi'] 
    },
    name : {
        type : String,
        require : [true, 'nama harus diisi'],
        maxlength : [225, "Panjang nama harus diantara 3 - 225 karakter"],
        minlength : [3, "Panjang nama harus diantara 3 - 225 karakter"],
    },
    username : {
        type : String,
        require : [true, 'Username harus diisi'],
        maxlength : [225, "Panjang username harus diantara 3 - 225 karakter"],
        minlength : [3, "Panjang username harus diantara 3 - 225 karakter"],
    },
    password : {
        type : String,
        require : [true, 'kata sandi harus diisi'],
        maxlength : [225, "Panjang password harus diantara 3 - 225 karakter"],
        minlength : [3, "Panjang password harus diantara 3 - 225 karakter"],
    },
    role : {
        type : String,
        enum : ['admin', 'user'],
        default : 'user'
    },
    status : {
        type : String,
        enum : ['Y', 'N'],
        default : 'Y'
    },
    avatar : { type : String },
    fileName : { type : String },
    phoneNumber : {
        type : String,
        require : [true, 'nomor telepon harus diisi'],
        maxlength : [13, "Panjang nomor harus diantara 9 - 13 digit"],
        minlength : [9, "Panjang nomor harus diantara 9 - 13 digit"],
    },
    favorite : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
}, { timestamps: true });

playerSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('Player').countDocuments({ email : value });

        return !count;
    } catch (err) {
        throw err;
    }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
})

module.exports = mongoose.model('Player', playerSchema);