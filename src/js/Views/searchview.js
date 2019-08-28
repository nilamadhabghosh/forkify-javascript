import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearresults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitTitle = (title,limit=17) =>
{
    const newTitle = [];
    if(title.length >= 17)
    {
        title.split(' ').reduce((accumulator,current) => {
           if(accumulator+current.length <= limit)
           {
                newTitle.push(current);
           }
           return accumulator+current.length;
        },0);

        return `${newTitle.join(' ')}...`
    }
    return title;
}

const renderReceipe = recipe => {
    const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
   </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

const createButton = (page,type) => `

<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
       
`;

const renderButton = (page,numResults,resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    
    let button;
    if(page===1 && pages>1)
    {
        //only button to the next page
        button=createButton(page,'next');
    }
    else if(page < pages)
    {
        //button for both next and previous page
        button =`
        ${createButton(page,'next')};
        ${createButton(page,'prev')};
        `
    }
    else if(page===pages && pages>1)
    {
        //button only for previous page
        button = createButton(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
}

export const renderResults = (receipes, page =1 , results=10) =>{
    const start = (page-1) * results;
    const end = page*results;
    receipes.slice(start,end).forEach(renderReceipe);

    //render pagination 
    renderButton(page,receipes.length,results);
};