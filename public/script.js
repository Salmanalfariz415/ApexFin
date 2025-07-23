let response=document.getElementById('response');
let submit=document.getElementById('submitButton');
let emailInput=document.getElementById('emailInput');
let userEmail;
function sendEmail(userEmail){
        return fetch('api/send/email',{
            method: 'POST',
            body: JSON.stringify({
                email: userEmail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
}
submit.addEventListener('click', async function() {
    userEmail = emailInput.value;
    sendEmail(userEmail);
    response.innerHTML = "Email sent successfully!";
});

