const url = "https://real-time-flipkart-api.p.rapidapi.com/products-by-category?category_id=tyy%2C4io&page=14";
const brandFilter = document.querySelector(".brand-bucket");
const filterBox = document.querySelector(".filter-indicator-content");
const clearBrandFilter = document.querySelector(".clear-brand-filter");
const clearFilter = document.querySelector(".clear-all");
const filterIndicator = document.querySelector(".filter-indicator");
const categorySelectMain = document.querySelector(".main-sort");
const categDiv = categorySelectMain.querySelectorAll(":not(span) div");
const mobileCard = document.querySelector(".main-home-content");
const ascendingFilter = document.getElementById("low-to-high");
const descendingFilter = document.getElementById("high-to-low");
const options = document.querySelectorAll(".option");
const assuredSection = document.querySelector('.assured')
const hider = document.querySelector(".modal");
const hider1 = document.querySelector(".modal1");
const hider2 = document.querySelector(".modal2");
const brandMain = document.querySelector(".brand-section-bottom");
const count = document.querySelector(".count span");
const gstContainer = document.querySelector('.gst-container')
const ratingContent = document.querySelector(".rating-content");
const ratingContent1 = document.querySelector(".rating-content1");
const memoryContent = document.querySelector(".memory-content");
const searchResultCount = document.querySelector(".main-result");
const header = document.querySelector('.header-main-contents')
const popularity = document.getElementById("popularity");
const percentage = document.querySelectorAll(".percentage");
const aboveFooter = document.querySelector('.sub-aside-sub-container')
const wholeSection = document.querySelector('.big-section')
const pageNavigator = document.querySelector('.page-navigator')
const pageLanded = document.querySelector('.where-am-i')
const categories = document.querySelectorAll('.sort-category')
const error = document.querySelector('.error-message')
const page = document.querySelector('.footer-contents')
const belowHeader = document.querySelector('.below-header-contents')
const mobileCategorySection = document.querySelector('.mobile-catog')
const priceSection = document.querySelector('.price-section')
const brandSection = document.querySelector('.section-brand')
const asideSubContainer = document.querySelector('.aside-sub-container')
const ramContainer = document.querySelector('.ram-container')
const storageSection = document.querySelector('.storage-section')
const discountSection = document.querySelector('.discount-section')
const footerUpper = document.querySelector('.aside-bottom')
const mainHome = document.querySelector('.main-home-header')
const relevance = document.getElementById('relevance')

relevance.addEventListener('click',()=> {
  console.log('click')
  displayCurrent()
  
})

categories.forEach(categ=>{
  categ.addEventListener('click',()=>{
    categories.forEach(i=>i.classList.remove('active-categ'))
    categ.classList.add('active-categ')
  })
})

let productsData = [];
let filterBased = [];
let priceRange = { min: 0, max: Infinity };
let ratingRange = [];
let discountArr = [];
let brands = [];
let ramRange = [];
let arr = ['a','c','d','e','f','h','i','j','k','l','n','o','p','q','r','s','t','u','v','w','x','y','z']

const itemsPerPage = 24
let currentPage = 1

async function fetchAllPages() {
   
  try {
    const response = await fetch(`./assets/data/data.json`);
    const result = await response.json();
    const res = await fetch('./assets/data/content.json')
    const data = await res.json()
    productsData = result;
    filteredMobiles = result;
    createHeader(data)
    createBelowHeader(data)
    createFilterAside(data)
    createMobileCatogSection(data)
    createPriceSection(data)
    createBrandSection(data)
    createAssuredSection(data)
    createAsideSubcontainer(data)
    createGstContainer(data)
    createRamSection(data)
    createMultipleSection(data)
    createDiscountSection(data)
    createAboveFooterSection(data)
    createAsideBottom(data)
    createFilter(filteredMobiles);
    displayCurrent();
    createPages();
   
    

       
  } catch (err) {
    console.log(err);
  }
  
  return productsData;
}




