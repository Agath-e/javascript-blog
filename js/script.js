'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);
  
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }   
  
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }  
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector:', articleSelector);
  
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle:', targetArticle);
    
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);
}

function generateTitleLinks(customSelector = ''){
  console.log('works');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('titleList:', titleList);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector)
  let html = '';

  for(let article of articles){
  
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML:', linkHTML);

    /* create HTML of the link */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
} 

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}  

function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } if (tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function calculateAuthorsParams(authors){
  const params = {max: 0, min: 999999};
  for(let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times');
    if(authors[author] > params.max){
      params.max = authors[author];
    } if (authors[author] < params.min){
      params.min = authors[author];
    }
  }
  return params;
}
function calculateTagsClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix +classNumber;
}
function calculateAuthorsClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix +classNumber;
}

function generateTags(){  
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    wrapperTags.innerHTML = '';
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray:', articleTagsArray) ; 
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('linkHTML:', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML; 
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /*[NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [NEW] add generated code to allTags array */
        //allTags.push(linkHTML);
      
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapperTags.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  
  const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagsClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';

  allTagsHTML += tagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  // tagList.innerHTML = allTags.join(' ');
  tagList.innerHTML = allTagsHTML;
}
 

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const TagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagLink of TagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const sameTagLinks = document.querySelectorAll(href);
  console.log(sameTagLinks);
  /* START LOOP: for each found tag link */
  for(let sameTagLink of sameTagLinks){
    /* add class active */
    sameTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('[href^="#tag-"]');
  console.log(links);
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', titleClickHandler);
  /* END LOOP: for each link */
  } 
}
addClickListenersToTags();

function generateAuthor(){
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find author wrapper */
    const wrapperAuthor = article.querySelector(optArticleAuthorSelector);
    wrapperAuthor.innerHTML = '';
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log(author);
    /* insert HTML of all the links into the author wrapper */
    const linkHTML = '<p class="post-author"><a href="#author-' + author + '">' + author + '</a></p>';
    
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors[author]) {
      /*[NEW] add tag to allTags object*/
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* [NEW] add generated code to allTags array */
      //allTags.push(linkHTML);

    wrapperAuthor.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const AuthorsList = document.querySelector('.authors');
  
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log(authorsParams)
  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
  /* [NEW] generate code of a link and add it to allAuthorsHTML */
  
  const authorLinkHTML = '<li><a href="#author-' + author + '" class="' + calculateAuthorsClass(allAuthors[author], authorsParams) + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';

  allAuthorsHTML += authorLinkHTML;
  }
  /* [NEW] END LOOP: for each author in allAuthors: */

  /*[NEW] add HTML from allAuthorsHTML to authorList */
  AuthorsList.innerHTML = allAuthorsHTML;
}

  
generateAuthor();

function AuthorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for(let authorLink of authorLinks){
    /* remove class active */
    authorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const sameAuthorLinks = document.querySelectorAll(href);
  console.log(sameAuthorLinks);
  /* START LOOP: for each found author link */
  for(let sameAuthorLink of sameAuthorLinks){
    /* add class active */
    sameAuthorLink.classList.add('active');
  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthor(){
  /* find all links to author */
  const links = document.querySelectorAll('a[href^="#author-"]');
  console.log(links);
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', titleClickHandler);
  /* END LOOP: for each link */
  } 
}
addClickListenersToAuthor();