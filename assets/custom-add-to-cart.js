document.addEventListener('submit', function (e) {
  // Kiểm tra xem có đúng là form Add to Cart không
  if (e.target.matches('form[data-type="add-to-cart-form"]')) {
    e.preventDefault(); // ❗ Ngăn reload

    const form = e.target;
    const formData = new FormData(form);

    fetch('/cart/add.js', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.error('❌ Lỗi khi thêm sản phẩm:', err);
      });
  }
});

const zeroCart = document.querySelector('.zero-cart');
const viewProduct = document.querySelector('.custom-view-productt');
const hideViewProduct = document.querySelector('.custom-out-view-product');
const viewCompare = document.querySelector('.custom-tab-compare');
const img1 = document.querySelector('.imggg1');
const img2 = document.querySelector('.imggg2');
const prevSlidee = document.querySelector('.prev-slide');
const nextSlidee = document.querySelector('.next-slide');
const slideImggg = document.querySelector('.slide-imgggg');
const title = document.querySelector('.customm-title');
const price = document.querySelector('.customm-price');
const content = document.querySelector('.customm-content');
const tags = document.querySelector('.customm-tags');
const quantity = document.querySelector('.quantity__input');;
const addToCart = document.querySelector('.customm-add-cart');
const tabMenuCart = document.querySelector('.custom-menu-cart');
const boxFixed = document.querySelector('.box-fixed-custom');
const compareContainer = document.querySelector('.custom-products-compare');

const dataCompare = [];
document.addEventListener('DOMContentLoaded', function () {
  let indexx = 1;
  nextSlidee.onclick = function () {
    slideImggg.style.transform = 'translate(-31.5vw, 0px)';
  };
  prevSlidee.onclick = function () {
    slideImggg.style.transform = 'translate(0, 0px)';
  };
  addToCart.addEventListener('click', function () {
    viewProduct.style.opacity = '0';
    viewProduct.style.visibility = 'hidden';
    hideViewProduct.style.display = 'none';
    viewProduct.style.width = '5vw';
    viewProduct.style.height = '5vh';
    addProduct(addToCart.dataset.variant ,quantity.value);
  });
  boxFixed.addEventListener('click', function () {
    boxFixed.classList.remove('hide-menu-bar');
    tabMenuCart.classList.remove('hide-menu-cart');
    viewCompare.style.opacity = '0';
    viewCompare.style.visibility = 'hidden';
    viewCompare.style.width = '5vw';
    viewCompare.style.height = '5vh';
    compareContainer.innerHTML = '';
  });
});

