
const firebaseConfig = {
  apiKey: "AIzaSyAAjIXXOEavNCxCFlGMOw1qwLZnwpWaPjY",
  authDomain: "game-mario-badcf.firebaseapp.com",
  databaseURL: "https://game-mario-badcf-default-rtdb.firebaseio.com",
  projectId: "game-mario-badcf",
  storageBucket: "game-mario-badcf.appspot.com",
  messagingSenderId: "561301570020",
  appId: "1:561301570020:web:e96c601d66a0598d7007f1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("game-mario");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var phone = getElementVal("phone");

  saveMessages(name, phone);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, phone) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    phone: phone,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
