document.querySelector("#checksum-select").addEventListener("change", (event) => {
    let selectedOperationMode = event.target.value;
    let checksumBinary = document.querySelector("#checksum-binary");
    let checksumHexa = document.querySelector("#checksum-hexa");

    if (selectedOperationMode == "checksum-binary-option") {
        checksumHexa.style.display = "none";
        checksumBinary.style.display = "block";
    } else if (selectedOperationMode == "checksum-hexa-option") {
        checksumHexa.style.display = "block";
        checksumBinary.style.display = "none";
    }
});

function add() {
    $('#checksum-form').append('<br/><input type="text" class="form-control binary-string" aria-describedby="input" required autocomplete = "off" /> ');
}

function removeInput() {
    let binaryStrings = $(".binary-string");
    if (binaryStrings.length > 1) {
        $("#checksum-form :last-child").remove();
        $("#checksum-form :last-child").remove();
    } else {
        errorMessage("Не можете да го избришете ова поле!");
    }
}

function checkIfBinary(input) {
    if (input.length === 0) {
        return false;
    }
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== "1" && input[i] !== "0") {
            return false;
        }
    }
    return true;
}

function flipBits(binaryString) {
    let result = "";
    for (let i = 0; i < binaryString.length; i++) {
        if (binaryString[i] === '1') {
            result += "0";
        } else {
            result += "1";
        }
    }
    return result;
}

function addBinaryNumbers(a, b) {
    let result = "";
    let carry = 0;

    while (a || b || carry) {
        let sum = +a.slice(-1) + +b.slice(-1) + carry;

        if (sum > 1) {
            result = sum % 2 + result;
            carry = 1;
        }
        else {
            result = sum + result;
            carry = 0;
        }

        a = a.slice(0, -1)
        b = b.slice(0, -1)
    }

    return result;
}

function calculateChecksum() {
    let binaryStrings = $(".binary-string");

    let allAreBinary = true;
    let allAreBelow16 = true;
    for (let i = 0; i < binaryStrings.length; i++) {
        if (!checkIfBinary(binaryStrings[i].value)) {
            allAreBinary = false;
            binaryStrings[i].classList.add("is-invalid");
            binaryStrings[i].classList.remove("is-valid");
        } else {
            binaryStrings[i].classList.remove("is-invalid");
            binaryStrings[i].classList.add("is-valid");
        }
        if (binaryStrings[i].value.length > 16) {
            allAreBelow16 = false;
            binaryStrings[i].classList.add("is-invalid");
            binaryStrings[i].classList.remove("is-valid");
        }
    }

    if (allAreBinary && allAreBelow16) {
        let result = binaryStrings[0].value;

        for (let i = 1; i < binaryStrings.length; i++) {
            result = addBinaryNumbers(result, binaryStrings[i].value);
            if (result.length > 16) {
                let bit = result[0];
                result = result.substring(1, result.length);
                result = addBinaryNumbers(result, bit);
            }
        }

        result = flipBits(result);
        document.getElementById("checksum-result").value = result;
    } else if (!allAreBinary) {
        errorMessage("Ве молиме внесете бинарни зборови!");
    } else {
        errorMessage("Максималната големина на збор е 16 бита!");
    }
}

function isHexadecimal(str) {
    let regexp = /^[0-9a-fA-F]+$/;

    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

function calculateChecksumHexa() {
    let inputHexa = document.getElementById("hexadecimal-string").value;

    if (isHexadecimal(inputHexa)) {
        document.getElementById("hexadecimal-string").classList.add("is-valid");
        document.getElementById("hexadecimal-string").classList.remove("is-invalid");
    } else {
        document.getElementById("hexadecimal-string").classList.remove("is-valid");
        document.getElementById("hexadecimal-string").classList.add("is-invalid");
        errorMessage("Ве молиме внесете хексадецимална низа!");
        return;
    }

    if (inputHexa.length % 4 !== 0) {
        document.getElementById("hexadecimal-string").classList.remove("is-valid");
        document.getElementById("hexadecimal-string").classList.add("is-invalid");
        errorMessage("Должината на низата мора да биде делива со 4!");
        return;
    } else {
        document.getElementById("hexadecimal-string").classList.add("is-valid");
        document.getElementById("hexadecimal-string").classList.remove("is-invalid");
    }

    let binaryStrings = [];
    for (let i = 0; i < inputHexa.length; i += 4) {
        let binaryResult = parseInt(inputHexa.substring(i, i + 4), 16).toString(2);
        binaryResult = "0".repeat(16 - binaryResult.length) + binaryResult;
        binaryStrings.push(binaryResult);
    }

    let result = binaryStrings[0];

        for (let i = 1; i < binaryStrings.length; i++) {
            let maxLength = Math.max(result.length, binaryStrings[i].length);
            result = addBinaryNumbers(result, binaryStrings[i]);
            if (maxLength < result.length) {
                let bit = result[0];
                result = result.substring(1, result.length);
                result = addBinaryNumbers(result, bit);
            }
        }

        result = flipBits(result);

    document.getElementById("checksum-result-hexa").value = result;
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
    let copyText = document.getElementById("checksum-result");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
}

function copyToClipboardFunctionHexa() {
    /* Get the text field */
    let copyText = document.getElementById("checksum-result-hexa");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
}