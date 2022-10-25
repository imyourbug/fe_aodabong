<template>
  <div class="slider">
    <div class="in-slider">
      <div class="list-danhmuc">
        <div class="danhmuc">
          <div class="text-top">
            <i class="fas fa-bars"></i>&ensp;DANH MỤC SẢN PHẨM
          </div>
          <br />
          <div class="option">
            <a href="danhsachsp.php?MaLoai=AO01"
              ><i class="fas fa-arrow-circle-right"></i>&ensp;Áo may theo thiết
              kế</a
            >
          </div>
          <hr />
          <div class="option">
            <a href="danhsachsp.php?MaLoai=AO02"
              ><i class="fas fa-arrow-circle-right"></i>&ensp;Áo câu lạc bộ</a
            >
          </div>
          <hr />
          <div class="option">
            <a href="danhsachsp.php?MaLoai=GIAY01"
              ><i class="fas fa-arrow-circle-right"></i>&ensp;Giày thể thao</a
            >
          </div>
          <hr />
          <div class="option">
            <a href="danhsachsp.php?MaLoai=PK01"
              ><i class="fas fa-arrow-circle-right"></i>&ensp;Phụ kiện</a
            >
          </div>
        </div>
      </div>
      <div class="slideshow-container">
        <div class="mySlides">
          <img class="slide-img" src="" />
        </div>

        <div class="mySlides">
          <img class="slide-img" src="" />
        </div>

        <div class="mySlides">
          <img class="slide-img" src="" />
        </div>

        <a class="prev" @click="plusSlides(-1)">&#10094;</a>
        <a class="next" @click="plusSlides(1)">&#10095;</a>
      </div>
    </div>
  </div>
</template>

<script>
var slideIndex = 1;
showSlides(slideIndex);

export default {
  name: "Slider",
  methods: {
    plusSlides(n) {
      showSlides((slideIndex += n));
    },

    currentSlide(n) {
      showSlides((slideIndex = n));
    },

    showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      //ẩn tất cả hình ảnh
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "block";
    },
  },
};
</script>

<style>
</style>