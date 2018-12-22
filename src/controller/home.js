const crtl = {};
const {Image } = require('../model');


crtl.index = async (req,res)=>{
    const images = await Image.find().sort({timestamp: -1});
    res.render('index', {images: images});
};


module.exports = crtl;