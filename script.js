function addToCart(event) {
    event.preventDefault();
    var product = {
        image: event.target.parentElement.parentElement.getElementsByTagName("img")[0].src,
        description: event.target.parentElement.parentElement.getElementsByTagName("div")[0].textContent,
        price: event.target.parentElement.parentElement.getElementsByTagName("h4")[0].textContent,
        qty: 1
    };

    var products = JSON.parse(localStorage.getItem("products"));
    if (products == null) {
        products = [];
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    window.location.href = "cart.html";
}

function removeFromCart(event) {
    event.preventDefault();
    localStorage.removeItem("img");
    localStorage.removeItem("des");
    localStorage.removeItem("price");
    window.location.href = "cart.html";
}

var subtotal = 0;
function readAllItems(){
    var products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
    products.forEach(function(product) {
        console.log(product);
        
        if(product.price.indexOf("$") != -1){
            var price = parseFloat(product.price.replace("$", ""));
            subtotal += price * product.qty;
        }
        addRow(product.image, product.description, product.qty, price);
    });
    document.getElementById("subtotal").textContent = "$" + subtotal;
}

function addRow(image, description, qty, price) {
    // Seleccionar la tabla
    const table = document.getElementById('cart_products').getElementsByTagName('tbody')[0];

    // Crear una nueva fila
    const newRow = table.insertRow();

    // Crear y agregar las celdas a la fila
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    var cel1 = `<div class="cart-info">
                    <img id="img" src="` + image +`" alt="` + description + `">
                    <div>
                        <p>` + description + `</p>
                        <br>
                        <a href="#">Remove</a>
                    </div>
                </div>`;
    // Insertar contenido en las celdas
    cell1.innerHTML = cel1;
    cell2.innerHTML = `<input type="number" onchange="updateQuantity(event)" value="` + qty + `">`;
    cell3.textContent = "$" + price;
    var importe = qty * price;
    cell4.textContent = "$" + importe;
}

function updateQuantity(event){
    subtotal = 0;
    var products = [];
    var rows = document.querySelectorAll("table#cart_products tbody tr");
    rows.forEach(function(row) {
        var qty = parseFloat(row.getElementsByTagName("td")[1].getElementsByTagName("input")[0].value);
        var price = parseFloat(row.getElementsByTagName("td")[2].textContent.replace("$",""));
        var importe = qty * price;
        row.getElementsByTagName("td")[3].textContent = "$" + importe;
        subtotal += importe; 

        var product = {
            image: row.getElementsByTagName("td")[0].getElementsByTagName("div")[0].getElementsByTagName("img")[0].src,
            description: row.getElementsByTagName("td")[0].getElementsByTagName("div")[0].getElementsByTagName("p")[0].textContent,
            price: row.getElementsByTagName("td")[2].textContent,
            qty: qty
        };
        products.push(product);
    });

    document.getElementById("subtotal").textContent = "$" + subtotal;
    localStorage.setItem("products", JSON.stringify(products));
}
