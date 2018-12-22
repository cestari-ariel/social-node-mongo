const path = require('path');
const {randomNumber} = require('../helper/libs');
const fs = require('fs-extra');

const { Image } = require('../model/index');

const ctrl = {};

ctrl.index = async (req, res)=>{
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    console.log(image);
    res.render('image', {image: image});
};

ctrl.create = (req, res)=>{
    const saveImage =  async ()=>{
        const imgURL = randomNumber();
        const images = await Image.find({filename: imgURL});

        if(images.length > 0){
            saveImage();
        }else{
            console.log(imgURL);
            const ext = path.extname(req.file.originalname).toLowerCase();
            const imgTempPath = req.file.path;
            const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);

            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                //Muevo la imagen de la carpeta temp a upload
                await fs.rename(imgTempPath,targetPath);

                //Instancio un objeto imagen
                const newImg = new Image({
                                    title: req.body.title,
                                    description: req.body.description,
                                    filename: imgURL+ext,
                                });
                
                //Mando a guardar a la base de datos
                const imageSaved = await newImg.save();
            } else{
                // Borro la imagen de la carpeta temp
                await fs.unlink(imgTempPath);
                res.status(500).json({error: 'Only images allowed'});
            }
           
            res.redirect('/images/'+ imgURL);
                }
            };

    saveImage();    
    
};

ctrl.like = (req, res)=>{
    
};

ctrl.coment = (req, res)=>{
    
};

ctrl.delete = (req, res)=>{
    
};

module.exports = ctrl;