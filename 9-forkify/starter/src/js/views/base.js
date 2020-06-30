export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResultList: document.querySelector('.results__list'),
    searchResult: document.querySelector('.results'),
    searchResultPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
}

export const elementStrings = {
    loader: 'loader'
}

export const loader = {
    render: parent => {
        const loader = `
            <div class="${elementStrings.loader}">
                <svg>
                    <use href="img/icons.svg#icon-cw"></use>    
                </svg>
            </div>
        `;
        parent.insertAdjacentHTML('afterbegin', loader);
    },
    clear: () => {
        const loader = document.querySelector(`.${elementStrings.loader}`);        
        if(loader) loader.remove();
    }
}