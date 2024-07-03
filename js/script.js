/* Variable to select the div element with a class = overview; This is where the profile infromation will appear when popluated */
const overview = document.querySelector(".overview");
/* Variable for my Github username */
const userName = "DOdric-B-Sykes";

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
    <img alt="user avatar" src=${"https://avatars.githubusercontent.com/u/74344387?v=4"} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${"D'Odric B. Sykes"}</p>
    <p><strong>Bio:</strong> ${
        "Hello, I am an aspiring coder looking to learn, grow and further develop my skills in web development, design and beyond.\r\nSkilled in: HTML, CSS, Git and JS"}</p>
    <p><strong>Location:</strong> ${"Houston, TX"}</p>
    <p><strong>Number of public repos:</strong> ${34}</p>
  </div>`;

  overview.append(newDiv); /* Adds newly created div and its contents from the "innerhTML" to the overview variable that targets the HTML element with the "overview" class */
};