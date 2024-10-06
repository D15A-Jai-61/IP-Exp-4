// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);

    // Add event listeners for real-time validation
    document.getElementById('tagline').addEventListener('input', validateTagline);
    document.getElementById('pnumber').addEventListener('input', validatePhoneNumber);
    document.getElementById('date').addEventListener('input', validateDate);
});

function validateTagline() {
    const tagline = document.getElementById('tagline');
    const regex = /^[A-Za-z]{0,15}$/;
    if (!regex.test(tagline.value)) {
        tagline.setCustomValidity('Tagline must be 0-15 letters.');
    } else {
        tagline.setCustomValidity('');
    }
}

function validatePhoneNumber() {
    const phoneNumber = document.getElementById('pnumber');
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phoneNumber.value)) {
        phoneNumber.setCustomValidity('Phone number must be exactly 10 digits.');
    } else {
        phoneNumber.setCustomValidity('');
    }
}

function validateDate() {
    const dateInput = document.getElementById('date');
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 3));

    if (selectedDate < minDate) {
        dateInput.setCustomValidity('Delivery date must be at least 3 days from today.');
    } else {
        dateInput.setCustomValidity('');
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Perform final validation
    validateTagline();
    validatePhoneNumber();
    validateDate();

    if (event.target.checkValidity()) {
        // If all validations pass, generate and display the receipt
        generateReceipt();
    } else {
        // If there are validation errors, show them to the user
        event.target.reportValidity();
    }
}

function generateReceipt() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('pnumber').value;
    const tagline = document.getElementById('tagline').value;
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;
    const deliveryDate = document.getElementById('date').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    const basePrice = 400;
    const discount = quantity >= 50 ? 0.25 : 0;
    const totalPrice = basePrice * quantity * (1 - discount);

    const receiptDate = new Date().toLocaleDateString();

    const receiptHTML = `
        <h2>Order Receipt</h2>
        <p><strong>Date:</strong> ${receiptDate}</p>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <h3>Order Details:</h3>
        <p><strong>Tagline:</strong> ${tagline}</p>
        <p><strong>Color:</strong> ${color}</p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)} INR</p>
        <p>Thank you for your order!</p>
    `;

    // Create a new window to display the receipt
    const receiptWindow = window.open('', 'Receipt', 'width=600,height=700');
    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
}
