<template>
  <div class="container">
    <div class="row py-3">
      <div class="col">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://i.imgur.com/mcIb2UD.jpeg"
                class="d-block w-100"
                alt="..."
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>Lamborghini</h5>
                <p>
                  Manufacturing magnate Italian Ferruccio Lamborghini founded
                  the company in 1963.
                </p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://i.imgur.com/cfefm1L.jpeg"
                class="d-block w-100"
                alt="..."
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>Ford Mustang</h5>
                <p>Yes, the Ford Mustang is a very good sports car.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://i.imgur.com/DCqhSNJ.jpeg"
                class="d-block w-100"
                alt="..."
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>Cameron</h5>
                <p>
                  The Cameron was an automobile manufactured by the Cameron Car
                  Company of Rhode Island from 1902.
                </p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emitter = inject("emitter");
const slideRepository = RepositoryFactory.get("slide");

const slides = ref([]);

const reload = () => {
  slideRepository.getAllSlides().then((response) => {
    if (response.data.status === 0) {
      slides.value = response.data.slides;
      console.log(slides.value);
    }
    if (response.data.status === 1) {
      alert(response.data.error.message);
    }
    if (response.data.status !== 0 && response.data.status !== 1) {
      alert(response.data);
    }
  });
};

reload();
</script>

<style scoped></style>
