//mock api
document.body.innerHTML = `
<div class="user-form">
<input class="add-user-name"  placeholder="enter your name"/>
<input class="add-user-avatar"  placeholder="enter your pic url"/><br>
<button id="addbutton" onclick="addUser()">Add</button>
</div>
<section class="user-list"></section>`

//read
async function getAllUsers(){
    const data = await fetch("https://6166c4db13aa1d00170a66fd.mockapi.io/users/")
    const users = await data.json();
    const userContainer = document.querySelector(".user-list")
    userContainer.innerHTML =" "  //to erase old user
 users.forEach((user)=> 
 userContainer.innerHTML +=
        `<div class="user-container">
        <img class = "user-avatar" src="${user.avatar}" alt=${user.name}/>
        <div>
        <p class="user-name">${user.name}</P>
        <button onclick="toggleEdits(${user.id})"> <i class="fas fa-edit"></i></button>
        <button onclick="deleteUser(${user.id})"><i class='fas fa-trash'></i></button>
        <div class="edit-user-form edit-${user.id}">
        <input value ="${user.name}" class="edit-${user.id}-user-name" id="editName"  placeholder="enter your name"/>
        <input value = "${user.avatar}" class="edit-${user.id}-user-avatar" id="editAvatar" placeholder="enter your pic url"/>
        <button onclick="saveUser(${user.id})">save</button>
        </div>
        </div>
        </div>`
       )
      
}
getAllUsers()
//delete user
async function deleteUser(userId){
    const data = await fetch("https://6166c4db13aa1d00170a66fd.mockapi.io/users/" + userId,{method:"DELETE"})
    getAllUsers()
console.log(userId)
}
//add user
async function addUser(){
console.log("adding...",addUser)
const userName = document.querySelector(".add-user-name").value
const profilePic = document.querySelector(".add-user-avatar").value

//method - POST
//data-body-stringify JSON
//headers-JSON data

const data = await fetch(
    "https://6166c4db13aa1d00170a66fd.mockapi.io/users",
{
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name:userName,avatar:profilePic}),
}
);
    //adduser and refresh
getAllUsers();
}

// put-method

async function toggleEdits(userId){
    console.log("editing user")
    console.log(userId)
    const editUserForm=document.querySelector(`.edit-${userId}`);
    editUserForm.style.display =
    editUserForm.style.display ==="block" ? "none" : "block";

}
async function saveUser(userId){
    const editName = document.querySelector(`.edit-${userId}-user-name`).value;
    const editAvatar = document.querySelector(`.edit-${userId}-user-avatar`).value;
     console.log(userId)
    console.log(editName)
    const data = await fetch(
        "https://6166c4db13aa1d00170a66fd.mockapi.io/users/" + userId,
    {
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name:editName,avatar:editAvatar}),
    }
    );
    getAllUsers()
}

//JSON -string-REST API
//js<!-- HTML !-->


