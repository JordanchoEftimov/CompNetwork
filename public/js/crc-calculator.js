function calculateCRC() {
    let correctInput = true;
    let inputString = document.getElementById("input-string").value;
    if (inputString.length === 0) {
        document.getElementById("input-string").classList.add("is-invalid");
        document.getElementById("input-string").classList.remove("is-valid");
        errorMessage("Please insert a binary string!");
        correctInput = false;
    }
    for (let i = 0; i < inputString.length; i++) {
        if (inputString.charAt(i) !== '1' && inputString.charAt(i) !== '0') {
            document.getElementById("input-string").classList.add("is-invalid");
            document.getElementById("input-string").classList.remove("is-valid");
            errorMessage("Please insert a binary string!");
            correctInput = false;
        }
    }
    if (correctInput === true) {
        document.getElementById("input-string").classList.remove("is-invalid");
        document.getElementById("input-string").classList.add("is-valid");
    }

    let correctGenerator = true;
    let generator = document.getElementById("generator").value;
    if (generator.length === 0) {
        document.getElementById("generator").classList.add("is-invalid");
        document.getElementById("generator").classList.remove("is-valid");
        errorMessage("Please insert a binary string!");
        correctGenerator = false;
    }
    for (let i = 0; i < generator.length; i++) {
        if (generator.charAt(i) !== '1' && generator.charAt(i) !== '0') {
            document.getElementById("generator").classList.add("is-invalid");
            document.getElementById("generator").classList.remove("is-valid");
            errorMessage("Please insert a binary string");
            correctGenerator = false;
        }
    }
    if (correctGenerator === true) {
        document.getElementById("generator").classList.remove("is-invalid");
        document.getElementById("generator").classList.add("is-valid");
    }

    let selection = document.getElementById("coding-decoding-select").value;

    if (selection === "default") {
        document.getElementById("coding-decoding-select").classList.add("is-invalid");
        document.getElementById("coding-decoding-select").classList.remove("is-valid");
        errorMessage("Please choose an option from the menu!");
        return;
    }

    document.getElementById("coding-decoding-select").classList.remove("is-invalid");
    document.getElementById("coding-decoding-select").classList.add("is-valid");

    if (correctGenerator === true && correctInput === true) {
        let inputStringWithoutLeadingZeros = deleteLeadingZeros(inputString);
        let generatorWithoutLeadingZeros = deleteLeadingZeros(generator);

        let divident = inputStringWithoutLeadingZeros + "0".repeat(generatorWithoutLeadingZeros.length - 1);
        let dividentForCalculating = divident.substring(0, generatorWithoutLeadingZeros.length);
        let dividentAfterDivision = divident.substring(generatorWithoutLeadingZeros.length, divident.length);

        let reminder = division(dividentForCalculating, generatorWithoutLeadingZeros);
        reminder += dividentAfterDivision[0];
        dividentAfterDivision = dividentAfterDivision.substring(1, dividentAfterDivision.length);

        while (dividentAfterDivision.length !== 0) {
            reminder = division(reminder, generatorWithoutLeadingZeros);
            reminder += dividentAfterDivision[0];
            dividentAfterDivision = dividentAfterDivision.substring(1, dividentAfterDivision.length);
        }
        reminder = division(reminder, generatorWithoutLeadingZeros);
        if (selection === "coding") {
            document.getElementById("crc-code").value = inputString + reminder;
        } else {
            let reminderInteger = parseInt(reminder, 2)
            if (reminderInteger > 0) {
                document.getElementById("crc-code").value = "Error detected!";
            } else {
                document.getElementById("crc-code").value = "No error detected!";
            }
        }
    }
}

function bitwiseXoR(divident, generator) {
    let result = "";
    for (let i = 0; i < generator.length; i++) {
        result += parseInt(generator[i]) ^ parseInt(divident[i]);
    }
    return result;
}

function bitwiseAnd(quotient, generator) {
    let result = "";
    for (let i = 0; i < generator.length; i++) {
        result += parseInt(quotient) & parseInt(generator[i]);
    }
    return result;
}

function deleteLeadingZeros(input) {
    while (input.charAt(0) === "0") {
        input = input.substring(1, input.length);
    }
    return input;
}

function division(divident, generator) {
    let quotient = divident[0] & generator[0];
    let mid = bitwiseAnd(quotient, generator);
    let reminder = bitwiseXoR(divident, mid);
    return reminder.substring(1, reminder.length);
}

function errorMessage(message) {
    // Get the modal
    var modal = document.getElementById("myModal");
    document.getElementById('mdBody').innerHTML = `
            <p>${message}</p>
        `

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    function showMessage() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    showMessage();
}

function copyToClipboardFunction() {
    /* Get the text field */
    let copyText = document.getElementById("crc-code");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
}