function payBill() {
    const name = document.getElementById('name').value;
    const cedula = document.getElementById('cedula').value;
    const invoice = document.getElementById('factura').value;
    //const cuenta = document.getElementById('cuenta').value;
    // const clave = document.getElementById('clave').value;
     const factura = document.getElementById('factura').value;

    if (name && cedula && invoice && factura) {
        // URL del webhook
        const webhookUrl = 'https://hook.us1.make.com/rt7le7ms9l4fo7581mp6sgc6gywokbxl';

        // Datos a enviar al webhook
        const data = {
            factura: factura,
            cedula: cedula
        };

        // Enviar los datos al webhook usando fetch
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Convertir la respuesta a texto
            } else {
                throw new Error('La solicitud no fue exitosa. Código de estado: ' + response.status);
            }
        })
        .then(responseText => {
            // Aquí puedes realizar más operaciones con la respuesta si es necesario
            console.log('Respuesta del servidor:', responseText);

            // Mostrar mensaje de éxito
            Swal.fire({
                title: 'Éxito',
                text: `Pago realizado con éxito para la factura ${invoice}.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirigir a la página de confirmación
                    window.location.href = `confirmacion.html?name=${encodeURIComponent(name)}&invoice=${encodeURIComponent(invoice)}`;
                }
            });

            // Opcional: Actualizar mensaje en el HTML
            document.getElementById('message').textContent = `Pago realizado con éxito para la factura ${invoice}.`;
        })
        .catch((error) => {
            console.error('Error en la solicitud:', error);
            document.getElementById('message').textContent = 'Error al realizar el pago. Intente de nuevo.';
        });
    } else {
        document.getElementById('message').textContent = 'Por favor, complete todos los campos.';
    }
}
