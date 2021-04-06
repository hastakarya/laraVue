<style>
.widget-user-header {
  background-position: center center;
  background-size: cover;
  height: 250px !important;
}
</style>
<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-12">
          <!-- Content -->
          <div class="card card-widget widget-user">
            <!-- Add the bg color to the header using any of the bg-* classes -->
            <div
              class="widget-user-header text-white"
              style="background: url('./img/background.jpg') center center;"
            >
              <h3 class="widget-user-username text-right">{{ this.form.name }}</h3>
              <h5 class="widget-user-desc text-right">Web Designer</h5>
            </div>
            <div class="widget-user-image">
              <img class="img-circle" :src="updatePhoto()" alt="User Avatar" />
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-sm-4 border-right">
                  <div class="description-block">
                    <h5 class="description-header">3,200</h5>
                    <span class="description-text">SALES</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-4 border-right">
                  <div class="description-block">
                    <h5 class="description-header">13,000</h5>
                    <span class="description-text">FOLLOWERS</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
                <div class="col-sm-4">
                  <div class="description-block">
                    <h5 class="description-header">35</h5>
                    <span class="description-text">PRODUCTS</span>
                  </div>
                  <!-- /.description-block -->
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div>
          </div>

          <!-- User Profile -->
          <div class="card">
            <div class="card-header p-2">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" href="#activity" data-toggle="tab">Activity</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#settings" data-toggle="tab">Settings</a>
                </li>
              </ul>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane active" id="activity"></div>

                <div class="tab-pane" id="settings">
                  <form class="form-horizontal">
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Name</label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          v-model="form.name"
                          name="name"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('name') }"
                        />
                        <has-error :form="form" field="name"></has-error>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Email</label>
                      <div class="col-sm-10">
                        <input
                          type="email"
                          v-model="form.email"
                          name="email"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('email') }"
                        />
                        <has-error :form="form" field="email"></has-error>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Bio</label>
                      <div class="col-sm-10">
                        <textarea
                          v-model="form.bio"
                          class="form-control"
                          name="bio"
                          :class="{ 'is-invalid': form.errors.has('bio') }"
                        ></textarea>
                        <has-error :form="form" field="bio"></has-error>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-2 col-form-label">Profile photo</label>
                      <div class="col-sm-10">
                        <div class="custom-file">
                          <input
                            type="file"
                            name="photo"
                            id="validatedCustomFile"
                            @change="uploadFile"
                            class="custom-file-input"
                            required
                          />
                          <label class="custom-file-label" for="validatedCustomFile">Choose file</label>
                          <div class="invalid-feedback">Example invalid custom file feedback</div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="inputSkills"
                        class="col-sm-2 col-form-label"
                      >Password (Leave empty if not changing)</label>
                      <div class="col-sm-10">
                        <input
                          type="password"
                          v-model="form.password"
                          autocomplete="new-password"
                          name="password"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('password') }"
                        />
                        <has-error :form="form" field="password"></has-error>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="offset-sm-2 col-sm-10">
                        <button
                          type="submit"
                          @click.prevent="updateUser()"
                          class="btn btn-danger"
                        >Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
                <!-- /.tab-pane -->
              </div>
              <!-- /.tab-content -->
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /Content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  mounted() {
    console.log("Component mounted.");
  },
  methods: {
    updatePhoto() {
      let prefix = this.form.photo.match(/\//) ? "" : "/img/profile/";
      return prefix + this.form.photo;
    },

    uploadFile(e) {
      let file = e.target.files[0];
      console.log(file);
      let reader = new FileReader();

      if (file["size"] < 2111775) {
        reader.onloadend = file => {
          // console.log("RESULT", reader.result);
          this.form.photo = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire({
          title: "Oops..",
          text: "You cannot upload file more than 2 MB!",
          icon: "error",
          confirmButtonColor: "#3085d6"
        });
      }
    },
    updateUser() {
      this.$Progress.start();
      if (this.form.password == "") {
        this.form.password = undefined;
      }
      this.form
        .put("api/profile/")
        .then(() => {
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    }
  },
  created() {
    axios.get("api/profile").then(({ data }) => this.form.fill(data));
  }
};
</script>
