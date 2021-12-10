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
        nome_ong: req.body.nome_ong,
        termos_de_uso: req.body.termos_de_uso
    });


      if(!novoSalao.nome) {
        return res.status(406).json({
          mensagem: "Por favor informe o nome do salão!"
        })
      }

      if(!novoSalao.CNPJ) {
        return res.status(406).json({
          mensagem: "Por favor informe o CNPJ do salão!"
        })
      }


      if(novoSalao.CNPJ.length > 18 || novoSalao.CNPJ.length < 18) {
        return res.status(406).json({
          mensagem: "Por favor informe o CNPJ válido",
          //detalhar posteriormente essa parte
          mensagem_exemplo: "xx.xxx.xxx/xxxx-xx"
        })
      }

      if(!novoSalao.endereço) {
        return res.status(406).json({
          mensagem: "Por favor informe o endereço do salão!"
        })
      }

      if(novoSalao.estado !== "PERNAMBUCO") {
        return res.status(406).json({
          mensagem: "Infelizmente, ainda só são aceitos salões do estado de Pernambuco!"
        })
      }

      
      if(novoSalao.cidade !== "RECIFE") {
        return res.status(406).json({
          mensagem: "Infelizmente, ainda só são aceitos salões da cidade de Recife!"
        })
      }

      if(!novoSalao.bairro) {
        return res.status(406).json({
          mensagem: "Por favor informe um bairro!"
        })
      }


      if(novoSalao.numero.length > 4) {
        return res.status(406).json({
          mensagem: "Por favor informe um número válido!",
          //detalhar posteriormente essa parte
          mensagem_exemplo: "Só são aceitos no máximo 4 números"
        })
      }

      if(!novoSalao.CEP) {
        return res.status(406).json({
          mensagem: "Por favor informe o CEP do salão!"
        })
      }


      if(novoSalao.CEP.length > 9 || novoSalao.CEP.length < 9) {
        return res.status(406).json({
          mensagem: "Por favor informe um CEP válido",
          //detalhar posteriormente essa parte
          mensagem_exemplo: "xxxxx-xxx" 
        })
      }

      if(!novoSalao.telefone) {
        return res.status(406).json({
          mensagem: "Por favor informe o número de telefone do salão!"
        })
      }


      if(novoSalao.telefone.length > 14 || novoSalao.telefone.length < 14) {
        return res.status(406).json({
          mensagem: "Por favor informe um número de telefone válido",
          //detalhar posteriormente essa parte
          mensagem_exemplo: "(xx) xxxxx-xxxx"
        })
      }

      if(!novoSalao.email) {
        return res.status(406).json({
          mensagem: "Por favor informe o email do salão!"
        })
      }

      if(novoSalao.tem_parceria_com_hospital == undefined) {
        return res.status(406).json({
          mensagem: "Erro! Só são cadastros salões com parceria com hospital!",
          mensagem_exemplo: "Entre com true ou false"
        })
      }

      if(novoSalao.tem_parceria_com_ong == undefined) {
        return res.status(406).json({
          mensagem: "Erro! Só são cadastros salões com parceria com ong!",
          mensagem_exemplo: "Entre com true ou false"
        })
      }

      if(novoSalao.tem_parceria_com_hospital == false && novoSalao.tem_parceria_com_ong == false) {
          return res.status(406).json({
            mensagem: "Só podem cadastros salões que realizam doações!"
          })

      }

      if(novoSalao.tem_parceria_com_hospital == true) {
        if(!novoSalao.nome_hospital) {
          return res.status(406).json({
            mensagem: "Informe o nome do hospital que o seu salão tem parceria!"
          })
        }
      }


      if(novoSalao.tem_parceria_com_ong == true) {
        if(!novoSalao.nome_ong) {
          return res.status(406).json({
            mensagem: "Informe o nome da ong que o seu salão tem parceria!"
          })
        }
      }

      const { CNPJ } = req.body;
    const salaoDeBelezaExiste = await SalaoDeBelezaSchema.findOne({
      CNPJ,
    });
    if (salaoDeBelezaExiste) {
      return res.status(406).json({
        //ajeitar essa mensagem depois
        mensagem:"Esse CNPJ já foi cadastrado",
      });
    }


    const { email } = req.body;
    const salao_De_Beleza_Existe = await SalaoDeBelezaSchema.findOne({
      email,
    });
    if (salao_De_Beleza_Existe) {
      return res.status(406).json({
        //ajeitar essa mensagem depois
        mensagem:"Esse email já foi cadastrado",
      });
    }


      if (!novoSalao.termos_de_uso) {
        return res.status(406).json({
          messagem: "Desculpe, só podem ser cadastrados salões que concordem com nossos termos de uso!"
        });
      }
  
      

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

    if(salaoEncontrado.numero.length > 4) {
      return res.status(406).json({
        mensagem: "Por favor informe um número válido!",
        //detalhar posteriormente essa parte
        mensagem_exemplo: "Só são aceitos no máximo 4 números"
      })
    }

    if(salaoEncontrado.CNPJ.length > 18 || salaoEncontrado.CNPJ.length < 18) {
      return res.status(406).json({
        mensagem: "Por favor informe o CNPJ válido",
        //detalhar posteriormente essa parte
        mensagem_exemplo: "xx.xxx.xxx/xxxx-xx"
      })
    }

    if(salaoEncontrado.CEP.length > 9 || salaoEncontrado.CEP.length < 9) {
      return res.status(406).json({
        mensagem: "Por favor informe um CEP válido",
        //detalhar posteriormente essa parte
        mensagem_exemplo: "xxxxx-xxx" 
      })
    }

    if(salaoEncontrado.telefone.length > 14 || salaoEncontrado.telefone.length < 14) {
      return res.status(406).json({
        mensagem: "Por favor informe um número de telefone válido",
        //detalhar posteriormente essa parte
        mensagem_exemplo: "(xx) xxxxx-xxxx"
      })
    }

    if(salaoEncontrado.tem_parceria_com_hospital !== true) {
      if(salaoEncontrado.nome_hospital) {
        console.log(salaoEncontrado.tem_parceria_com_hospital)
        console.log(salaoEncontrado.nome_hospital)
        return res.status(406).json({
          //mudar essa mensagem depois
          mensagem: "Se não tem parceria com hospital não informe nome do hospital!"
        })
      }
    }


    if(salaoEncontrado.tem_parceria_com_ong == true) {
      if(!salaoEncontrado.nome_ong) {
        return res.status(406).json({
          mensagem: "Informe o nome da ong que o seu salão tem parceria!"
        })
      }
    }
    


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