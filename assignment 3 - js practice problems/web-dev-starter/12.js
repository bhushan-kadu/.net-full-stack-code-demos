//Write a JavaScript program to count the number of vowels in a given stringInputing.
function countVowelsInStringDriverFunction() {
    let stringInput = prompt("Enter a string");

    if (stringInput != null) {
        stringInput = stringInput.split("");

        let resultCount = 0;

        stringInput.forEach(element => {
            switch (element) {
                case 'a':
                case 'e':
                case 'i':
                case 'o':
                case 'u':
                    ++resultCount;
                    break;
            }
        });
        alert("vowel count is " + resultCount);
    }
}

countVowelsInStringDriverFunction()