const express = require("express");
const router = express.Router();
const controller = require("../controller/salaoDeBelezaController");

router.get("/listarSalao", controller.listarTodosSaloes);
router.post("/criarSalao", controller.criarSalao);
router.put("/atualizarSalao/:id", controller.atualizarSalao);
router.delete("/excluirSalao/:id", controller.excluirSalao);


module.exports = router
