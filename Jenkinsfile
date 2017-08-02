@Library('shared@0.2')
import gd.mrx.ci.DockerStack

node('builder') {
    stage('Checkout') {
        checkout scm
    }
}

def stack = new gd.mrx.ci.DockerStack(this, 'hr-frontend', [
    extra_env: { s ->
        backend_hostname = s.getAPIHostname('merix-hr', 'backend', 'dev')
        [
            "BACKEND_URL=http://${backend_hostname}/api/",
        ]
    }
])
stack.execute()
