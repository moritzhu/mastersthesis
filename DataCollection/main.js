const fetch = require("node-fetch");
const fs = require('fs');
const createLogger = require('logging');
const logger = createLogger.default('DataCollection');
//Handle params
var params = process.argv.slice(2)
var libraryName = params[0]
var withSO = (params[1]  == "true")
//Stores remaining
var remainingRequestSO
//For storing issues during multiple requests
var openIssues = []
var closedIssues = []
//Stores the GitHub authentication key
let key


if(libraryName){
    //Stores the library data
    var library = {name : libraryName, data: {}}
    //Read storage for key. 
    let rawdata = fs.readFileSync('key.json');
    key = JSON.parse(rawdata).key;
    logger.info("Getting data...")
    library.data.timeOfGathering = new Date()
    getNPMJSData()
}else{
    logger.error("Library name is required.")
}

async function getNPMJSData(){
    let url = "https://api.npmjs.org/"
    let response
    let body

    //Get Downloads
    let timeframe = "2021-04-12:2021-04-18"
    let npmjsDownloadsURL = url + "downloads/point/"+ timeframe + "/" + libraryName
    response = await fetch(npmjsDownloadsURL);
    body = await response.json();
    if(!('error' in body)){
        library.data.downloads = body

        //Get more library details
        var npmjsRegistryURL="https://registry.npmjs.org/" + libraryName
        response = await fetch(npmjsRegistryURL);
        body = await response.json();
        let firstRelease= body.time.created
        let lastRelease = body.time.modified
        let timeDiffMS  = Math.abs(new Date() - new Date(firstRelease))
        let timeDiff    = timeDiffMS / (1000 *60*60*24*365)
        let releasesPerYear= (Object.keys(body.time).length - 2) / timeDiff  //-2 because of modified and created

        //Add to data Array
        library.data.npmjs = new Object()
        library.data.npmjs.sumOfReleases = Object.keys(body.time).length - 2
        library.data.npmjs.releasesPerYear = releasesPerYear
        library.data.npmjs.firstRelease = firstRelease
        library.data.npmjs.lastRelease = lastRelease
        library.data.npmjs.numberOfMaintainers = body.maintainers.length
        
        logger.info("Got npmjs data!")
        try{
            let issueURL = body.bugs.url
            if(issueURL.substring(0,19) !== "https://github.com/"){
                logger.warn("No Github Repo was found.")
                getNPMsData()
            }else{
                let gitRepo  = issueURL.substring(19, issueURL.length-7)
                getGithubData( gitRepo)
            }
        }catch{
            getNPMsData()
        }
    }else{
        logger.error("Library does not seem to exists. Please check the spelling.")

    }

}

