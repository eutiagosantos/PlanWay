### 3.3.1 Processo 1 – Cadastro de usuário

Automação de Validação: Implementar validação automática de dados (como formato de e-mail e força da senha) para reduzir erros.

Melhoria na Experiência do Usuário: Adicionar feedback em tempo real durante a inserção de dados (por exemplo, informar ao usuário se o nome de usuário está disponível).

Segurança: Implementar medidas de segurança adicionais, como criptografia de dados e autenticação multifator.

Acessibilidade: Garantir que o processo de cadastro seja acessível a todos os usuários, incluindo aqueles com deficiências.

[Cadastro Usuario](https://github.com/user-attachments/assets/20f7b323-7566-41c7-8c59-6dc4f8842ecc)


#### Detalhamento das atividades

Inserção de Dados Pessoais

| **Campo**             | **Tipo**         | **Restrições**                                   | **Valor Default** |
|-----------------------|------------------|-------------------------------------------------|-------------------|
| Nome Completo         | Caixa de Texto   | Campo obrigatório, apenas texto                 | Nenhum            |
| Endereço de E-mail     | Caixa de Texto   | Formato de e-mail válido, campo obrigatório      | Nenhum            |
| Número de Telefone     | Caixa de Texto   | Formato numérico, campo obrigatório              | Nenhum            |
| Senha                 | Caixa de Texto   | Formato de senha com regras de complexidade      | Nenhum            |
| Destino Preferido      | Caixa de Texto   | Formato texto, opcional                          | Nenhum            |
| Passagens (se houver) | Upload de Foto   | Upload de imagem opcional                        | Nenhum            |
| Hotel (se houver)     | Caixa de Texto   | Formato texto, opcional                          | Nenhum            |

### Comandos

| **Comando**           | **Destino**            | **Tipo**    |
|-----------------------|------------------------|-------------|
| Criar Conta           | Validar Dados           | Default     |
| Confirmar Cadastro    | Redirecionar para página de confirmação | Default |

### Confirmação de Cadastro

| **Campo**             | **Tipo**         | **Restrições**                                   | **Valor Default** |
|-----------------------|------------------|-------------------------------------------------|-------------------|
| Status do Cadastro    | Seleção Única    | Deve ser "Aprovado" ou "Rejeitado"               | Rejeitado         |
| Mensagem de Confirmação | Área de Texto  | Deve conter uma mensagem clara sobre o status    | Cadastro Rejeitado|

### Comandos

| **Comando**           | **Destino**            | **Tipo**    |
|-----------------------|------------------------|-------------|
| Finalizar Cadastro    | Página Inicial ou Página de Erro | Default     |
