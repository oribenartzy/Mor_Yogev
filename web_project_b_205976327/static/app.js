$(function () {
  $("header").html(
    `
      <nav class="navbar">
        <!-- <img src="./static/imeags/logo.png" class="bgu-logo" /> לסדר שיהיה בצד!!-->
        <div class="navbar_container">
          <a href="./index" id="navbar__logo">BG-Usafe</a>
          <div class="navbar_toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <ul class="navbar_menu">
            <li class="navbar_item">
              <a href="./index" class="navbar_links" id="home-page">Home</a>
            </li>
            <li class="navbar_item">
              <a href="./about" class="navbar_links" id="about-page"
                >About</a
              >
            </li>
            <li class="navbar_item">
              <a href="./services" class="navbar_links" id="services-page"
                >Services</a
              >
            </li>
            <!--  *יורד? -->
            <!-- <li class="navbar_btn">
          <a href="#sign-up" class="button" id="signup" target="_parent">sign up</a>
        </li> -->
            <!--  *יורד? -->
          </ul>
        </div>
      </nav>
    `
  );
  $("footer").html(
    `
    <div class="footer">if you dont fell safe call 100</div>
    `
  );
});
$(document).ready(function () {
  //on click element toggle class
  $("#mobile-menu").click(function () {
    $(this).toggleClass("is-active");
    $(".navbar_menu").toggleClass("active");
  });
});