async function getGithubData(gitRepo){
    let url = "https://api.github.com/repos/"
    let response
    let body

    //Get general data
    let githubRepoURL = url + gitRepo
    response = await fetch(githubRepoURL, {headers: {"Authorization": "token "+key}});
    body = await response.json();

    library.data.github = new Object()
    library.data.github.stars = body.stargazers_count
    library.data.github.forks = body.forks_count

    //Get issues
    let page = 1
    while(page < 1000000){
        let githubIssueURL = `${githubRepoURL}/issues?per_page=100&page=${page}&state=all`
        response = await fetch(githubIssueURL, {headers: {"Authorization": "token "+key}});
        body = await response.json();
        var currentIssue = null
        for (let i = 0; i < body.length; i++) {
            currentIssue = body[i]
            if(currentIssue.hasOwnProperty("pull_request")){
                continue
            }
            if(currentIssue.state === "closed"){
                var closedAt = new Date(currentIssue.closed_at)
                var createdAt = new Date(currentIssue.created_at)
                closedIssues.push({"url" : currentIssue.url, "closedAt": closedAt, "createdAt": createdAt, "resolvingTime": closedAt-createdAt})
            }else if (currentIssue.state === "open") {
                openIssues.push({"url": currentIssue.url})
            }
        }
        if(body.length < 100){
            //Final page reached, add everything to data array
            //library.data.github.openIssues = new Object();
            library.data.github.openIssuesTotal = openIssues.length
            //library.data.github.openIssues.list = openIssues
            //library.data.github.closedIssues = new Object();
            library.data.github.closedIssuesTotal = closedIssues.length
            //library.data.github.closedIssues.list = closedIssues
            library.data.github.issueCoverage = (closedIssues.length / (openIssues.length + closedIssues.length)) * 100
            library.data.github.issueSum = closedIssues.length + openIssues.length
            library.data.github.avgClosingTimeInDays = (Object.values(closedIssues).reduce((t, {resolvingTime}) => t + resolvingTime, 0)/(1000*60*60*24))/closedIssues.length
            break;
        }else{
            page++
        }
    }

    //Get contributors
    page = 1
    while(page < 1000000){
    let githubContributorsURL = `${githubRepoURL}/contributors?per_page=100&page=${page}`
    response = await fetch(githubContributorsURL, {headers: {"Authorization": "token "+key}});
    body = await response.json();

    if(body.length < 100){
        library.data.github.contributors = body.length + (page -1) * 100
        break
    }else{
        page ++
    }
    }

    //Get commits
    page = 1
    let currentlyFirstCommit
    while(page < 1000000){
    let githubCommitsURL = `${githubRepoURL}/commits?per_page=100&page=${page}`
    response = await fetch(githubCommitsURL, {headers: {"Authorization": "token "+key}});
    body = await response.json();
    if(page===1){
        library.data.github.lastCommit = body[0].commit.author.date
    }

    //In case the amount of commits is mod 100 = 0, the date from the last request is saved. 
    if(body.length > 0){
        currentlyFirstCommit = body[body.length-1].commit.author.date
    }

    if(body.length < 100){
        let firstCommit
        console.log(body.length)
        if(body.length ===0){
            firstCommit = currentlyFirstCommit
        }else{
            firstCommit = body[body.length-1].commit.author.date
        }
        let timeDiffMS  = Math.abs(new Date() - new Date(firstCommit))
        let timeDiff    = timeDiffMS / (1000 *60*60*24*365)
        let commitsPerYear= ((page-1)*100 + body.length) / timeDiff  
        library.data.github.commitsPerYear = commitsPerYear
        break
    }else{
        page ++
    }
    }
    
    logger.info("Got Github data!")
    getNPMsData()
}

async function getNPMsData(){
    let npmsURL = "https://api.npms.io/v2/package/"+libraryName.replace('@', "%40").replace("/","%2F")
    let response
    let body

    response = await fetch(npmsURL);
    body = await response.json();

    library.npmsData = new Object()
    library.npmsData.dependents = body.collected.npm.dependentsCount
    library.npmsData.score = body.score
    library.npmsData.analyzedAt = body.analyzedAt

    logger.info("Got npms.io data!")
    if(withSO){
        getSOData()
    }else{
        writeData()
    }
}

async function getSOData(){
    let response
    let body

    let page = 1
    while(page < 1000000){
        let SoURL = `https://api.stackexchange.com/2.2/search/advanced?page=${page}&fromdate=1577836800&todate=1609372800&order=desc&sort=relevance&q=${libraryName}&accepted=True&site=stackoverflow`
        response = await fetch(SoURL);
        body = await response.json();
        
        if(body.has_more){
            page++
         }else{
            remainingRequestSO = body.quota_remaining
            let sum = (pageNumber-1)*50 + body.items.length
            library.data.stackOverflow = new Object()
            library.data.stackOverflow.numOfAcceptedSOQuestions = sum
            break
         }
         page++
    }
    logger.info("Got StackOverflow data!")
    writeData()
}


function writeData(){
    console.log(library)
    if(withSO){
        logger.info("Number of remaining requests at Stack Overflow: " + remainingRequestSO)
    }

    //Export to file
    let dataFile
    try {
        dataFile = fs.readFileSync("data.json")
    } catch (error) {
        logger.warn("No data file found. Creating new one")
    }
    
    if(dataFile){
        let data =  JSON.parse(dataFile);
        if(!Array.isArray(data)){
            fs.writeFile("data.json", JSON.stringify([data,library]), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }else{
            data.push(library)
            fs.writeFile("data.json", JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
       

    }else{
        fs.writeFile("data.json", JSON.stringify(library), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

}