function displayCurrent() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filteredMobiles.slice(start, end);
  displayCards(paginatedItems);
  const span2 = document.createElement('span');
  pageLanded.innerHTML = '';
  span2.classList.add('page-landed');
  let totalPages = Math.ceil(filteredMobiles.length / itemsPerPage);
  if (totalPages === 0) totalPages = 1;
  span2.innerHTML = `Page ${currentPage} of ${totalPages}`;
  pageLanded.appendChild(span2);
}

function createPages() {
  let pages = Math.ceil(filteredMobiles.length / itemsPerPage);
  pageNavigator.innerHTML = '';

  for (let i = 1; i <= pages; i++) {
    const html = `<span class="current" value='${i}'>${i}</span>`;
    pageNavigator.insertAdjacentHTML('beforeend', html);
  }

  document.querySelector('.current').classList.add('active-navigator');
  document.querySelectorAll('.current').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.current').forEach(btn => btn.classList.remove('active-navigator'));
      btn.classList.add('active-navigator');
      currentPage = i + 1;
      displayCurrent();
    });
  });
}

function displayCards(data) {
  mobileCard.innerHTML = "";
  data.forEach(createCard);
}

function createCard(result) {
  const ogPrice = result.mrp;
  const offPrice = result.price;
  const html = `
    <div class="mobile-card">
      <div class="mobile-card-inner">
        <div class="mobile-card-container">
          <div class="mobile-picture-container">
            <div class="mobile-card-image">
              <img src="${result.images[0]}" alt="">
            </div>
            <div class="add-to-compare">
              <input type="checkbox">
              <span>Add to Compare</span>
            </div>
            <div class="heart">
              <svg id="heart-${
                result.id
              }" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" class="N1bADF" width="16" height="16" viewBox="0 0 20 16">
                <path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="#C2C2C2" class="x1UMqG" stroke="#FFFFFF" fill-rule="evenodd" opacity=".9"></path>
              </svg>
            </div>
          </div>
          <div class="mobile-description-container">
            <div class="about-mobile">
              <span class="hover-me">${result.title}</span>
              <div class="mobile-rating">
                <div class="mobile-star-rating">
                  <span>${result.rating.average}</span>
                  <img src="assets/img/star.svg" alt="">
                </div>
                <div class="rating-review">
                  <span>${result.rating.count.toLocaleString()} Ratings & ${result.rating.reviewCount.toLocaleString()} Reviews</span>
                </div>
              </div>
              <div class="mobile-features">
                <ul>
                  ${result.highlights
                    .map((h) => `<li class="points">${h}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>
            <div class="price-container">
              <div class="price-top">
                <span>₹${offPrice.toLocaleString()}</span>
                <div class="real-price">₹${ogPrice.toLocaleString()}</div>
                <div class="off"><span>${Math.ceil(
                  ((ogPrice - offPrice) / ogPrice) * 100
                )}% off</span></div>
                <div class="delivery"><span>Free delivery</span></div>
              </div>
              <div class="f-assure"><img src="assets/img/fassure.png" alt=""></div>
              <div class="save"><span>Save extra with combo offers</span></div>
              <div class="save"><span class="bank">Bank Offer</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  mobileCard.insertAdjacentHTML("beforeend", html);
}





fetchAllPages();

const brandSet = new Set();

