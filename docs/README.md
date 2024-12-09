 # PlanWay


**Matheus Dias Mendes, matheusdiasmendespop@gmail.com**

**Felipe Araujo Monteiro, felipeamonteiro.fam@gmail.com**

**Matheus Balsamão Ferreira, matheusbalsa1234@gmail.com**

**Tiago de Almeida Santos, tiagoalmeidasantos1812@gmail.com**

**Júlia Rocha Fiorini, juliarochafiorini@gmail.com**

---

Professores:

** Prof. Alexandre Augusto Bittencourt Munaier **

** Prof. Danilo Boechat Seufitelli **

** Prof. Michelle Hanne Soares de Andrade **

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

Com o PlanWay, oferecemos uma solução inovadora para agências e clientes, centralizando todas as informações em um único lugar. Seja você uma agência cadastrando e promovendo suas excursões, ou um cliente buscando a próxima aventura, nosso sistema otimiza o planejamento e o gerenciamento de viagens de forma fácil e intuitiva. Elimine a necessidade de navegar por vários sites e simplifique o processo de busca, reserva e acompanhamento de excursões.

---


## 1. Introdução

"Transforme desafios em oportunidades e experiências em memórias."

### 1.1 Contextualização

No cenário atual, a gestão de excursões tornou-se um desafio crescente, tanto para agências quanto para os clientes. O mercado turístico, especialmente voltado para excursões, enfrenta a necessidade de integrar de forma eficiente a oferta de destinos com a demanda de consumidores que buscam experiências práticas e organizadas. Segundo dados de 2023, o turismo movimenta bilhões de dólares anualmente, e a necessidade de soluções ágeis que conectem agências e viajantes nunca foi tão urgente. Este projeto tem como objetivo desenvolver uma plataforma que simplifica o planejamento e a gestão de excursões, centralizando desde o cadastro de ofertas até o controle de reservas e compartilhamento de itinerários.
 
### 1.2 Problema

Atualmente, muitas agências de excursões e clientes enfrentam dificuldades com processos fragmentados, falta de integração e a necessidade de utilizar várias plataformas para promover, gerenciar e reservar excursões. Para as agências, a promoção de pacotes é um desafio devido à falta de visibilidade e ferramentas adequadas. Para os clientes, encontrar e comparar ofertas se torna uma tarefa demorada e confusa, o que pode resultar em uma experiência de planejamento frustrante e ineficiente.

### 1.3 Objetivo geral

Desenvolver uma plataforma integrada para automação do processo de planejamento e gestão de excursões, centralizando o cadastro de ofertas, reservas, controle financeiro e compartilhamento de roteiros em um único ambiente.

#### 1.3.1 Objetivos específicos

* Permitir que agências de excursões cadastrem suas ofertas, informando destinos, preços e datas de forma centralizada.
* Implementar um sistema de pesquisa e comparação de pacotes que simplifique a experiência dos clientes.
* Desenvolver ferramentas de controle de reservas e geração de relatórios para as agências.
* Facilitar o compartilhamento de roteiros entre os participantes da excursão, garantindo melhor organização e alinhamento.

### 1.4 Justificativas

O mercado de excursões carece de uma solução acessível que conecte pequenas e médias agências diretamente com seus clientes, eliminando a necessidade de ferramentas desconexas. Com o PlanWay, agências poderão gerenciar suas ofertas e reservas em um único sistema, enquanto os clientes terão uma experiência otimizada, com todas as informações e opções centralizadas. O impacto será uma maior eficiência no planejamento de excursões e oportunidades para os estabelecimentos turísticos locais aumentarem sua visibilidade.

## 2. Participantes do processo

Os usuários-chave do sistema de gestão de viagens podem ser divididos em dois perfis principais:

Agências de Excursões: As agências serão responsáveis por cadastrar suas excursões, gerenciar reservas e promover suas ofertas na plataforma. Elas também poderão gerar relatórios de desempenho para otimizar seus negócios.

