## 5. Indicadores de Desempenho

Apresentamos os principais indicadores de desempenho para o sistema PlanWay, garantindo que todas as informações necessárias estão no modelo relacional.

| **Indicador**                | **Objetivos**                                                                 | **Descrição**                                                                                     | **Fonte de dados**      | **Fórmula de cálculo**                              |
|-------------------------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|--------------------------|-----------------------------------------------------|
| Percentual de excursões reservadas | Avaliar a atratividade das excursões cadastradas                         | Mede o percentual de excursões reservadas em relação ao total de excursões cadastradas            | Tabela Excursões         | (número de excursões reservadas / número total de excursões cadastradas) * 100 |
| Percentual de reclamações     | Avaliar a experiência dos clientes e identificar áreas de melhoria           | Percentual de reclamações registradas em relação ao total de excursões realizadas                 | Tabela Reclamações       | (número total de reclamações / número total de excursões realizadas) * 100 |
| Satisfação do cliente         | Avaliar a experiência dos clientes com as excursões                         | Média das notas atribuídas pelos clientes nas avaliações (em estrelas) após a conclusão das excursões | Tabela Avaliações        | (soma de todas as avaliações em estrelas / número total de avaliações)           |


_Obs.: todas as informações para gerar os indicadores devem estar no modelo relacional._
