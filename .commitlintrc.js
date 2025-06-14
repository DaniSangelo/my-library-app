module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'build',
          'ci',
          'chore', /* indicates changes to the project that do not affect the system or test files. These are development changes. */
          'docs',
          'feat',
          'fix',
          'perf',
          'refactor',
          'revert',
          'style',
          'test'
        ]
      ],
      'type-empty': [2, 'never'],
      'scope-empty': [0], // scope opcional
      'subject-empty': [2, 'never'],
    },
  };
  