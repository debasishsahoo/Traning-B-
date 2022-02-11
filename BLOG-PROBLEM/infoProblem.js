function GetFullName(fn) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (fn !== '') {
                resolve(fn);
            } else {
                reject('Please Provide a Full Name');
            }
        }, 2000)
    });


}
function GetHobbies(name) {
    return new Promise((resolve, reject) => {
        let hobbies = ['Cricket', 'Vollyball', 'Badminton', 'coding'];
        setTimeout(function () {
            let myHobby = '';
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
                resolve(myHobby)
            } else {
                reject('Please Provide Name');
            }

        }, 4000)
    });

}
function GetHobbyDetails(hobby) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (hobby !== '') {
                let details = {
                    'Cricket': 'i love Cricket',
                    'Vollyball': 'i love Vollyball',
                    'Badminton': 'i love Badminton',
                    'coding': 'i love coding'
                }
                resolve(details[hobby])
            } else {
                reject('Please Provide Hoobby');
            }
        }, 6000);
    })

}



