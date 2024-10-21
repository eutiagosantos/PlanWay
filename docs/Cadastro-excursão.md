### 3.3.1 Processo 5 – Cadastro de excursão

Estamos focados em tornar o processo de cadastro de excursões intuitivo e completo para as agências. Aqui estão algumas melhorias que planejamos implementar:

Facilidade no Preenchimento: Simplificamos o processo para que as agências possam cadastrar excursões de forma rápida e sem complicações.

Validação Automática: Todos os dados serão validados em tempo real, como datas e valores, para garantir que não ocorram erros ao cadastrar uma excursão.

Campos Opcionais e Personalizáveis: Para atender às diferentes necessidades das agências, o formulário incluirá campos opcionais que podem ser personalizados, como serviços adicionais.

Compatibilidade com Calendário: As excursões cadastradas podem ser diretamente integradas ao calendário para um melhor controle de datas e itinerários.

Com essas melhorias, o cadastro de excursões será otimizado, proporcionando uma experiência fluida e eficiente para as agências.

![image](https://github.com/user-attachments/assets/cafce33a-746d-451c-bb88-a86305579790)



#### Detalhamento das atividades

Inserção de Dados da Excursão

| Campo                     | Tipo            | Restrições                                            | Valor Default   |
|---------------------------|-----------------|------------------------------------------------------|------------------|
| Nome da Excursão           | Caixa de Texto  | Campo obrigatório, apenas texto                      | Nenhum           |
| Destino                    | Caixa de Texto  | Campo obrigatório, apenas texto                      | Nenhum           |
| Data de Início             | Data Picker     | Campo obrigatório, deve ser uma data futura          | Nenhum           |
| Data de Término            | Data Picker     | Campo obrigatório, deve ser após a data de início    | Nenhum           |
| Preço                      | Caixa de Texto  | Campo obrigatório, apenas valores numéricos          | Nenhum           |
| Descrição                  | Área de Texto   | Campo opcional, pode incluir uma descrição detalhada | Nenhum           |
| Serviços Incluídos         | Caixa de Texto  | Campo opcional, apenas texto                         | Nenhum           |
| Aceito os Termos de Serviço | Checkbox       | Campo obrigatório para consentimento                 | Não marcado      |
| Dicas de Preenchimento     | Tooltip         | Dicas para cada campo na inserção                    | N/A              |

#### Comandos

| Comando                   | Destino                                  | Tipo     |
|---------------------------|------------------------------------------|----------|
| Cadastrar Excursão         | Validar Dados                            | Default  |
| Confirmar Cadastro         | Redirecionar para página de confirmação  | Default  |
| Editar Excursão            | Redirecionar para formulário de edição   | Default  |

### Confirmação de Cadastro

| **Campo**             | **Tipo**         | **Restrições**                                    | **Valor Default** |
|-----------------------|------------------|--------------------------------------------------|-------------------|
| Status da Excursão    | Seleção Única    | Deve ser "Cancelada" ou "Realizada"                | Rejeitada         |
| Mensagem de Confirmação | Área de Texto  | Deve conter uma mensagem clara sobre o status     | Excursão Rejeitada|
