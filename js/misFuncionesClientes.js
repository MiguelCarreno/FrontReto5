/////////Tabla Cliente////////////////////////////

function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.238.58:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    
    })

}
function pintarRespuesta2(respuesta){

    let myTable="<table>";

    myTable+="<tr><th>Correo</th><th>Contraseña</th><th>Nombre</th><th>Edad</th><th>Actualizar</th><th>Borrar</th></tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCliente("+respuesta[i].idClient+")'>Actualizar Cliente!</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar Cliente!</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente(){

    if($("#Clemail").val().length == 0 || $("#Clpassword").val().length == 0 || $("#Clname").val().length == 0 || $("#Clage").val().length == 0){

        alert("⚠️Todos los campos son obligatorios⚠️");
    }else{

    let var2 = {
        
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.238.58:8080/api/Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("¡Se guardo correctamente!");
            alert("¡Se guardo correctamente!");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("¡No se guardo correctamente¡");
    
    
        }
        });

}
}

function actualizarInformacionCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.58:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            autoInicioCliente();
            alert("¡Actualizado correctamente!")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://144.22.238.58:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCliente();
            alert("¡Borrado correctamente!")
        }
    });

}