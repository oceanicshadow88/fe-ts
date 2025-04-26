const config = {
    branches: ['master'],
    repositoryUrl: "https://bitbucket.org/010001/fe.techscrum.git",
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      [
        "@semantic-release/changelog",
        {
          "changelogFile": "docs/CHANGELOG.md"
        }
      ],
      [
        "@semantic-release/npm",
        {
          "npmPublish": false,
          "tarballDir": "false",
        }
      ],
      ['@semantic-release/git', {
        'assets': ['dist/*.js', 'dist/*.js.map', 'package.json', 'docs/CHANGELOG.md'],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      }],
    ],
  };
      
  module.exports = config;