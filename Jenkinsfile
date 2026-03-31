pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-username/your-repo.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir('backend') {
                    bat 'start cmd /c npm start'
                }
            }
        }

        stage('Run Frontend Dev Server') {
            steps {
                dir('frontend') {
                    bat 'start cmd /c npm run dev'
                }
            }
        }

    }
}