const Player = require('../player/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    signup : async (req, res, next) => {
        try {
            const payload = req.body

            if(req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest);

                src.on('end', async () => {
                    try {
                        const player = new Player({ ...payload, avatar : filename })

                        await player.save();

                        delete player._doc.password;

                        res.status(201).json({ data : player });

                    } catch (err) {
                        if(err && err.name === 'ValidationError') {
                            return res.status(422).json({
                                error: 1,
                                message: err.message,
                                fields: err.errors
                            });
                        }
                        next(err)
                    }
                })
            } else {
                const player = new Player(payload);

                await player.save();

                delete player._doc.password;

                res.status(201).json({ data : player });
            }
            
        } catch (err) {
            if(err && err.name === 'ValidationError') {
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                });

            }
            next(err)
        }
    },
    signin : async (req, res, next) => {
        const { email, password } = req.body;

        Player.findOne({ email : email }).then((players) => {
            if (players) {
                const checkPassword = bcrypt.compareSync(password, players.password);
                if(checkPassword) {
                    const token = jwt.sign({
                        player : {
                            id : players.id,
                            email : players.email,
                            username : players.username,
                            name : players.name,
                            avatar : players.avatar
                        }
                    }, config.jwtKey)

                    res.status(200).json({
                        data : { token }
                    })
                } else {
                    res.status(403).json({
                        message : 'Password yang anda masukkan belum terdaftar',
                    });
                }
            } else {
                res.status(403).json({
                    message : 'Email yang anda masukkan belum terdaftar',
                });
            }
        }).catch((err) => {
            res.status(500).json({
                message : err.message || 'Internao server error',
            });
        });
    }
}