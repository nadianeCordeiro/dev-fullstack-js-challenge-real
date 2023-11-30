$(document).ready(function(){
    fetchStudentList();

});

function fetchStudentList(){
    fetch("http://localhost:3000/students/list") /**fetch é do javascript  permite que se faça requisições para  apis  ou urls  , nesse caso estamos passando o endereço, onde possui a porta e o endpoint, isso é uma promesse para operações assincronas */
    .then(function(response){
        return response.json(); /**transformando a resposta do servidor em um json */
    })
    .then(function(data){ /**uma vez que houve o retorno do servidor e converteu para json ele vai excutar esse processo abaixo */
    
     const table = $("#studentList tbody"); /**criando uma const para  a tabela que foi criado no arquivo studentsList.html */
    
     data.map(function(student) { /**percorrendo os dados retornados e montando a tabela  */
        table.append(`
                <tr>
                    <td>${student.ra}</td>
                    <td>${student.name}</td>
                    <td>${student.cpf}</td>
                    <td>
                        <a href="studentManager.html?ra=${student.ra}">Editar</a>
                        <a href="#">Excluir</a>
                    </td>
                </tr>
        
        `);
        
     });
     $(".loader").hide("fast");
     $(".content-page").show("slow");
 
    });
}

