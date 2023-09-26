const apiUrl="https://api.github.com/users/"

const main=document.querySelector("#main");
const getUser=async(username)=>{
    const response=await fetch(apiUrl+username);
    const data=await response.json();
    const card=`
    <div class="card">
       <div>
          <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
       </div>
       <div class="user-info">
           <h2>${data.name}</h2>
           <p>${data.bio}</p>
           <ul class="info">
               <li>${data.followers}<strong>Followers</strong></li>
               <li>${data.following}<strong>Following</strong></li>
               <li>${data.public_repos}<strong>Repos</strong></li>
           </ul>
           <div id="repos">
               
           </div>
       </div>

    </div>
    `
    main.innerHTML=card;
    getRepos(username);
}
getUser("taylorotwell");

//get repos function

const getRepos=async(username)=>{
    const repos=document.querySelector("#repos");
    const response=await fetch(apiUrl+username+"/repos");
    const data=await response.json();
    data.forEach((item)=>{
        const element=document.createElement("a");
        element.classList.add("repo");
        element.href=item.html_url;
        element.innerText=item.name;
        element.target="_blank";
        repos.appendChild(element);
    })
}

//form submit function

const formSubmit=()=>{
    if(searchBox.value!=""){
        getUser(searchBox.value);
        searchBox.value="";
    }
    return false;
}


const searchBox=document.querySelector("#search");
searchBox.addEventListener("click",function(){
    formSubmit();

})



// <a href="#" class="repo" target="_blank">Repo1</a>
// <a href="#" class="repo" target="_blank">Repo2</a>
// <a href="#" class="repo" target="_blank">Repo3</a>