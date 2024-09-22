### 3.3.4 Processo 4 – ASSINATURA

Oportunidades de Melhoria:

Implementar automação no processo de verificação de pagamento.
Melhorar a experiência do usuário durante o fluxo de assinatura.
Garantir a segurança dos dados financeiros dos usuários.

![Assinatura](images/Assinatura.jpeg "Modelo BPMN do Processo 4.")


#### Detalhamento das atividades


**Selecionar Plano de Assinatura**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Plano Selecionado | 	Seleção Única | "Mensal", "Trimestral", "Anual"   | "Mensal"                  |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Continuar  | Preencher Dados de Pagamento  | 	default |
| Cancelar   | Fim do Processo | cancel|


**Preencher Dados de Pagamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Número do Cartão|	Caixa de Texto|	Campo obrigatório, formato numérico|	Nenhum|
|Validade do Cartão|	Data	|Campo obrigatório|	Nenhum|
|Código de Segurança|	Caixa de Texto|	Campo obrigatório, formato numérico	|Nenhum|


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|Confirmar Pagamento	|Gateway Exclusivo (Sistema)	|default|
|Cancelar	|Selecionar Plano|	cancel|


**Notificar Resultado do Pagamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|Status do Pagamento|Seleção Única   |	"Aprovado" ou "Rejeitado" | Rejeitado |
|Mensagem de Notificação|	Área de Texto |	Mensagem sobre o status do pagamento | Pagamento Rejeitado |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|Finalizar Processo    |	Evento Final                |	default         |
|Tentar Novamente      |	Preencher Dados de Pagamento| default           |
