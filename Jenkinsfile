def dockerImageGroup = "easyware"
def applicationName = "template-ng"

def gitURL = "https://github.com/danilokorber/${applicationName}.git"

def dnsResourceGroup = "Easyware"
def dnsDomain = "easyware.io"
def dnsRecord = "template"
def dnsCNAMEvalue = "obelix.easyware.io"

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

		stage("Create DNS record") {
			steps{
				script{
					echo "Creating DNS record ${dnsRecord}.${dnsDomain}"
					def azureCmd = "az network dns record-set cname set-record -g ${dnsResourceGroup} -z ${dnsDomain} -n ${dnsRecord} -c ${dnsCNAMEvalue}"
					sh "docker run dkorber/azure ${azureCmd}"
				}
			}
		}

		stage("Start docker") {
			steps{
				script {
					echo "Starting ${applicationName}"
					sh "docker stop ${applicationName} || true && docker rm ${applicationName} || true"
					
					def labelFile = "./assets/labels.txt"
					//sh "echo traefik.enable=true > ${labelFile}"
					//sh "echo traefik.http.routers.${applicationName}.entrypoints=websecure >> ${labelFile}"
					//sh "echo traefik.http.routers.${applicationName}.rule=Host(`${dnsRecord}.${dnsDomain}`) >> ${labelFile}"
					//sh "echo traefik.http.routers.${applicationName}.tls.certresolver=easywareresolver >> ${labelFile}"

					sh """docker run -d \
					                 --network easyware \
					                 --name ${applicationName} \
									 --label-file ${labelFile} \
									 ${dockerImageGroup}/${applicationName}"""
				}
			}
		}

	}
}