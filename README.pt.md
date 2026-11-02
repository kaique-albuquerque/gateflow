# GateFlow · Portaria Inteligente

[English](README.md) · **Português**

Aplicação web para controle da operação de portaria de condomínios: visitantes, moradores, unidades, entregas, acessos, prestadores, ocorrências e dispositivos em um único painel. Interface em português brasileiro, layout desktop-first responsivo e funcionamento 100% local, sem backend externo.

**Demonstração online:** https://kaique-albuquerque.github.io/gateflow/

## 1. O problema

Portarias tradicionais dependem de cadernos, planilhas e comunicação fragmentada. Isso gera identificação frágil de visitantes, histórico de movimentação incompleto, entregas sem rastreabilidade, ocorrências sem responsável e ausência de indicadores para a administração.

## 2. Objetivo da solução

Centralizar o registro e o acompanhamento da operação da portaria em uma plataforma única, com dados consistentes, feedback claro para cada ação e visão gerencial em tempo real (calculada a partir dos dados operacionais, nunca de números fixos).

## 3. Funcionalidades

- **Dashboard** — indicadores de moradores, visitantes aguardando/presentes, entradas do dia, encomendas a retirar e ocorrências abertas, gráfico de movimentação de 7 dias e listas de atividade recente.
- **Visitantes** — cadastro, edição, autorização e negação de entrada, saída registrada e filtros por status e bloco.
- **Moradores** — CRUD completo, contato, unidade, status e histórico vinculado.
- **Unidades** — visão em cards com moradores responsáveis e situação ocupacional.
- **Entregas** — recebimento, notificação ao morador, retirada com identificação de quem retirou e exclusão.
- **Acessos** — histórico de entradas e saídas, filtros por status e tipo, registro de saída e remoção.
- **Prestadores** — serviços, empresa, janela de permanência e botões de entrada/saída.
- **Ocorrências** — categoria, responsável e transições de status (aberta → em andamento → resolvida).
- **Dispositivos** — inventário da portaria com simulação de conexão e queda.
- **Configurações** — perfil de demonstração, informações do sistema, armazenamento e restauração dos dados.

## 4. Tecnologias

React 19, TypeScript, Vite, Tailwind CSS v4 (design tokens próprios), React Router, Lucide React para ícones e LocalStorage para persistência. O gráfico do dashboard é implementado em CSS puro, sem biblioteca adicional.

## 5. Arquitetura

Camadas com dependência unidirecional: `types` → `constants`/`utils` → `data` (massa inicial) → `services` (mock + storage) → `hooks` → `components` → `pages` → `routes`. Nenhuma página conhece o mock: ela consome um serviço com contrato em `Repository<T>`, de modo que substituir o LocalStorage por uma API REST exige implementar apenas essa interface.

Regra de manutenção aplicada ao projeto inteiro: **nenhum arquivo ultrapassa 150 linhas**. Tabelas usam `ResourceTable` + fábricas de colunas, formulários usam `Modal` + `useForm`, e cada domínio tem seu próprio hook.

## 6. Estrutura de diretórios

```text
src/
├── components/
│   ├── layout/      sidebar, topbar, footer, shell
│   ├── ui/          Button, Modal, DataTable, ResourceTable, Badge...
│   ├── dashboard/   indicadores, gráfico e listas do painel
│   └── <domínio>/   colunas de tabela, modais e modelos de formulário
├── pages/           uma página por rota
├── hooks/           useAsyncData, useListQuery, useServiceAction, useForm...
├── services/
│   ├── api/         um serviço por domínio
│   ├── mock/        repositório genérico e latência simulada
│   └── storage/     acesso ao LocalStorage
├── interfaces/      contratos (Repository)
├── types/           tipos e modelos de formulário
├── data/            massa demonstrativa inicial
├── constants/       rotas, status, navegação, opções
├── utils/           formatação, datas, busca, validadores
├── contexts/        provider de toasts
└── routes/          mapa de rotas
```

## 7. Como executar localmente

```bash
npm install
npm run dev      # http://localhost:5173
```

Scripts auxiliares: `npm run typecheck` (TypeScript), `npm run build` (typecheck + build de produção) e `npm run preview`.

### Deploy no GitHub Pages

