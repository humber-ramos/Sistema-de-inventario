var selectedRow = null;

//Mostrar alertas
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main)

    setTimeout(() => document.querySelector(".alert").remove(), 3000);

}

//Limpiar los campos
function clearFields(){
    document.querySelector("#Name").value = "";
    document.querySelector("#Description").value = "";
    document.querySelector("#Unit-price").value = "";
    document.querySelector("#Initial-qty").value = "";
}

//Añadir producto a la lista
document.querySelector("#product-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.querySelector("#Name").value;
    const desc = document.querySelector("#Description").value;
    const price = document.querySelector("#Unit-price").value;
    const qty = document.querySelector("#Initial-qty").value;
    
    if(name == "" || desc == "" || price == "" || qty == ""){
        showAlert("Por favor complete todos los campos", "danger")
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#product-list");
            const row = document.createElement("tr");           

            row.innerHTML = `
                <td>${name}</td>
                <td>${desc}</td>
                <td>${price}</td>
                <td>${qty} <input type="number" id="number"></td>
                <td>
                    <a href="#" class="btn btn-success btn-sm edit">Editar</a>   
                    <a href="#" class="btn btn-danger btn-sm delete">Eliminar</a>
                    <a href="#" class="btn btn-info btn-sm update">Actualizar Inventario</a> 
                </td>
            `
            list.appendChild(row);
            selectedRow = null;
            showAlert("Producto agregado con éxito", "success");
        }
        else{
            selectedRow.children[0].textContent = name;
            selectedRow.children[1].textContent = desc;
            selectedRow.children[2].textContent = price;
            selectedRow.children[3].textContent = qty;
            selectedRow = null
            showAlert("Información del producto actualizada", "info")
        } 

       clearFields();

    } 
})

//Editar un producto
document.querySelector("#product-list").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#Name").value = selectedRow.children[0].textContent;
        document.querySelector("#Description").value = selectedRow.children[1].textContent;
        document.querySelector("#Unit-price").value = selectedRow.children[2].textContent;
        document.querySelector("#Initial-qty").value = selectedRow.children[3].textContent;
    }
});

//Actualizar inventario
document.querySelector("#product-list").addEventListener("click", (e)=>{
  target = e.target;
  if(target.classList.contains("update")){
      selectedRow = target.parentElement.parentElement;
      newStock = selectedRow.querySelector("#number").value;
      if(newStock == ""){

      }
      else{
        selectedRow.children[3].innerHTML = `${newStock} <input type="number" id="number">`;   
        selectedRow = null;
      }
  }
  
});


//Eliminar un producto
document.querySelector("#product-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Producto eliminado", "danger")
    }
})

//código para realizar una búsqueda 
$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#product-list tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

//Funciones para filtrar por precio e inventario
  function Less_than_10() {
    var price, found, table, tr, td, i, j;
    price = 10;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
         if(parseInt(td[2].textContent) < price) {
          found = true;
        }
      
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  

  function From_10_100() {
    var price, found, table, tr, td, i, j;
    price_min = 10;
    price_max = 100;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
         if(parseInt(td[2].textContent) >= price_min && parseInt(td[2].textContent) <= price_max) {
          found = true;
        }
      
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function Over_100() {
    var price, found, table, tr, td, i, j;
    price = 100;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
         if(parseInt(td[2].textContent) > price) {
          found = true;
        }
      
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function showAllPrice() {
    var table, tr, i, j;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        tr[i].style.display = "";
      }
    }
  }

  function zero() {
    var stock, found, table, tr, td, i, j;
    stock = 0;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
         if(parseInt(td[3].textContent) == stock) {
          found = true;
        }
      
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function low() {
    var stock, found, table, tr, td, i, j;
    stock_min = 1;
    stock_max = 20;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
         if(parseInt(td[3].textContent) >= stock_min && parseInt(td[3].textContent) <= stock_max) {
          found = true;
        }
      
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function high() {
    var stock, found, table, tr, td, i, j;
    stock = 20;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
         if(parseInt(td[3].textContent) > stock) {
          found = true;
        }
      
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function showAllStock() {
    var table, tr, i, j;
    table = document.getElementById("product-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        tr[i].style.display = "";
      }
    }
  }

  //Función para evitar que se ingresen letras para el precio e inventario (solo números)
  function validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  //Función para permitir el ingreso a la página principal
  function auth(){
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    if(user == "humberto@botblaze.com" && pass == 1234){
      event.preventDefault()
        window.location.replace("index.html")
        alert("Ingreso exitoso")
    }
    else{
      alert("Información incorrecta")
    }
  }