# Projeto: GateFlow — Sistema de Portaria Inteligente

Atue como um desenvolvedor Full Stack Sênior, arquiteto de software e UI/UX Designer. Sua missão é planejar, desenvolver e entregar um sistema web completo de portaria online, com qualidade de produto comercial, destinado a ser publicado em um repositório público no GitHub como projeto de portfólio profissional.

**O principal objetivo deste projeto é demonstrar minha capacidade de desenvolver soluções reais, com boa arquitetura, organização, experiência do usuário e visão de negócio.**

Não quero um projeto com aparência de exercício de programação, template genérico ou interface criada automaticamente por IA. Quero algo que pareça ter sido desenvolvido cuidadosamente por um desenvolvedor experiente, com decisões de design coerentes, identidade visual própria e atenção aos detalhes.

---

# 1. Conceito do projeto

Desenvolva o **GateFlow**, um sistema web de gerenciamento de portaria e controle de acesso para condomínios residenciais e comerciais.

O sistema deve solucionar problemas comuns de portarias tradicionais:

- Falta de controle centralizado sobre entradas e saídas.
- Dificuldade para identificar visitantes.
- Falta de histórico de movimentações.
- Comunicação ineficiente entre moradores e portaria.
- Dificuldade para gerenciar entregas e encomendas.
- Ausência de informações gerenciais sobre a operação da portaria.
- Dependência de registros manuais e planilhas.

A proposta é centralizar essas operações em uma única plataforma, com interface intuitiva e informações organizadas.

O sistema deve funcionar completamente em ambiente local, utilizando localhost, sem exigir servidor externo, banco de dados ou integração com equipamentos para sua demonstração.

# 2. Tecnologias e arquitetura

Utilize tecnologias modernas, estáveis e reconhecidas pelo mercado.

Stack sugerida:

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Lucide React para ícones.
- Recharts para gráficos, caso necessário.
- React Router para navegação.
- LocalStorage para persistência dos dados demonstrativos.

Você pode propor pequenas alterações na stack caso exista uma justificativa técnica relevante, mas priorize tecnologias que valorizem o projeto profissionalmente.

**Arquitetura obrigatória:**

O projeto deve ser 100% modularizado.

Regras:

1. Nenhum arquivo de código deve ultrapassar 150 linhas.
2. Cada componente deve ter uma responsabilidade específica.
3. Não concentrar toda a aplicação em App.tsx.
4. Separar componentes, páginas, hooks, serviços, interfaces, dados e configurações.
5. Evitar componentes gigantescos e funções com muitas responsabilidades.
6. Reutilizar componentes sempre que fizer sentido.
7. Utilizar TypeScript corretamente, evitando o uso indiscriminado de `any`.
8. Manter uma arquitetura que permita substituir os mocks por APIs reais futuramente.
9. Evitar dependências desnecessárias.
10. Não criar abstrações complexas sem necessidade.

Uma possível estrutura:

```text
gateflow/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── visitors/
│   │   ├── residents/
│   │   ├── deliveries/
│   │   └── shared/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   │   ├── api/
│   │   ├── mock/
│   │   └── storage/
│   ├── interfaces/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   ├── data/
│   ├── routes/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Adapte a estrutura conforme a necessidade, sem criar pastas ou arquivos vazios apenas para preencher a arquitetura.

# 3. Backend e funcionamento offline

Este ponto é extremamente importante.

Quero uma aplicação que funcione de verdade para demonstração, mas que não dependa de um backend real.

**Implemente uma arquitetura preparada para integração futura, utilizando um backend simulado (Mock API).**

Requisitos:

- Todas as operações devem funcionar utilizando dados simulados.
- Criar serviços separados para cada domínio.
- Utilizar interfaces TypeScript para definir contratos de dados.
- Simular operações assíncronas com Promises.
- Simular tempos de resposta de API de maneira discreta.
- Implementar operações de consulta, cadastro, edição e exclusão quando aplicável.
- Utilizar LocalStorage para manter os dados após atualizar a página.
- Criar dados iniciais para que o sistema já abra preenchido.
- Permitir restaurar os dados demonstrativos.
- Não deixar nenhuma funcionalidade importante dependente de uma API inexistente.

Exemplo de arquitetura:

```text
pages/
    Visitors.tsx

