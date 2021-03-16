def applicationName = "template"

def gitURL = "https://github.com/danilokorber/${applicationName}.git"

pipeline {
	agent any

	stages {

		stage("List downloaded files") {
			steps{
				script {
					sh "ls"
					sh "ls -l /nginx"
					if(fileExists("/nginx/${applicationName}")) {
  						echo "Removing old dist files"
						sh "rm -f -R /nginx/${applicationName}"
					}
					sh "ls -l /nginx"
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