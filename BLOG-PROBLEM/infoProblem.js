function GetFullName(fn, ln) {
    setTimeout(function () {
        return fn + " " + ln;
    }, 2000)
}
function GetHobbies(name) {
    let hobbies = ['Cricket', 'Vollyball', 'Badminton', 'coding'];
    setTimeout(function () {
        myHobby = []
        if (name !== '') {
            if (name == 'deb') {
                myHobby = hobbies[3]
            }
            else if (name == 'mir') {
                myHobby = hobbies[2]
            }
            else if (name == 'abir') {
                myHobby = hobbies[0]
            }
            else if (name == 'poly') {
                myHobby = hobbies[1]
            }
            else {
                myHobby = hobbies[0]
            }
        } else {
            console.log('Please Provide Name');
        }

    }, 4000)
}
function GetHobbyDetails(hobby) {
    setTimeout(function () {
        if (hobby !== '') {
            let details = {
                'Cricket': 'i love Cricket',
                'Vollyball': 'i love Vollyball',
                'Badminton': 'i love Badminton',
                'coding': 'i love coding'
            }
            return details[hobby]
        } else {
            console.log('Please Provide Hoobby');
        }
    }, 6000);
}