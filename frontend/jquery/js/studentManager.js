$(document).ready(function(){
 //alert("jquery pronto para ser usado");
 fetchStudent();
});


function fetchStudent(){
 const urlSearch = new URLSearchParams(window.location.search);
 const ra = urlSearch.get("ra");
// console.log(urlSearch);

 if(ra){
 fetch(`http://localhost:3000/students/find/${ra}`)
 .then(function(response){
   return response.json();
 })
 .then(function(data){
   // console.log(data);

    const studentForm = $("#studentForm");
   
    studentForm.find("#name").val(data.name); /**procurando ume lemento dentro do formulario e coloca esse valor nele (se for input usa o .val() se for um texto em html usa .html ) */
    studentForm.find("#email").val(data.email);
    studentForm.find("#ra").val(data.ra);
    studentForm.find("#cpf").val(data.cpf);

    $(".loader").hide("fast");
    $(".content-page").show("slow");

 });
 } else {
    alert(`Nenhuma informação foi encotrada.`);
 }
 
}