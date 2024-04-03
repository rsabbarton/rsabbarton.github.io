


class Project {
    constructor (config) {
        console.log(config)
        this.config = config
    }

    render(options) {
        console.log(options)
        this.options = options

        this.container = document.getElementById(this.config.containerId)
        console.log(this.container)
        this.container.innerHTML = ""
        this.apiUrl = `https://api.github.com/repos/${this.config.githubOrg}/${this.config.githubRepo}`
        this.get(this.apiUrl)
        .then((response)=>{
            console.log(response)
            this.project = response
            this.createPage()
        })

    }

    get(url){
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(null);
            xhr.onreadystatechange = (e) => {
              if(e.currentTarget.readyState == 4){
                resolve(JSON.parse(xhr.responseText));
              }
            }
            xhr.onerror = (e) => {
                console.log(e)
                reject(e);
            }
        })
    }


    createPage(){
        this.renderDetails()
        this.renderIssues()
    }

    renderDetails(){
        let details = document.createElement("div")
        details.classList.add('projectdetails')
        let detailsHTML = `
            <h1>Project Info</h1>
            <div><b>Project Name: </b>${this.project.name}</div>
            <div><b>Description: </b>${this.project.description}</div>
            <div><b>Owner: </b>${this.project.owner.login}</div>
            <div><b>Language: </b>${this.project.language}</div>
            <div><b>Project URL: </b><a href="${this.project.url}">${this.project.url}</a></div>
            `
        details.innerHTML = detailsHTML
        this.container.appendChild(details)
    }

    renderIssues(){
        let issuesHTML = ""
        let issues = document.createElement("div")
        issues.id = "projectissues"
        issues.classList.add("projectissues")
        this.container.appendChild(issues)
        this.get(`${this.apiUrl}/issues?state=open`)
        .then((response)=>{
            console.log(response)
            
        })
    }
}