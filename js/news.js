const loadNewsCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
}

const displayNewsCategories = categories => {
    const newsCategories = document.getElementById('news-categories');
    categories.forEach(category => {
        // console.log(category)
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <p>${category.category_name}</p>
        `;
        newsCategories.appendChild(categoryDiv);
    })
}
loadNewsCategories()