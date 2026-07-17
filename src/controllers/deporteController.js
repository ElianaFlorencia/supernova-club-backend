const deporteModel = require("../models/deporteModel");


exports.obtenerDeportes = async (req, res) => {

    try {

        const deportes = await deporteModel.obtenerTodos();

        res.json({
            success:true,
            deportes
        });


    } catch(error) {

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Error al obtener deportes"
        });

    }

};

exports.crearDeporte = async(req,res)=>{

    const {nombre, descripcion, activo} = req.body;


    try{

        await deporteModel.crear({
            nombre,
            descripcion,
            activo
        });


        res.json({
            success:true,
            message:"Deporte creado correctamente"
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Error al crear deporte"
        });

    }

};



exports.actualizarDeporte = async(req,res)=>{

    const {id}=req.params;

    const {nombre, descripcion, activo}=req.body;


    try{

        await deporteModel.actualizar(id,{
            nombre,
            descripcion,
            activo
        });


        res.json({
            success:true,
            message:"Deporte actualizado correctamente"
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Error al actualizar deporte"
        });

    }

};



exports.eliminarDeporte = async(req,res)=>{

    const {id}=req.params;


    try{

        await deporteModel.eliminar(id);


        res.json({
            success:true,
            message:"Deporte eliminado correctamente"
        });


    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Error al eliminar deporte"
        });

    }

};