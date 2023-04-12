'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const clickedArticleId = clickedElement.getAttribute('href');
  console.log(clickedArticleId);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const selectedArticle = document.querySelector(clickedArticleId);
  console.log(selectedArticle);

  /* [DONE] add class 'active' to the correct article */
  selectedArticle.classList.add('active');
};

const generateTitleLinks = (customSelector = '') => {
  console.log('Title links generated!');
  console.log(customSelector);

  /* [DONE] clear title list */

  const titlesList = document.querySelector('.titles, .list');
  titlesList.innerHTML = '';

  /* get every article id and generate title with link */

  let html = '';

  const articlesList = document.querySelectorAll('.post' + customSelector);
  for (const article of articlesList) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;

    const articleLink = `<li><a href="#${articleId}"><span>${articleTitle}<span></a></li>`;

    html = html + articleLink;
  }
  console.log(articlesList);

  titlesList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();


function generateTags(){
  const optArticleTagsSelector = '.post-tags .list';
  /* find all articles */
  const allArticles = document.querySelectorAll('.posts article');
  /* START LOOP: for every article: */
  for(const article of allArticles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const tags = article.getAttribute('data-tags');
    const tagsArray = tags.split(' ');

    for(const tag of tagsArray){
      const tagLink = `<li> <a href="#tag-${tag}">${tag}</a></li>`;

      html = html + tagLink + ' ';
    }

    tagWrapper.innerHTML = html;
  }
}

generateTags();



function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(const activeTag of activeTags){
    activeTag.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const matchedTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(const matchedTagLink of matchedTagLinks){
    /* add class active */
    matchedTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagsLinksArray = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(const tagLink of tagsLinksArray){
    tagLink.addEventListener('click', tagClickHandler);
  }

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();


const generateAuthors = () => {
  const allArticles = document.querySelectorAll('.posts article');
  const optArticleAuthorSelector = '.post-author';

  for(const article of allArticles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');

    authorWrapper.innerHTML = `by <a href="#author-${author}">${author}</a>`;
  }
};

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log(clickedElement);
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  console.log(author);
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');




  for(const activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const matchedAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for(const matchedAuthorLink of matchedAuthorLinks){
    matchedAuthorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}


const addClickListenersToAuthors = () => {
  const authorsLinksArray = document.querySelectorAll('a[href^="#author-"]');

  for(const authorLink of authorsLinksArray){
    authorLink.addEventListener('click', authorClickHandler);
  }

};

addClickListenersToAuthors();
