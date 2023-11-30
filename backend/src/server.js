const express = require('express') /**inportando o express */
var cors = require('cors')/**cors permite que aplicações com portas e ips diferentes chamem  a nossa api, pois até então é bloqueado, somente uma aplicação do memso servidor, mesma máquina, consegue chamar a api por padrão, mas usando o cors conseguimos liberar  */

const database = require("./database");/*para reconhecer precisa colocar ./ nesse caso esta no memso diretorio, identifica que esta importando um arquivo e não um modulo */

const app = express() /**executando o express  atribuindo na conts app*/

app.use(cors())

app.get('/', function (req, res) { /**criando rota(endereço) via get, ou seja, habilitando o acesso ao home (home é o / puro)  */
  res.send('Hello World')
})

app.get('/students/list', function (req, res) { /**rota, req é a requisição (as informaçõe para levar) e o res é a resposta de retorno  */
  res.send(database) /**resultado devolvido  */
})

app.get('/students/find/:ra',function(req, res){
  const studentFound= database.find(function(student){
    return student.ra == req.params.ra;
  }) ;
  res.send(studentFound);
});

app.listen(3000) /**acesso pela porta 3000 */
console.log('Server is running...')