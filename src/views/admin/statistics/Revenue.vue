<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Thống kê</h1>

    <!-- Content Row -->
    <div class="row">
      <div class="col-xl-8 col-lg-7">
        <!-- Area Chart -->
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="mb-2 font-weight-bold text-primary">
              Doanh thu theo tháng
            </h6>
            <label>Từ</label>&emsp13;
            <input
              type="date"
              v-model="range.from"
              @change="reloadRevenue"
            />&emsp13; <label>đến</label>&emsp13;
            <input type="date" v-model="range.to" @change="reloadRevenue" />
          </div>
          <div class="card-body">
            <div class="chart-area">
              <canvas id="chartRevenue"></canvas>
            </div>
            <hr />
          </div>
        </div>

        <!-- Bar Chart -->
        <!-- <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Bar Chart</h6>
          </div>
          <div class="card-body">
            <div class="chart-area">
              <canvas id="myBarChart"></canvas>
            </div>
            <hr />
            Styling for the bar chart can be found in the
            <code>/js/demo/chart-bar-demo.js</code> file.
          </div>
        </div> -->
      </div>

      <!-- Donut Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div class="card-header py-3">
            <h6 class="font-weight-bold text-primary">
              Số lượng hàng tồn trong kho
            </h6>
          </div>
          <!-- Card Body -->
          <div class="card-body">
            <div class="chart-pie">
              <canvas id="chartQuantity"></canvas>
            </div>
            <hr />
            <router-link class="collapse-item" :to="{ name: 'import-product' }"
              >Quản lý kho hàng</router-link
            >
          </div>
        </div>
      </div>
      <!-- Donut Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div class="card-header py-3">
            <h6 class="font-weight-bold text-primary">Sản phẩm</h6>
          </div>
          <!-- Card Body -->
          <div class="card-body">
            <div class="" v-if="bestSeller">
              Sản phẩm bán chạy nhất:
              <router-link
                :to="{
                  name: 'product_detail',
                  params: { id: bestSeller.id },
                }"
                >{{ bestSeller.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  onMounted,
  reactive,
  ref,
} from 'vue';

import Chart from 'chart.js/auto';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const productRepository = RepositoryFactory.get("product");
const statisticRepository = RepositoryFactory.get("statistic");

const dataQuantity = ref([]);
const labelsQuantity = ref([]);
const backgroundColorQuantity = ref([]);
const backgroundColorRevenue = ref([]);
const dataRevenue = ref([]);
const labelsRevenue = ref([]);
const bestSeller = ref(null);
const range = reactive({
  from: "",
  to: "",
});

const reload = () => {
  reloadQuantity();
  reloadRevenue();
};

var chartRevenue = null;
var chartQuantity = null;

const reloadQuantity = () => {
  productRepository.getAll().then((response) => {
    if (response.data.status === 0) {
      labelsQuantity.value = [];
      dataQuantity.value = [];
      backgroundColorQuantity.value = [];
      products.value = response.data.products;
      let max = 0;
      products.value.forEach((e) => {
        if (max < e.sold) {
          max = e.sold;
          bestSeller.value = e;
          console.log(bestSeller.value.id);
        }
        labelsQuantity.value.push(e.name);
        dataQuantity.value.push(getQuantity(e.product_details));
        backgroundColorQuantity.value.push(getRandomRGBColor());
      });
      if (chartQuantity) {
        chartQuantity.data.labels = labelsQuantity.value;
        chartQuantity.data.datasets[0].data = dataQuantity.value;
        chartQuantity.data.datasets[0].backgroundColor =
          backgroundColorQuantity.value;
        chartQuantity.update();
      }
    }
    if (response.data.status === 1) {
    }
  });
};

const reloadRevenue = () => {
  statisticRepository.getRevenueByMonth(range).then((response) => {
    if (response.data.status === 0) {
      labelsRevenue.value = [];
      dataRevenue.value = [];
      backgroundColorRevenue.value = [];
      response.data.data.forEach((e) => {
        labelsRevenue.value.push(`${e.month}/${e.year}`);
        backgroundColorRevenue.value.push(getRandomRGBColor());
        dataRevenue.value.push(e.revenue);
      });
      if (chartRevenue) {
        chartRevenue.data.labels = labelsRevenue.value;
        chartRevenue.data.datasets[0].data = dataRevenue.value;
        chartRevenue.data.datasets[0].backgroundColor =
          backgroundColorRevenue.value;
        chartRevenue.update();
      }
    }
  });
};

const getQuantity = (product_details) => {
  let rs = 0;
  product_details.forEach((e) => {
    rs += e.unit_in_stock;
  });

  return rs;
};

const getConfig = (
  labels,
  data,
  label,
  type,
  backgroundColor = [],
  options = { scales: {} }
) => {
  return {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          borderWidth: 1,
          backgroundColor: backgroundColor,
        },
      ],
    },
    options: options,
  };
};

const getRandomRGBColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

onMounted(() => {
  reload();
  chartRevenue = new Chart(
    $("#chartRevenue"),
    getConfig(
      labelsRevenue.value,
      dataRevenue.value,
      "Doanh thu",
      "bar",
      backgroundColorRevenue.value
    )
  );

  chartQuantity = new Chart(
    $("#chartQuantity"),
    getConfig(
      labelsQuantity.value,
      dataQuantity.value,
      "Số lượng hàng trong kho",
      "doughnut",
      backgroundColorQuantity.value
    )
  );
});
</script>
<style scoped></style>
