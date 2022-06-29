const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');

module.exports = {
    index : async(req, res) =>{
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            
            const alert = { message : alertMessage, status : alertStatus };
            const voucher = await Voucher.find();
            res.render('admin/voucher/view_voucher', {
                voucher,
                alert
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', `danger`);
            req.redirect('/voucher');
        }
    },
    viewCreate : async(req, res) => {
        try {
            const category = await Category.find();
            const nominal = await Nominal.find();

            res.render('admin/voucher/create', {
                category,
                nominal
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', `danger`);
            req.redirect('/voucher');
        }
    },
    // actionCreate : async(req, res) => {
    //     try {
    //         const { coinName, coinQuantity, price } = req.body;
    //         let voucher = await Voucher({ coinName, coinQuantity, price });
    //         await voucher.save();

    //         req.flash('alertMessage', 'Berhasil tambah voucher');
    //         req.flash('alertStatus', 'success');

    //         res.redirect('/voucher')
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`);
    //         req.flash('alertStatus', `danger`);
    //         req.redirect('/voucher');
    //     }
    // },
    // viewEdit : async(req, res) => {
    //     try {
    //         const { id } = req.params;

    //         const voucher = await Voucher.findOne({ _id : id });
    //         res.render('admin/voucher/edit', {
    //             voucher
    //         })
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`);
    //         req.flash('alertStatus', `danger`);
    //         req.redirect('/voucher');
    //     }
    // },
    // actionEdit : async(req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { coinName, coinQuantity, price } = req.body;

    //         await Voucher.findOneAndUpdate({ 
    //             _id : id 
    //         }, { coinName, coinQuantity, price });

    //         req.flash('alertMessage', 'Berhasil ubah voucher');
    //         req.flash('alertStatus', 'success');

    //         res.redirect('/voucher')
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`);
    //         req.flash('alertStatus', `danger`);
    //         req.redirect('/voucher');
    //     }
    // },
    // actionDelete : async(req, res) => {
    //     try {
    //         const { id } = req.params;

    //         await Voucher.deleteOne({ 
    //             _id : id 
    //         });

    //         req.flash('alertMessage', 'Berhasil hapus voucher');
    //         req.flash('alertStatus', 'success');

    //         res.redirect('/voucher')
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`);
    //         req.flash('alertStatus', `danger`);
    //         req.redirect('/voucher');
    //     }
    // }
}