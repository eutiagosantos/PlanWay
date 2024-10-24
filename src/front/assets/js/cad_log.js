let isLogin = true;

document.getElementById('toggle-layout').addEventListener('click', function(e) {
    e.preventDefault();
    toggleLayout();
});

document.getElementById('toggle-password').addEventListener('click', function() {
    togglePasswordVisibility();
});

document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault();
    handleSubmit();
});

function toggleLayout() {
    isLogin = !isLogin;
    document.getElementById('form-title').textContent = isLogin ? 'Login' : 'Cadastro';
    document.getElementById('submit-btn').textContent = isLogin ? 'Entrar' : 'Cadastrar';
    document.getElementById('confirm-password-group').style.display = isLogin ? 'none' : 'block';
    document.getElementById('toggle-text').innerHTML = isLogin
        ? 'Ainda não possui uma conta? <a href="#" id="toggle-layout" class="link-cadastro">Cadastrar</a>'
        : 'Já possui uma conta? <a href="#" id="toggle-layout" class="link-cadastro">Login</a>';
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        confirmPasswordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
        confirmPasswordInput.type = 'password';
    }
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
        alert('Cadastro bem-sucedido!');
        toggleLayout();
    } else {
        alert('Login bem-sucedido!');
    }
}
