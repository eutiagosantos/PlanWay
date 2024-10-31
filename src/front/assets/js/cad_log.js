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
    };

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

    if (!email || !password || (isLogin && !cpfCnpj)) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
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
            alert(`Esse usuaario já existe`);
        }
    } catch (error) {
        console.error('Erro detalhado:', error);
        alert(`Erro ao conectar ao servidor: ${error.message}`);
    }
}

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let documento = document.getElementById('cpf-cnpj').value;

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
            // Aqui você define o tipo de usuário
            let userType;
            if (documento.length === 11) {
                userType = 'cliente';
            } else if (documento.length === 14) {
                userType = 'agencia';
            } else {
                alert('Login, CPF/CNPJ ou senha estão incorretos');
                return;
            }

            // Armazenar informações de login
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userType', userType);

            alert('Login realizado com sucesso!');
            window.location.href = userType === 'cliente' ? 'home.html' : 'home_agencia.html';
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
