class Tabelas {
  init(conexao) {
    this.conexao = conexao

    this.criarAtendimentos()
  }

  criarAtendimentos(){
    const tableName = 'atendimentos'
    const sql = 
    `CREATE TABLE IF NOT EXISTS ${tableName} (
      id int NOT NULL AUTO_INCREMENT, 
      cliente varchar(50) NOT NULL, 
      pet varchar(20), 
      servico varchar(20) NOT NULL, 
      dataCriacao datetime NOT NULL,
      status varchar(20) NOT NULL, 
      observacoes text, 
      PRIMARY KEY(id))`;


    this.conexao.query(sql, (erro)=>{
      if(erro){
        console.log(erro);
      }else{
        console.log(`Tabela ${tableName} criada com sucesso`);
      }
    })
  }
}

module.exports = new Tabelas;