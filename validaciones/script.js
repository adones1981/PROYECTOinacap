
// script.js


function showMessageModal(title, message) {
    const modal = document.getElementById('messageModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.classList.remove('hidden');
}


function hideMessageModal() {
    const modal = document.getElementById('messageModal');
    modal.classList.add('hidden');
}


document.getElementById('closeModal').addEventListener('click', hideMessageModal);

// Función para validar el RUT chileno
function validarRUT(rut) {
    rut = rut.replace(/\./g, '').replace('-', ''); 
    if (rut.length < 8) return false; 

    const cuerpo = rut.slice(0, -1); 
    let dv = rut.slice(-1).toUpperCase(); 

    let suma = 0;
    let multiplo = 2; 
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo; 
        multiplo = multiplo < 7 ? multiplo + 1 : 2; 
    }
    let dvr = 11 - (suma % 11); 
    dvr = dvr === 11 ? '0' : dvr === 10 ? 'K' : dvr.toString(); // Convierte 11 a '0', 10 a 'K', o a string

    return dv === dvr; // Compara el dígito verificador ingresado con el calculado
}

// Array de objetos para los elementos del portafolio
const portfolioItems = [
    {
        title: "Creación de app",
        description: "Desarrollo de apps funcionales para equipos móviles"
    },
    {
        title: "Creación de páginas web",
        description: "Desarrollo páginas para clientes personalizadas"
    },
    {
        title: "Diseño UI/UX",
        description: "Creación de interfaces de usuario intuitivas y experiencias de usuario atractivas."
    },
    {
        title: "Gestión de Bases de Datos",
        description: "Diseño y administración de bases de datos relacionales y no relacionales."
    }
];

// Función para renderizar el portafolio dinámicamente
function renderPortfolio() {
    const portfolioGallery = document.querySelector('.portfolio-gallery');
    portfolioGallery.innerHTML = ''; 
    portfolioItems.forEach(item => {
        const portfolioItemDiv = document.createElement('div');
        portfolioItemDiv.classList.add('bg-gray-700', 'p-6', 'rounded-lg', 'shadow-md', 'hover:shadow-xl', 'transition', 'duration-300');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('text-xl', 'font-semibold', 'text-lime-300', 'mb-2');
        titleElement.textContent = item.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('text-gray-200');
        descriptionElement.textContent = item.description;

        portfolioItemDiv.appendChild(titleElement);
        portfolioItemDiv.appendChild(descriptionElement);
        portfolioGallery.appendChild(portfolioItemDiv);
    });
}

// Llamar a la función para renderizar el portafolio cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', renderPortfolio);

const formulario = document.getElementById('formularioContacto');


const nombreInput = document.getElementById('nombre');
const mensajeInput = document.getElementById('mensaje');


nombreInput.addEventListener('input', () => {
    const seccionInicio = document.getElementById('inicio');
    const welcomeHeading = seccionInicio.querySelector('h2');
    if (nombreInput.value.trim() !== "") {
        welcomeHeading.textContent = `¡Hola, ${nombreInput.value.trim()}!`;
    } else {
        welcomeHeading.textContent = `¡Bienvenidos!`;
    }
});


const contador = document.createElement('p');
contador.id = 'contador-caracteres'; // Asigna ID para referencia CSS/JS
mensajeInput.insertAdjacentElement('afterend', contador); // Inserta el contador después del textarea

mensajeInput.addEventListener('input', () => {
    contador.textContent = `Caracteres: ${mensajeInput.value.length}`;
});

// 3. Cambiar borde al escribir en cualquier input y borrar mensajes de error (feedback visual y limpieza)
const inputs = document.querySelectorAll('#formularioContacto input, #formularioContacto textarea');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        // Elimina clases de borde de error y añade borde neutral de Tailwind
        input.classList.remove('border-red-500');
        input.classList.add('focus:border-lime-400', 'focus:ring-lime-400');

        // Identifica el span de error asociado a este input y borra su contenido
        const errorSpanId = `error-${input.id}`;
        const errorSpan = document.getElementById(errorSpanId);
        if (errorSpan) {
            errorSpan.textContent = ''; 
        }
    });
    
    input.addEventListener('blur', () => {
        input.classList.remove('focus:border-lime-400', 'focus:ring-lime-400');
    });
});

// Event listener para el envío del formulario
formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // Previene el envío por defecto del formulario

    // Obtiene los valores de los campos
    const rut = document.getElementById('rut').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const comuna = document.getElementById('comuna').value.trim();
    const mensaje = mensajeInput.value.trim();

    // Referencias a los elementos de mensaje de error
    const errorNombre = document.getElementById('error-nombre');
    const errorRut = document.getElementById('error-rut');
    const errorEmail = document.getElementById('error-email');
    const errorTelefono = document.getElementById('error-telefono');
    const errorComuna = document.getElementById('error-comuna');
    const errorMensaje = document.getElementById('error-mensaje');

    // Limpiar errores anteriores y reiniciar bordes de input
    [errorNombre, errorRut, errorEmail, errorTelefono, errorComuna, errorMensaje].forEach(errElement => {
        errElement.textContent = "";
        const inputElement = errElement.previousElementSibling; 
        if (inputElement) {
            inputElement.classList.remove('border-red-500'); 
        }
    });

    // Expresiones regulares para validación de email y teléfono
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{7,15}$/;

    let valido = true; // Bandera de validación

    // Validaciones de cada campo
    if (!nombreInput.value.trim()) {
        errorNombre.textContent = 'Por favor, ingresa tu nombre.';
        nombreInput.classList.add('border-red-500'); // Añade borde rojo
        valido = false;
    }

    if (!rut || !validarRUT(rut)) {
        errorRut.textContent = 'Por favor, ingresa un RUT válido.';
        document.getElementById('rut').classList.add('border-red-500');
        valido = false;
    }

    if (!email || !emailRegex.test(email)) {
        errorEmail.textContent = 'Por favor, ingresa un email válido.';
        document.getElementById('email').classList.add('border-red-500');
        valido = false;
    }

    if (!telefono || !telefonoRegex.test(telefono)) {
        errorTelefono.textContent = 'El teléfono debe tener solo números (7 a 15 dígitos).';
        document.getElementById('telefono').classList.add('border-red-500');
        valido = false;
    }

    if (!comuna) {
        errorComuna.textContent = 'Por favor, ingresa tu comuna.';
        document.getElementById('comuna').classList.add('border-red-500');
        valido = false;
    }

    if (!mensaje || mensaje.length < 10) {
        errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
        mensajeInput.classList.add('border-red-500');
        valido = false;
    }

    // Si todas las validaciones son correctas
    if (valido) {
        showMessageModal('Mensaje Enviado', '¡Tu mensaje ha sido enviado correctamente!'); // Muestra el modal
        formulario.reset(); // Reinicia el formulario
        contador.textContent = ""; // Limpia el contador de caracteres
        document.getElementById('inicio').querySelector('h2').textContent = "¡Bienvenidos!"; // Restaura el saludo
    } else {
        showMessageModal('Error de Validación', 'Por favor, corrige los errores en el formulario.'); // Muestra el modal de error
    }
});
