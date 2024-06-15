

// Validación de campos del formulario y manipulación avanzada del DOM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const emailInput = document.getElementById('email');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const fechaIngresoInput = document.getElementById('fechaIngreso');
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    const modalContent = document.getElementById('modalContent');
    const confirmBtn = document.getElementById('confirmBtn');
    const userGrid = document.getElementById('userGrid');
    const emails = new Set();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        if (emails.has(emailInput.value)) {
            alert('El correo electrónico ya está registrado.');
            return;
        }

        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const fechaIngreso = new Date(fechaIngresoInput.value);
        const ageDifference = new Date(fechaIngreso - fechaNacimiento).getFullYear() - 1970;
        if (ageDifference < 18) {
            alert('El trabajador no puede ingresar antes de los 18 años.');
            return;
        }

        modalContent.innerHTML = `
            <p>Nombre: ${form.nombre.value}</p>
            <p>Apellido: ${form.apellido.value}</p>
            <p>Fecha de Nacimiento: ${form.fechaNacimiento.value}</p>
            <p>Correo Electrónico: ${form.email.value}</p>
            <p>Cargo: ${form.cargo.value}</p>
            <p>Fecha de Ingreso: ${form.fechaIngreso.value}</p>
        `;
        modal.show();
    });

    confirmBtn.addEventListener('click', function() {
        const nombre = form.nombre.value;
        const apellido = form.apellido.value;
        const email = form.email.value;
        const cargo = form.cargo.value;
        const fechaIngreso = form.fechaIngreso.value;

        const userCard = document.createElement('div');
        userCard.className = 'col-md-3 mb-3';
        userCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${nombre} ${apellido}</h5>
                    <p class="card-text">${email}</p>
                    <p class="card-text">${cargo}</p>
                    <p class="card-text">${fechaIngreso}</p>
                    <button class="btn btn-danger" onclick="removeUser(this)">Eliminar</button>
                </div>
            </div>
        `;

        userGrid.appendChild(userCard);
        emails.add(email);

        form.reset();
        form.classList.remove('was-validated');
        modal.hide();
    });

    function removeUser(button) {
        const card = button.closest('.col-md-3');
        const email = card.querySelector('.card-text').textContent;
        emails.delete(email);
        userGrid.removeChild(card);
    }
});
