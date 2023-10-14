    const articlesCards = document.querySelector(".swiper-wrapper")

    axios.get("http://localhost:3000/api/posts").then(res => renderPosts(res.data.data))

    function renderPosts(data) {
        const postsFragment = document.createDocumentFragment()
        data.forEach((post,i) => {
        console.log(post);
            const articleCard = document.createElement("div")
            articleCard.className = "swiper-slide"
            articleCard.innerHTML = `
            <a href="pages/singleProduct.html?singleProduct=${post._id}"><img class="first-img" src="${post.image}" alt=""></a>
            <div class="card-info">
                <h3 class="card-title">${post.title.slice(0,25)}</h3>
                <p>${post.description.slice(0,60)}</p>
                <div class="author">
                    <div class="author-name">
                       <h3>Abubakr</h3>
                       <p>Author</p>
                    </div>
                </div>
            </div>
            `
            postsFragment.appendChild(articleCard)
        });
        const swiperWrapper = document.createElement("div")
        articlesCards.appendChild(postsFragment)
    }


    let test = localStorage.getItem("token")
    const login = document.querySelector(".login")
    const signup = document.querySelector(".SignUp")
    const dashboard  = document.querySelector(".Dashboard")


    if (test) {
        login.style.display = "none"
        signup.style.display = "none"
    }else{
        dashboard.style.display = "none"
    }