function createFilter(mobiles) {
  mobiles.forEach((mobile) => {
    if (!brandSet.has(mobile.brand)) {
      brandSet.add(mobile.brand);
      const mobileTicker = document.createElement("div");
      mobileTicker.classList.add("brand-name");
      const html = `
        <label class="brand-label">
          <input type="checkbox" class="checkbox brandInput" value="${mobile.brand}" data-value="${mobile.brand}">
          <span class="brand-name-target">${mobile.brand}</span>
        </label>`;
      mobileTicker.insertAdjacentHTML("beforeend", html);
     
      brandFilter.appendChild(mobileTicker);
      const brandInput = mobileTicker.querySelectorAll("input");
      brandInput.forEach((input) => {
        input.addEventListener("change", () => {
          updateBrand();
          applyFilters();
        });
      });
    }
  });

  percentage.forEach((percen) => {
    percen.addEventListener("change", (e) => {
      let newPercentage = e.target.value;
      newPercentage = newPercentage.slice(0, 2);
    });
  });

  document.querySelectorAll(".checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const value = e.target.value;
      if (e.target.checked) {
        if (!filterBased.includes(value)) {
          filterBased.push(value);
        }
      } else {
        filterBased = filterBased.filter((item) => item !== value);
      }
      updateFilters();
    });
  });

  clearBrandFilter.addEventListener("click", () => {
    clearFilters();
    clearBrandFilter.classList.toggle("hidden");
  });
  clearFilter.addEventListener("click", () => clearFilters());
}


function updateBrand() {
  brands = [];
  document.querySelectorAll('.brand-bucket input:checked').forEach((input) => {
    if (input.checked) {
      const value = input.getAttribute('data-value');
      brands.push(value);
    }
  });
}

function updateRatingRange() {
  ratingRange = [];
  document.querySelectorAll('.rating-content input:checked').forEach((input) => {
    if (input.checked) {
      ratingRange.push(parseFloat(input.getAttribute('data-value')));
    }
  });
}

function updateDiscountArr() {
  discountArr = [];
  document.querySelectorAll('.discount-content-inner input:checked').forEach((input) => {
    if (input.checked) {
      discountArr.push(parseFloat(input.getAttribute('data-value')));
    }
  });
}


function applyFilters() {
  filteredMobiles = productsData.filter((product) => {   
    return (
      product.price >= priceRange.min &&
      product.price <= priceRange.max &&
      (brands.length === 0 || brands.includes(product.brand)) &&
      (ratingRange.length === 0 || ratingRange.some(d=> product.rating.average > d)) &&
      (discountArr.length === 0 || discountArr.some(d => (product.mrp - product.price) / product.mrp * 100 >= d)) &&
      (ramRange.length === 0 || ramRange.some(d=> product.ram > d))
    );
  });
  
  if(filteredMobiles.length === 0) {
    console.log(filteredMobiles.length)
    page.style.display = 'none'
    
    error.style.display = 'flex'

    const html = `
    <div>
      <span>We couldnt find what you are looking for 😔</span>
    </div>
    `

    error.insertAdjacentHTML('beforeend', html)
  } else if(filteredMobiles.length !== 0){
    error.style.display = 'none'
    
  }
  

  currentPage = 1; 
  displayCurrent();
  createPages();
  searchResultCount.innerHTML = "";
  const span = document.createElement("span");
  span.innerHTML = `Showing 1 - ${Math.min(itemsPerPage, filteredMobiles.length)} of ${filteredMobiles.length} results for "${searchBar.value}"`;
  searchResultCount.appendChild(span);
}

error.style.display = 'none'

// document.querySelector('.price-clear').addEventListener('click',()=> {
//   priceRange.max = parseFloat(10000) 
//   priceRange.min = parseInt(0)

// })

function clearFilters() {
  priceRange = { min: 0, max: Infinity };
  clearFilter.classList.add('hidden')
  filterIndicator.classList.add('hidden')
  ratingRange = [];
  discountArr = [];
  brands = [];
  ramRange = [];
  document.querySelectorAll('.brand-bucket input').forEach((input) => input.checked = false);
  document.querySelectorAll('.rating-content input').forEach((input) => input.checked = false);
  document.querySelectorAll('.discount-content-inner input').forEach((input) => input.checked = false);
  document.querySelectorAll('.memory-content-inner input').forEach((input) => input.checked = false);
  applyFilters();
}

