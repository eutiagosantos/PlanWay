### 3.3.2 Processo 2 – ROTEIRO-CALENDARIO

Automatização: Facilitar a criação de roteiros com automações que sincronizem automaticamente com o calendário do usuário.
Usabilidade: Simplificar a interface para tornar a criação de eventos mais intuitiva e rápida.
Notificações: Enviar lembretes automáticos sobre eventos e mudanças nos roteiros, ajudando os usuários a se manterem organizados.
Integração: Permitir a conexão com calendários como Google Calendar e Outlook, oferecendo mais flexibilidade na gestão dos roteiros.

Essas melhorias visam tornar a experiência do usuário mais fluida e agradável!

![Roteiro-Calendario](https://github.com/user-attachments/assets/077e5e50-ea14-4aa9-9737-9b2ac0e15368)


#### Detalhamento das atividades

### Criação de Roteiro

| Campo                     | Tipo              | Restrições                                   | Valor Default   | Descrição                                  |
|---------------------------|-------------------|----------------------------------------------|-----------------|--------------------------------------------|
| Atividades Diárias        | Caixa de Texto     | Campo obrigatório, apenas texto             | Nenhum          | Lista das atividades programadas no roteiro. |
| Cronograma                | Caixa de Texto     | Campo obrigatório, deve ser formatado corretamente | Nenhum      | Cronograma detalhando horários e datas das atividades. |
| Notificações              | Seleção Múltipla  | Opções: "Enviar notificações aos participantes" | Não aplicar     | Opção de enviar lembretes aos participantes sobre o roteiro. |

### Comandos

| Comando                  | Destino                                 | Tipo    | Descrição                                    |
|--------------------------|-----------------------------------------|---------|----------------------------------------------|
| Adicionar ao Calendário   | Confirmar adição de atividades         | Default | Adiciona as atividades do roteiro ao calendário. |
| Ajustar Cronograma        | Atualizar cronograma de acordo com preferências | Default | Permite ajustes nas atividades conforme preferências do gestor. |
| Compartilhar Calendário    | Compartilhar calendário com participantes | Default | Compartilha o calendário com os participantes do evento. |

### Alteração de Atividades

| Campo                     | Tipo              | Restrições                                   | Valor Default   | Descrição                                  |
|---------------------------|-------------------|----------------------------------------------|-----------------|--------------------------------------------|
| Tipo de Alteração         | Seleção Única     | Opções: "Excluir Atividade" ou "Alterar Atividade" | Nenhum        | Escolhe o tipo de alteração desejada. |

### Comandos para Alterações

| Comando                  | Destino                                 | Tipo    | Descrição                                    |
|--------------------------|-----------------------------------------|---------|----------------------------------------------|
| Excluir Atividade         | Confirmar exclusão                     | Default | Remove a atividade selecionada do roteiro. |
| Alterar Atividade         | Formulário de alteração                | Default | Permite editar os detalhes da atividade selecionada. |
| Enviar Notificações      | Notificar participantes sobre alterações | Default | Envia notificações aos participantes sobre quaisquer alterações feitas. |

### Status do Roteiro

| Campo                     | Tipo              | Restrições                                   | Valor Default   | Descrição                                  |
|---------------------------|-------------------|----------------------------------------------|-----------------|--------------------------------------------|
| Status do Roteiro         | Seleção Única     | Deve indicar se o roteiro foi criado com sucesso | Criado          | Indica o status atual do roteiro.          |
| Mensagem de Confirmação   | Área de Texto     | Mensagem com detalhes do status do roteiro   | Roteiro criado com sucesso! | Mensagem exibida após a criação do roteiro. |

### Comandos Finais

| Comando                  | Destino                                 | Tipo    | Descrição                                    |
|--------------------------|-----------------------------------------|---------|----------------------------------------------|
| Roteiro & Calendário Criados | Página Inicial                       | Default | Redireciona para a página inicial após a criação bem-sucedida. |
