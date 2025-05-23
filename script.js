$(document).ready(function () {
  let allProducts = []; // Store all fetched products for later use

  // Fetch product list from dummyjson for both sections
  $.get("https://dummyjson.com/products?limit=10", function (data) {
    allProducts = data.products;
    const productsForDisplay = data.products.slice(0, 4);
        const $slider = $('#productSlider');

    // --- Initialize Featured Product ---
    if (allProducts.length > 0) {
      $('#featuredImage').attr('src', allProducts[0].thumbnail);
      $('#featuredPrice').text(`$${allProducts[0].price}`);
      $('#featuredTitle').text(allProducts[0].title);
    }

    // --- Set Category Items and Gallery Images ---
    productsForDisplay.forEach((product, index) => {
      const isActive = index === 0 ? 'active' : '';
      const imageActive = index === 0 ? 'img-active' : '';

      $('#furnitureGallery').append(`
                <img src="${product.thumbnail}" alt="${product.title}" class="img-item ${imageActive}" />
            `);

      $('#category-list').append(`
                <div class="category-item ${isActive}">
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                </div>
            `);
    });

    // --- Click on category item ---
    $('#category-list').on('click', '.category-item', function () {
      const index = $(this).index();
      const selectedProduct = productsForDisplay[index];

      $('.category-item').removeClass('active');
      $(this).addClass('active');

      $('#furnitureGallery .img-item').removeClass('img-active');
      $('#furnitureGallery .img-item').eq(index).addClass('img-active');

      $('#featuredImage').attr('src', selectedProduct.thumbnail);
      $('#featuredPrice').text(`$${selectedProduct.price}`);
      $('#featuredTitle').text(selectedProduct.title);
    });

    // --- Click on gallery image ---
    $('#furnitureGallery').on('click', '.img-item', function () {
      const index = $(this).index();
      const selectedProduct = productsForDisplay[index];

      $('#furnitureGallery .img-item').removeClass('img-active');
      $(this).addClass('img-active');

      $('.category-item').removeClass('active');
      $('.category-item').eq(index).addClass('active');

      $('#featuredImage').attr('src', selectedProduct.thumbnail);
      $('#featuredPrice').text(`$${selectedProduct.price}`);
      $('#featuredTitle').text(selectedProduct.title);
    });

    // --- Reset if click outside ---
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.category-item').length &&
        !$(e.target).closest('#furnitureGallery').length &&
        !$(e.target).closest('.main-display').length) {
        $('.category-item').removeClass('active');
        $('#furnitureGallery .img-item').removeClass('img-active');
        if (allProducts.length > 0) {
          $('#featuredImage').attr('src', allProducts[0].thumbnail);
          $('#featuredPrice').text(`$${allProducts[0].price}`);
          $('#featuredTitle').text(allProducts[0].title);
          $('.category-item').eq(0).addClass('active');
          $('#furnitureGallery .img-item').eq(0).addClass('img-active');
        }
      }
    });

    // Populate slider
    allProducts.forEach(product => {
  $slider.append(`
    <div class="product-card">
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="price-tag">$${product.price}</div>
      <div class="card-title">${product.title.split(' ')[0]}</div>
    </div>
  `);
});


    const cardWidth = 316; // 300px + 16px margin
    const cardCount = $slider.find('.product-card').length;
    let currentIndex = 1;

    // Clone first and last for infinite scroll
    const $firstClone = $slider.find('.product-card').first().clone();
    const $lastClone = $slider.find('.product-card').last().clone();

    $slider.append($firstClone);
    $slider.prepend($lastClone);

    const totalCards = cardCount + 2;
    $slider.css('transform', `translateX(${-cardWidth * currentIndex}px)`);
    $slider.find('.product-card').eq(currentIndex).addClass('active-card');

    function updateSlider() {
      $slider.css({
        'transition': 'transform 0.6s ease-in-out',
        'transform': `translateX(${-cardWidth * currentIndex}px)`
      });

      $slider.find('.product-card').removeClass('active-card');
      $slider.find('.product-card').eq(currentIndex).addClass('active-card');
    }

    // Transition end for infinite loop
    $slider.on('transitionend', function () {
      if (currentIndex === 0) {
        $slider.css('transition', 'none');
        currentIndex = cardCount;
        $slider.css('transform', `translateX(${-cardWidth * currentIndex}px)`);
        $slider.find('.product-card').removeClass('active-card');
        $slider.find('.product-card').eq(currentIndex).addClass('active-card');
      } else if (currentIndex === cardCount + 1) {
        $slider.css('transition', 'none');
        currentIndex = 1;
        $slider.css('transform', `translateX(${-cardWidth * currentIndex}px)`);
        $slider.find('.product-card').removeClass('active-card');
        $slider.find('.product-card').eq(currentIndex).addClass('active-card');
      }
    });

    $('#next').click(function () {
      if (currentIndex < totalCards - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    $('#prev').click(function () {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  });

  // Hover Animation
  $('.primary-btn, .secondary-btn, .see-more-btn, .slider-buttons button').hover(
    function () {
      $(this).css('transform', 'scale(1.05)');
    },
    function () {
      $(this).css('transform', 'scale(1)');
    }
  );

  const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active"); // ini akan menambahkan/menghapus class "active"
});

});