function sortDescending() {
  const sortedProducts = [...filteredMobiles].sort((a, b) => b.price - a.price);
  displayCards(sortedProducts);
}

function sortAscending() {
  const sortedProducts = [...filteredMobiles].sort((a, b) => a.price - b.price);
  displayCards(sortedProducts);
}

function sortPopular() {
  const sortedProducts = [...filteredMobiles].sort(
    (a, b) => b.rating.average - a.rating.average
  );
  displayCards(sortedProducts);
}
popularity.addEventListener("click", sortPopular);
ascendingFilter.addEventListener("click", sortAscending);
descendingFilter.addEventListener("click", sortDescending);

categorySelectMain.addEventListener("change", (e) => {
  const value = e.target.value;
  filteredMobiles = productsData.filter(product => product.category === value);
  displayCurrent();
});


let searchBar

function createHeader(data){
  header.innerHTML = ''
  const html = `
  <div class="header-left">
    <div class="header-left-contents">
      <img width="75" src="${data.header.image}" alt="">
      <div class="header-left-bottom">
        <span class="explore">${data.header.explore}</span>
        <span class="plus">${data.header.plus}</span>
        <img class="plus-icon" width="10" height="9.5" src="${data.header.imagePlus}" alt="">
      </div>
    </div>
  </div>
  <div class="header-med">
    <form class="header-form">
      <div class="form-inner">
        <input type="text" id="search" placeholder="Search for Products" value="mobile"
        class="search">
        <button class="search-btn"><img src="${data.header.button}" alt=""></button>
      </div>
    </form>
  </div>
  ${data.header.items.map(i=>(
    `<div class="header-heading ">
        <span>${i}</span>
      </div>`
      )).join('')}
  `
                  

  header.insertAdjacentHTML('beforeend',html)
  

  const activeHeader = document.querySelectorAll('.header-heading')
  activeHeader[0].classList.add('active')
  const image = data.header.itmsImage[0]
  const imageContainer = document.createElement('img')
  imageContainer.src = image
  activeHeader[2].appendChild(imageContainer)

  const image2 = data.header.itmsImage[1]
  const imageContainer2 = document.createElement('img')
  imageContainer2.classList.add('unrotate')
  imageContainer2.src = image2
  activeHeader[3].appendChild(imageContainer2)
 

  
  searchResultCount.innerHTML = "";
  const span = document.createElement("span");
  searchBar = document.querySelector(".form-inner input");
  span.innerHTML = `Showing 1 - 24 of ${productsData.length} results for "${searchBar.value}"`;
  searchResultCount.appendChild(span); 
  
  searchBar.addEventListener("input", (e) => {
    e.preventDefault();
    searchResultCount.innerHTML = "";
    const span = document.createElement("span");
    span.innerHTML = `Showing 1 - ${productsData.length} of ${productsData.length} results for "${e.target.value}"`;
    searchResultCount.appendChild(span);
  });
}


function createBelowHeader(data){
  belowHeader.innerHTML = ''
  const html =`
  ${data.header.categories.map(i=>(
  `<span class="category">
      ${i}
      <img src="assets/img/arrow-grey.svg" alt="">
  </span>`
  )).join('')}
  
  `
  belowHeader.insertAdjacentHTML('beforeend',html)
}


function createFilterAside(data){

}

