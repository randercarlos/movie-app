export default {
  extends: ["@commitlint/config-conventional"],
  prompt: {
    "settings": { },
    "messages": {
      "skip": ":pular",
      "max": "máximo de %d caracteres",
      "min": "pelo menos %d caracteres",
      "emptyWarning": "não pode ficar vazio",
      "upperLimitWarning": "acima do limite",
      "lowerLimitWarning": "abaixo do limite"
    },
    "questions": {
      "type": {
        "description": "Selecione o tipo de alteração que você está realizando:",
        "enum": {
          "feat": {
            "description": "Uma nova funcionalidade",
            "title": "Funcionalidades",
            "emoji": "✨"
          },
          "fix": {
            "description": "Uma correção de bug",
            "title": "Correções de Bugs",
            "emoji": "🐛"
          },
          "docs": {
            "description": "Alterações apenas na documentação",
            "title": "Documentação",
            "emoji": "📚"
          },
          "style": {
            "description": "Alterações que não afetam o significado do código "
              + "(espaços em branco, formatação, ponto e vírgula ausente, etc)",
            "title": "Estilos",
            "emoji": "💎"
          },
          "refactor": {
            "description": "Uma alteração de código que não corrige um bug nem adiciona"
              + " uma funcionalidade",
            "title": "Refatorações de Código",
            "emoji": "📦"
          },
          "perf": {
            "description": "Uma alteração de código que melhora o desempenho",
            "title": "Melhorias de Desempenho",
            "emoji": "🚀"
          },
          "test": {
            "description": "Adição de testes ausentes ou correção de testes existentes",
            "title": "Testes",
            "emoji": "🚨"
          },
          "build": {
            "description": "Alterações que afetam o sistema de build ou dependências externas "
              + "(exemplos de escopos: gulp, broccoli, npm)",
            "title": "Construções",
            "emoji": "🛠"
          },
          "ci": {
            "description": "Alterações em nossos arquivos e scripts de configuração de CI"
              + " (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)",
            "title": "Integrações Contínuas",
            "emoji": "⚙️"
          },
          "chore": {
            "description": "Outras alterações que não modificam arquivos de código-fonte "
              + "ou de teste",
            "title": "Afazeres",
            "emoji": "♻️"
          },
          "revert": {
            "description": "Reverte um commit anterior",
            "title": "Reversões",
            "emoji": "🗑"
          }
        }
      },
      "scope": {
        "description": "Qual é o escopo desta alteração (por exemplo, componente ou nome do "
          + "arquivo)"
      },
      "subject": {
        "description": "Escreva uma descrição curta e imperativa da alteração"
      },
      "body": {
        "description": "Forneça uma descrição mais longa da alteração"
      },
      "isBreaking": {
        "description": "Existem alterações que quebram compatibilidade?"
      },
      "breakingBody": {
        "description": "Um commit com ALTERAÇÃO QUEBRA-COMPATIBILIDADE requer um corpo. "
          + "Por favor, insira uma descrição mais longa do próprio commit"
      },
      "breaking": {
        "description": "Descreva as alterações que quebram compatibilidade"
      },
      "isIssueAffected": {
        "description": "Esta alteração afeta algum problema em aberto?"
      },
      "issuesBody": {
        "description": "Se problemas estiverem sendo fechados, o commit requer um corpo. "
          + "Por favor, insira uma descrição mais longa do próprio commit"
      },
      "issues": {
        "description": "Adicione referências aos problemas relacionados (por exemplo, "
          + "'corrigir #123', 'rel #123')."
      }
    }
  }
};
