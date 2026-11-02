# Como contribuir com o GateFlow

[English](CONTRIBUTING.md) · **Português**

Obrigado pelo interesse no projeto. Este documento descreve o fluxo de contribuição, os padrões de código adotados e o que é verificado antes de um Pull Request ser aceito.

Antes de começar, leia o [README.pt.md](README.pt.md) para entender o escopo: é uma aplicação front-end de demonstração, sem backend real, com dados persistidos no LocalStorage do navegador.

## Fluxo de contribuição

A branch `main` é protegida: **push direto é recusado**. Toda alteração entra por Pull Request.

1. Faça um **fork** do repositório clicando em *Fork* no GitHub.
2. Clone o seu fork:

   ```bash
   git clone https://github.com/<seu-usuario>/gateflow.git
   cd gateflow
   npm install
   ```

3. Crie uma branch a partir da `main`:

   ```bash
   git switch -c feat/nome-curto-da-mudanca
   ```

4. Implemente a mudança seguindo os padrões abaixo.
5. Valide localmente (veja a seção de verificação).
6. Envie a branch para o seu fork e abra um Pull Request para `main`.

   ```bash
   git push -u origin feat/nome-curto-da-mudanca
   ```

## Nomes de branch

Use um prefixo que indique a natureza da mudança:

| Prefixo | Uso |
| --- | --- |
| `feat/` | funcionalidade nova |
| `fix/` | correção de bug |
| `refactor/` | reorganização sem mudança de comportamento |
| `docs/` | documentação |
| `chore/` | configuração, dependências, build |

## Commits

Mensagens no padrão `tipo: descrição curta`, em português, no imperativo e sem ponto final.

```text
feat: adiciona filtro por bloco na listagem de prestadores
fix: corrige overflow horizontal dos cards no mobile
docs: documenta o fluxo de deploy no README
```

Evite commits genéricos como `ajustes` ou `wip`. Se a mudança for grande, prefira vários commits pequenos e coerentes.

## Padrões de código

### Limite de 150 linhas por arquivo

**Nenhum arquivo pode passar de 150 linhas.** É a regra central do projeto e um Pull Request que a viole é recusado. Quando um arquivo cresce, extraia um componente, um hook ou um utilitário.

Para conferir o maior arquivo do projeto:

```powershell
Get-ChildItem -Recurse -File "src" -Include *.ts,*.tsx |
  ForEach-Object { [pscustomobject]@{ Lines = (Get-Content -LiteralPath $_.FullName | Measure-Object -Line).Lines; Path = $_.Name } } |
  Sort-Object Lines -Descending |
  Select-Object -First 5
```

### Modularização obrigatória

O projeto segue camadas com dependência unidirecional:

```text
types → constants/utils → data → services → hooks → components → pages → routes
```

Regras práticas:

- **Páginas nunca acessam o mock diretamente.** Consomem um serviço em `src/services/api`.
- **Colunas de tabela, modais e modelos de formulário** ficam em `src/components/<dominio>/`, junto do domínio.
- **Lógica reaproveitável** vira hook em `src/hooks` ou utilitário em `src/utils`.
- **Formulários** usam `Modal` + `useForm`; **tabelas** usam `ResourceTable` + fábrica de colunas.
- Componentes de UI genéricos ficam em `src/components/ui` e não conhecem regra de negócio.

### Estilo

- TypeScript em modo estrito. Evite `any`; prefira tipos em `src/types`.
- Toda a interface, comentários e mensagens de erro são em **português brasileiro**.
- Tailwind CSS v4 com os design tokens do projeto; evite cores e espaçamentos arbitrários.
- Componentes de apresentação não fazem `fetch` nem tocam no LocalStorage.
- Acessibilidade: todo botão de ícone precisa de `aria-label`, e formulários precisam de `label` associado.

## Verificação antes de abrir o Pull Request

Execute os três comandos e confirme que todos passam:

```bash
npm run typecheck   # TypeScript sem erros
npm run build       # build de produção
npm run dev         # teste manual da tela alterada
```

Rode o build mesmo que a mudança pareça pequena: ele executa o typecheck e a copa de fallback do Pages. Pull Requests que quebram o build não serão mesclados.

## O que evitar

- Reformatações amplas de arquivos que não fazem parte da sua mudança.
- Alterações de dependências sem justificativa no Pull Request.
- Commits que incluam `node_modules`, `dist` ou arquivos de configuração local de editor.
- Traduzir a interface para outro idioma.
- Adicionar biblioteca de gráficos ou de estado sem discutir antes em uma issue.

## Dúvidas

Abra uma [issue](https://github.com/kaique-albuquerque/gateflow/issues) descrevendo a dúvida ou a proposta antes de implementar algo estruturalmente novo.
