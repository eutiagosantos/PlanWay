### 3.3.1 Processo 1 – Cadastro de usuário

Automação de Validação: Implementar validação automática de dados (como formato de e-mail e força da senha) para reduzir erros.

Melhoria na Experiência do Usuário: Adicionar feedback em tempo real durante a inserção de dados (por exemplo, informar ao usuário se o nome de usuário está disponível).

Segurança: Implementar medidas de segurança adicionais, como criptografia de dados e autenticação multifator.

Acessibilidade: Garantir que o processo de cadastro seja acessível a todos os usuários, incluindo aqueles com deficiências.

![Exemplo de um Modelo BPMN do PROCESSO 1]![Cadastro Usuario](https://github.com/user-attachments/assets/20f7b323-7566-41c7-8c59-6dc4f8842ecc)


#### Detalhamento das atividades


 *Inserção de Dados Pessoais*

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---               | ---            | ---            | ---               |
| Nome Completo   | Caixa de Texto   |Campo obrigatório,apenas texto|Nenhum|
|Endereço de E-mail|Caixa de Texto   |formato de e-mail  |Nenhum           |
|Numero de telefone | Caixa de Texto   | formato numerico  |Nenhum           |
|Senha | Caixa de Texto   | formato senha  |Nenhum           |
|Destino| Caixa de Texto  | formato texto                   |Nenhum          |
|Passagens| Foto  | upload                   |Nenhum          |
|Hotel| Caixa de texto  | formato texto                   |Nenhum          |
|                      |                                |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|Criar conta            | Validar dados            | default           |
|                      |                                |                   |



*Confirmação de cadastro*

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---               | ---            | ---            | ---               |
| Status do Cadastro | Seleção Única  | Deve ser "Aprovado" ou "Rejeitado". | Rejeitado|
| Mensagem de Confirmação | Área de texto | Deve conter uma mensagem clara sobre o status do cadastro. | Cadastro Rejeitado |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Finalizar Cadastro |Página Inicial ou Página de Erro  | default |
|                      |                                |                   |
