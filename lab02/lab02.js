/* Daniel Garcia
 * 9/12/2018
 * Lab 2: Encapsulation, Inheritance, and Polymorphism
 * 
 */

function Person(name, birthDate, friends) {
    this.myName = name;
    this.myBirthDate = birthDate;
    this.myFriends = friends;
}

Person.prototype.nameChange = function(newName) {
    this.myName = newName;
};

Person.prototype.addFriend = function(newFriend) {
    this.myFriends.push(newFriend);
};

Person.prototype.greet = function() {
    console.log("Hello, I am a Person object named " + this.myName + ". What kind of object are you?");
};

Person.prototype.getFriends = function() {
    var friendString = "\n";
    this.myFriends.forEach(function(element) {
        friendString += element.myName + "\n";
    });
    return friendString;
};

Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.myBirthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var P1 = new Person("Sally Brown", "1995/9/12", []);
var P2 = new Person("Linus van Pelt", "1990/9/12", []);
var P3 = new Person("Charle Brown", "1985/9/12", [P1, P2]);

P3.greet();
P3.nameChange("Charlie Brown");

var P4 = new Person("Lucy van Pelt", "1985/9/20", []);

P3.addFriend(P4);
P3.greet();

console.log("My friends include: \n" + P3.getFriends());
console.log("I am " + P3.getAge() + " years old.");
console.log("Is Sally younger than me?");
console.log("That would be " + (P3.getAge > P1.getAge) + ".");

function Student(name, birthDate, friends, major) {
    Person.call(this, name, birthDate);
    this.myMajor = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.greet = function() {
    console.log("Hello, I am a Student object named " + this.myName + ", and my major is " + this.myMajor + ". What are you studying?");
};

var S1 = new Student("Peppermint Patty", "1986/9/20", [P1, P2, P3, P4], "Sociology");
var S2 = new Student("Pig Pen", "1989/9/24", [P1, P2, P3, P4, S1], "Geology");

S1.greet();

console.log("Is Peppermint Patty also a Person?");
console.log("It's " + (S1 instanceof Person) + ".");

console.log("Peppermint Patty is " + S1.getAge() + " years old.");
