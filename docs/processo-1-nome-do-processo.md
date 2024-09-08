### 3.3.1 Processo 1 – Cadastro de usuário

Automação de Validação: Implementar validação automática de dados (como formato de e-mail e força da senha) para reduzir erros.

Melhoria na Experiência do Usuário: Adicionar feedback em tempo real durante a inserção de dados (por exemplo, informar ao usuário se o nome de usuário está disponível).

Segurança: Implementar medidas de segurança adicionais, como criptografia de dados e autenticação multifator.

Acessibilidade: Garantir que o processo de cadastro seja acessível a todos os usuários, incluindo aqueles com deficiências.

![Exemplo de um Modelo BPMN do PROCESSO 1](images/process.png "Modelo BPMN do Processo 1.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Hora** - campo do tipo hora (hh:mm:ss)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

_* **Tabela** - campo formado por uma matriz de valores_


 *Inserção de Dados Pessoais*

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---               | ---            | ---            | ---               |
| Nome Completo   | Caixa de Texto   |Campo obrigatório,apenas texto|Nenhum|
|Endereço de E-mail|Caixa de Texto   |formato de e-mail  |Nenhum           |
|Numero de telefone | Caixa de Texto   | formato numerico  |Nenhum           |
|Senha | Caixa de Texto   | formato senha  |Nenhum           |
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
