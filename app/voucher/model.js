const mongoose = require('mongoose');

let voucherSchema = mongoose.Schema({
    status : {
        type : String,
        enum : ['Y', 'N'],
        default : 'Y'
    },
    nominals : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Nominal'
    }],
    name : {
        type : String,
        require : [true, 'Nama koin harus diisi']
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    thumbnail : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    price : {
        type : Number,
        default : 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);