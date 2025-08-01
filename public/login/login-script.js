if (performance.navigation.type === 1) {
    window.location.href = "/";
}
let email=document.getElementById("email");
let pass=document.getElementById("password");
let loginform=document.getElementById("loginform");
let userEmail;
let passwd;
let response=document.getElementById("response");

async function sendEmail(userEmail,passwd){
    try{
        const result = await fetch('/login',{
        method:'POST',
        body : JSON.stringify({
            email:userEmail,
            password:passwd
        }),
        headers: {
                'Content-Type': 'application/json'
        }
    })
    const data=await result.json();
        return{success:result.ok,data:data};
    }
    catch(err){
        return{error:err.message,success:false};

    }
}
loginform.addEventListener("submit",async function(event){
    event.preventDefault()
    userEmail = email.value.trim();
    passwd=pass.value.trim();
    const result=await sendEmail(userEmail,passwd);
    if(result.success){
        response.innerHTML="Successfully Logged In";
        window.location.href="../main/"
    }
    else{
        response.innerHTML="Invalid Credentails";
    }
});
