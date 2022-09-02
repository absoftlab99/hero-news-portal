    function getCategory() {
        fetch('https://openapi.programming-hero.com/api/news/categories')
            .then((respons) => respons.json())
            .then((data) => displayCategorys(data.data.news_category));
    }

getCategory();

const displayCategorys = categories => {
    const categroyList = document.getElementById('categroy-list');
    for (const category of categories) {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('nav-item');
    
        categoryItem.innerHTML = category.category_id === '01'
            ? `<a class="nav-link active-category bg-secondary rounded text-light" href="#">
            ${category.category_name}</a>`
            : `<a class="nav-link text-muted" href="#">
            ${category.category_name}</a>`;
        categroyList.appendChild(categoryItem);
}
}

    function getNewsByCatagory(categoryId = '01') {
        fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
            .then((respons) => respons.json())
            .then((data) => displayNews(data.data));
    }
getNewsByCatagory();

    const displayNews = (newses) =>{
        const newsAria = document.getElementById('news');
        for(const news of newses){
            console.log(news);
            const article = document.createElement('article');
            article.innerHTML = `
            <div class="row bg-white border shadow-lg rounded-4 mt-3">
            <div class="col-3 px-3 py-3">
                <img class="rounded-4" height="300px" width="244px" src="${news.thumbnail_url}" alt="">
            </div>
            <div class="col-9  px-2 pt-4">
                <h4 class="ff-oswold">${news.title}</h4>
                <p class="text-justify ff-poppins text-muted lh-lg articale pe-4">${news.details.slice(0, 450)}</p>
                <div class="row d-flex">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-3">
                                <img class="rounded-5 border border-1 border-dark" height="45px" width="45px" src="${news.author.img}" alt="">
                            </div>
                            <div class="col-9 p-0">
                                <p class="text-darl m-0 fw-bolder">${news.author.name}</p>
                                <p class="text-muted m-0">${news.author.published_date}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 align-items-baseline">
                        <p class="p-3 m-0 ff-poppins"><i class="fa-solid fa-eye"></i> ${news.total_view}</p>
                    </div>
                    <div class="col-3">
                        <p class="p-3 text-warning">
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </p>
                    </div>
                    <div class="col-3">
                        <p class="text-dark text-end p-3 pe-5"><i class="fa-solid fa-arrow-right"></i></p>
                    </div>
                </div>
            </div>
        </div>`;
        newsAria.appendChild(article);
    }
}