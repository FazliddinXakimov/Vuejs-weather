<template>
  <div class="container">
    <div class="row">
      <div class="col-info">
        <info></info>
      </div>
      <div class="col-search">
        <search></search>
      </div>
    </div>
  </div>
</template>

<script>
import Info from "./components/Info.vue";
import Search from "./components/Search.vue";
export default {
  components: {
    Info,
    Search,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap");

* {
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  z-index: 1;
  background-image: linear-gradient(#b1cedf, #218bc5);
  background-color: red;
  background-size: cover;
  min-height: 575px;
  height: 100vh;
  padding: 3rem 0;
}

.row {
  display: flex;
  margin: 0 auto;
  width: 85%;
}

.col-info {
  flex: 5;
  height: 100%;
}

.col-search {
  flex: 3;
}

@media (max-width: 992px) {
  .row {
    display: flex;
    width: 100%;
    margin: 0 auto;
    width: 95%;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 2rem 0;
  }
  .col-info {
    flex: 7;
  }

  .col-search {
    flex: 4;
  }
}

@media (max-width: 576px) {
  .row {
    flex-direction: column;
  }
}
</style>
