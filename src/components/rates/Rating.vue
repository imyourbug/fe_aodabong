<template>
  <div class="row">
    <div class="col-md-12">
      <div class="stars">
        <input class="star star-5" id="star-5" type="radio" name="star" />
        <label class="star star-5" for="star-5"></label>

        <input class="star star-4" id="star-4" type="radio" name="star" />
        <label class="star star-4" for="star-4"></label>

        <input class="star star-3" id="star-3" type="radio" name="star" />
        <label class="star star-3" for="star-3"></label>

        <input class="star star-2" id="star-2" type="radio" name="star" />
        <label class="star star-2" for="star-2"></label>

        <input class="star star-1" id="star-1" type="radio" name="star" />
        <label class="star star-1" for="star-1"></label>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
body {
  background-color: #eee;
}

div.stars {
  width: max-content;

  display: inline-block;
}

input.star {
  display: none;
}

label.star {
  float: right;

  padding: 10px;

  font-size: 36px;

  color: #4a148c;

  transition: all 0.2s;
}

input.star:checked ~ label.star:before {
  content: "\f005";

  color: #fd4;

  transition: all 0.25s;
}

input.star-5:checked ~ label.star:before {
  color: #fe7;

  text-shadow: 0 0 20px #952;
}

input.star-1:checked ~ label.star:before {
  color: #f62;
}

label.star:hover {
  transform: rotate(-15deg) scale(1.3);
}

label.star:before {
  content: "\f006";

  font-family: FontAwesome;
}
</style>