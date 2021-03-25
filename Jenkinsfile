def dockerImageGroup = "easyware"
def applicationName
def applicationVersion

def gitURL = "https://github.com/danilokorber/${applicationName}.git"

def dnsResourceGroup = "Easyware"
def dnsDomain = "easyware.io"
def dnsRecord = "template"
def dnsCNAMEvalue = "obelix.easyware.io"

def labelFile = "./dist/assets/labels.txt"

def myNexusHostname = "nexus.easyware.io"
def myNexusHostedRepoPort = "8083"
def myNexusGroupRepoPort = "8082"


pipeline {
	agent {
        docker {
            image 'dkorber/java-node:latest' 
            args '-p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --name jenkins-deploy' 
        }
    }

	stages {

		stage("Preparing") {
			steps(
				script {
					// Read application name and version from package.json file
					applicationName = sh "npm run env | grep npm_package_name | cut -d '=' -f 2"
					applicationVersion = sh "npm run env | grep npm_package_version | cut -d '=' -f 2"
					echo "applicationName: ${applicationName}"
					echo "applicationVersion: ${applicationVersion}"
					sh "npm config set registry https://${myNexusHostname}/repository/easyware-npm-group/_auth=YWRtaW46RGFuaWxvNzc="
				}
			)
		}		

		stage("Install packages") {
			steps{
				script {
					echo "Installing packages for ${applicationName}"					
					sh "npm install"
				}
			}
		}

		stage("Lint") {
			steps{
				script {
					echo "Linting ${applicationName}"
					sh "npm run sonar"
				}
			}
		}

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
					sh "docker tag ${dockerImageGroup}/${applicationName} ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:${applicationVersion}"
					sh "docker tag ${dockerImageGroup}/${applicationName} ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:latest"
					sh "docker push ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:${applicationVersion}"
					sh "docker push ${myNexusHostname}:${myNexusHostedRepoPort}/${dockerImageGroup}/${applicationName}:latest"
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
					sh """docker run -d \
					                 --network easyware \
					                 --name ${applicationName} \
									 --label-file ${labelFile} \
									 ${dockerImageGroup}/${applicationName}"""
					sh "rm ${labelFile}"					
				}
			}
		}

	}
}