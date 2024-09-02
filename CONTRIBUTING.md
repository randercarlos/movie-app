# Contribuindo para o Projeto

Obrigado por considerar contribuir para o nosso projeto Vue 3! Este documento descreve o processo e as diretrizes para contribuir, garantindo um fluxo de trabalho suave e consistente.

## Sumário

1. [Estratégia de Branches](#estratégia-de-branches)
2. [Mensagens de Commit](#mensagens-de-commit)
3. [Configurando o Projeto](#configurando-o-projeto)
4. [Criando um Pull Request](#criando-um-pull-request)
5. [Verificações de CI/CD](#verificações-de-cicd)
6. [Releases](#releases)

## Estratégia de Branches

Utilizamos o **Git Flow** para gerenciar as branches neste projeto. Por favor, siga o modelo de branches:

- **`main`**: A branch principal que contém o código pronto para produção.
- **`develop`**: A branch de desenvolvimento onde novas funcionalidades e correções de bugs são integradas antes de serem lançadas.
- **Branches de Funcionalidades (`feature/*`)**: Usadas para desenvolver novas funcionalidades. Essas branches devem ser criadas a partir da `develop`.
- **Branches de Correção Rápida (`hotfix/*`)**: Usadas para corrigir urgentemente problemas na branch `main`.
- **Branches de Release (`release/*`)**: Usadas para preparar uma nova versão. Essas branches devem ser criadas a partir da `develop` e mescladas de volta em `main` e `develop` após o lançamento.

## Mensagens de Commit

Utilizamos o formato **Conventional Commits** para mensagens de commit, garantindo consistência. Formate suas mensagens de commit da seguinte maneira:

\`\`\`

tipo([escopo]): <descrição>

[corpo [recomendado]]

[rodapé opcional]
\`\`\`

### Tipos Comuns:

- **feat**: Uma nova funcionalidade.
- **fix**: Correção de um bug.
- **chore**: Manutenção ou pequenas alterações que não afetam o código.
- **refactor**: Alterações no código que não corrigem um bug nem adicionam uma funcionalidade.
- **docs**: Atualizações de documentação.
- **style**: Alterações no estilo do código (ex.: formatação).
- **test**: Adição ou atualização de testes.
- **build**: Alterações que afetam o sistema de build ou dependências externas.
- **ci**: Alterações na configuração do CI/CD.

<br />
Para mais detalhes, consultar o arquivo [COMMITS.md](COMMITS.md)

## Configurando o Projeto

Para contribuir, primeiro clone o repositório:

\`\`\`bash
git clone https://github.com/seunomeusuario/seuprojeto.git
cd seuprojeto
\`\`\`

Instale as dependências usando pnpm:

\`\`\`bash
pnpm install
\`\`\`

Para iniciar o servidor de desenvolvimento:

\`\`\`bash
pnpm run dev
\`\`\`

## Criando um Pull Request

1. Fork o repositório e crie sua branch a partir da `develop`.
2. Certifique-se de que seu código segue os guias de estilo do projeto.
3. Garanta que seu código esteja bem documentado e inclua os testes necessários.
4. Commit suas alterações seguindo as diretrizes de mensagens de commit.
5. Faça o push da sua branch para o seu repositório forkado.
6. Crie um Pull Request (PR) para a branch `develop`.

## Verificações de CI/CD

Nosso projeto inclui um pipeline de CI/CD que é executado automaticamente para cada pull request e push no repositório.

### Para Pull Requests:

- **Verificação de Linter**: Garante que o código segue as regras de lint do projeto.
- **Verificação de Tipagem**: Valida a correção dos tipos do TypeScript.
- **Verificação de Conventional Commits**: Garante que todos os commits seguem o formato de Conventional Commits.
- **Testes Unitários**: Executa todos os testes unitários e requer 100% de cobertura de código.
- **Testes End-to-End**: Executa testes end-to-end usando o Playwright.

Todas as verificações devem passar para que um PR seja mesclado.

### Para Pushes:

Inclui todas as verificações mencionadas acima, e adicionalmente:

- **Geração de Releases**: Se o push for para a branch `main` ou `develop`, uma nova release é gerada automaticamente, incluindo:
  - **Criação de Tags**: Uma nova tag Git é criada.
  - **Atualização do `CHANGELOG.md`**: Atualizações de changelog geradas automaticamente.

## Releases

Releases são geradas automaticamente pelo nosso pipeline de CI/CD quando o código é enviado para as branches `main`. A versão é determinada com base nas mensagens de commit seguindo o **SemVer**(Versionamento Semântico).

Certifique-se de que suas mensagens de commit reflitam com precisão as alterações feitas para que as notas de release sejam claras e informativas.

## Agradecimentos!

Obrigado por contribuir com o nosso projeto! Agradecemos seu tempo e esforço para nos ajudar a melhorar e fique a vontade para tirar dúvidas com outros membros do projeto.
