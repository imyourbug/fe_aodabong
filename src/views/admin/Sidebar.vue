<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <router-link
      class="sidebar-brand d-flex align-items-center justify-content-center"
      :to="{ name: 'home' }"
    >
      <img class="logo" src="@/assets/logo.png" />
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'admin-home' }">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Trang chủ</span></router-link
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Quản lý</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-toggle="collapse"
        data-target="#categories"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Danh mục sản phẩm</span>
      </a>
      <div
        id="categories"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-category' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-toggle="collapse"
        data-target="#products"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Sản phẩm</span>
      </a>
      <div
        id="products"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-product' }"
            >Danh sách</router-link
          >
        </div>
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'import-product' }"
            >Nhập hàng</router-link
          >
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Thống kê</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapsePages"
        aria-expanded="true"
        aria-controls="collapsePages"
      >
        <i class="fas fa-fw fa-folder"></i>
        <span>Hóa đơn</span>
      </a>
      <div
        id="collapsePages"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Hóa đơn nhập</h6>
        </div>
      </div>
    </li>

    <!-- Nav Item - Charts -->
    <li class="nav-item">
      <a class="nav-link" href="charts.html">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Doanh thu</span></a
      >
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />
  </ul>
</template>

<script setup></script>

<style scoped>
.logo {
  width: 200px;
  height: 60px;
}
.collapsed {
  cursor: pointer;
}
</style>
