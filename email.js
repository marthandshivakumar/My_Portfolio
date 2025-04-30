// Complete EmailJS Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    (function() {
        emailjs.init("Yw-sGpL6iq2Rou_63"); // Your public key, not service ID
    })();
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value || "Portfolio Contact Request";
            const message = document.getElementById('message').value;
            const mobile = document.getElementById('mobile') ? document.getElementById('mobile').value : "";
            
            const templateParams = {
                name: "Shiva Kumar", 
                from_name: name,   
                message: message,    
                mobile: mobile || "Not provided",
                email: email        
            };
            
            emailjs.send("service_gqjbnwm", "template_pk1yfek", templateParams)
                .then(function(response) {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Thank you for your message! I will get back to you soon.");
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.log("FAILED...", error);
                    alert("Oops! Something went wrong. Please try again later.");
                })
                .finally(function() {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    } else {
        console.error("Contact form with ID 'contactForm' not found!");
    }
});