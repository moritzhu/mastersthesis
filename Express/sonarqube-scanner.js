const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl : 'http://localhost:9000',
    token : "f8cb9e5ad120399b8d70a4d6d741341360c558e1",
    options: {
      'sonar.projectName': 'MainScan',
      'sonar.projectKey' : "aa"

    }
  },
  () => process.exit()
)