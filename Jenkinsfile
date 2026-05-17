pipeline {

    agent any

    environment {
        IMAGE_NAME = "preet0001/nutrition-meter"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Preet-Singh-Rana-123/reactNutritionMeter.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t preet0001/nutrition-meter:v1 .'
            }
        }

        stage('List Docker Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}
