//===========================================================================
//  APPLICATION SETTINGS
//===========================================================================
def dnsRecord = "template"         // "record" as in record.domain.com
def dnsDomain = "easyware.io"      // "domain.com" as in record.domain.com
def dnsResourceGroup = "Easyware"  // Check correct Resource Group in Azure

//===========================================================================
//  ONLY CHANGE IF YOU KNOW WHAT YOU ARE DOING
//===========================================================================
def labelFile = "./dist/assets/labels.txt"

def dockerNetwork = "easyware"

def traefikResolver = "easywareresolver"

def dnsCNAMEvalue = "obelix.easyware.io"

def myNexusHostname = "nexus.easyware.io"
def myNexusHostedRepoPort = "8083"
def myNexusGroupRepoPort = "8082"
def dockerImageGroup = "easyware"
def applicationName
def applicationVersion


pipeline {
	agent {
        docker {
            image 'dkorber/java-node:latest' 
            args '-p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --name jenkins-temp' 
        }
    }
	environment {
        CRED_NEXUS = credentials('easywareNexusAdmin')
    }

	stages {

		stage("Preparing environment") {
			steps{
				script {
					// Read application name and version from package.json file
					applicationName = sh(script: "npm run env | grep npm_package_name | cut -d '=' -f 2", returnStdout: true).trim()
					applicationVersion = sh(script: "npm run env | grep npm_package_version | cut -d '=' -f 2", returnStdout: true).trim()
					echo "applicationName: ${applicationName}"
					echo "applicationVersion: ${applicationVersion}"
					sh "npm config set registry https://${myNexusHostname}/repository/easyware-npm-group"
					sh "docker login -u ${CRED_NEXUS_USR} -p ${CRED_NEXUS_PSW} ${myNexusHostname}:${myNexusHostedRepoPort}"
				}
			}
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
					echo "Building docker image for ${applicationName}."
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

		stage("Prepare docker deployment") {
			steps{
				script{
					sh "touch ${labelFile}"
					sh "echo 'traefik.enable=true' >> ${labelFile}"
					sh "echo 'traefik.http.routers.template.entrypoints=websecure' >> ${labelFile}"
					sh "echo 'traefik.http.routers.template.rule=Host(`${dnsRecord}.${dnsDomain}`)' >> ${labelFile}"
					sh "echo 'traefik.http.routers.template.tls.certresolver=${traefikResolver}' >> ${labelFile}"
				}
			}
		}

		stage("Start docker") {
			steps{
				script {
					echo "Deploying ${applicationName}"
					sh "docker stop ${applicationName} || true && docker rm ${applicationName} || true"	
					sh """docker run -d \
					                 --network ${dockerNetwork} \
					                 --name ${applicationName} \
									 --label-file ${labelFile} \
									 ${dockerImageGroup}/${applicationName}"""
					sh "rm ${labelFile}"					
				}
			}
		}

		stage("Prune docker") {
			steps{
				script {
					echo "Pruning ${applicationName}"
					sh "docker system prune"		
				}
			}
		}

	}
}