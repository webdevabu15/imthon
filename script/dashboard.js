const form = document.querySelector("#form__blog")
const inputTitle = document.querySelector("#title")
const imageInput = document.querySelector(".image")
const textInput = document.querySelector("#text")
const categoryInput = document.querySelector("#category")
const createPost = document.querySelector("#create-post")
const managePost = document.querySelector("#manage-post")
const createBlog = document.querySelector(".create-blog")
const a = managePost.querySelector("a")
const a2 = createPost.querySelector("a")
const managePostBlog = document.querySelector(".manage-post")
const blogWrapper = document.querySelector(".blog-cards")
const deleteModal = document.querySelector(".delete-popup")
const cancel = document.querySelector(".cancel")
const deleteBtn = document.querySelector(".delete-btn")
const editModal = document.querySelector(".edit-popup")
const editCancel = document.querySelector(".edit-cancel")
const editBtn = document.querySelector(".create-post-btn")
const editTitle = document.querySelector("#edit-title")
const editImage = document.querySelector("#edit-image")
const editCategory = document.querySelector('#category-select')
const editDescription = document.querySelector("#edit-desc")
const createCategory = document.querySelector("#category")
// const d = blogCard.querySelector("[data-delete-id]")
// console.log(manageCardBlog);

// var authorId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id
//         const id = e.target.closest(".manage-card-blog").dataset.blogId
//         console.log(id);
//         fetch(`http://localhost:3000/api/posts/${id}`   ,{
//             method:"PUT",
//             body:JSON.stringify({
//                 title:editTitle.value,
//                 image:editImage.value,
//                 description:editDescription.value,
//                 category:editCategory.value,
//                 author: authorId
//             }),
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token"))}`
//             }
//          }).then(res => console.log(res))

axios.get(`http://localhost:3000/api/categories`).then(res => categoryies(res))
function categoryies(category) {
    const fragment = document.createDocumentFragment()
    const fragment2 = document.createDocumentFragment()
    category.data.data.forEach(el => {
        console.log(el.title);
        const option = document.createElement("option")
        option.value = el.title
        option.innerHTML = el.title
        fragment.appendChild(option)
        const option2 = document.createElement("option")
        option2.value = el._id
        option2.innerHTML = el._id
        fragment2.appendChild(option2)
    });
    editCategory.appendChild(fragment)
    createCategory.appendChild(fragment2)
}


  

createBlog.style.display = "none"
managePostBlog.style.display = "none";

form.addEventListener("submit" , (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/posts`, {
        method:"POST",
        body:JSON.stringify({
            "title" : `${inputTitle.value}`,
            "image": `${imageInput.value}`,
            "description": `${textInput.value}`,
            "category":`${categoryInput.value}`
        }),
        headers:{
            "Content-type":"application/json",
            "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
}).then(res => console.log(res))
})


managePost.addEventListener("click", (e) => {
    if (e.target.closest("#manage-post")) {
        createBlog.style.display = "none";
        managePostBlog.style.display = "block";
        createPost.style.background = "#fff"
        a2.style.color = "#000"
        managePost.style.background = "#000"
        a.style.color = "#fff"
    }
})

createPost.addEventListener("click", (e) => {
    if (e.target.closest("#create-post")) {
        createBlog.style.display = "block";
        managePostBlog.style.display = "none";
        createPost.style.background = "#000"
        a2.style.color = "#fff"
        managePost.style.background = "#fff"
        a.style.color = "#000"
    }
})

axios.get("http://localhost:3000/api/posts/").then(res => renderManage(res))

function renderManage(el) {
    const blogFragment = document.createDocumentFragment()
    el.data.data.forEach(blog => {
     const blogCard = document.createElement("div")
     blogCard.className = "blog-card"
     blogCard.innerHTML = `
        <div class="manage-card-blog" data-blog-id="${blog._id}">
        <img src="${blog.image}" alt="">
        <h3>${blog.title.slice(0,35)}</h3>
        <p>${blog.description.slice(0,30)}</p>
        <div class="btns">
            <button data-delete-id class="delete-btn">Delete</button>
            <button data-edit-id class="edit-btn">Edit</button>
        </div>
        </div>      
    `
     blogFragment.appendChild(blogCard)
   });
   blogWrapper.appendChild(blogFragment)
}

deleteModal.style ="display:none; position:absolute; z-index:10; "

blogWrapper.addEventListener("click" , (e) => {
    if(e.target.closest("[data-delete-id]")){
        const id = e.target.closest(".manage-card-blog").dataset.blogId
        axios.delete(`http://localhost:3000/api/posts/${id}`,{
            headers:{
                "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then(res => console.log(res))
        setTimeout(() => {
            new URLSearchParams(location.origin + location.replace("/pages/dashboard.html")) 
         }, 2000);
    }
    // deleteBtn.addEventListener("click",(v)=>{
      
        
    //     // setTimeout(() => {
    //     //    new URLSearchParams(location.origin + location.replace("/pages/dashboard.html")) 
    //     // }, 3000);
    //   })
  
    // if(deleteModal){
      
    //   }

})





// d.addEventListener("click" ,() => {
//     editModal.style ="display:flex; position:absolute; z-index:10; "
// })





cancel.addEventListener("click", () => {
    deleteModal.style ="display:none;"
})

// deleteBtn.addEventListener("click", () => {
//     deleteModal.style ="display:none;"
//     editCategory.innerHTML= `
       
//     `
// })


const outBtn = document.querySelector(".out")

outBtn.addEventListener("click" , (e) => {
    localStorage.removeItem("token")
})