function updateFilters() {
  filterBox.innerHTML = "";
  filterIndicator.classList.remove("hidden");
  clearFilter.classList.toggle("hidden",filterBased.length === 0 && ratingRange.length === 0 && priceRange.min === 0 && brands.length === 0 && priceRange.max === Infinity);
  clearBrandFilter.classList.toggle("hidden", filterBased.length === 0);
  
  brands.forEach((brand) => {
    const filter = document.createElement("div");
    filter.classList.add("filter");
    filter.setAttribute("data-brand", brand);
    filter.innerHTML = `<span class="close-btn">✕</span>
      <span class="brand-name-1">${brand}</span>`;
    filterBox.appendChild(filter);

    filter.querySelector(".close-btn").addEventListener("click", () => {
      applyFilters()
      filterBox.removeChild(filter);
      filterBased = filterBased.filter((item) => item !== brand);
      brands = brands.filter(i=> i!== brand)
      document.querySelector(`.checkbox[value="${brand}"]`).checked = false;
      updateFilters()
      // clearFilters()
      applyFilters();
      console.log(filterBox.children.length)
      if(filterBox.children.length === 0){
        clearFilters()
        displayCurrent()
      }
      
    });
    console.log(filterBox.children.length)
  });


  applyFilters();

    
}

function createMobileCatogSection(data){
  mobileCategorySection.innerHTML = ''
  const mobileSection = document.createElement('div')
  mobileSection.classList.add('mobile-catog-contents')
  const html = `
  <div class="mobile-catog-head">
    <span>${data.aside.title}</span>
  </div>
  <div class="mobile-accessories">
    <img width="10" height="10" src="${data.aside.image}" alt="">
    <span>${data.aside.span}</span>
  </div>
  <div class="mobiles-strong">
    <span>${data.aside.strong}</span>
  </div>
  `
  mobileSection.insertAdjacentHTML('beforeend',html)
  mobileCategorySection.appendChild(mobileSection)
}

function createPriceSection(data){
  priceSection.innerHTML = ''
  const priceHead = document.createElement('div')
  priceHead.classList.add('price-head')
  const html = `
  <span>${data.priceSection.title}</span>
  <div class="clear price-clear">
      <span style="cursor: pointer;">${data.priceSection.button}</span>
  </div>
  `
  priceHead.insertAdjacentHTML('beforeend',html)
  priceSection.appendChild(priceHead)

  const static = document.createElement('div')
  static.classList.add('static')
  const squares = data.priceSection.blocks.map(i=>(                                  
    `<div class="static-block" style="${i}"></div>`
  )).join('')

  static.insertAdjacentHTML('beforeend',squares)
  priceSection.appendChild(static)

  const slider = document.createElement('div')
  slider.classList.add('price-slider')

  const sliderHtml = `
  <div class="grey-line"></div>
    <div class="min-ball-container">
        <div class="min-ball"></div>
    </div>
      <div class="max-ball-container">
        <div class="max-ball"></div>
    </div>
  <div class="slider-line"></div>
  `
  let dotsArr = ['.','.','.','.','.']
  slider.insertAdjacentHTML('beforeend',sliderHtml)
  priceSection.appendChild(slider)

  const dots = document.createElement('div')
  dots.classList.add('slider-range-dots')
  const dotHtml = dotsArr.map(i=>(
  ` <div class="dot">${i}</div>`
  )).join('')
  dots.insertAdjacentHTML('beforeend',dotHtml)
  priceSection.appendChild(dots)


  const priceRange = document.createElement('div')
  priceRange.classList.add('price-range-viewer')

  const priceHtml = `
   <div class="range">
      <img src="${data.priceSection.image}" alt="">
      <select class="minimum">
        ${data.priceSection.min.map(i=>(
          `<option  class="options min-options">${i}</option>`
        ))}
      </select>
  </div>
  <div class="to">to</div>
  <div class="price">
      <img src="${data.priceSection.image}" alt="">
      <select class="select">
        ${data.priceSection.prices.map(i=>(
          `<option value="${i.slice(1,6)}" class="option">${i}</option>`

        ))}
      </select>
  </div>
  `
  priceRange.insertAdjacentHTML('beforeend',priceHtml)
  priceSection.appendChild(priceRange)
  
  const minRange = document.querySelectorAll('.min-options')
  minRange[0].setAttribute('value',0)
  minRange[1].setAttribute('value',10000)
  
  const select = document.querySelector(".select");
  select.addEventListener("change", () => {
    priceRange.max = parseFloat(select.value) || Infinity;
    console.log(priceRange.max)
    applyFilters();
  });

  const selectMin = document.querySelector(".minimum");
  selectMin.addEventListener("change", () => {
    priceRange.min = parseFloat(selectMin.value) || 0;
    console.log(priceRange.min)
    applyFilters();
  });
}
let callCount 
function createBrandSection(data){
  callCount++
  console.log(callCount)
  const brandHead = document.createElement('div')
  brandHead.innerHTML = ''
  brandHead.classList.add('brand-only-section')
  const headHtml = `
  <span>${data.brandSection.title}</span>
  <img class="modal active-modal" width="6" height="11"
  src="${data.brandSection.image}" alt="">
  `
  brandHead.insertAdjacentHTML('beforeend',headHtml)
  brandSection.insertBefore(brandHead,brandMain)
  console.log(brandSection)
}

