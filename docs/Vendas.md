### 3.3.4 Processo 4 – VENDAS

#### Oportunidades de Melhoria
- Facilitar a inscrição dos usuários em excursões, garantindo um fluxo simples e intuitivo.
- Acompanhar a capacidade de vagas disponíveis em cada excursão em tempo real.
- Notificar os participantes sobre a confirmação de sua participação.

![image](https://github.com/user-attachments/assets/6a2cd7db-3d5a-4546-94c2-ff6b7550b9b7)

---

#### **Selecionar Excursão**
| **Campo**          | **Tipo**         | **Restrições**                                  | **Valor default** |
|---------------------|------------------|-------------------------------------------------|--------------------|
| Excursão Selecionada | Seleção Única   | Listar excursões com vagas disponíveis          | Nenhum             |
| Número de Participantes | Caixa de Texto | Campo obrigatório, valor numérico positivo      | 1                  |

| **Comandos**       | **Destino**                 | **Tipo**    |
|--------------------|-----------------------------|-------------|
| Continuar          | Preencher Dados do Participante | default     |
| Cancelar           | Fim do Processo             | cancel      |

---

#### **Preencher Dados do Participante**
| **Campo**          | **Tipo**         | **Restrições**                                  | **Valor default** |
|---------------------|------------------|-------------------------------------------------|--------------------|
| Nome Completo       | Caixa de Texto   | Campo obrigatório                               | Nenhum             |
| CPF/CNPJ            | Caixa de Texto   | Campo obrigatório, formato numérico             | Nenhum             |
| Email             | Caixa de Texto   | Campo obrigatório (e-mail)          | Nenhum             |

| **Comandos**       | **Destino**                   | **Tipo**    |
|--------------------|-------------------------------|-------------|
| Confirmar Inscrição | Receber e Notificar Resultado da Participação | default     |
| Cancelar           | Selecionar Excursão           | cancel      |

---

#### **Notificar Resultado da Participação**
| **Campo**              | **Tipo**        | **Restrições**                                   | **Valor default**       |
|-------------------------|-----------------|-------------------------------------------------|-------------------------|
| Status da Participação  | Seleção Única   | "Confirmado" ou "Recusado"                      | Recusado               |
| Mensagem de Notificação | Área de Texto   | Mensagem sobre o status da inscrição            | Participação Recusada   |

| **Comandos**           | **Destino**                 | **Tipo**    |
|------------------------|-----------------------------|-------------|
| Finalizar Processo     | Evento Final               | default     |
| Tentar Novamente       | Preencher Dados do Participante | default     |

---

### Resumo
Este processo detalha as etapas para participar de uma excursão, começando com a seleção de uma excursão, preenchimento dos dados do participante e a notificação do status da inscrição. Ele foca na simplicidade, garantindo um fluxo intuitivo para os usuários e ajudando na gestão de vagas em excursões.
