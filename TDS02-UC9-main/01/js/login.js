document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const authSection = document.getElementById("auth-section");
    const mainContent = document.getElementById("main-content");
    const navMenu = document.getElementById("nav-menu");
    const btnLogout = document.getElementById("btn-logout");

    if(token) {
        authSection.style.display = 'none';
        mainContent.style.display = 'block';
        navMenu.style.display = 'inline-block';
        btnLogout.style.display = 'inline-block';
    } else {
        authSection.style.display = 'block';
        mainContent.style.display = 'none';
        navMenu.style.display = 'none';
        btnLogout.style.display = 'none';
    }

    const loginForm = document.getElementById("login-form");
    if(loginForm) {        
        loginForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                const response = await fetch(API_BASE_URL + '/Usuarios/autenticar', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, senha})
                });

                if(response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                }

            } catch (err) {
                console.log(err);
            }
        });
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.reload();
}