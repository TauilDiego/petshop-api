const moment = require('moment');
const conexao = require('../schema/conexao');

// TABELA atendimentos
class Atendimento { 
  adiciona(atendimento, res) {

    let atendimentoDTO = {...atendimento}

    const momentPattern = 'YYYY-MM-DD HH:MM:SS'
    atendimentoDTO.dataCriacao = moment().format(momentPattern)
    atendimentoDTO.data = moment(atendimento.data, 'DD/MM/YYYY').format(momentPattern)

    const erros = this.validaAtendimento(atendimentoDTO)

    if(erros.length){
      res.status(400).json(erros)
    }else{ 
      
      const sql = 'INSERT INTO atendimentos SET ?'
      
      conexao.query(sql, atendimentoDTO, (erro, resultados) => {
        if(erro){
          res.status(400).json(erro)
        }else{momentPattern
          this.findAtendimento(resultados.insertId, res)

        }
      })
    }
  }
  
  lista(res){
    const sql = "SELECT * FROM atendimentos"

    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      }else{
        res.status(200).json(resultados)
      }
    })
  }

  findAtendimento(id, res) {
    const sql = "SELECT * FROM atendimentos WHERE ?"

    conexao.query(sql, {id}, (erro, resultados) =>{
      const atendimento = resultados[0]
      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(200).json(atendimento)
      }
    })
  }

  altera(id, valores, res){

    if(valores.dataCriacao){
      delete valores.dataCriacao
    }

    let atendimentoDTO = {...valores}

    
    if(valores.data) {
      const momentPattern = 'YYYY-MM-DD HH:MM:SS'

      atendimentoDTO = {
        ...valores,
        data: moment(valores.data, 'DD/MM/YYYY').format(momentPattern)
      }
    }

    const erros = this.validaAtendimento(atendimentoDTO)

    if(erros.length){
      res.status(400).json(erros)
    }else{

      const sql = "UPDATE atendimentos SET ? WHERE id=?"
      
      conexao.query(sql, [atendimentoDTO, id], (erro, resultados) => {
        if(erro) {
          res.status(400).json(erro)
        }else{
          this.findAtendimento(id, res)
        }
      })
    }
  }

  deleta(id, res) {
    const sql = "DELETE FROM atendimentos WHERE ID=?"

    conexao.query(sql, id, (erro, resultados) =>{
      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(200).json({id})
      }
    })
  }

  validaAtendimento(atendimento) {
    

    const dataIsValid = moment(atendimento.data).isSameOrAfter(atendimento.dataCriacao)
    const clientIsValid = atendimento.cliente.length >= 5

    const validacoes = [
      {
        nome: 'data',
        valido: dataIsValid,
        mensagem: "Data deve ser maior ou igual a data atual"
      },
      {
        nome: 'cliente',
        valido: clientIsValid,
        mensagem: "Cliente deve ter mais que 5 caracteres"
      },
    ]

    console.log(atendimento);

    return validacoes.filter(campo=> !campo.valido)
  }
}

module.exports = new Atendimento()