const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    role : {
        type : String,
        enum : ['admin', 'user'],
        default : 'admin'
    },
    status : {
        type : String,
        enum : ['Y', 'N'],
        default : 'Y'
    },
    email : {
        type : String,
        require : [true, 'email harus diisi'] 
    },
    password : {
        type : String,
        require : [true, 'kata sandi harus diisi'] 
    },
    phoneNumber : {
        type : String,
            require : [true, 'Nomor telepon harus diisi'],
            maxlength : [13, "Panjang nomor harus diantara 9 - 13 digit"],
            minlength : [9, "Panjang nomor harus diantara 9 - 13 digit"],
    },
    name : {
        type : String,
        require : [true, 'nama harus diisi'] 
    },
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);