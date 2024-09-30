### 3.3.1 Processo 1 – Cadastro de usuário

Estaremos buscando maneiras de tornar o cadastro de usuários mais fácil e seguro. Aqui estão algumas melhorias que planejamos implementar:
Validação Automática: Vamos checar automaticamente se o e-mail e a senha estão corretos, evitando que você cometa erros ao preencher o formulário.
Acessibilidade: Queremos que todos consigam usar nosso sistema, então faremos adaptações para garantir que ele seja acessível para pessoas com deficiências.
Interface Intuitiva: Estamos trabalhando em um design mais amigável e visual, para que o cadastro seja uma experiência agradável e descomplicada.
Com essas melhorias, nosso objetivo é oferecer a você uma experiência de cadastro simples, segura e acolhedora. Estamos animados para colocar essas mudanças em prática!

![Cadastro Usuario](https://github.com/user-attachments/assets/936cc488-920c-416c-ba7c-49a50a9e0ce7)


#### Detalhamento das atividades

Inserção de Dados Pessoais

| Campo                     | Tipo            | Restrições                                            | Valor Default   |
|---------------------------|-----------------|------------------------------------------------------|------------------|
| Nome Completo             | Caixa de Texto  | Campo obrigatório, apenas texto                      | Nenhum           |
| Endereço de E-mail        | Caixa de Texto  | Formato de e-mail válido, campo obrigatório          | Nenhum           |
| Número de Telefone        | Caixa de Texto  | Formato numérico, campo obrigatório                   | Nenhum           |
| Senha                     | Caixa de Texto  | Formato de senha com regras de complexidade           | Nenhum           |
| Destino Preferido         | Caixa de Texto  | Formato texto, campo opcional                         | Nenhum           |
| Aceito os Termos de Uso   | Checkbox        | Campo obrigatório para consentimento                   | Não marcado       |
| Dicas de Preenchimento     | Tooltip         | Dicas para cada campo na inserção                    | N/A              |

#### Comandos

| Comando                   | Destino                             | Tipo     |
|---------------------------|-------------------------------------|----------|
| Criar Conta               | Validar Dados                       | Default  |
| Confirmar Cadastro        | Redirecionar para página de confirmação | Default  |
| Recuperar Senha           | Redirecionar para formulário de recuperação | Default  |


### Confirmação de Cadastro

| **Campo**             | **Tipo**         | **Restrições**                                   | **Valor Default** |
|-----------------------|------------------|-------------------------------------------------|-------------------|
| Status do Cadastro    | Seleção Única    | Deve ser "Aprovado" ou "Rejeitado"               | Rejeitado         |
| Mensagem de Confirmação | Área de Texto  | Deve conter uma mensagem clara sobre o status    | Cadastro Rejeitado|
