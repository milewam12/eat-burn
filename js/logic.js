 $(document).ready(function(){
      $('.parallax').parallax();
      // var user = "";
  var firebaseUser = firebase.auth().onAuthStateChanged;


  $("#welcome").html("<h3> Welcome " + localStorage.getItem("email") + "</h3>")

  // Function to display app once the user has logged in of signed up
  function displayApp() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user = firebaseUser) {
        $("app").show();
      } else {
        $("#app").hide();
      }
    })
  }

  displayApp();

  });

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD_dppV69T8GUcG9kD-n4tW4rIsr8wdtoY",
  authDomain: "eat-and-burn-fe13e.firebaseapp.com",
  databaseURL: "https://eat-and-burn-fe13e.firebaseio.com",
  projectId: "eat-and-burn-fe13e",
  storageBucket: "eat-and-burn-fe13e.appspot.com",
  messagingSenderId: "161262025291"
};
firebase.initializeApp(config);

// var database = firebase.database();


const txtPassword = document.getElementById("txtPassword");
const txtEmail = document.getElementById("txtEmail");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

// Login Event
$("#btnLogin").on("click", function logIn(event) {
  event.preventDefault();

  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise
    .then(function (e, anither, ff) {
      console.log('login successful')
   // local storage//
      localStorage.setItem("email", txtEmail.value)
      
      window.location.href = './eatBurn.html';

    })
    .catch(e => console.log('login error ', e.message));
  $("#error").html(e.message);
});

// signup event

$("#btnSignup").on("click", function (event) {
  event.preventDefault();
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.createUserWithEmailAndPassword(email, password);

  console.log(Object.keys(firebase.auth))
  promise
    .then(function (response) {

      // local storage//
      localStorage.setItem("email", txtEmail.value)
      

      window.location.href = './eatBurn.html';
    })
    .catch(e => console.log(e.message));


});

//log Out
$("#btnLogout").on("click", function (event) {
  event.preventDefault();
  var prom = firebase.auth().signOut()
    .then(function (e, anither, ff) {
      console.log('logout successful')

      window.location.href = './thanks.html';

    })
    .catch(e => console.log('login error ', e.message));


});


// realtime listener

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser)
    btnLogout.classList.remove("hide");
    //  $("app").show();

  } else {
    console.log(" Not logged in.")
    btnLogout.classList.add("hide");
    //  $("#app").hide();
  }


})

$("#download-button").on("click", function (event) {
       event.preventDefault();
     var input = $("#user-input").val().trim();
      var urlQuery = "http://api.nutritionix.com/v1_1/search/" + input + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=bb482bd0&appKey=c8db65a3dc0de939c5e49ed465a37e6b"

    
    // FIRST URL//   "http://api.nutritionix.com/v1_1/search/" + input + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=bb482bd0&appKey=c8db65a3dc0de939c5e49ed465a37e6b"

       $.ajax({
        url: urlQuery,
        method: "GET"
    })
    .done(function (response) {
      console.log(response)
        // $("#display").empty();
      
       var results = response.hits[0];
       var calories = results.fields.nf_calories;
       var servings = results.fields.nf_serving_size_qty;
       var totalFat = results.fields.nf_total_fat;
       var itemName = results.fields.item_name;
       itemCalories=calories;
       itemToAdd=itemName;


       console.log(results)

        console.log(calories,"we made it!")
        console.log(servings,"serve!")
        console.log(totalFat,"fat!")
        console.log(itemName,"name!")

        // $("#display").append("<h2>calories: ", calories + "</h2>");

          $("#display-calories").html(calories );
          $("#user-input-display").html(input);
          $("#user-input-display-two").html(input);

          // Displaying more data

          $("#itemName").html(itemName);
          $("#serv").html(servings);
          $("#fat").html(totalFat);
          addItemToMeal();
          $("#user-input").val("");
          window.scrollTo(2000,10);
    })
   })

   //global variables for calories and itemname added to integrate 'meal' portion
       var itemCalories=0;
       var itemToAdd = "";
       var totalCalories=0

//------Add item to meal functionality---------------
   //$("#addToMeal").on("click", addItemToMeal);
   function addItemToMeal()
   {
      console.log("calories= "+itemCalories);
      console.log("itemName= "+itemToAdd);
      var table = document.getElementById("mealTable");
      var row = table.insertRow(table.rows.length -1);
      row.style.color="white";
      row.className="totalRow";
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = itemToAdd;
      cell2.innerHTML = itemCalories;
      totalCalories=totalCalories+itemCalories;
      document.getElementById("totalCalories").innerHTML=totalCalories;
      displayVideos(totalCalories);
   }


$("#resetBTN").on( "click", function() {
   $(".totalRow").empty();
   $(".resetOne").empty();
   $("#user-input").val("");
   (window).scrollTo(0,0);
});