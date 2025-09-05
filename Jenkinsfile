pipeline {
    agent any
    environment {
        // This references the credentials ID you just created in Jenkins
        DOCKER_CREDS = credentials('Aniket')
        // Your Docker Hub username (replace 'your-dockerhub-username')
        DOCKER_IMAGE = 'testing9920/todo-app'
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Step 1: Jenkins gets the latest code from GitHub
                git branch: 'main', url: 'https://github.com/t01769945-glitch/Mini-Todo-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Step 2: Build the Docker image from the Dockerfile in the repo
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                // Step 3: Log in to Docker Hub using the credentials from Jenkins
                script {
                    docker.withRegistry('', "${DOCKER_CREDS}") {
                        // Step 4: Push the newly built image to Docker Hub
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }
    post {
        always {
            // Cleanup: Delete the built image from the Jenkins workspace
            sh 'docker system prune -f'
        }
    }
}