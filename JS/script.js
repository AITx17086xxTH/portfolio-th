$(document).ready(function() {
  $('#contactForm').on('submit', function(event) {
    event.preventDefault();
    $('#formMessage').removeClass('hidden').addClass('show');

    setTimeout(function() {
      $('#formMessage').removeClass('show').addClass('hidden');
    }, 90000);
  });

  var backToTopButton = $('#backToTop');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      backToTopButton.removeClass('hidden').addClass('show');
    } else {
      backToTopButton.removeClass('show').addClass('hidden');
    }
  });

  backToTopButton.click(function() {
    $(this).html('<img src="./img/rokket.png" class="rocket-img shake">');

    $('html, body').animate({scrollTop: 0}, 'slow', function() {
      backToTopButton.html('Top');
    });

    return false;
  });

  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 800);
    }
  });
});




document.addEventListener("DOMContentLoaded", function() {
  const slide = document.getElementById("js-top-news-slide");
  const slideInner = slide.querySelector(".top-news-slide__inner");

  function duplicateItems() {
      const items = Array.from(slideInner.children);
      const slideWidth = slide.offsetWidth;

      let totalWidth = slideInner.scrollWidth;

      while (totalWidth < slideWidth * 2) {
          items.forEach(item => {
              const clone = item.cloneNode(true);
              slideInner.appendChild(clone);
              totalWidth += item.offsetWidth + 20; // マージンを考慮
          });
      }
  }

  duplicateItems();
});

// $('.autoplay').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
// });

$(document).ready(function(){
  $('.single-item').slick({
    // Slickのオプション設定
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // 矢印を非表示にする
    dots: false,   // ドットナビゲーションを非表示にする
    autoplay: true, // 自動でスクロール
    autoplaySpeed: 500, // 自動再生のスライド切り替えまでの時間を設定
  });
});

//   jQuery(document).ready(function($) {
//     $('.your-class').slick({
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 1
//     });
//   });

document.addEventListener('DOMContentLoaded', function() {
  var images = document.images;
  var imagesTotalCount = images.length;
  var imagesLoadedCount = 0;
  var progressBar = document.querySelector('.progress');
  var loadingText = document.querySelector('.loading-text');

  var minLoadingTime = 5000; // 最小表示時間（ミリ秒）
  var loadingStartTime = Date.now();
  var currentProgress = 0;
  var targetProgress = 0;

  // プログレスバーを滑らかに更新するためのタイマーを設定
  var progressInterval = setInterval(function() {
    if (currentProgress < targetProgress) {
      currentProgress += 0.5; // 増加量を調整（0.5%ずつ増加）
      if (currentProgress > targetProgress) {
        currentProgress = targetProgress;
      }
      updateProgress(currentProgress);
    }
  }, 20); // 更新間隔（ミリ秒）

  if (imagesTotalCount === 0) {
    // 画像がない場合は即座にロード画面を非表示
    targetProgress = 100;
    currentProgress = 100;
    updateProgress(100);
    hideLoadingScreen();
  } else {
    for (var i = 0; i < imagesTotalCount; i++) {
      var img = new Image();
      img.onload = imageLoaded;
      img.onerror = imageLoaded;
      img.src = images[i].src;
    }
  }

  function imageLoaded() {
    imagesLoadedCount++;
    var percent = Math.floor((imagesLoadedCount / imagesTotalCount) * 100);
    targetProgress = percent;

    if (imagesLoadedCount === imagesTotalCount) {
      // ロード完了時の経過時間を計算
      var elapsedTime = Date.now() - loadingStartTime;
      var remainingTime = minLoadingTime - elapsedTime;

      if (remainingTime > 0) {
        // 最小表示時間に満たない場合、残りの時間だけ待機
        setTimeout(function() {
          targetProgress = 100;
        }, remainingTime);
      } else {
        targetProgress = 100;
      }

      // プログレスバーが100％に達したらロード画面を非表示
      var checkProgress = setInterval(function() {
        if (currentProgress >= 100) {
          clearInterval(checkProgress);
          hideLoadingScreen();
        }
      }, 50);
    }
  }

  function updateProgress(percent) {
    progressBar.style.width = percent + '%';
    loadingText.textContent = Math.floor(percent) + '%';
  }

  function hideLoadingScreen() {
    clearInterval(progressInterval); // プログレスバーの更新を停止
    var loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.opacity = 1;
    var fadeEffect = setInterval(function () {
      if (loadingScreen.style.opacity > 0) {
        loadingScreen.style.opacity -= 0.05;
      } else {
        clearInterval(fadeEffect);
        loadingScreen.style.display = 'none';
      }
    }, 16); // 約60fps
  }
});


