const customExpress = require('./src/config/customExpress')
const conexao = require('./src/schema/conexao')
const Tabelas = require('./src/schema/tabelas')

conexao.connect(erro=>{

  if(erro){
    console.log(erro)
  } else{
    console.log("conectado com sucesso");

    Tabelas.init(conexao)
    
    const app = customExpress()
    app.listen(3000, ()=>console.log('servidor rodando na porta 3000'));
  }
})
