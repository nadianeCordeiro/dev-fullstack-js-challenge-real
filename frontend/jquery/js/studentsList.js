//const { response } = require("express");
//import { response } from 'express';


$(document).ready(function(){
    fetchStudentList();

    
    /**AATENÇÃO: QUANDO ESTA TRABALHANDO COM JQUERY E CRIA UM ELEMENTO VIA 
     * JAVASCRIPT E QUISER ATRIBUIR UM EVENTO PARA ESSE ELEMENTO
     * TEM QUE FAZER DA FORMA ABAIXO 
     * exemplo:
     * $("body").on("click", ".removeStudent", function(){
        alert($(this).data("ra")); 
       
    });



    modelo antigo de declarar função javascript:
    function soma(um, dois){
        alert(um + dois);
    }

    modelo novo de ceclarar função javascript :
     const soma ={um, dois}=>{
        alert(um + dois);
     }
     
     */

    $("body").on("click", ".removeStudent", function(){
        const ra = $(this).data("ra"); 
        const confirmation = confirm("Deseja excluir o student "+ ra + "  ?");

        if (confirmation){
            deleteStudent(ra);
        }
       
    });

  $("#formSearchStudent").submit((event) =>{
    event.preventDefault();
    
    fetchStudentList(event.target.searchImput.value);
  })

});



const deleteStudent = (ra)=>{
    fetch(`http://localhost:3000/students/delete/${ra}`,{
        method: "DELETE",
       })
       .then((response)=>{
        return response.json();
       })
       .then((data)=>{
        fetchStudentList();
       });

}


function fetchStudentList(searchQuery = ""){


    $(".loader").show("fast");
    $(".content-page").hide();


    fetch(`http://localhost:3000/students/list/${searchQuery}`) /**fetch é do javascript  permite que se faça requisições para  apis  ou urls  , nesse caso estamos passando o endereço, onde possui a porta e o endpoint, isso é uma promesse para operações assincronas */
    .then((response) =>{
        return response.json(); /**transformando a resposta do servidor em um json */
    })
    .then((data) =>{ /**uma vez que houve o retorno do servidor e converteu para json ele vai excutar esse processo abaixo */
    
     const table = $("#studentList tbody"); /**criando uma const para  a tabela que foi criado no arquivo studentsList.html */
    
     table.html(""); // toda vez que atualizar a lista retirar as linahs existentes

     data.map((student) => { /**percorrendo os dados retornados e montando a tabela  */
        table.append(`
                <tr>
                    <td>${student.ra}</td>
                    <td>${student.name}</td>
                    <td>${student.cpf}</td>
                    <td>
                        <a href="studentManager.html?ra=${student.ra}">Editar</a>
                        <a class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a>
                    </td>
                </tr>
        
        `);
        
     });
     $(".loader").hide("fast");
     $(".content-page").show("slow");
 
    });
}
/**o exemplo :
 *  <a class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a>
                que usa o data-ra, ele serve para armazenar informações adicionais para aquilo que vc esta trabalhando 

 */

