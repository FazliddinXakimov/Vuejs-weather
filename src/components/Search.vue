<template>
  <div class="search">
    <div class="location">
      <form @submit.prevent="formSubmit">
        <input type="text" v-model="query" placeholder="Another location" />
        <button class="btn" type="submit">
          <h3><fa :icon="['fas', 'search']"></fa></h3>
        </button>
      </form>

      <div class="list-region">
        <p
          v-for="region in uzregions.list"
          :key="region.name"
          class="list-region-item"
          @click="setCurrentRegion(region.name)"
        >
          {{ region.name }}
        </p>
      </div>
    </div>

    <div class="detail" v-if="hasCurrentRegion">
      <p>Weather Details</p>
      <div class="detail-item">
        <span>Cloudy</span>
        <span class="result">{{ cloudy }}%</span>
      </div>
      <div class="detail-item">
        <span>Humidity</span>
        <span class="result">{{ humidity }}%</span>
      </div>
      <div class="detail-item">
        <span>Wind</span>
        <span class="result">{{ wind }}km/h</span>
      </div>
      <div class="detail-item">
        <span>Rain</span>
        <span class="result">0mm</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      isLoading: false,
    };
  },
  computed: {
    uzregions() {
      return this.$store.getters["uzregions"];
    },
    currentRegion() {
      return this.$store.getters["currentRegion"];
    },
    cloudy() {
      return Math.ceil(this.currentRegion.clouds.all);
    },

    humidity() {
      return Math.ceil(this.currentRegion.main.humidity);
    },
    wind() {
      return Math.ceil(this.currentRegion.wind.speed);
    },
    hasCurrentRegion() {
      return this.$store.getters["hasCurrentRegion"];
    },
  },
  methods: {
    formSubmit() {
      if (this.query !== "") {
        this.$store.dispatch("getCurrentRegion", this.query);
      }
    },
    setCurrentRegion(region) {
      this.$store.dispatch("getCurrentRegion", region);
    },
  },
  mounted() {
    this.isLoading = true;
    if (this.query === "") {
      this.$store.dispatch("getCurrentRegion", "Tashkent");
    }
    this.$store.dispatch("getUzRegions");
    this.isLoading = false;
  },
};
</script>

<style scoped>
.search {
  background-image: linear-gradient(#2e5d81, #658397);
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem 1.5rem;
  height: 100%;
  color: #789dba;
  position: relative;
}
.location {
  border-bottom: 1px solid #789dba;
  flex: 1;
}

form input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid #789dba;
  width: 80%;
  padding-bottom: 0.5rem;
  color: white;
  font-size: 0.7rem;
}

form input::placeholder {
  color: #789dba;
  font-size: 0.7rem;
}

form .btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #a9cee1;
  padding: 1.3rem;
  border: none;
  outline: none;
}

.list-region {
  margin: 1.5rem 0;
}

.list-region-item {
  margin-bottom: 1.5rem;
  font-size: 0.7rem;
}

.list-region-item:hover {
  cursor: pointer;
  color: white;
}

.detail {
  border-bottom: 1px solid #789dba;
  padding-top: 1rem;
  flex: 1;
  font-size: 0.7rem;
}
.detail p {
  margin-bottom: 1.5rem;
  color: white;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.result {
  color: white;
}

@media (max-width: 992px) {
  .search {
    padding: 2rem 2rem 1.5rem;
  }
}
@media (max-width: 768px) {
  .search {
    padding: 0.5rem 2rem 0.5rem;
  }

  .list-region {
    margin: 1rem 0;
  }

  .list-region-item {
    margin-bottom: 1rem;
  }

  .detail-item {
    margin-bottom: 1rem;
  }
  form .btn {
    padding: 0.7rem;
  }
}
@media (max-width: 576px) {
  .row {
    flex-direction: column;
  }
}
</style>
