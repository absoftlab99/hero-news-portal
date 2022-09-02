    function getCategory() {
        fetch('https://openapi.programming-hero.com/api/news/categories')
            .then((respons) => respons.json())
            .then((data) => displayCategorys(data.data.news_category));
    }

getCategory();

function displayCategorys(categories) {
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

