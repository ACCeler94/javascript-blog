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

const generateTitleLinks = () => {
  console.log('Title links generated!');

  /* [DONE] clear title list */

  const titlesList = document.querySelector('.titles, .list');
  titlesList.innerHTML = '';

  /* get every article id and generate title with link */

  let html = '';

  const articlesList = document.querySelectorAll('.posts article');
  for (const article of articlesList) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;

    const articleLink = `<li><a href="#${articleId}"><span>${articleTitle}<span></a></li>`;

    html = html + articleLink;
  }

  titlesList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();
