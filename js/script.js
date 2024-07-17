/* Variable to select the div element with a class = overview; This is where the profile infromation will appear when popluated */
const overview = document.querySelector(".overview");
/* Global variable for my Github username */
const userName = "DOdric-B-Sykes";
/* Global variable to select the unordered list to display the repos list */
const displayRepo = document.querySelector(".repo-list");
/* Global variable that selects the section where all my repo info will appears */
const repoAppear = document.querySelector(".repos");
/* Global variable that selects the section where the individual repo info wiil appear */
const individualRepoData = document.querySelector(".repo-data");


/* 1st function needed to access and pull information from Githiub */
const gitProfile = async function (){
    const userProfile = await fetch(`https://api.github.com/users/${userName}`); /* API call - Used templat literal here in order to have the ability to access the userName variable in my fetch command - which will allow me to fetch and access the github profile associated with the value of the "userName" variable */
    const gitData = await userProfile.json();
    console.log(gitData); /* Logged gitData out so my console can then see the properties that where fetched from the userProfile variable */

    displayData(gitData); /* Calls displayData function using the info from the gitData variable (.json data) */
};

gitProfile(); /* Call the function */

/* Function to display the fetched user data from the gitProfile function */
const displayData = function (gitData){
    let newDiv = document.createElement("div"); /* Created new div element */
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `<figure> 
    <img alt="user avatar" src= ${gitData.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${gitData.name}</p>
    <p><strong>Bio:</strong> ${gitData.bio}</p>
    <p><strong>Location:</strong> ${gitData.location}</p>
    <p><strong>Number of public repos:</strong> ${gitData.public_repos}</p>
  </div>`;

  overview.append(newDiv); /* Adds newly created div and its contents from the "innerhTML" to the overview variable that targets the HTML element with the "overview" class */

  fetchRepo();
};

/* Function to fetch repo data */
const fetchRepo = async function (){
    const repoList = await fetch (`https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`); /* API call with endpoints (users/username/repos) and parameters that start after the "?" (sort=updated&per_page=100 - "updated" represent the value for addressing the sort parameter and "100" to represent the value for addressing the per_page paramter) to display the repos in a manner that is sorted from most recently updated to last & from listed from 0 to 100 representing the number of repos to fetch/display -> in the form of an array */
    const repoData = await repoList.json();
    console.log(repoData);

    displayRepoInfo(repoData);
};

/* Function to display fetched repo information for each repo */
const displayRepoInfo = function (repoData){
    repoData.forEach(function (repo){ /* Used forEach loop to loop through each element in the "repoData" varaible/array, and exectuted the code beneath it for each element in the array, using "repo" has a parameter to represent the individual elements in the array */
        repoListItem = document.createElement("li");
        repoListItem.classList.add("repo");
        repoListItem.innerHTML = `<h3>${repo.name}</h3>`; /* Use "repo" in repo.name because I want to access the name property of "repo" (the object in this instance) -> via the "repo" parameter in the forEach loop (in which the value for "repo" is defined as each repo/element object in the repoData array) and the "repoData" parameter (repoData variable/array) in the "displayRepoInfo" function */
        displayRepo.append(repoListItem); /* Add newly created li (list item/repoListItem) to the unordered list where thr repos are to be displayed via the displayRepo variable */
    })
};

/* Event listener for click event on the unordered list for the displayRepo variable */
displayRepo.addEventListener("click", function (e){
    if (e.target.matches("h3")){ /* .matches() checks if the target matches a specific element (the h3 element in this case) */
        let repoName = e.target.innerText; /* Sets the value of the "repoName" variable to the innerText where the event happens, in this case that would be the h3 element */
        specRepoName(repoName);
    }
});

/* Function to fetch specific repo information */
const specRepoName = async function (repoName){
    const specRepoInfo = await fetch(`https://api.github.com/repos/${userName}/${repoName}`); /* API call - Written this way to fetch and access information about whatever repo I click on (via a click event and displayRepo event listener) */
    const repoInfo = await specRepoInfo.json();
    console.log(repoInfo);

    /* Used to grab coding languages present in construction of repo */
    const fetchLang = await fetch(repoInfo.languages_url); /* Fetch the language_url property of whatever repo is clicked on via the "repoInfo" variable and "specRepoName" variable */
    const langData = await fetchLang.json();
    console.log(langData);

    /* Adding languages to an array */
    const langArray = []; /* Empty array that will display the coding languages used in a specific repo when clicked via a click event */
    for (let language in langData){ /* Used a for...in loop to loop through the "landData" variable since its value is now an object via the "langData" and "fetchLang" variables -> "language" ,in this stance, is a placeholder that represents the key/property associated with the "langData" variable/object via the "fetchLang", "repoInfo" and "specRepoInfo" variables -> The "for...in" loop is telling the console that whatever key/property, multiple keys/properties in this instance, (represented by the "language" variable) is present in the "langData" object, loop through each key/property element of the "landData" variable/array */
        langArray.push(language); /* Whatever the value that is associated with the "language" key/property, is pushed/added to the "langArray" variable/array -> Meaning that for every key/property that is looped through via the "for...in" loop, add/push those keys to the "langArray" variable/array */
    }

    console.log(langArray);

    displaySpecRepoInfo(repoInfo, langArray);
};

/* Function to display specific repo info */
const displaySpecRepoInfo = function(repoInfo, langArray){
    individualRepoData.innerHTML = "";
    let newIndividualRepoDiv = document.createElement("div");
    newIndividualRepoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${langArray.join(", ")}</p> 
    <a class="visit" href="${repoInfo.url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`; /* langArray.join(", ") tells the console to join the values of the "langArray" variable/array into a string */
    
    individualRepoData.append(newIndividualRepoDiv);
    individualRepoData.classList.remove("hide");
    repoAppear.classList.add("hide");
}; 