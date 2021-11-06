function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.238.58:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionBicicleta() {
    $.ajax({
        url:"http://144.22.238.58:8080/api/Bike/all",
        
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaBicicleta(response);
        }

    });

}

function pintarRespuestaBicicleta(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<th>Nombre</th>";
        myTable+="<th>Marca</th>";
        myTable+="<th>Año</th>";
        myTable+="<th>Descripción</th>";
        myTable+="<th>Categoria</th>";
        myTable+="<th>Actualizar</th>";
        myTable+="<th>Borrar</th>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar Bicicleta!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar Bicicleta!</button></td>';
        //myTable+='<td><button class = "botonSkate2" onclick="cargarDatosBicileta(' + response[i].id + ')">Editar Bicicleta!</button></td>';
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaBike").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosBicileta(id) {
    $.ajax({
        dataType: 'json',
        url:"http://144.22.238.58:8080/api/Bike/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarBicicleta() {

    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("⚠️Todos los campos son obligatorios⚠️")
    }else{

            let elemento = {
                name: $("#name2").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://144.22.238.58:8080/api/Bike/save",
                //url: "http://localhost:8080/api/Skate/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("¡Se guardo correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("¡No se guardo correctamente!")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://144.22.238.58:8080/api/Bike/"+idElemento,
            //url: "http://localhost:8080/api/Skate/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaBike").empty();

                alert("Se ha borrado correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("¡No se borro correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://144.22.238.58:8080/api/Bike/update",
            //url: "http://localhost:8080/api/Bike/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaBike").empty();
                traerInformacionBicicleta();
                alert("¡Actualizado correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("¡No se actualizó correctamente!")
            }
        });
    }
}
