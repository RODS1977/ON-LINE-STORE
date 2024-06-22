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


// Code for register and login Toggle
const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click", () => { 
    container.classList.remove("toggle");
})

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
})

// code for Sign In and Register INPUTS//
const formSignIn = document.getElementById("formSignIn");
const formRegister = document.getElementById("formRegister");
const username = document.getElementById("user-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confpass = document.getElementById("confirm-password");
var isRegisterFormValid = true;

formSignIn.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = formSignIn.querySelector("#signInEmail").value;
    const password = formSignIn.querySelector("#signInPassword").value;

    const authenticated = authentication(email, password)

    if (authenticated) {
        window.location.href = "index.html"
    }
    else {
        alert("Incorrect email or password")
    }
});

formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    isRegisterFormValid = true;
    
    if (ValidateInputs()) {
        // Store the inputs in local storage
        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        localStorage.setItem("confpass", confpass.value);
        window.location.href = "index.html";
    }
})



const setError = (element, message) => {
    isRegisterFormValid = false;
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
}

const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    if (errorDisplay!=null) {
        
        errorDisplay.innerText = '';
        inputControl.classList.add("success");
        inputControl.classList.remove("error");
        console.log(inputControl.classList);
    }
}

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const ValidateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confpassValue = confpass.value.trim();

    if(usernameValue === "") {
        setError(username, "Username is required");
    } else {
        setSuccess(username);
    }

    if(emailValue === "") {
        setError(email, "Email is required");
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Provide a valid email address");
    } else {
        setSuccess(email);
    }

    if(passwordValue === "") {
        setError(password, "Password is required");
    } else if (passwordValue.length < 8) {
        setError(password, "Password must be at least 8 character.")
    } else {
        setSuccess(password);
    }   

    if(confpassValue === "") {
        setError(confpass, "Confirm Password is required");
    } else if (confpassValue !== passwordValue) {
        setError(confpass, "Password does not match");
    } else {
        setSuccess(confpass);
    }

    return isRegisterFormValid;
}//

// function for checking password and password confirmation//
function authentication(email, password) {
    // Check if the username and password match the stored values
    if (email === localStorage.getItem("email") && password === localStorage.getItem("password")) {
        return true;
    } else {
        return false;
    }
}

// -------------------------------------------- //
// Code for payment and order//
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el formulario y los botones relevantes
    const form = document.querySelector('.form');
    const paymentButton = form.querySelector('.form-payment button');
    const orderButton = form.querySelector('.review-order button');

    // Función para validar campos de texto
    function validateTextFields(fields) {
        for (const field of fields) {
            if (field.value.trim() === '') {
                throw new Error(`El campo ${field.placeholder} no puede estar vacío.`);
            }
        }
    }

    // Función para validar email
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            throw new Error(`El email ${email.value.trim()} no es válido.`);
        }
    }

    // Función para validar el número de tarjeta de crédito (solo una validación básica de longitud)
    function validateCardNumber(cardNumber) {
        if (cardNumber.value.trim().length < 13 || cardNumber.value.trim().length > 19) {
            throw new Error('El número de la tarjeta de crédito debe tener entre 13 y 19 dígitos.');
        }
    }

    // Función para validar la fecha de expiración de la tarjeta (formato básico MM/AA)
    function validateCardExpiration(cardExpiration) {
        const expirationPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expirationPattern.test(cardExpiration.value.trim())) {
            throw new Error('La fecha de expiración debe estar en formato MM/AA.');
        }
    }

    // Función para manejar la validación de entrega y el pago
    function handleValidation(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        try {
            // Validar campos de entrega
            const deliveryFields = [
                document.getElementById('name'),
                document.getElementById('street'),
                document.getElementById('city'),
                document.getElementById('state'),
                document.getElementById('zip'),
                document.getElementById('email'),
                document.getElementById('phone')
            ];
            validateTextFields(deliveryFields);
            validateEmail(document.getElementById('email'));

            // Validar campos de pago (si se está procesando el pago)
            if (event.target === paymentButton || event.target === orderButton) {
                const paymentFields = [
                    document.getElementById('card-name'),
                    document.getElementById('card-number'),
                    document.getElementById('card-expiration'),
                    document.getElementById('card-cvv')
                ];
                validateTextFields(paymentFields);
                validateCardNumber(document.getElementById('card-number'));
                validateCardExpiration(document.getElementById('card-expiration'));
            }

            // Simulación del proceso de pago
            if (event.target === paymentButton) {
                alert('Datos de entrega válidos. Continúe al pago.');
            } else if (event.target === orderButton) {
                alert('Pago realizado con éxito. Gracias por su compra.');
            }

        } catch (error) {
            alert(error.message); // Mostrar el mensaje de error al usuario
        }
    }

    // Asignar la función de validación a los botones correspondientes
    paymentButton.addEventListener('click', handleValidation);
    orderButton.addEventListener('click', handleValidation);
});


//-----CART AND CHECKOUT-----//
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos los botones y las secciones relevantes
    const continueToPaymentButton = document.getElementById('continueToPayment');
    const continueToFinishButton = document.getElementById('continueToFinish');
    const placeOrderButton = document.getElementById('placeOrder');

    const formDelivery = document.querySelector('.form-delivery');
    const formPayment = document.querySelector('.form-payment');
    const reviewOrder = document.querySelector('.review-order');

    // Función para ocultar una sección
    function hideSection(section) {
        section.classList.add('hidden');
    }

    // Función para mostrar una sección
    function showSection(section) {
        section.classList.remove('hidden');
    }

    // Event listener para "CONTINUE TO PAYMENT"
    continueToPaymentButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
            // Ocultar sección de entrega y mostrar sección de pago
            hideSection(formDelivery);
            showSection(formPayment);
        } catch (error) {
            console.error("Error al continuar a la sección de pago:", error);
        }
    });

    // Event listener para "CONTINUE TO FINISH"
    continueToFinishButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
            // Ocultar sección de pago y mostrar sección de revisión de pedido
            hideSection(formPayment);
            showSection(reviewOrder);
        } catch (error) {
            console.error("Error al continuar a la revisión de pedido:", error);
        }
    });

    // Event listener para "PLACE ORDER"
    placeOrderButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
            // Ocultar sección de revisión de pedido y finalizar la compra (simulado)
            hideSection(reviewOrder);
            alert('Pedido realizado con éxito. Gracias por su compra.');
        } catch (error) {
            console.error("Error al realizar el pedido:", error);
        }
    });

    // Ocultar secciones de pago y revisión al cargar la página
    hideSection(formPayment);
    hideSection(reviewOrder);
});

