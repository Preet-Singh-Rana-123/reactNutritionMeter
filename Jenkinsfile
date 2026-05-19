pipeline {

    agent any

    environment {
        IMAGE_NAME = "preet0001/nutrition-meter"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:latest .'
            }
        }

        stage('Docker Login') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $IMAGE_NAME:latest'
            }
        }

        stage('List Docker Images') {
            steps {
                sh 'docker images'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                KUBECONFIG=/root/.kube/jenkins-config \
                kubectl rollout restart deployment nutrition-meter
                '''
            }
        }

        stage('Verify Pods') {
            steps {
                sh 'kubectl get pods'
            }
        }
    }
}
