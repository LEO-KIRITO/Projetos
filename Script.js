document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const usuarioValido = "admin";
    const senhaValida = "1234";
  
    if (username === usuarioValido && password === senhaValida) {
      window.location.href = " inicial.html ";
    } else {
      const msg = document.getElementById("message");
      msg.style.color = "red";
      msg.textContent = "Usuário ou senha incorretos.";
    }
  });
  
