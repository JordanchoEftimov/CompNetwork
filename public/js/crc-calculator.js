function calculateCRC() {
    let correctInput = true;
    let inputString = document.getElementById("input-string").value;
    if (inputString.length === 0) {
        document.getElementById("input-string").classList.add("is-invalid");
        document.getElementById("input-string").classList.remove("is-valid");
        errorMessage("Ве молиме внесете бинарна низа!");
        correctInput = false;
    }
    for (let i = 0; i < inputString.length; i++) {
        if (inputString.charAt(i) !== '1' && inputString.charAt(i) !== '0') {
            document.getElementById("input-string").classList.add("is-invalid");
            document.getElementById("input-string").classList.remove("is-valid");
            errorMessage("Ве молиме внесете бинарна низа!");
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
        errorMessage("Ве молиме внесете бинарна низа!");
        correctGenerator = false;
    }
    for (let i = 0; i < generator.length; i++) {
        if (generator.charAt(i) !== '1' && generator.charAt(i) !== '0') {
            document.getElementById("generator").classList.add("is-invalid");
            document.getElementById("generator").classList.remove("is-valid");
            errorMessage("Ве молиме внесете бинарна низа!");
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
        errorMessage("Ве молиме изберете опција од менито!");
        return;
    }

    document.getElementById("coding-decoding-select").classList.remove("is-invalid");
    document.getElementById("coding-decoding-select").classList.add("is-valid");

    if (correctGenerator === true && correctInput === true) {
        if (selection === "coding") {
            let divident = inputString + "0".repeat(generator.length - 1);
        } else {

        }
    }

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