function createAssuredSection(data){
  const html =`
  <div class="assured-left">
    <input type="checkbox">
    <div class="f-img-container">
        <img src="${data.assured.image}" height="21" alt="">
      </div>
  </div>
  <div class="assured-right">
      <span>${data.assured.span}</span>
  </div>
  `
  assuredSection.insertAdjacentHTML('beforeend',html)
}


function createAsideSubcontainer(data){
  const head = document.createElement('div')
  head.classList.add('.brand-section-head')
  const html = `
  <div class="brand-section-head ">
    <span>Customer Ratings</span>
    <img class="modal1 active-modal" width="6" height="11"
      src="assets/img/brand-arrow.svg" alt="">
  </div>
  `
  head.insertAdjacentHTML('beforeend',html)
  asideSubContainer.appendChild(head)

  const ratingcontainer = document.createElement('div')
  ratingcontainer.classList.add('aside-sub-bottom')
  ratingcontainer.classList.add('rating')
  const ratingHtml = `
  <div class="aside-sub-bottom rating">
    <div class="rating-content">
        ${data.rating.map(i=>(
          `<div class="rating-content-inner">
              <input type="checkbox" class="checkbox" data-value='${i.split(0,1)}' value='${i}'>
              <span>${i}</span>
            </div>`
        )).join('')}
    </div>
  </div>`
  ratingcontainer.insertAdjacentHTML('beforeend',ratingHtml)
  asideSubContainer.appendChild(ratingcontainer)
  const ratingInputs = document.querySelectorAll(".rating-content-inner input");
  ratingInputs.forEach((input) => {
    input.addEventListener("change", () => {
      updateRatingRange();
      applyFilters();
    });
  });
}


function createGstContainer(data){
  const html =`
  <div class="brand-section-head">
    <span>${data.gst.head}</span>
    <img class="modal2 active-modal " width="6" height="11"
    src="${data.gst.image}" alt="">
  </div>
  <div class="rating-content1 hidden">
    <div class="rating-content-inner ">
      <input type="checkbox" class="checkbox" data-value='3' value='3★ & above'>
      <span>${data.gst.span}</span>
    </div>
  </div>
  `
  gstContainer.insertAdjacentHTML('beforeend',html)
}


function createRamSection(data){
  const head = document.createElement('div')
  head.classList.add('brand-section-head')
  const headHtml = `
  <span>RAM</span>
  <img class="modal2 active-modal" width="6" height="11"
  src="assets/img/brand-arrow.svg" alt="">
  `
  head.insertAdjacentHTML('beforeend',headHtml)
  ramContainer.appendChild(head)

  const content = document.createElement('div')
  content.classList.add('memory-content')
  content.classList.add('content')
  const html = 
  `<div class="memory-content-inner content-inner">
  ${data.ram.map(i=>(
    `<label>
      <input type="checkbox" class="checkbox" data-value='${i.split(0,1)}' value='${i}'>
      <span class="span">${i}</span>
    </label>`
  )).join('')}
  </div>`
  content.insertAdjacentHTML('beforeend',html)
  ramContainer.appendChild(content)
  const ramInput = document.querySelectorAll('.memory-content-inner input')

  function ramUpdate() {
    ramRange = [];
    document.querySelectorAll('.memory-content-inner input:checked').forEach((input) => {
      if (input.checked) {
        ramRange.push(parseFloat(input.getAttribute('data-value')));
      }
    });
  }
  
  ramInput.forEach(input => {
    input.addEventListener('change', () => {
      ramUpdate();
      applyFilters();
    });
  });
}

