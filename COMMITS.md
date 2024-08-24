# Padrões de commits 📜

Este projeto segue algumas regras bem definidas para fazer commits. O objetivo é manter o histórico de versão organizado e fácil de entender.
Essas regras seguem o padrão **[Conventional Commits](https://www.conventionalcommits.org/pt-br)* e também usa algumas funcionalidades do git 
para garantir que o código seja de alta qualidade e consistente.

Esses commits auxiliarão você e sua equipe a entenderem de forma facilitada quais alterações foram realizadas no trecho de código que foi commitado.

Essa identificação ocorre por meio de uma palavra que identifica se aquele commit realizado se trata de uma alteração de código, atualização de pacotes, documentação, alteração de visual, teste...

## Conventional Commits

Os commits neste projeto seguem a especificação Conventional Commits. Cada mensagem de commit segue um formato específico: tipo, escopo (opcional) e uma descrição clara. Os tipos ajudam a entender o que cada commit faz:

- **feat**: Introduzindo uma nova funcionalidade para o usuário.
- **fix**: Resolvendo um bug para o usuário, abordando um comportamento incorreto.
- **docs**: Apenas alterações na documentação, como atualizações no README ou comentários em linha.
- **style**: Mudanças que não afetam o significado do código (espaços em branco, formatação, etc.).
- **refactor**: Alterações no código que não corrigem um bug nem adicionam uma funcionalidade.
- **test**: Adição de testes ausentes ou correção de testes existentes.
- **chore**: Outras alterações que não modificam arquivos src ou de teste.
- **ci**: Mudanças relacionadas a **integração contínua** (_continuous integration_).

## Recomendações 🎉

Cada mensagem de commit deve ter até 50 caracteres estar em inglês e ser breve e direta, como:

- "Add new authentication method"
- "Fix login page validation"
- "Update README with installation instructions"
- "Reformat code for consistency"
- "Refactor database connection handling"
- "Add unit tests for user authentication"
- "Update dependencies to latest versions"

## Complementos de commits 💻

- **Rodapé(opcional):** informação sobre o revisor e número do card no Trello ou Jira. Exemplo: Reviewed-by: Elisandro Mello Refs #133
- **Corpo(opcional):** descrições mais precisas do que está contido no commit, apresentando impactos e os motivos pelos quais foram empregadas as alterações no código, como também instruções essenciais para intervenções futuras. Exemplo: see the issue for details on typos fixed.
- **Descrições:** uma descrição sucinta da mudança. Exemplo: correct minor typos in code

## 💻 Exemplos

<table>
  <thead>
    <tr>
      <th>Comando Git</th>
      <th>Resultado no GitHub</th>
    </tr>
  </thead>
 <tbody>
    <tr>
      <td>
        <code>git commit -m "chore: Commit inicial"</code>
      </td>
      <td> Commit inicial</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "chore(docs): update README"</code>
      </td>
      <td> chore: update README</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "fix: infinite loop at line 50"</code>
      </td>
      <td> fix: infinite loop at line 50</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "feat(auth): login page"</code>
      </td>
      <td>feat(auth): login page</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "ci: Modificação no Dockerfile"</code>
      </td>
      <td>ci: Modificação no Dockerfile</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "refactor: convert to arrow functions"</code>
      </td>
      <td>refactor: convert to arrow functions</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "refactor(performance): improve response time"</code>
      </td>
      <td>refactor(performance): improve response time</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "fix(admin): revert bad changes"</code>
      </td>
      <td>fix(admin): revert bad changes</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "feat(comment): apply CSS in form"</code>
      </td>
      <td>feat(comment): apply CSS in form</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "test: create new tests"</code>
      </td>
      <td>test: create new tests</td>
    </tr>
    <tr>
      <td>
        <code>git commit -m "style: fix linter errors"</code>
      </td>
      <td>style: fix linter errors</td>
    </tr>
  </tbody>
</table>

## Integração com Git Hooks

Para manter a qualidade do código, ao se fazer um **commit** é realizada:

1. **Validação de Branch**: verifica se a branch foi criada usando Git Flow. Isso ajuda a manter a organização e a consistência nas branches.

   **Como corrigir**: use o comando `git flow feature/fix/hotfix/support/release start ...` para começar uma nova branch.

2. **Linting**: um script que analisa seu código para ver se tem algum erro de estilo ou sintaxe.

   **Como corrigir**: rode o script `composer run lint:show` para ver os erros e `composer run lint:fix` para corrigi-los.

3. **Testes Unitários**: verifica se as alterações realizadas não quebraram funcionalidades existentes ou criadas.

   **Como corrigir**: altere o seu código para que o mesmo não quebre funcionalidades criadas nem as existentes com o comando `composer run test:code` ou `php artisan test` para garantir que tudo funcione como deveria.


Para manter a qualidade do código, ao se fazer um **push** é realizada:

1. **Análise estática**: analisa seu código em busca de potenciais erros.

   **Como corrigir**: use o comando `composer run analyse:code` para analisar e corrigir automaticamente ou manualmente os erros de análise estática.

2. **Cobertura de testes unitários**: o projeto tem uma cobertura mínima de 90% de testes unitários. Se for criado um pull request sem testes unitários, a cobertura será menor que 90% e o pull request será rejeitado.

   **Como corrigir**: adicione testes unitários para as funcionalidades criadas ou alteradas ou refatoradas que ainda não possuam. Para verificar a cobertura de código, rode o script `composer run test:coverage` para verificar a cobertura de código e `composer run test:report` para saber onde falta adicionar testes unitários.

## Contribuição

Fique à vontade para contribuir com esse guia no que você achar necessário para garantirmos um mínimo de qualidade de código
