<template>
  <div class="container">
    <div class="d-flex justify-content-center row">
      <div class="d-flex flex-column col-md-8">
        <div class="coment-bottom bg-white p-2 px-4">
          <div class="d-flex flex-row add-comment-section mt-4 mb-4">
            <img
              class="img-fluid img-responsive rounded-circle mr-2"
              src="https://i.imgur.com/KLeobJk.jpg"
              width="38"
            /><input
              type="text"
              class="form-control mr-3"
              placeholder="Add comment"
            /><button class="btn btn-primary" type="button">Comment</button>
          </div>
          <div class="collapsable-comment">
            <div
              class="d-flex flex-row justify-content-between align-items-center action-collapse p-2"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapse-1"
              href="#collapse-1"
            >
              <span>Comments</span
              ><i class="fa fa-chevron-down servicedrop"></i>
            </div>
            <div id="collapse-1" class="collapse">
              <div class="commented-section mt-2">
                <div class="d-flex flex-row align-items-center commented-user">
                  <h5 class="mr-2">Corey oates</h5>
                  <span class="dot mb-1"></span
                  ><span class="mb-1 ml-2">4 hours ago</span>
                </div>
                <div class="comment-text-sm">
                  <span
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</span
                  >
                </div>
                <div class="reply-section">
                  <div class="d-flex flex-row align-items-center voting-icons">
                    <i class="fa fa-sort-up fa-2x mt-3 hit-voting"></i
                    ><i class="fa fa-sort-down fa-2x mb-3 hit-voting"></i
                    ><span class="ml-2">10</span><span class="dot ml-2"></span>
                    <h6 class="ml-2 mt-1">Reply</h6>
                  </div>
                </div>
              </div>
              <div class="commented-section mt-2">
                <div class="d-flex flex-row align-items-center commented-user">
                  <h5 class="mr-2">Samoya Johns</h5>
                  <span class="dot mb-1"></span
                  ><span class="mb-1 ml-2">5 hours ago</span>
                </div>
                <div class="comment-text-sm">
                  <span
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua..</span
                  >
                </div>
                <div class="reply-section">
                  <div class="d-flex flex-row align-items-center voting-icons">
                    <i class="fa fa-sort-up fa-2x mt-3 hit-voting"></i
                    ><i class="fa fa-sort-down fa-2x mb-3 hit-voting"></i
                    ><span class="ml-2">15</span><span class="dot ml-2"></span>
                    <h6 class="ml-2 mt-1">Reply</h6>
                  </div>
                </div>
              </div>
              <div class="commented-section mt-2">
                <div class="d-flex flex-row align-items-center commented-user">
                  <h5 class="mr-2">Makhaya andrew</h5>
                  <span class="dot mb-1"></span
                  ><span class="mb-1 ml-2">10 hours ago</span>
                </div>
                <div class="comment-text-sm">
                  <span
                    >Nunc sed id semper risus in hendrerit gravida rutrum. Non
                    odio euismod lacinia at quis risus sed. Commodo ullamcorper
                    a lacus vestibulum sed arcu non odio euismod. Enim facilisis
                    gravida neque convallis a. In mollis nunc sed id. Adipiscing
                    elit pellentesque habitant morbi tristique senectus et
                    netus. Ultrices mi tempus imperdiet nulla malesuada
                    pellentesque.</span
                  >
                </div>
                <div class="reply-section">
                  <div class="d-flex flex-row align-items-center voting-icons">
                    <i class="fa fa-sort-up fa-2x mt-3 hit-voting"></i
                    ><i class="fa fa-sort-down fa-2x mb-3 hit-voting"></i
                    ><span class="ml-2">25</span><span class="dot ml-2"></span>
                    <h6 class="ml-2 mt-1">Reply</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
body {
  background: #eee;
}
.bdge {
  height: 21px;
  background-color: orange;
  color: #fff;
  font-size: 11px;
  padding: 8px;
  border-radius: 4px;
  line-height: 3px;
}
.comments {
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
}
.dot {
  height: 7px;
  width: 7px;
  margin-top: 3px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
.hit-voting:hover {
  color: blue;
}
.hit-voting {
  cursor: pointer;
}
.servicedrop {
  transition-delay: 1s;
}
.action-collapse {
  cursor: pointer;
}
</style>
