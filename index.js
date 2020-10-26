function myFunction() {
    var person = prompt("Please enter your name", "");
    if (person != null) {
        document.getElementById("menu").style.display="block";
        document.getElementById("demo").innerHTML =
        "Hello " + person.toLocaleUpperCase() + " ! <br>So nice to see you here.** Hope u enjoy the service ****<br>Please click the below <strong>MENU Button</strong> to get the menu... <br>";
    }    
}