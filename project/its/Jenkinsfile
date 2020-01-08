def APP_USER = 'tingngs'
def APP_NAME = 'its'
def CONTAINER_NAME = 'its_container'

pipeline {
  agent any
  stages {
    stage('Test') { 
      agent { 
        docker {
          image 'mhart/alpine-node'
    	    } 
      }
      environment {
        HOME = '.'
      }
      steps {
        sh 'rm -r ./.next || true'
        sh 'rm -r ./node_modules || true'
        cleanWs()
        dir("${workspace}@tmp") {
          deleteDir()
        }
      }
    }

    stage('Deploy') {
      steps {
        sh "docker stop ${CONTAINER_NAME} || true && docker rm ${CONTAINER_NAME} || true && docker rmi ${APP_USER}/${APP_NAME} || true"
        sh "docker build -t ${APP_USER}/${APP_NAME} ."
        sh "docker run -d -p 3001:3000 --name ${CONTAINER_NAME} ${APP_USER}/${APP_NAME}:latest"
        cleanWs()
        dir("${workspace}@tmp") {
          deleteDir()
        }
      } 
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}