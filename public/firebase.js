
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
  var email = getElementVal("email");
  var school = getElementVal("school");
  var province = getElementVal("province");

  saveMessages(name, phone, email, school, province);



  //   reset the form
  document.getElementById("contactForm").reset();
  document.getElementById("info").style.display= "none"
  return false;
}

const saveMessages = (name, phone, email, school, province) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    phone: phone,
    email: email,
    school: school,
    province: province,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