Clientes de Excursões: Usuários que buscam excursões para lazer ou viagens em grupo. Eles poderão pesquisar e comparar pacotes de excursões, reservar e compartilhar itinerários com outros participantes.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

O planejamento de excursões ainda é um processo complicado e demorado para muitas agências e clientes. As agências enfrentam desafios na promoção de pacotes e no gerenciamento eficiente de reservas. Por outro lado, os clientes precisam acessar várias plataformas para comparar e reservar excursões, o que torna o processo fragmentado e propenso a erros. Soluções atuais costumam ser caras e inadequadas para agências menores, deixando-as sem uma alternativa acessível.

### 3.2. Descrição geral da proposta de solução

O PlanWay centraliza a gestão de excursões, eliminando a necessidade de usar múltiplas ferramentas e plataformas. Agências podem cadastrar suas ofertas, gerenciar reservas e gerar relatórios em um único local, enquanto os clientes podem buscar, comparar e reservar excursões facilmente. A plataforma também permite o compartilhamento de roteiros diários e itinerários, garantindo uma melhor organização das viagens em grupo.

Limitações: Pode ser desafiador integrar alguns sistemas corporativos específicos, e a digitalização limitada em algumas regiões pode restringir o alcance de funcionalidades.

Oportunidades de Melhoria: A plataforma pode simplificar a gestão de excursões e oferecer soluções personalizadas e acessíveis para agências e clientes. O PlanWay também pode gerar novas oportunidades de negócios, aumentando a visibilidade de hotéis e serviços turísticos locais, além de oferecer relatórios avançados para as agências melhorarem sua tomada de decisões.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Cadastro Usuário](CadastroUsuario.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Roteiros-calendário](Roteiros-calendario.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Acompanhamento-Relatorio](Acompanhamento-Relatorio.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Vendas](Vendas.md "Detalhamento do Processo 4.")

[PROCESSO 5 - Cadastrar-excursão](Cadastro-excursão.md "Detalhamento do processo 5")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

Neste trabalho, o principal objetivo foi o desenvolvimento de interfaces para a plataforma PlanWay, focando no cadastro de excursões e na criação de funcionalidades que tornem o gerenciamento de viagens mais prático e intuitivo. Ao longo do projeto, pude aplicar conceitos de design de interface que priorizam a usabilidade, criando uma experiência mais agradável e acessível para o usuário. A ideia era tornar o processo de cadastro e organização de excursões o mais simples possível, ao mesmo tempo em que mantivéssemos a funcionalidade necessária.

Como qualquer projeto, surgiram desafios. Um dos maiores foi a implementação das validações nos formulários, para garantir que os usuários preenchessem todos os campos corretamente e sem dificuldades. Também houve um cuidado especial para tornar a interface amigável e responsiva, para que fosse fácil de usar tanto em computadores quanto em dispositivos móveis.

Por outro lado, um aspecto que considero muito positivo foi a criação dos modais para cadastro e atualização dos eventos. Essa abordagem permitiu que o usuário interagisse com a plataforma de forma mais dinâmica, sem a necessidade de recarregar a página, o que deu uma sensação de agilidade e fluidez na navegação.

Pensando em melhorias, acredito que uma próxima etapa poderia ser a adição de um sistema de autenticação e autorização para garantir que apenas administradores possam criar ou editar excursões. Isso traria mais segurança ao sistema e controlaria melhor as permissões. Também vejo como uma excelente oportunidade a integração com plataformas de pagamento, o que tornaria o processo de reserva e pagamento das excursões mais prático.

Em resumo, este trabalho me permitiu entender melhor as necessidades dos usuários e como uma interface bem projetada pode impactar diretamente na experiência deles. Mas também ficou claro que há muito mais a explorar e aperfeiçoar, o que abre várias possibilidades para futuros desenvolvimentos na plataforma.

# REFERÊNCIAS

_Como um projeto de software não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






