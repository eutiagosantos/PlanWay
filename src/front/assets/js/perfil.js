// Carrega os dados do perfil
function loadProfile() {
    const email = localStorage.getItem('userEmail');
    const documento = sessionStorage.getItem('documento');

    if (email) {
        document.getElementById('email').value = email;
    } else {
        document.getElementById('email').value = 'E-mail não encontrado';
    }

    if (documento) {
        document.getElementById('cpfCnpj').value = documento;
    } else {
        document.getElementById('cpfCnpj').value = 'CPF/CNPJ não encontrado';
    }
}

// Edita o perfil que habilita os campos para alteração
function enableEdit() {
    document.getElementById('email').removeAttribute('readonly');
    document.getElementById('cpfCnpj').removeAttribute('readonly');
    document.getElementById('editProfileBtn').style.display = 'none';
    document.getElementById('deleteProfileBtn').style.display = 'none';
    document.getElementById('saveProfileBtn').style.display = 'inline-block';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

// Salva as alterações feitas no perfil
function saveProfile() {
    const email = document.getElementById('email').value;
    const documento = document.getElementById('cpfCnpj').value;

    localStorage.setItem('userEmail', email);
    localStorage.setItem('userDocumento', documento);

    alert("Perfil atualizado com sucesso!");
    disableEdit();
}

// Cancela a edição do perfil
function disableEdit() {
    document.getElementById('email').setAttribute('readonly', true);
    document.getElementById('cpfCnpj').setAttribute('readonly', true);
    document.getElementById('editProfileBtn').style.display = 'inline-block';
    document.getElementById('deleteProfileBtn').style.display = 'inline-block';
    document.getElementById('saveProfileBtn').style.display = 'none';
    document.getElementById('cancelEditBtn').style.display = 'none';
    loadProfile();
}

// Deleta o perfil do localStorage
function deleteProfile() {
    if (confirm("Tem certeza de que deseja deletar seu perfil? Esta ação é irreversível.")) {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userDocumento');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userType');
        window.location.href = 'index.html';
    }
}

document.getElementById('editProfileBtn').addEventListener('click', enableEdit);
document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
document.getElementById('cancelEditBtn').addEventListener('click', disableEdit);
document.getElementById('deleteProfileBtn').addEventListener('click', deleteProfile);
window.onload = loadProfile;
