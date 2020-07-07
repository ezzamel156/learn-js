import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArray = Array.from(document.querySelectorAll('.results__link--active'));
    resultsArray.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, value) => {
            if(acc + value.length <= limit) {
                newTitle.push(value);
            }
            return acc + value.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderResult = result => {
    const markup = `
        <li>
            <a class="results__link" href="#${result.recipe_id}">
                <figure class="results__fig">
                    <img src="${result.image_url}" alt="${result.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name" title="${result.title}">${limitRecipeTitle(result.title)}</h4>
                    <p class="results__author">${result.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const paginationButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderPaginationButton = (page, resultCount, resultPerPage) => {
    const pages = Math.ceil(resultCount / resultPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = paginationButton(page, 'next');
    } else if (page < pages) {
        button = `
            ${paginationButton(page, 'prev')}
            ${paginationButton(page, 'next')}
        `;

    } else if (pages === pages && pages > 1) {
        button = paginationButton(page, 'prev');
    }
    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (results, page = 1, resultPerPage = 10) => {
    // render result
    const start = (page - 1) * 10;
    const end = page * 10;
    results.slice(start, end).forEach(renderResult);

    // render pagination
    renderPaginationButton(page, results.length, resultPerPage);
};