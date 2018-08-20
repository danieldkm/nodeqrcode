/*
oracledb.getConnection(
      {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      `SELECT *
       FROM LAC_ALUNOS
       WHERE SQ_ALUNO = :id`,
      [data.sqAluno],  // bind value for :id
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }

        var aluno = {};

        if(result.metaData){
            for(var i = 0; i < result.metaData.length; i++){
                aluno[result.metaData[i].name] = result.rows[0][i];
            }
        }

        console.log('Comunicando os clientes');            
        //Comunicando os clientes
        if(aluno){
            io.emit('novoaluno', aluno);    
        }
        doRelease(connection);
      });
  });
*/
// function getConnection(callback) {
//     oracledb.getConnection({
//         user          : dbConfig.user,
//         password      : dbConfig.password,
//         connectString : dbConfig.connectString
//     }, callback);
// }
function fAluno(result){
  var aluno = {};
  var alunos = [];
  if(result){
    if(result.metaData){
      for(var i = 0; i < result.rows.length; i++){
        aluno = {};
        for(var j = 0; j < result.metaData.length; j++){
          aluno[result.metaData[j].name] = result.rows[i][j];
        }
        alunos.push(aluno);
      }
    }
  }
  if(alunos.length === 1){
    return alunos[0];
  } else {
    return alunos;  
  }
}

function findAll(callback){
    global.db.execute(
`select to_char(lalu.sq_aluno, 'fm099999') sq_aluno
   from lac_alunos lalu
       ,lac_matriculas lmat
       ,lac_cursos     lcur
  where LMAT.SQ_ALUNO = LALU.SQ_ALUNO
    and LMAT.ST_ACADEMICO in ('1','B')
    and lmat.an_ano = to_char(sysdate,'rrrr')
    and substr(lmat.id_turma,1,2) = lcur.id_curso
    and lcur.ds_nivel in ('FUND I', 'FUND II')
  order by lalu.sq_aluno`, function(err, result) {
      // console.log('result', result);
      callback(err, fAluno(result));
    });
}

function findById(_id, callback){
    global.db.execute(`SELECT * FROM LAC_ALUNOS WHERE SQ_ALUNO = :id`,  [_id], function(err, result) {
      callback(err, fAluno(result));
    });
}

function insert(aluno, callback){
    global.db.execute(
`INSERT INTO LAC_ALUNOS () VALUES (:id)`,  [_id], callback);
}

function update(_id, airtime, callback){
    global.db.execute(
`UPDATE LAC_ALUNOS SET ? :id WHERE SQ_ALUNO = :id`,  [_id], callback);
}

function remove(_id, callback){
    global.db.execute(
`DELETE FROM LAC_ALUNOS () VALUES (:id)`,  [_id], callback);
}

module.exports = { findById, findAll }