O deploy é automático: todo push na branch `main` dispara o workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml), que instala as dependências, gera o build e publica o conteúdo de `dist` no GitHub Pages.

O projeto é servido em um subdiretório (`/gateflow/`), então duas configurações são obrigatórias e já estão aplicadas:

- `base: '/gateflow/'` em [vite.config.ts](vite.config.ts), ativado apenas quando `GITHUB_ACTIONS` está definido.
- `basename` no `BrowserRouter` em [src/App.tsx](src/App.tsx), derivado de `import.meta.env.BASE_URL`, para que as rotas funcionem sob o subdiretório.

Como o GitHub Pages não reescreve rotas de SPA, o script [scripts/copy-fallback.mjs](scripts/copy-fallback.mjs) copia `dist/index.html` para `dist/404.html` no fim do build, permitindo abrir links profundos diretamente.

## 8. Como funciona o backend simulado

Cada domínio expõe um serviço (`services/api/*.service.ts`) que delega a um repositório genérico. O repositório simula latência discreta com Promises, persiste no LocalStorage e recria a massa inicial quando a chave não existe. A interface sempre recebe dados assíncronos, exatamente como receberia de uma API real.

## 9. Como os dados são armazenados

Uma chave por coleção, no formato `gateflow:v1:<colecao>`, contendo JSON. A escrita é feita após cada operação de criação, edição ou exclusão, garantindo que recarregar a página preserve o estado.

## 10. Como restaurar os dados de demonstração

Acesse **Configurações → Dados de demonstração → Restaurar dados**. A ação pede confirmação, remove as chaves persistidas e recarrega a aplicação com a massa inicial. Também é possível limpar o LocalStorage do site pelas ferramentas do navegador.

## 11. Limitações da versão demonstrativa

Não há autenticação real, multiusuário, controle de permissões nem sincronização entre dispositivos. Os dados vivem apenas no navegador atual. Não existe comunicação com equipamentos físicos: os botões de dispositivos apenas simulam mudança de status.

## 12. O que seria necessário para produção

- **API REST** com contratos versionados e validação de entrada no servidor.
- **Banco relacional** (PostgreSQL) com migrações, índices e integridade referencial.
- **Autenticação** com sessão/JWT, perfis (administração, portaria, morador) e autorização por recurso.
- **Logs e auditoria** de cada movimentação, com autor, data e origem.
- **Comunicação segura** entre dispositivos e servidor (TLS, mTLS para hardware, filas para eventos offline).
- **Infraestrutura** com containers, CI/CD, ambientes separados e observabilidade.
- **Backup** automatizado com teste de restauração.
- **LGPD**: base legal, minimização, retenção definida, criptografia de dados pessoais e trilha de consentimento.
- **Monitoramento** de disponibilidade, erros e métricas de operação.

## 13. Integração com equipamentos reais

A integração depende de SDK, API ou protocolo fornecido pelo fabricante — não basta o modelo do equipamento. Podem ser avaliados: controladoras de acesso e leitores de QR Code (Intelbras e similares), fechaduras eletrônicas, câmeras IP (RTSP/ONVIF) e interfonia (SIP). Uma implantação real exige validação de compatibilidade, testes de segurança e rede adequada. **Nenhuma integração real está implementada neste projeto.**

## 14. Roadmap de melhorias

- Autenticação e perfis de acesso.
- Aprovação de visitantes pelo morador (web/app).
- Notificações de entrega por e-mail ou WhatsApp.
- Relatórios exportáveis e filtros por período.
- Upload de foto do visitante e pré-autorização com QR Code.
- Testes automatizados de componentes e de serviços.
- Tema escuro e internacionalização.

## 15. Como contribuir

A branch `main` é protegida: toda alteração entra por Pull Request, inclusive vindas de forks. O passo a passo completo, os padrões de código obrigatórios (limite de 150 linhas por arquivo e modularização por camadas) e a checklist de verificação estão em [CONTRIBUTING.pt.md](CONTRIBUTING.pt.md).

## 16. Observações finais

Todo o conteúdo do painel é derivado da massa demonstrativa em [src/data](src/data). A operação é inteiramente local: o projeto roda sem servidor, banco de dados ou serviço externo.
