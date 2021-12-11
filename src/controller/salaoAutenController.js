const salaoAutenSchema = require("../models/salaoAutenSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;


const criarAuten = async (req, res) => {
   try {
       const { nome, email, senha, confirmarsenha, termos_de_uso } = 
       req.body;

       if(!nome) {
           return req.status(406).json({
               mensagem: "É necessário colocar o nome",

           });
       }
       
       if(!email) {
        return req.status(406).json({
            mensagem: "É necessário colocar o email",

        });
   } 

   if(!senha) {
    return req.status(406).json({
        mensagem: "É necessário colocar a senha",

    });
} 
   
if(senha !== confirmarsenha) {
    return req.status(406).json({
        mensagem: "A senhas são diferentes"
    });
} 

const autentExiste = await salaoAutenSchema.findOne({ email: email });
if(autentExiste) {
    return res.status(406).json({
        mensagem: "Esse email já foi registrado, por favor adicione outro email",
    });
}
   const salt = await bcrypt.genSalt(12);
   const passwordHash = await bcrypt.hash(senha, salt);
   const novoAuten = new salaoAutenSchema({
       _id: new mongoose.Types.ObjectId(),
       nome: req.body.nome,
       email: req.body.email,
       senha: passwordHash,
       termos_de_uso: req.body.termos_de_uso,
    });
    if (!termos_de_uso) {
        return res.status(406).json({
            //ajeitar essa mensagem depois
            mensagem: "Desculpe, é preciso aceitar os termos de uso pra continuar"
        });
    }
    const salvarAuten = await novoAuten.save();
    console.log(salvarAuten)
    res.status(200).json({
        mensagem: "O administrador foi registrado com sucesso",
        salvarAuten,
    });

  }  catch (e) {
    res.status(500).json({
        mensagem: e.mensagem
    })
       
   }
}

module.exports = {
 criarAuten,   
}