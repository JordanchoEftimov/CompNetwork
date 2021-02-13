function add() {
    $('#form-summarization').append('<br/><input type="text" class="form-control ip-address" aria-describedby="input" required autocomplete = "off" /> ');
}

function removeInput() {
    let ip_addresses = $(".ip-address");
    if (ip_addresses.length > 1) {
        $("#form-summarization :last-child").remove();
        $("#form-summarization :last-child").remove();
    } else {
        errorMessage("Не можете да го избришете ова поле!");
    }
}

function summarize() {
    let ip_addresses = $(".ip-address");

    //validating ip adresses
    let flag = 0;
    let ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    for (let i = 0; i < ip_addresses.length; i++) {
        if (!ip_addresses[i].value.match(ipformat)) {
            ip_addresses[i].classList.remove("is-valid");
            ip_addresses[i].classList.add("is-invalid");
            flag = 1;
        } else {
            ip_addresses[i].classList.remove("is-invalid");
            ip_addresses[i].classList.add("is-valid");
        }
    }
    if (flag === 1) {
        errorMessage("Внесовте невалидна IP адреса!");
        return;
    }

    let binaryRep = [];

    for (let i = 0; i < ip_addresses.length; i++) {
        let decimals = ip_addresses[i].value.split(".");
        let octet1 = parseInt(decimals[0]).toString(2);
        let octet1leadingZeros = "00000000".substr(octet1.length) + octet1;
        let octet2 = parseInt(decimals[1]).toString(2);
        let octet2leadingZeros = "00000000".substr(octet2.length) + octet2;
        let octet3 = parseInt(decimals[2]).toString(2);
        let octet3leadingZeros = "00000000".substr(octet3.length) + octet3;
        let octet4 = parseInt(decimals[3]).toString(2);
        let octet4leadingZeros = "00000000".substr(octet4.length) + octet4;
        let binaryStr = octet1leadingZeros + octet2leadingZeros + octet3leadingZeros + octet4leadingZeros;
        binaryRep.push(binaryStr);
    }

    let summarizationRoute = binaryRep[0];
    let CIDR = 32;
    for (let i = 1; i < binaryRep.length; i++) {
        let foundDifferent = 0;
        let CIDRtemp = 0;
        let sameBinary = "";
        for (let j = 0; j < binaryRep[i].length; j++) {
            if (summarizationRoute.charAt(j) !== binaryRep[i].charAt(j)) {
                foundDifferent = 1;
            }
            if (foundDifferent === 1) {
                sameBinary += "0";
            } else {
                sameBinary += summarizationRoute.charAt(j);
                CIDRtemp++;
            }
        }
        if (CIDR > CIDRtemp) {
            CIDR = CIDRtemp;
        }
        summarizationRoute = sameBinary;
    }

    let decimal1 = summarizationRoute.substring(0, 8);
    let decimal2 = summarizationRoute.substring(8, 16);
    let decimal3 = summarizationRoute.substring(16, 24);
    let decimal4 = summarizationRoute.substring(24, 31) + "0";

    if (CIDR === 32) {
        --CIDR;
    }

    //printing the summarized route
    document.getElementById("summar-ip-addr").value = parseInt(decimal1, 2) + "." + parseInt(decimal2, 2) + "." + parseInt(decimal3, 2) + "." + parseInt(decimal4, 2) + "/" + CIDR;
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
    let copyText = document.getElementById("summar-ip-addr");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  }