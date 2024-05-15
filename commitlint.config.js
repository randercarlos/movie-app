export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': 50,
    'type-enum': [
      'build',
      'chore',
      'ci',
      'docs',
      'feat',
      'fix',
      'perf',
      'refactor',
      'revert',
      'style',
      'test',
    ]
  }
};
