def applicationName = "template-ng"

def gitURL = "https://github.com/danilokorber/${applicationName}.git"

pipeline {
	agent any

	stages {

		stage("Removing old dist directory") {
			steps{
				script {					
					sh "node -v"
					if(fileExists("/nginx/${applicationName}")) {
  						echo "Removing old dist files"
						sh "rm -f -R /nginx/${applicationName}"
					}
				}
			}
		}

		stage("Install packages") {
			steps{
				script {
					echo "Installing packages for ${applicationName}"					
					sh "npm run install"
				}
			}
		}

		stage("Build") {
			steps{
				script {
					echo "Building ${applicationName}"

					sh "npm run build  --deploy-url /nginx/${applicationName}"
					sh "ls -l /nginx/${applicationName}"
				}
			}
		}

	}
}



//   stage("Main build") {

//     stage('Checkout SCM') {
//       checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: "https://github.com/danilokorber/${applicationName}.git" ]]])
//     }    
    
// 	stage('Install') {
// 		sh label:
// 			'Running npm install',
// 		script: {
// 			sh "node --version"
// 			sh "cd ${applicationName}"
// 			sh "npm install"
// 		}
// 	}

//     stage ('Build') {      
// 		sh label:
// 			'Running npm run build',
// 		script: {
// 			sh "node --version"
// 			sh "cd ${applicationName}"
// 			sh "npm run build"
// 		}      
//     }
//   }

//   	stage("Deploy") {
// 		sh label:
// 			'Deploying',
// 		script: {
// 			sh "cp -a ${applicationName}/. /nginx/${applicationName}/"
// 		}      
//   	}