hooks/
    useVisitors.ts

services/
    visitors.service.ts

services/mock/
    visitors.mock.ts

interfaces/
    visitor.interface.ts
```

A página não deve conhecer detalhes da implementação do mock.

Ela deve consumir um serviço através de uma interface bem definida.

No futuro, quero conseguir substituir a implementação simulada por uma API REST em PHP, Node.js ou outra tecnologia, sem precisar reconstruir toda a interface.

**Não implementar um backend real neste primeiro momento.** O foco é entregar uma aplicação funcional, visualmente completa e fácil de executar.

# 4. Identidade visual e experiência do usuário

Crie uma identidade visual própria para o GateFlow.

Quero uma interface moderna, elegante, minimalista e profissional.

Referências de qualidade visual:
- Linear.
- Vercel.
- Stripe Dashboard.
- Interfaces modernas de SaaS B2B.

Não copie essas interfaces. Utilize-as como referência de qualidade e consistência.

Diretrizes:

- Layout desktop-first, mas totalmente responsivo.
- Sidebar lateral com navegação.
- Cabeçalho com identificação do usuário e notificações.
- Dashboard com cards de indicadores.
- Gráficos com visual limpo.
- Tabelas organizadas.
- Modais bem desenhados.
- Formulários intuitivos.
- Feedback visual para ações.
- Estados de carregamento.
- Estados vazios.
- Mensagens de sucesso e erro.
- Confirmação antes de ações destrutivas.
- Animações sutis e rápidas.
- Boa hierarquia visual.
- Espaçamento consistente.
- Tipografia profissional.
- Ícones padronizados.

Evite:
- Gradientes exagerados.
- Muitas cores sem propósito.
- Bordas em todos os elementos.
- Cards desnecessários.
- Emojis como substitutos de ícones.
- Textos genéricos.
- Botões que não fazem nada.
- Elementos decorativos que não agregam valor.

A interface deve transmitir confiança, organização e segurança.

Utilize português brasileiro em toda a aplicação.

# 5. Funcionalidades do sistema

Desenvolva as seguintes áreas:

## 5.1 Dashboard

Tela inicial com visão geral da operação.

Indicadores:

- Total de moradores cadastrados.
- Visitantes aguardando autorização.
- Visitantes presentes no condomínio.
- Entradas registradas hoje.
- Encomendas aguardando retirada.
- Ocorrências abertas.

Elementos adicionais:

- Gráfico de movimentações de acesso.
- Histórico das últimas entradas e saídas.
- Últimas entregas recebidas.
- Visitantes aguardando autorização.
- Resumo da atividade da portaria.

Os números devem ser calculados com base nos dados do sistema, não devem ser números estáticos desconectados das operações.

## 5.2 Controle de visitantes

Criar um módulo completo para gerenciamento de visitantes.

Funcionalidades:

- Cadastrar visitante.
- Nome completo.
- Documento de identificação fictício.
- Telefone.
- Unidade que deseja visitar.
- Morador responsável.
- Motivo da visita.
- Data e horário.
- Status da autorização.

Status possíveis:

- Aguardando autorização.
- Autorizado.
- Negado.
- Dentro do condomínio.
- Visita finalizada.

Permitir:

- Autorizar entrada.
- Negar entrada.
- Registrar entrada.
- Registrar saída.
- Consultar histórico.
- Pesquisar visitantes.
- Filtrar por status e período.

Criar uma experiência visual clara para identificar cada situação.

## 5.3 Cadastro de moradores

Criar módulo de gerenciamento de moradores.

Informações:

- Nome completo.
- Unidade.
- Bloco.
- Telefone.
- E-mail.
- Quantidade de dependentes.
- Status do cadastro.

Funcionalidades:

- Cadastrar.
- Editar.
- Excluir.
- Pesquisar.
- Filtrar por bloco e unidade.
- Visualizar detalhes.

Criar dados demonstrativos realistas.

## 5.4 Gestão de unidades

Criar uma área para visualizar as unidades do condomínio.

Exibir:

- Bloco.
- Número da unidade.
- Morador responsável.
- Quantidade de moradores.
- Situação da unidade.

Permitir visualizar os moradores vinculados a cada unidade.

## 5.5 Gestão de entregas

Criar módulo para recebimento e controle de encomendas.

Informações:

- Destinatário.
- Unidade.
- Transportadora.
- Código de rastreamento.
- Data e horário do recebimento.
- Responsável pelo recebimento.
- Status.

Status:

- Recebida.
- Aguardando retirada.
- Entregue ao morador.

Funcionalidades:

- Registrar encomenda.
- Consultar pendências.
- Registrar retirada.
- Informar quem retirou.
- Consultar histórico.

## 5.6 Registro de acessos

Criar uma área com histórico completo de movimentações.

Informações:

- Pessoa.
- Tipo de acesso.
- Unidade de destino.
- Horário de entrada.
- Horário de saída.
- Responsável pela autorização.
- Status.

Tipos:

- Visitante.
- Prestador de serviço.
- Entregador.
- Morador.

Adicionar filtros e pesquisa.

## 5.7 Prestadores de serviço

Criar módulo para cadastro e controle de prestadores.

Informações:

- Nome.
- Documento fictício.
- Empresa.
- Telefone.
- Serviço realizado.
- Unidade de destino.
- Horário de entrada e saída.

Permitir registrar entrada e saída e consultar histórico.

## 5.8 Ocorrências

Criar módulo para registrar situações relevantes da portaria.

Exemplos:

- Problemas de acesso.
- Entregas não retiradas.
- Situações de segurança.
- Problemas operacionais.
- Observações importantes.

Informações:

- Título.
- Descrição.
- Categoria.
- Responsável.
- Data.
- Status.

Status:

- Aberta.
- Em andamento.
- Resolvida.

# 6. Simulação de integração com equipamentos

Quero que o projeto demonstre visão de integração com dispositivos reais, mas sem depender deles.

Crie uma área de configurações de dispositivos com uma simulação de integração.

Exibir:

- Controladora de acesso.
- Leitor de QR Code.
- Câmera IP.
- Fechadura eletrônica.
- Sistema de interfonia.

Criar estados simulados:

- Conectado.
- Desconectado.
- Não configurado.

Deixar explícito na interface que os dispositivos são simulados e não estão conectados fisicamente.

Não inventar comunicação real com equipamentos.

Organize a arquitetura para permitir futuramente integrar dispositivos e serviços de fabricantes como Intelbras, por meio de adaptadores específicos.

# 7. Experiência de demonstração

O projeto precisa abrir pronto para ser explorado.

Ao executar a aplicação:

- O dashboard deve aparecer preenchido.
- Todos os módulos devem conter dados demonstrativos.
- Os botões principais devem funcionar.
- Os formulários devem validar informações.
- As tabelas devem permitir pesquisa e filtros.
- As alterações devem permanecer após atualizar a página.
- Os gráficos devem refletir os dados reais do mock.
- Deve existir uma maneira de restaurar os dados originais.

Não quero telas vazias ou funcionalidades apenas ilustrativas.

Se alguma funcionalidade for apenas uma simulação, isso deve ficar claro.

Não implementar autenticação real neste momento. Criar uma experiência demonstrativa com usuário fictício e identificação visual de ambiente DEMO.

# 8. Qualidade de código

O projeto precisa demonstrar boas práticas de desenvolvimento.

Obrigatório:

- Componentes pequenos e reutilizáveis.
- Hooks personalizados.
- Tipagem adequada.
- Separação de responsabilidades.
- Nomenclatura clara.
- Tratamento de erros.
- Validação de formulários.
- Código organizado.
- Ausência de duplicações desnecessárias.
- Nenhum arquivo de código com mais de 150 linhas.
- Nenhum erro no console.
- Nenhum erro de TypeScript.
- Nenhum botão sem funcionalidade.
- Nenhuma rota quebrada.

Não resolva problemas simplesmente escondendo erros ou desabilitando verificações.

# 9. README.md profissional

Criar um README completo, em português, com apresentação profissional.

O README deve conter:

1. Nome e descrição do projeto.
2. Apresentação do problema que o GateFlow busca solucionar.
3. Objetivo da solução.
4. Principais funcionalidades.
5. Tecnologias utilizadas.
6. Arquitetura do projeto.
7. Estrutura de diretórios.
8. Como executar localmente.
9. Como funciona o backend simulado.
10. Como os dados são armazenados.
11. Como restaurar os dados de demonstração.
12. Limitações da versão demonstrativa.
13. O que seria necessário para colocar o sistema em produção.
14. Possibilidades de integração com equipamentos reais.
15. Roadmap de melhorias.

Na parte de produção, explicar tecnicamente o que seria necessário para transformar o protótipo em um produto real.

Abordar:

- Backend com API REST.
- Banco de dados PostgreSQL ou MySQL.
- Autenticação e controle de permissões.
- Logs e auditoria.
- Comunicação segura entre dispositivos e servidor.
- Hospedagem e infraestrutura.
- Backup.
- LGPD e proteção de dados pessoais.
- Monitoramento.
- Integração com controladoras de acesso.
- Integração com câmeras IP.
- Leitores de QR Code.
- Fechaduras eletrônicas.
- Interfonia.

Mencionar fabricantes como Intelbras como possibilidades de integração, deixando claro que a compatibilidade depende do modelo do equipamento, SDK, API ou protocolo disponibilizado pelo fabricante.

Não afirmar que existe integração real quando ela não foi implementada.

Explicar que uma implantação real exige validação de compatibilidade, testes de segurança e infraestrutura adequada.

# 10. Critério de desenvolvimento

Não entregue apenas um planejamento ou uma lista de arquivos.

Quero que você efetivamente desenvolva o projeto completo dentro do workspace atual do VS Code.

Trabalhe em etapas:

1. Analise o workspace atual.
2. Defina a arquitetura.
3. Configure o ambiente.
4. Implemente a identidade visual.
5. Desenvolva os componentes compartilhados.
6. Desenvolva os módulos.
7. Implemente os serviços mock.
8. Integre todos os módulos.
9. Implemente a persistência.
10. Desenvolva o README.
11. Execute o projeto.
12. Faça uma revisão completa.

Ao terminar:

- Execute o build de produção.
- Verifique os erros de TypeScript.
- Verifique os imports.
- Teste as principais funcionalidades.
- Verifique se todos os arquivos de código respeitam o limite de 150 linhas.
- Corrija os problemas encontrados.
- Garanta que o projeto funcione sem depender de serviços externos.

# 11. Resultado esperado

Quero receber um projeto que possa ser executado com comandos simples:

```bash
npm install
npm run dev
```

E acessado pelo navegador em:

http://localhost:5173

O projeto deve estar pronto para ser apresentado a recrutadores e publicado em um repositório público no GitHub.

A prioridade é qualidade, não velocidade.

Não crie funcionalidades só para aumentar a quantidade de telas. Cada módulo precisa ter propósito e funcionar corretamente.

**Uma observação importante sobre a identidade do projeto:** não utilize textos artificiais como "Desenvolvido com paixão por IA", "Powered by AI" ou descrições genéricas típicas de projetos gerados automaticamente. Não invente uma história de desenvolvimento ou experiência profissional. O código, o design, a documentação e as decisões técnicas devem demonstrar naturalmente o cuidado de quem desenvolveu o produto.

Tome decisões técnicas com autonomia, mas priorize simplicidade, manutenibilidade e qualidade visual.

**O objetivo final é que alguém entre no meu GitHub, veja o GateFlow, execute o projeto e pense: esse desenvolvedor sabe transformar um problema operacional em uma solução de software bem estruturada.**