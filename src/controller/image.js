const path = require('path');
const {randomNumber} = require('../helper/libs');
const fs = require('fs-extra');

const ctrl = {};

ctrl.index = (req, res)=>{
    
};

ctrl.create = async (req, res)=>{
    const imgURL = randomNumber();
    console.log(imgURL);
    const ext = path.extname(req.file.originalname).toLowerCase();
    const imgTempPath = req.file.path;
    const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);

    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        await fs.rename(imgTempPath,targetPath);
    }

    console.log(req.file);
    res.send("Enviado");
};

ctrl.like = (req, res)=>{
    
};

ctrl.coment = (req, res)=>{
    
};

ctrl.delete = (req, res)=>{
    
};

module.exports = ctrl;