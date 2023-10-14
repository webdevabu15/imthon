const singleProductId = new URLSearchParams(window.location.search).get("singleProduct")
const singleProductWrapper = document.querySelector(".single-product-wrapper")

console.log(singleProductId);

axios.get(`http://localhost:3000/api/posts/${singleProductId}`).then(res => renderSingleProduct(res.data))

function renderSingleProduct(singleData) {
    console.log(singleData);
    const singleProduct  = document.createElement("div")
    singleProduct.className = "single-product"
    singleProduct.innerHTML =`
        <div class="single-product-title">
            <h1>${singleData.title.slice(0,38)}</h1>
            <a href="#">#${atob(singleData.category)}</a>
        </div>
        <img class="single-img" src="${singleData.image}" alt="img">
        <p class="single-text-description">${singleData.description.slice(0,500)}</p>
    `
    singleProductWrapper.appendChild(singleProduct)
}