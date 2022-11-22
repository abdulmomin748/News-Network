const loadCategories = () =>{

        fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error))

}

const displayCategories = categories => {

    const categoriesContainer = document.getElementById('category-items');
    categories.forEach( category => {
        const createLi = document.createElement('li');
        createLi.innerHTML =  `<h4 class="cat-title"><button onclick="loadCategoriesFound('${category.category_id}')"> ${category.category_name}</button></h4>`;
        categoriesContainer.appendChild(createLi);
    });

}

const loadCategoriesFound = categoryId => {

    
    fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then(response => response.json())
    .then(data => displayCategoriesFound(data.data))
    .catch(error => console.log(error));
    document.getElementById('spinner').classList.remove('d-none');
    
}

const displayCategoriesFound = categoryItem => {
    document.getElementById('spinner').classList.add('d-none');
    console.log(categoryItem);
    
    console.log(categoryItem);
    const categoriesFoundContainer = document.getElementById('total-categories-found');
    const categoryUnique = document.getElementById('categoryName');
    const categoryFoundTitle = document.getElementById('total-categories-found-title');
    categoriesFoundContainer.innerText = `${categoryItem.length}`;
    // categoryUnique.innerText = `${categoryItem.length}`;
    if (categoryItem.length === 0) {
        categoryFoundTitle.innerText = ` for category`;
        categoriesFoundContainer.innerText = `News Not Found`;
        document.getElementById('spinner').classList.add('d-none');
    }
    else{
        categoryFoundTitle.innerText = ` items found for category`;
    }

    const newsDetailsContainer = document.getElementById('news-details-container');

    newsDetailsContainer.innerHTML = '';
    const catItem = categoryItem;
    catItem.sort((a, b) => {
        const x = b.total_view - a.total_view;
        return x;
    });
 
    categoryItem.forEach( catItem => {

      const {title,details,thumbnail_url,author,total_view,_id} = catItem;
      const {name,published_date,img} = author;
      const createDiv = document.createElement('div');
      createDiv.classList.add('card','mb-4', 'mb-lg-3', 'mb-md-4','mb-sm-4','border-0');
      createDiv.innerHTML = `

      <div class="row details-row g-0 border-0 align-items-center text-lg-start text-sm-center text-md-center p-lg-4 p-md-3 p-sm-3 p-3">
        <div class="col-md-3 col-lg-3 col-md-12 col-sm-12 pb-md-3 pb-sm-3 pb-lg-0">
            <img src="${thumbnail_url}" class="md-withdh w-100 mx-auto rounded-start" alt="...">
        </div>
        <div class="col-md-12 col-lg-9 col-lg-9 pt-3 ps-lg-3 ps-md-0 ps-sm-0 ps-0 col-sm-12 pb-sm-0 pb-3 py-sm-3">
            <div class="card-body p-0">
                <h4 class="card-title fw-bold">${title}</h4>
                <p class="card-textfirst mb-4">${details.slice(0,150)}.</p>
                <p class="card-text mb-lg-3 mb-md-4 mb-4 mb-sm-4">${details.length > 150 ? details.slice(150,300) + '...' : details}</p>
                <div class ="right-bottom d-flex  align-items-center justify-content-lg-between justify-content-md-between flex-wrap justify-content-sm-between  flex-md-column  flex-sm-column flex-lg-row flex-column">
                    <div class="d-flex align-items-center pb-3 pb-lg-0 pb-md-3 pb-sm-3 flex-column flex-sm-column flex-md-row flex-;lg-row">
                        <img class='author-image rounded-circle' src="${img}" alt="">
                        <div class="ms-3 my-lg-4 my-md-0 text-md-start text-lg-start text-sm-center text-center mt-3 mt-lg-0 mt-md-0 ">
                           <h6 class="m-0 name">${name ? name : 'No Data Found'}</h6>
                           <p class="m-0 date">${published_date ? published_date : 'No Data Found'}</p>
                        </div>

                    </div>
                    <div class="d-flex align-items-center pb-3 pb-lg-0 pb-md-3 pb-sm-3">
                        <div><span><i class="fa-sharp fa-solid fa-eye mt-2"></i></span></div>
                        <h5 class="ms-3 mb-0 total-view">${total_view ? total_view : 'No Data Found'}</h5>
                    </div>
                    <div class=" pb-3 pb-lg-0 pb-md-3 pb-sm-3">
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div><button class="news-details text-white border-0" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" onclick="loadNewsDetails('${_id}')">News Details</button></div>
                </div>
            </div>
        </div>
       </div>
      `;
      newsDetailsContainer.appendChild(createDiv);
      
    });

}

const loadNewsDetails = newsId => {
    
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    .then(response => response.json())
    .then(data => displayNewsDetails(data.data[0]))
    .catch(error => console.log(error))
    
}
const displayNewsDetails = newsDetails => {

    console.log(newsDetails);
    const {title,details,image_url,author,total_view} = newsDetails;
      const {name,published_date,img} = author;
      const createDiv = document.createElement('div');
      createDiv.classList.add('card','mb-3','border-0');

      const newsTitle = document.getElementById('newsDetailsModalLabel');
      newsTitle.innerText = `${title}`;
      const newsDesc = document.getElementById('modal-body');
      newsDesc.innerHTML = `
      <img src="${image_url}" class="img-fluid rounded-start" alt="...">
      <p class="card-textfirst mb-4">${details.slice(0,150)}.</p>
      <p class="card-text mb-lg-3 mb-md-4 mb-4 mb-sm-4">${details.length > 150 ? details.slice(150,300) + '...' : details}</p>
      <div class="d-flex align-items-center pb-2">
            <div><span><i class="fa-sharp fa-solid fa-eye mt-3"></i></span></div>
            <h5 class="ms-3 mb-0 total-view mt-2">${total_view ? total_view : 'No Data Found'}</h5>
        </div>
        <div class="d-flex align-items-center">
            <img class='author-image rounded-circle' src="${img}" alt="">
            <div class="ms-3 my-4">
                <h6 class="m-0 name">${name ? name : 'No Data Found'}</h6>
                <p class="m-0 date">${published_date ? published_date : 'No Data Found'}</p>
            </div>

        </div>
      `;

}

loadCategories();