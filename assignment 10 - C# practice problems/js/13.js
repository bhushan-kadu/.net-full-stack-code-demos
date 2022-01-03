//Write a JavaScript program to check whether a given 
//stringInputing contains equal number of p's and t's.
function checkIFStringContainsEqualPAndTDriverFunction() {
    let stringInput = prompt("Enter a string");

    if (stringInput != null) {
        stringInput = stringInput.split("");

        let pCount = 0;
        let tCount = 0;

        stringInput.forEach(element => {

            switch (element) {
                case 'p':
                    ++pCount;
                    break;
                case 't':
                    ++tCount;
                    break;
            }
        });

        if (pCount === tCount) {
            alert("p and t count is equal");
        } else {
            alert("p and t count is not equal");
        }
    }
}
checkIFStringContainsEqualPAndTDriverFunction()