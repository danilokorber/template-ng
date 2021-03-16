def applicationName = "template-ng"

def gitURL = "https://github.com/danilokorber/${applicationName}.git"

stage("Checkout SCM") {
	sh "ls"
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