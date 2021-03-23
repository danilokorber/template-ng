def dockerImageGroup = "easyware"
def applicationName = "template-ng"

def gitURL = "https://github.com/danilokorber/${applicationName}.git"

def myNexusHostname = "lpitgovnexus01.bmwgroup.net"
def myNexusHostedRepoPort = "16015"
def myNexusGroupRepoPort = "16016"


pipeline {
	agent {
        docker {
            image 'dkorber/java-node:latest' 
            args '-p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --name jenkins-deploy' 
        }
    }

	stages {

		// stage("Checking pre reqs") {
		// 	steps{
		// 		script {
		// 			sh "node -v"
        //             sh "npm -v"
		// 			sh "java -version"
		// 			sh "docker -v"
		// 		}
		// 	}
		// }

		// stage("Prepare dist directory") {
		// 	steps{
		// 		script {
		// 			if(fileExists("/nginx/${applicationName}")) {
  		// 				echo "Removing old dist files"
		// 				sh "rm -f -R /nginx/${applicationName}"
		// 			}
		// 			if(!fileExists("/nginx/${applicationName}")) {
  		// 				echo "Creating new dist directory"
		// 				sh "mkdir /nginx/${applicationName}"
		// 				sh "chmod 755 /nginx/${applicationName}"
		// 			}
		// 		}
		// 	}
		// }

		stage("Install packages") {
			steps{
				script {
					echo "Installing packages for ${applicationName}"					
					sh "npm install"
				}
			}
		}

		// stage("Lint") {
		// 	steps{
		// 		script {
		// 			echo "Linting ${applicationName}"
		// 			sh "npm run sonar"
		// 		}
		// 	}
		// }

		stage("Build app") {
			steps{
				script {
					echo "Building ${applicationName} app"
					sh "npm run build:prod"
					// sh "chmod 755 /nginx/${applicationName}/*"
					// if(!fileExists("/nginx/${applicationName}")) {
					// 	echo "Build to /nginx/${applicationName} FAILED!!"
					// }
				}
			}
		}

		stage("Build docker") {
			steps{
				script {
					echo "Building ${applicationName} docker"

					sh "docker build -t ${dockerImageGroup}/${applicationName} ."
					// sh "docker tag ${dockerImageGroup}/${applicationName} ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:${applicationVersion}"
					// sh "docker tag ${dockerImageGroup}/${applicationName} ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:latest"
					// sh "docker push ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:${applicationVersion}"
					// sh "docker push ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:latest"
				}
			}
		}

		stage("Start docker") {
			steps{
				script {
					echo "Starting ${applicationName}"

					sh "docker run --network easyware --name ${applicationName} ${dockerImageGroup}/${applicationName}"
				}
			}
		}
		

		// stage("Restart docker") {
		// 	steps{
		// 		script {
		// 			echo "Restarting docker container"
		// 			sh "docker container restart ${applicationName}"

		// 			def inspectExitCode = sh script: "docker container inspect ${applicationName}", returnStatus: true
		// 			if (inspectExitCode == 0) {
    	// 				sh "docker container restart ${applicationName}"
		// 			} else {
    	// 				sh "Container ${applicationName} not found."
		// 			}					
		// 		}
		// 	}
		// }

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