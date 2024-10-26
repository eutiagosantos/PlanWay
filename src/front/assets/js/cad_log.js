let isLogin = true;

// Inicializar ouvintes
function initEventListeners() {
    document.getElementById('toggle-layout').addEventListener('click', function (e) {
        e.preventDefault();
        toggleLayout();
    });

    document.getElementById('toggle-password').addEventListener('click', function () {
        togglePasswordVisibility();
    });

    document.getElementById('auth-form').addEventListener('submit', function (e) {
        e.preventDefault();
        handleSubmit();
    });
}

function toggleLayout() {
    isLogin = !isLogin;
    document.getElementById('form-title').textContent = isLogin ? 'Login' : 'Cadastro';
    document.getElementById('submit-btn').textContent = isLogin ? 'Entrar' : 'Cadastrar';
    document.getElementById('confirm-password-group').style.display = isLogin ? 'none' : 'block';
    document.getElementById('toggle-text').innerHTML = isLogin
        ? 'Ainda não possui uma conta? <a href="#" id="toggle-layout" class="link-cadastro">Cadastrar</a>'
        : 'Já possui uma conta? <a href="#" id="toggle-layout" class="link-cadastro">Login</a>';

    // Atualizar o ouvinte para o novo "toggle-layout"
    document.getElementById('toggle-layout').addEventListener('click', function (e) {
        e.preventDefault();
        toggleLayout();
    });
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const isPasswordVisible = passwordInput.type === 'password';

    passwordInput.type = isPasswordVisible ? 'text' : 'password';
    confirmPasswordInput.type = isPasswordVisible ? 'text' : 'password';
}

function handleSubmit() {
    const email = document.getElementById('email').value;
    const cpfCnpj = document.getElementById('cpf-cnpj').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!isLogin) {
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }
        cadastro();
    } else {
        login();
    }
}

async function cadastro() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let documento = document.getElementById('cpf-cnpj').value;

    try {
        const response = await fetch("http://localhost:8081/api/usuarios/cadastrar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                documento: documento,
            })
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            toggleLayout();
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao cadastrar: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erro detalhado:', error);
        alert(`Erro ao conectar ao servidor: ${error.message}`);
    }
}


async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:8081/api/usuarios/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        if (response.ok) {
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao logar: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Erro detalhado:', error);
        alert(`Erro ao conectar ao servidor: ${error.message}`);
    }

}



initEventListeners();
