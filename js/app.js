    const btnActive = (cateId) =>{        
        const allCategories = document.querySelectorAll('.allcategories');
        for(const category of allCategories){
            category.classList.remove('actives');
        }
        const selectedBtn = document.getElementById(`cate${cateId}`);
        selectedBtn.classList.add('actives');
    }

    //get category function
    function getCategory() {
        fetch('https://openapi.programming-hero.com/api/news/categories')
            .then((respons) => respons.json())
            .then((data) => displayCategorys(data.data.news_category))
            .catch((error) => {
                console.log(error)
            });
    }

getCategory();

const displayCategorys = categories => {
    const categroyList = document.getElementById('categroy-list');
    for (const category of categories) {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('nav-item');

        categoryItem.innerHTML = `<a onclick="getNewsByCatagory('${category.category_id}')" class="nav-link text-muted allcategories" href="#" id="cate${category.category_id}">${category.category_name}</a>`;
        categroyList.appendChild(categoryItem);
}
    getNewsByCatagory();
}

    function getNewsByCatagory(categoryId = '01') {
        //loader start
        toggleSpinner(true);
        fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
            .then((respons) => respons.json())
            .then((data) => displayNews(data.data))
            .catch((error) => {
                console.log(error)
            });        
            btnActive(categoryId);
    }
    
    const displayNews = (newses) =>{
        const newsAria = document.getElementById('news');
        newsAria.innerHTML = '';
        const newsNo = document.getElementById('news-number');
        newsNo.innerText = newses.length;
        newses.forEach(news => {
            const article = document.createElement('article');
            // const modalBody = document.createElement('modal-body');
            article.innerHTML = `
            <div class="row bg-white border shadow-lg rounded-4 mt-3">
            <div class="col-md-3 col-sm-12 px-3 py-3">
                <img class="rounded-4 img-fluid" height="300px" width="244px" src="${news.thumbnail_url}" alt="">
            </div>
            <div class="col-md-9 col-sm-12  px-2 pt-4">
                <h4 class="ff-oswold">${news.title}</h4>
                <p class="text-justify ff-poppins text-muted lh-lg pe-4">${news.details.slice(0, 450)}</p>
                <div class="row d-flex">
                    <div class="col-md-5 col-sm-4">
                        <div class="row">
                            <div class="col-3">
                                <img class="rounded-5 border border-1 border-dark" height="45px" width="45px" src="${news.author.img}" alt="">
                            </div>
                            <div class="col-9 p-0">
                                <p class="text-darl m-0 fw-bolder">${news.author.name ? news.author.name : 'No Author Found'}</p>
                                <p class="text-muted m-0">${news.author.published_date}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-4">
                        <p class="p-3 m-0 ff-poppins"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : '0'}</p>
                    </div>
                    <div class="col-3 d-none d-md-block">
                        <p class="p-3 text-warning">
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </p>
                    </div>
                    <div class="col-md-2 p-3 pe-2">
                        <a onclick="modalCall('${news._id}')" href="" data-bs-toggle="modal" data-bs-target="#news-details" class="text-dark text-end"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
                </div>
            </div>`;
            newsAria.appendChild(article);
        });
        toggleSpinner(false);
    }

    //spinner function
    const toggleSpinner = (isloading) =>{
        const spinner = document.getElementById('spinner');
        if(isloading === true){
            spinner.classList.remove('d-none');
        }
        else{
            spinner.classList.add('d-none');
        }
    }

    const modalCall = (newsId) =>{
        const detailsUrl = `https://openapi.programming-hero.com/api/news/${newsId}`;
        fetch(detailsUrl)
        .then((respons) => respons.json())
        .then((data) => displayModal(data.data[0]))
        .catch((error) => {
            console.log(error)
        });

    }

    const displayModal = (details) =>{
        const modalContent = document.getElementById('modalBody');
        modalContent.innerHTML =`
        <div class="row bg-white border shadow-lg rounded-4 mt-3">
        <div class="col-md-3 col-sm-12 px-3 py-3">
            <img class="rounded-4 img-fluid" height="300px" width="244px" src="${details.thumbnail_url}" alt="">
        </div>
        <div class="col-md-9 col-sm-12  px-2 pt-4">
            <h4 class="ff-oswold">${details.title}</h4>
            <p class="text-justify ff-poppins text-muted lh-lg pe-4">${details.details}</p>
            <div class="row d-flex">
                <div class="col-md-5 col-sm-4">
                    <div class="row">
                        <div class="col-3">
                            <img class="rounded-5 border border-1 border-dark" height="45px" width="45px" src="${details.author.img}" alt="">
                        </div>
                        <div class="col-9 p-0">
                            <p class="text-darl m-0 fw-bolder">${details.author.name ? details.author.name : 'Author Not Found'}</p>
                            <p class="text-muted m-0">${details.author.published_date}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-4">
                    <p class="p-3 m-0 ff-poppins"><i class="fa-solid fa-eye"></i> ${details.total_view ? details.total_view : '0'}</p>
                </div>
                <div class="col-3 d-none d-md-block">
                    <p class="p-3 text-warning">
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </p>
                </div>
            </div>
            </div>
        </div>`;
    }