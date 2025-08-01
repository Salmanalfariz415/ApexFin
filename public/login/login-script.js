if (performance.navigation.type === 1) {
    window.location.href = "/dashboard";
}
let email=document.getElementById("email");
let pass=document.getElementById("password");
let submit=document.getElementById("submit");
let userEmail;
let passwd;
let response=document.getElementById("response");

async function sendEmail(userEmail,passwd){
    try{
        const result = await fetch('/login/send',{
        method:'POST',
        headers: {
                'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            email:userEmail,
            password:passwd,
            
        })
    })
    const data=await result.json();
        return{success:result.ok,data:data};
    }
    catch(err){
        return{error:err.message,success:false};

    }
}
loginsubmit.addEventListener("click",async function(){
    userEmail=email.value.trim;
    passwd=pass.value.trim;
    sendEmail(userEmail,passwd);
    const result=await sendEmail(userEmail,passwd);
    if(result.success){
        response.innerHTML="Successfully Logged In";
    }
    else{
        response.innerHTML="Invalid Credentails";
    }
});