function updateCartUII(items, cart) {
  const totalEl = document.getElementById('cart-total');
  const container = document.querySelector('.custom-items-cart');
  container.innerHTML = '';

  items.forEach((item) => {
    const html = `
      <div class="custom-item-cart" data-key="${item.key}">
            <img src="${item.image}" alt="${item.product_title}" width="50" height="50" />
            <div class="custom-info-item-cart">
              <h5>${item.product_title}</h5>
              <span>${item.quantity} × ${(item.line_price / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })}</span>
            </div>
            <button class="remove-btn" data-key="${item.key}">
              <span class="icon-x">X</span>
            </button>
          </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
  document.querySelector('.custom-update-cart').textContent = items.reduce((sum, item) => sum + item.quantity, 0);
  totalEl.textContent = (cart.total_price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

function showElement(
  image1,
  titlee,
  pricee,
  description,
  id,
  quantity_min,
  quantity_max,
  quantity_incre,
  image2,
  varianId
) {
  const buyButtons = document.getElementById(id).innerHTML;
  viewProduct.style.opacity = '1';
  viewProduct.style.visibility = 'visible';

  viewProduct.style.width = '70vw';
  viewProduct.style.height = '75vh';
  hideViewProduct.style.display = 'block';
  img1.src = image1;
  img2.src = image2;
  title.textContent = titlee;
  price.textContent = '$' + pricee;

  document.querySelector('.customm-add-cart').setAttribute('data-variant', varianId);
  quantity.setAttribute('data-min', quantity_min);
  quantity.setAttribute('data-max', quantity_max);
  quantity.setAttribute('max', quantity_max);
  quantity.setAttribute('step', quantity_incre);
  quantity.setAttribute('value', '1');
}

hideViewProduct.onclick = function () {
  viewProduct.style.opacity = '0';
  viewProduct.style.visibility = 'hidden';
  hideViewProduct.style.display = 'none';
  viewProduct.style.width = '5vw';
  viewProduct.style.height = '5vh';
};
function addProduct(variantId,quantityValue) {
  document.querySelector('.custom-total-cart').style.display = 'flex';
  document.querySelector('.custom-view-cart').style.display = 'block';
  document.querySelector('.custom-check-out').style.display = 'block';
  document.querySelector('.zero-cart').style.display = 'none';
  boxFixed.classList.add('hide-menu-bar');
  tabMenuCart.classList.add('hide-menu-cart');
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      id: variantId,
      quantity: quantityValue,
    }),
  })
    .then(() => fetch('/cart.js'))
    .then((res) => res.json())
    .then((cart) => {
      updateCartUII(cart.items, cart);
    });
}
function renderCompareList() {
  let compareList = JSON.parse(localStorage.getItem('dataCompare')) || [];

  compareContainer.innerHTML = '';

  if (compareList.length === 0) {
    document.querySelector('.customm-avai').style.display = 'none';
    compareContainer.innerHTML = '<p>Empty Compare</p>';
  }

  compareList.forEach((item) => {
    const html = `
        <div class="custom-product-compare" data-id="${item.productId}">
          <button class="custom-remove-product-compare" data-id="${item.productId}">Remove</button>
          <img class="custom-img-product-compare" src="${item.img}" alt="" width="100%" height="100%">
          <span class="custom-title-product-compare">${item.title}</span>
          <span class="custom-price-product-compare">$ ${item.price}</span>
          <button class="custom-add-product-compare" data-variant="${item.variantId}">Add to cart</button>
          <span class="custom-stock-product-compare">In stock</span>
        </div>
      `;
    compareContainer.insertAdjacentHTML('beforeend', html);
  });

  document.querySelectorAll('.custom-remove-product-compare').forEach((button) => {
    button.addEventListener('click', function () {
      const idToRemove = this.dataset.id;
      compareList = compareList.filter((item) => item.productId !== idToRemove);
      localStorage.setItem('dataCompare', JSON.stringify(compareList));
      renderCompareList();
    });
  });

  //Xóa product khỏi comparre
  document.querySelectorAll('.custom-remove-product-compare').forEach((button) => {
    button.addEventListener('click', function () {
      const idToRemove = this.dataset.id;
      compareList = compareList.filter((item) => item.productId !== idToRemove);
      localStorage.setItem('dataCompare', JSON.stringify(compareList));
      renderCompareList();
    });
  });

  // Thêm product vô giỏ hàng
  document.querySelectorAll('.custom-add-product-compare').forEach((button) => {
    button.addEventListener('click', function () {
      const variantId = this.dataset.variant;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: variantId,
          quantity: 1,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          window.location.href = '/cart';
        })
        .catch((err) => {
          console.error('Add to cart error:', err);
        });
    });
  });
}

function addCompare(img, title, price, productId, variantId) {
  boxFixed.classList.add('hide-menu-bar');
  viewCompare.style.opacity = '1';
  viewCompare.style.visibility = 'visible';
  viewCompare.style.width = '85vw';
  viewCompare.style.height = '85vh';
  document.querySelector('.customm-avai').style.display = 'flex';
  let compareList = JSON.parse(localStorage.getItem('dataCompare')) || [];

  if (!compareList.find((item) => item.productId === productId)) {
    compareList.push({
      img: img,
      title: title,
      price: price,
      productId: productId,
      variantId: variantId,
    });
    localStorage.setItem('dataCompare', JSON.stringify(compareList));
  }
  renderCompareList();
}
