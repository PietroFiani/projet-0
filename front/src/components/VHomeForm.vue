<template>
<body translate="no">
  <div class="container">
  <div class="box"></div>
  <div class="container-forms">
    <div class="container-info">
      <div class="info-item">
        <div class="table">
          <div class="table-cell">
            <p>
              Have an account?
            </p>
            <div class="btn">
              Log in
            </div>
          </div>
        </div>
      </div>
      <div class="info-item">
        <div class="table">
          <div class="table-cell">
            <p>
              Don't have an account? 
            </p>
            <div class="btn">
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-form">
      <div class="form-item log-in">
        <div class="table">
          <div class="table-cell">
            <input name="Username" placeholder="Username" type="text"><input name="Password" placeholder="Password" type="Password">
            <div class="btn">
              Log in
            </div>
          </div>
        </div>
      </div>
      <div class="form-item sign-up">
        <div class="table">
          <div class="table-cell">
            <input name="email" placeholder="Email" type="text"><input name="fullName" placeholder="Full Name" type="text"><input name="Username" placeholder="Username" type="text"><input name="Password" placeholder="Password" type="Password">
            <div class="btn">
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</template>

<script>
import axios from "axios";
import JQuery from 'src/plugins'
import $ from 'jquery'
<source src="https://code.jquery.com/jquery-2.2.4.min.js"></source>
<source src="https://static.codepen.io/assets/common/stopExecutionOnTimeout-157cd5b220a5c80d4ff8e0e70ac069bffd87a61252088146915e8726e5d9f147.js"></source>
<source id="rendered-js"></source>

$(".info-item .btn").click(function(){
  $(".container").toggleClass("log-in");
});
$(".container-form .btn").click(function(){
  $(".container").addClass("active");
});
//# sourceURL=pen.js
  
export default {
  data: () => ({
    valid: false,
    object: {
      mail: "",
      password: "",
    },
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valid",
    ],
    required: [(v) => !!v || "Mot de passe requis"],
  }),

  methods: {
    log() {
      let url = "http://localhost:5000/customers/login";
      this.$refs.form.validate();
      axios
        .get(url, {
          params: { mail: this.object.mail, password: this.object.password },
        })
        .then((response) => {
          if (response.data) console.log("CONNECTE", response.data);
          else console.log("PAS CONNECTE");
        })
        .catch((error) => console.log("PAS CONNECTE", error));
    },
  },
};
</script>


<style lang="scss">
//Variables
$green: #1ead0b;
$purple: #470063;

.container {
$width: 600px;
$height: 320px;
$padding: 10px 15px

body
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  font-family: 'Roboto', sans-serif
  background-color: #5356ad
  overflow: hidden
.table
  display: table
  width: 100%
  height: 100%
.table-cell
  display: table-cell
  vertical-align: middle
  @include transition(all 0.5s)
.container
  position: relative
  width: $width
  margin: 30px auto 0
  height: $height
  background-color: #999ede
  top: 50%
  margin-top: -160px
  @include transition(all 0.5s)
  .box
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: hidden
    &:before, &:after
      content: " "
      position: absolute
      left: 152px
      top: 50px
      background-color: #9297e0
      transform: rotateX(52deg) rotateY(15deg) rotateZ(-38deg)
      width: 300px
      height: 285px
      @include transition(all 0.5s)
    &:after
      background-color: #a5aae4
      top: -10px
      left: 80px
      width: 320px
      height: 180px
  .container-forms
    position: relative
  .btn
    cursor: pointer
    text-align: center
    margin: 0 auto
    width: 60px
    color: #fff
    background-color: #ff73b3
    opacity: 1
    @include transition(all 0.5s)
    &:hover
      opacity: 0.7
      
  .btn, input
    padding: $padding
  input
    margin: 0 auto 15px
    display: block
    width: $width/2-80px
    @include transition(all 0.3s)
  .container-forms
    .container-info
      text-align: left
      font-size: 0
      .info-item
        text-align: center
        font-size: 16px
        width: $width/2
        height: $height
        display: inline-block
        vertical-align: top
        color: #fff
        opacity: 1
        @include transition(all 0.3s)
        p
          font-size: 20px
          margin: 20px
        .btn
          background-color: transparent
          border: 1px solid #fff
        .table-cell
          padding-right: 35px
        &:nth-child(2)
          .table-cell
            padding-left: 35px
            padding-right: 0
            
  .container-form
    overflow: hidden
    position: absolute
    left: 30px
    top: -30px
    width: 305px
    height: $height + 60px
    background-color: #fff
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2)
    @include transition(all 0.5s)
    &:before
      content: "?"
      position: absolute
      left: 160px
      top: -50px
      color: #5356ad
      font-size: 130px
      opacity: 0
      @include transition(all 0.5s)
    .btn
      position: relative
      box-shadow: 0 0 10px 1px #ff73b3
      margin-top: 30px
  .form-item
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    opacity: 1
    @include transition(all 0.5s)
    &.sign-up
      position: absolute
      left: -100%
      opacity: 0
  &.log-in
    .box
      &:before
        position: absolute
        left: 180px
        top: 62px
        height: 265px
      &:after
        top: 22px
        left: 192px
        width: 324px
        height: 220px
    .container-form
      left: 265px
      .form-item
        &.sign-up
          left: 0
          opacity: 1
        &.log-in
          left: -100%
          opacity: 0
  &.active
    width: 260px
    height: 140px
    margin-top: -70px
    .container-form
      left: 30px
      width: 200px
      height: 200px
      &:before
        content: "?"
        position: absolute
        left: 51px
        top: 5px
        color: #5356ad
        font-size: 130px
        opacity: 1
    input, .btn, .info-item
      display: none
      opacity: 0
      padding: 0px
      margin: 0 auto
      height: 0
    .form-item
      height: 100%
    .container-forms
      .container-info
        .info-item
          height: 0%
          opacity: 0
.rabbit
  width: 50px
  height: 50px
  position: absolute
  bottom: 20px
  right: 20px
  z-index: 3
  fill: #fff
//buttons
.round {
  height: 2.2em;
  border-radius: 50px;
  font-family: Rubik, sans-serif;
  margin: 0.2em;
  transition: 300ms;
  outline: none;
}
.sign-up {
  background-color: $green;
  border: 2px solid $green;
  color: white;
  width: 200px;
  transition: 200ms;
  &:hover {
    color: $green;
    background-color: white;
  }
}
.sign-in {
  border: solid 2px $green;
  color: $green;
  width: 200px;
  &:hover {
    color: white;
    background-color: $green;
  }
}
.runner-sign-in {
  border: solid 2px $purple;
  color: $purple;
  width: 200px;
  justify-self: center;
  margin-top: -1em;
  &:hover {
    color: white;
    background-color: $purple;
  }
}
//textarea
.textarea {
  width: 34em;
}
.forgot-psw {
  color: $purple;
  &:hover {
    color: rgb(70, 70, 236);
  }
}
</style>