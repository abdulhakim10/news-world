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

const loadNewsData = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(news => displayNewsData(news.data))
}

const displayNewsData = newses => {
    const newsContainer = document.getElementById('news-container');
    console.log(newses)
    newses.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <a href="#"
                    class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray my-8">
                    <img class="object-cover  rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg m-4"
                        src="${news.image_url}" alt="">
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400 hover:text-black">${news.title}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 hover:text-black">${news.details}</p>
        `;
        newsContainer.appendChild(newsDiv);
    })
}
loadNewsData("02")
loadNewsCategories()

