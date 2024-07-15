/* Variable to select the div element with a class = overview; This is where the profile infromation will appear when popluated */
const overview = document.querySelector(".overview");
/* Global variable for my Github username */
const userName = "DOdric-B-Sykes";
/* Global variable to select the unordered list to display the repos list */
const displayRepo = document.querySelector(".repo-list");


/* 1st function needed to access and pull information from Githiub */
const gitProfile = async function (){
    const userProfile = await fetch(`https://api.github.com/users/${userName}`); /* Used templat literal here in order to have the ability to access the userName variable in my fetch command */
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
    <img alt="user avatar" src= ${"https://avatars.githubusercontent.com/u/74344387?v=4"} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${"D'Odric B. Sykes"}</p>
    <p><strong>Bio:</strong> ${
        "Hello, I am an aspiring coder looking to learn, grow and further develop my skills in web development, design and beyond.\r\nSkilled in: HTML, CSS, Git and JS"}</p>
    <p><strong>Location:</strong> ${"Houston, TX"}</p>
    <p><strong>Number of public repos:</strong> ${34}</p>
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