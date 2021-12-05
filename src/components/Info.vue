<template>
  <div v-if="hasCurrentRegion" class="info" :class="setBackground">
    <div class="info-header">the.weather</div>
    <div class="info-image">
      <img src="../assets/air-ballon.png" alt="air-ballon" />
    </div>

    <div class="info-text" v-if="hasCurrentRegion">
      <span class="temprature">{{ temprature }}<span>&deg;</span></span>
      <div class="location">
        <h1>{{ currentRegion.name }}</h1>
        <span>{{ dateBuilder }}</span>
      </div>
      <div class="air">
        <h1>
          <img :src="icon.url" alt="" />
        </h1>
        <span>{{ weatherName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentRegion() {
      return this.$store.getters["currentRegion"];
    },
    temprature() {
      return Math.ceil(this.currentRegion.main.temp);
    },
    weatherName() {
      return this.currentRegion.weather[0].main;
    },
    hasCurrentRegion() {
      return this.$store.getters["hasCurrentRegion"];
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();

      let hour = d.getHours();
      if (hour < 9) {
        hour = `0${d.getHours()}`;
      }
      let minute = d.getMinutes();
      if (minute < 9) {
        minute = `0${d.getMinutes()}`;
      }
      let month = months[d.getMonth()].slice(0, 3);
      let year = d.getFullYear() % 100;
      console.log(typeof year);

      return `${hour}:${minute} - ${day}, ${date} ${month} '${year}`;
    },
    icon() {
      return this.$store.getters["icon"];
    },

    setBackground() {
      let air;
      const id = this.currentRegion.weather[0].id;

      if (200 <= id && id < 300) {
        air = "thunderStorm";
      }

      if (300 <= id && id < 400) {
        air = "drizzle";
      }

      if (500 <= id && id < 600) {
        air = "rain";
      }

      if (600 <= id && id < 700) {
        air = "snow";
      }

      if (701 <= id && id < 801) {
        air = "atmosphere";
      }

      if (801 <= id && id < 900) {
        air = "cloudly";
      }

      return air;
    },
  },
};
</script>

<style scoped>
.thunderStorm {
  background-image: linear-gradient(#35383a, #5b707e);
  color: white;
}

.drizzle {
  background-image: linear-gradient(#87a9a5, #c2ccd0);
  color: white;
}

.rain {
  background-image: url("../assets/rain.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.snow {
  background-image: url("../assets/snow.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: black;
}

.atmosphere {
  background-image: linear-gradient(#258cc8, #9cc9e3);
}

.cloudly {
  background-image: url("../assets/cloudly.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}

.info {
  padding: 3rem 7rem 4rem 5rem;
}

.info-header {
  font-size: 0.7rem;
}
d .info-image {
  display: flex;
  justify-content: flex-end;
}

.info-image img {
  width: 15rem;
}

.info-text {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.temprature {
  margin: 0;
  font-size: 5rem;
}

.location {
  margin-bottom: 1rem;
  margin-left: 2rem;
}

.air {
  margin-bottom: 1rem;
  margin-left: 2rem;
  text-align: center;
}

.location h1 {
  letter-spacing: 3px;
}

.location span {
  font-size: 0.7rem;
  letter-spacing: 0.1px;
}

.air span {
  font-size: 0.7rem;
}

@media (max-width: 992px) {
  .info {
    padding: 3rem 4rem 4rem 3rem;
  }
}
@media (max-width: 768px) {
  .info {
    padding: 3rem 1rem 4rem 2rem;
  }
  .temprature {
    font-size: 3rem;
  }
  .location {
    margin-bottom: 0;
  }

  .air {
    margin-bottom: 0;
  }
  .location h1 {
    font-size: 2rem;
  }
  .info-image img {
    width: 10rem;
  }
}

@media (max-width: 576px) {
  .info {
    padding: 2rem 1rem 2rem 1rem;
  }
  .temprature {
    font-size: 2rem;
  }

  .temprature span {
    font-size: 1.5rem;
  }
  .location h1 {
    font-size: 1rem;
  }

  .air h1 {
    font-size: 1rem;
  }
  .info-image img {
    width: 10rem;
  }
}
</style>
