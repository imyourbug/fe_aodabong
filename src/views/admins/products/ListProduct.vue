<script setup>
import Header from "@/views/admins/Header.vue";
import Sidebar from "@/views/admins/Sidebar.vue";
import Footer from "@/views/admins/Footer.vue";
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <Header />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2">
        <Sidebar />
      </div>
      <div class="col-lg-10">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div class="active-member">
                  <div class="table-responsive">
                    <table class="table table-xs mb-0">
                      <thead>
                        <tr>
                          <th>Customers</th>
                          <th>Product</th>
                          <th>Zip</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th>Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img class="rounded-circle mr-3" alt="" />Samanth
                            Disousa
                          </td>
                          <td>Dell Aspiron 4</td>
                          <td>
                            <span>23432</span>
                          </td>
                          <td>
                            <div>
                              <div class="progress" style="height: 6px">
                                <div
                                  class="progress-bar bg-primary"
                                  style="width: 70%"
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <i class="fa fa-circle-o text-primary mr-2"></i> Yes
                          </td>
                          <td>
                            <span>Ordered</span>
                            <span class="m-0 pl-3">10 sec ago</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img class="rounded-circle mr-3" alt="" />Johnson
                            Smith
                          </td>
                          <td>Nokia Pixels 5</td>
                          <td><span>33243</span></td>
                          <td>
                            <div>
                              <div class="progress" style="height: 6px">
                                <div
                                  class="progress-bar bg-primary"
                                  style="width: 50%"
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <i class="fa fa-circle-o text-primary mr-2"></i> No
                          </td>
                          <td>
                            <span>Ordered</span>
                            <span class="m-0 pl-3">50 sec ago</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img class="rounded-circle mr-3" alt="" />Nathon
                            Lyon
                          </td>
                          <td>Apple iphone 10</td>
                          <td><span>34434</span></td>
                          <td>
                            <div>
                              <div class="progress" style="height: 6px">
                                <div
                                  class="progress-bar bg-warning"
                                  style="width: 100%"
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <i class="fa fa-circle-o text-warning mr-2"></i> Yes
                          </td>
                          <td>
                            <span>Ordered</span>
                            <span class="m-0 pl-3">10 sec ago</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img class="rounded-circle mr-3" alt="" />
                            Simply Clever
                          </td>
                          <td>Apple Macbook Air</td>
                          <td><span>32443</span></td>
                          <td>
                            <div>
                              <div class="progress" style="height: 6px">
                                <div
                                  class="progress-bar bg-primary"
                                  style="width: 20%"
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <i class="fa fa-circle-o text-primary mr-2"></i> No
                          </td>
                          <td>
                            <span>Ordered</span>
                            <span class="m-0 pl-3">2 days ago</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <img class="rounded-circle mr-3" alt="" />
                            Dorn Sumaiya
                          </td>
                          <td>Apple Macbook pro</td>
                          <td><span>23323</span></td>
                          <td>
                            <div>
                              <div class="progress" style="height: 6px">
                                <div
                                  class="progress-bar bg-primary"
                                  style="width: 90%"
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <i class="fa fa-circle-o text-primary mr-2"></i> Yes
                          </td>
                          <td>
                            <span>Ordered</span>
                            <span class="m-0 pl-3">12 days ago</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Footer />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Calibri:400,300,700);

body {
  background-color: #eee;
  font-family: "Calibri", sans-serif !important;
}

.mt-100 {
  margin-top: 70px;
}

.card {
  margin-bottom: 30px;
  border: 0px;
  border-radius: 0.25rem;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
}

.card .card-body {
  padding: 1.88rem 1.81rem;
}

.table thead th {
  border-bottom: none;
  border-top: none;
  vertical-align: middle;
}

.table th,
.table td {
  padding: 1rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.progress {
  margin-top: 6px;
}
</style>
