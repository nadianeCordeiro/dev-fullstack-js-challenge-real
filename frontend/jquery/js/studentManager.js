$(document).ready(function(){
   
  if(isEditingMode){
    fetchStudent();
  }else{
    $(".loader").hide();
    $(".content-page").show();
  }

  $("#studentForm").submit((event)=>{
    event.preventDefault();
      const body ={
        name: $(this).find("#name").val(),
        ra: $(this).find("#ra").val(),
        cpf: $(this).find("#cpf").val(), /**esse modleo é jquery */
        email: event.target.email.value, /**essa forma é javascript puro */
        /** event é o evento do submit
          * target é o formulario em si (studentForm) que sofreu o evento
          * email é o nome do campo que contem o valor
          * value é o valor que esta no campo buscado
          */
      };

    let methodEndpoint;
    let urlEndpoint;
        
    if(isEditingMode()){
      methodEndpoint ="PUT";
      urlEndpoint = `http://localhost:3000/students/edit/${getRAFromUrl()}`;
    }else{
      methodEndpoint = "POST";
      urlEndpoint = "http://localhost:3000/students/save"; 

    }
console.log(urlEndpoint);

console.log(methodEndpoint);

      fetch(urlEndpoint, {
          method: methodEndpoint,
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json", /**sinaliza que aceita receber application json */
           "Content-Type": "application/json", /** sinaliza q vai enviar  um  application json */
                      
          },
        })
        .then((response) => {
          return response.json();  
        })
        .then((data) =>{
          alert(data.message);
          document.location.href = "studentsList.html";
        });
   });
 });


function fetchStudent(){

  fetch(`http://localhost:3000/students/find/${getRAFromUrl()}`)
  .then(function(response){
    return response.json();
  })
  .then(function(data){

  const studentForm = $("#studentForm");
  
  studentForm.find("#name").val(data.name); /**procurando ume lemento dentro do formulario e coloca esse valor nele (se for input usa o .val() se for um texto em html usa .html ) */
  studentForm.find("#email").val(data.email);
  studentForm.find("#ra").val(data.ra);
  studentForm.find("#cpf").val(data.cpf);

  $(".loader").hide("fast");
  $(".content-page").show("slow");

  });
}

function isEditingMode(){
  const urlSearch = new URLSearchParams(window.location.search);

  return urlSearch.has("ra"); // has é um metodo do URLSearchParams
                              // has esta verificando se esta retornando alguma coisa no ra, como se fosse um if
                              // logo vai ser atribuido true ou false
}

function getRAFromUrl(){

  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.get("ra");
}