const loadNewsCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
        .catch(error => console.log(error))
}

const displayNewsCategories = categories => {
    const newsCategories = document.getElementById('news-categories');
    newsCategories.innerHTML = '';
    categories.forEach(category => {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <p onclick=(loadNewsData('${category.category_id}')) class="hover:bg-gray-200 hover:text-gray-500 py-2 px-3 rounded">${category.category_name}</p>
        `;
        newsCategories.appendChild(categoryDiv);
    })
}

const loadNewsData = (category_id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(news => displayNewsData(news.data))
        .catch(error => console.log(error))
}

const displayNewsData = newses => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const noFound = document.getElementById('no-found');
    if (newses.length === 0) {
        noFound.classList.remove('hidden')
    }
    else {
        noFound.classList.add('hidden')
    }

    newses.forEach(news => {
        const newsDiv = document.createElement('div');
        // console.log(news)
        newsDiv.innerHTML = `
        <a href="#" 
                    class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray my-8">
                    <img class="object-cover  rounded-t-lg md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg "
                        src="${news.thumbnail_url}" alt="">
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400 hover:text-black">${news.title}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 hover:text-black">${news.details.slice(0, 300)}</p>
                        <figcaption class="flex justify-center items-center space-x-3">
                        <img class="w-9 h-9 rounded-full" src="${news.author.img}" alt="profile picture">
                        <div class="space-y-0.5 font-medium dark:text-gray-400 text-left hover:text-black">
                            <div>${news.author.name ? news.author.name : 'Data Not Founded'}</div>
                            <div class="text-sm font-light text-gray-700 dark:text-gray-400 hover:text-black">${news.author.published_date ? news.author.published_date : 'Data Not Founded'}</div>
                        </div>
                        </figcaption>
                        <div class="flex justify-center items-center font-medium dark:text-gray-400 text-left hover:text-black">
                             <div class="m-2"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 'Data Not Founded'}</div>
                            <div class="m-2 font-medium dark:text-gray-400 text-left hover:text-black">
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-sharp fa-solid fa-star"></i>
                            <i class="fa-sharp fa-solid fa-star-half-stroke"></i>
                            </div>
                            <div class="m-2 font-medium dark:text-gray-400 text-left hover:text-black">${news.rating.number}</div>
                        </div>
                        <!-- The button to open modal -->
                        <label onclick="loadNewsDetails('${news._id}')" for="my-modal-6" class="btn modal-button mt-8 w-1/3 mx-auto bg-blue-600 text-white">View Details</label>


                        
                
        `;
        newsContainer.appendChild(newsDiv);
    })
}

const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}

const displayNewsDetails = details => {
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = details.title;
    const authorPublish = document.getElementById('autho-publish');
    authorPublish.innerText = details.author.published_date;
    const modalImg = document.getElementById('modal-img');
    modalImg.innerHTML = `
   <img src="${details.image_url}" alt="">
   `


}

loadNewsData("08")
loadNewsCategories()

