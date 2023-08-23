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
              @change="changeRange"
            />&emsp13; <label>đến</label>&emsp13;
            <input type="date" v-model="range.to" @change="changeRange" />
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
    </div>
  </div>
</template>
<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';

import Chart from 'chart.js/auto';
import { useStore } from 'vuex';

import { formatCash } from '@/helpers/helper';

const store = useStore();

const dataQuantity = ref([]);
const labelsQuantity = ref([]);
const dataRevenue = ref([]);
const labelsRevenue = ref([]);
const range = reactive({
  from: "",
  to: "",
});

const products = computed(() => {
  return store.state.products.all;
});

const revenue = computed(() => {
  return store.state.statistics.revenue;
});

const reload = () => {
  store.dispatch("products/getAll");
  products.value.forEach((e) => {
    labelsQuantity.value.push(e.name);
    dataQuantity.value.push(getQuantity(e.product_details));
  });
  store.dispatch("statistics/getRevenue", range);
  revenue.value.forEach((e) => {
    labelsRevenue.value.push(`${e.month}/${e.year}`);
    dataRevenue.value.push(e.revenue);
  });
};

const getQuantity = (product_details) => {
  let rs = 0;
  product_details.forEach((e) => {
    rs += e.unit_in_stock;
  });

  return rs;
};

const changeRange = () => {
  store.dispatch("statistics/getRevenue", range);
};

const getConfig = (labels, data, label, type, options = { scales: {} }) => {
  return {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          borderWidth: 1,
        },
      ],
    },
    options: options,
  };
};

watch(
  () => revenue.value,
  (newValue, oldValue) => {
    if (JSON.stringify(newValue) != JSON.stringify(oldValue)) {
      labelsRevenue.value = [];
      dataRevenue.value = [];
      newValue.forEach((e) => {
        labelsRevenue.value.push(`${e.month}/${e.year}`);
        dataRevenue.value.push(e.revenue);
      });
      chartRevenue.data.labels = labelsRevenue.value;
      chartRevenue.data.datasets[0].data = dataRevenue.value;
      chartRevenue.update();
    }
  }
);

var chartRevenue = null;
var chartQuantity = null;

onMounted(() => {
  reload();
  chartRevenue = new Chart(
    $("#chartRevenue"),
    getConfig(labelsRevenue.value, dataRevenue.value, "Doanh thu", "bar")
  );

  chartQuantity = new Chart(
    $("#chartQuantity"),
    getConfig(
      labelsQuantity.value,
      dataQuantity.value,
      "Số lượng hàng trong kho",
      "doughnut"
    )
  );
});
</script>
<style scoped></style>
