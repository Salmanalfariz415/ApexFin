let response=document.getElementById('response');
let submit=document.getElementById('submitButton');
let emailInput=document.getElementById('emailInput');
let userEmail;
let otpinp=document.getElementById('otpInput');
let otpsubmit=document.getElementById('otpsubmit');

let otp=otpinp.value;

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
    userEmail = emailInput.value.trim();
    if(userEmail ==""){
        response.innerHTML="Kindly input the email";
    }
    else{
        sendEmail(userEmail);
    response.innerHTML = "Email sent successfully!";
    optinp.style.opacity=1;
    }
});
function sendOtp(otp){
    fetch('api/send/otp',{
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            otp: otp
        })
    })
}
otpsubmit.addEventListener("click",()=>{
    sendOtp(otp);
})
