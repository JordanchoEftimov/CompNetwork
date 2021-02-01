function add() {
    $('#form-summarization').append('<br/><input type="text" class="form-control ip-address" aria-describedby="input" required autocomplete = "off" /> ');
}

function summarize() {
    let ip_addresses = $(".ip-address");

    //validating ip adresses
    let flag = 0;
    let ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    for (let i = 0; i < ip_addresses.length; i++) {
        if (!ip_addresses[i].value.match(ipformat)) {
            ip_addresses[i].style.borderColor = "red";
            flag = 1;
        } else {
            ip_addresses[i].style.borderColor = "green";
        }
    }
    if (flag === 1) {
        alert("Внесовте невалидна IP адреса!");
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
    let decimal4 = summarizationRoute.substring(24, 32);

    //printing the summarized route
    document.getElementById("summar-ip-addr").value = parseInt(decimal1, 2) + "." + parseInt(decimal2, 2) + "." + parseInt(decimal3, 2) + "." + parseInt(decimal4, 2) + "/" + CIDR;
}