function createMultipleSection(data){
  const html = data.sections.map(section=>(
    `
    <div class="aside-sub-container same-section">
      <div class="brand-section-head">
        <span>${section}</span>
        <img class="modal2 active-modal" width="6" height="11"
        src="assets/img/brand-arrow.svg" alt="">
      </div>
    </div>`
  )).join('')
  wholeSection.insertAdjacentHTML('beforeend',html) 
}

function createDiscountSection(data){
  const head = document.createElement('div')
  head.classList.add('brand-section-head')
  const headHtml = `
  <span>discount</span>
  <img class="modal2 active-modal" width="6" height="11"
  src="assets/img/brand-arrow.svg" alt="">
  `
  head.insertAdjacentHTML('beforeend',headHtml)
  discountSection.appendChild(head)
  const content = document.createElement('div')
  content.classList.add('discount-content')
  content.classList.add('content')
  const html = `
  <div class ="discount-content-inner content-inner">
  ${data.discount.range.map(i=>(
    `<label>
      <input type="checkbox" class="checkbox percentage" data-value=${i.slice(0,2)}" value="${i}">
      <span class="span">${i}</span>
    </label>`
  )).join('')}
  
  </div>
  `

  content.insertAdjacentHTML('beforeend',html)
  discountSection.appendChild(content)


  const discountInput = document.querySelectorAll(".discount-content-inner input");
  discountInput.forEach((input) => {
    input.addEventListener("change", () => {
      updateDiscountArr();
      applyFilters();
    });
  });
}


function createAboveFooterSection(data){
  const html = data.aboveFooterContent.map(i=>(
    `<div class="aside-sub-container">
        <div class="brand-section-head">
          <span>${i}</span>
          <img class="modal2 active-modal" width="6" height="11" src="assets/img/brand-arrow.svg" alt="">
      </div>
    </div>`
  )).join('')
  aboveFooter.insertAdjacentHTML('beforeend',html)
}

function createAsideBottom(data){
  const html = `
  <div class="aside-bottom-content">
    <div class="aside-bottom-top">
      <span>${data.footerUpper.title}</span>
    </div>
    <div class="aside-top-mid">
      <span>${data.footerUpper.span}</span>
      <img src=${data.footerUpper.image}" alt="">
    </div>
    <img src="${data.footerUpper.image2}" alt="">
  </div>
  `
  footerUpper.insertAdjacentHTML('beforeend',html)
}


// function createMainSorter(data){
//   const mainContent = document.createElement('div')
//   mainContent.classList.add('main-header-content')
//   const mainPath = document.createElement('div')
//   mainPath.classList.add('main-path')
//   const html = `
//   <div class="main-path-contents first">
//       <span>Home</span>
//       <img width="20" height="7" src="assets/img/right-arrow.svg" alt="">
//   </div>
//   <div class="main-path-contents">
//       <span>Mobiles & Accessories</span>
//       <img width="20" height="7" src="assets/img/right-arrow.svg" alt="">
//   </div>
//   <div class="main-path-contents">
//       <span>Mobiles</span>
//   </div>
//   `
//   mainPath.insertAdjacentHTML('beforeend',html)
//   mainContent.appendChild(mainPath)
//   mainHome.appendChild(mainContent)
// }