const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema({
    tax : {
        type : Number,
        default : 0,
    },

    value : {
        type : Number,
        default : 0,
    },

    status : {
        type : String,
        enum : ['pending', 'success', 'failed'],
        default : 'pending'
    },

    historyVoucherTopup : {
        gameName : { type : String, require : [true, 'Nama game harus diisi'] }, 
        category : { type : String, require : [true, 'Kategori harus diisi'] }, 
        thumbnail : { type : String }, 
        coinName : { type : String, require : [true, 'Nama coin harus diisi'] }, 
        coinQuantity : { type : String, require : [true, 'Jumlah koin harus diisi'] }, 
        price : { type : Number }, 
    },

    historyPayment : {
        name : { type : String, require : [true, 'Nama harus diisi'] }, 
        type : { type : String, require : [true, 'Tipe harus diisi'] }, 
        bankName : { type : String, require : [true, 'Nama bank harus diisi'] }, 
        noRekening : { type : String, require : [true, 'Nomor rekening harus diisi'] }, 
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    
    historyUser : {
        name : { type : String, require : [true, 'Nama harus diisi'] }, 
        phoneNumber : {
            type : String,
            require : [true, 'Nomor telepon harus diisi'],
            maxlength : [13, "Panjang nomor harus diantara 9 - 13 digit"],
            minlength : [9, "Panjang nomor harus diantara 9 - 13 digit"],
        }
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },

    name : {
        type : String,
        require : [true, 'Nama harus diisi'],
        maxlength : [225, "Panjang nama harus diantara 3 - 225 karakter"],
        minlength : [3, "Panjang nama harus diantara 3 - 225 karakter"],
    },

    accountUser : {
        type : String,
        require : [true, 'Nama akun harus diisi'],
        maxlength : [225, "Panjang nama harus diantara 3 - 225 karakter"],
        minlength : [3, "Panjang nama harus diantara 3 - 225 karakter"],
    },

    voucherTopup: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Id'
    },

    player : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Player'
    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);