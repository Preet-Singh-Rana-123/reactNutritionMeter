pipeline {

    agent any

    environment {
        IMAGE_NAME = "preet0001/nutrition-meter"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:v1 .'
            }
        }

        stage('List Docker Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}
