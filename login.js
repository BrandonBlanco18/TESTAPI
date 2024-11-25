document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:2701/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    const result = await response.json();
    if (response.ok) {
      window.location.href = 'home.html'; // Redirige a la página principal si el inicio de sesión es exitoso
    } else {
      alert(result.error); // Muestra un mensaje de alerta si hay un error
    }
  });
  