const SalaoDeBelezaSchema = require("../models/salaoDeBelezaSchema");
const mongoose = require("mongoose");
//const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



//GET
const listarTodosSaloes = async (req, res) => {
    try {
      const saloesEncontrados = await SalaoDeBelezaSchema.find();
      res.status(200).json({
        message: "Todos os salões encontrados: ",
        saloesEncontrados,
      });
    } catch (e) {
      res.status(500).json({
          message: e.message,
        });
    }
  };
  

//POST
const criarSalao = async (req, res) => {
    try {
      const novoSalao = new SalaoDeBelezaSchema({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome,
        CNPJ: req.body.CNPJ,
        endereço: req.body.endereço,
        estado: req.body.estado,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        numero: req.body.numero,
        CEP: req.body.CEP,
        telefone: req.body.telefone,
        email: req.body.email,
        tem_parceria_com_hospital: req.body.tem_parceria_com_hospital,
        tem_parceria_com_ong: req.body.tem_parceria_com_ong,
        nome_hospital: req.body.nome_hospital,
        nome_ong: req.body.nome_ong
    });


      const salvarSalao = await novoSalao.save();
      res.status(201).json({
        message: `O salão ${novoSalao.nome} foi criado com sucesso!`,
        salvarSalao,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };


  //PUT

  const atualizarSalao = async (req, res) => {
    try {
      const salaoEncontrado = await SalaoDeBelezaSchema.findById(req.params.id);
      if (salaoEncontrado) {
        salaoEncontrado.nome = req.body.nome || salaoEncontrado.nome;
        salaoEncontrado.CNPJ = req.body.CNPJ || salaoEncontrado.CNPJ;
        salaoEncontrado.endereço = req.body.endereço || salaoEncontrado.endereço;
        salaoEncontrado.estado = req.body.estado || salaoEncontrado.estado;
        salaoEncontrado.cidade = req.body.cidade || salaoEncontrado.cidade;
        salaoEncontrado.bairro = req.body.bairro || salaoEncontrado.bairro;
        salaoEncontrado.numero = req.body.numero || salaoEncontrado.numero;
        salaoEncontrado.CEP = req.body.CEP || salaoEncontrado.CEP;
        salaoEncontrado.telefone = req.body.telefone || salaoEncontrado.telefone;
        salaoEncontrado.email = req.body.email || salaoEncontrado.email;
        salaoEncontrado.tem_parceria_com_hospital = req.body.tem_parceria_com_hospital || salaoEncontrado.tem_parceria_com_hospital;
        salaoEncontrado.tem_parceria_com_ong = req.body.tem_parceria_com_ong || salaoEncontrado.tem_parceria_com_ong;
        salaoEncontrado.nome_hospital = req.body.nome_hospital || salaoEncontrado.nome_hospital;
        salaoEncontrado.nome_ong = req.body.nome_ong || salaoEncontrado.nome_ong;
      
    }
    console.log(salaoEncontrado);
    
    const salvarSalao = await salaoEncontrado.save();
      res.status(200).json({
        message: `O salão ${salvarSalao.nome} foi atualizado com sucesso!`,
        salvarSalao,
      });

    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };



//DELETE
const excluirSalao = async (req, res) =>{
    try {
        const salaoEncontrado = await SalaoDeBelezaSchema.findById(req.params.id)
        await salaoEncontrado.delete()
        res.status(200).json({
            message: `O salão ${salaoEncontrado.nome} foi deletado com sucesso!`
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
   }
   



  module.exports = {
    
    listarTodosSaloes,  
    criarSalao,
    atualizarSalao,
    excluirSalao,

  }