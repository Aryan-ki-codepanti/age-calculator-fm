const reset = () => {
    let inputs = document.querySelectorAll(".inputs > div");
    inputs.forEach(inp => {
        inp.classList.remove("error");
        inp.lastChild.textContent = "";
    });

    document.querySelector(".results > .years > span:first-child").innerText =
        "- -";
    document.querySelector(".results > .months > span:first-child").innerText =
        "- -";
    document.querySelector(".results > .days > span:first-child").innerText =
        "- -";
};

const invalidDate = (d, m, y) => {
    if ([4, 6, 9, 11].includes(m) && d > 30) return true;

    if (
        m === 2 &&
        ((y % 100 === 0 && y % 400 === 0 && d > 29) ||
            (y % 4 === 0 && d > 29) ||
            d > 28)
    )
        return true;
    return false;
};

const errorChecks = (d, m, y) => {
    const inpDay = document.querySelector(".input-day");
    const inpMonth = document.querySelector(".input-month");
    const inpYear = document.querySelector(".input-year");

    let err = false;
    // emptiness
    if (d === "") {
        inpDay.classList.add("error");
        inpDay.querySelector("p").innerText = "This field is required";
        err = true;
    }
    if (m === "") {
        inpMonth.classList.add("error");
        inpMonth.querySelector("p").innerText = "This field is required";
        err = true;
    }
    if (y === "") {
        inpYear.classList.add("error");
        inpYear.querySelector("p").innerText = "This field is required";
        err = true;
    }

    // invalidity / numeric check

    d = parseInt(d);
    m = parseInt(m);
    y = parseInt(y);
    let today = new Date();
    let dt = new Date(`${m}-${d}-${y}`);
    if (!d || d < 0) {
        inpDay.classList.add("error");
        inpDay.querySelector("p").innerText = "Must be a valid day";
        err = true;
    }
    if (!m || m < 0) {
        inpMonth.classList.add("error");
        inpMonth.querySelector("p").innerText = "Must be a valid month";
        err = true;
    }
    if (!y || y < 0) {
        inpYear.classList.add("error");
        inpYear.querySelector("p").innerText = "Must be a valid year";
        err = true;
    }

    if (err) return err;

    // invalid date check
    if (dt == "Invalid Date" || invalidDate(d, m, y)) {
        inpDay.classList.add("error");
        inpDay.querySelector("p").innerText = "Must be a valid day";
        inpMonth.classList.add("error");
        inpMonth.querySelector("p").innerText = "Must be a valid month";
        inpYear.classList.add("error");
        inpYear.querySelector("p").innerText = "Must be a valid year";
        err = true;
        return err;
    }

    if (err) return err;

    // past check
    if (y && dt - today > 0) {
        inpDay.classList.add("error");
        inpDay.querySelector("p").innerText = "Must be a valid day";
        inpMonth.classList.add("error");
        inpMonth.querySelector("p").innerText = "Must be a valid month";
        inpYear.classList.add("error");
        inpYear.querySelector("p").innerText = "Must be a date in past";
        err = true;
    }
    return err;
};

const calcAge = (d, m, y) => {
    let dt = new Date(`${m}-${d}-${y}`);
    let yrs = (new Date() - dt) / (1000 * 60 * 60 * 24 * 365);
    let mons = (yrs - parseInt(yrs)) * 12;
    let days = (mons - parseInt(mons)) * 30;

    document.querySelector(".results > .years > span:first-child").innerText =
        parseInt(yrs);
    document.querySelector(".results > .months > span:first-child").innerText =
        parseInt(mons);
    document.querySelector(".results > .days > span:first-child").innerText =
        parseInt(days);
};

btn.addEventListener("click", () => {
    let d = day.value;
    let m = month.value;
    let y = year.value;

    reset();
    if (errorChecks(d, m, y)) return;

    reset();

    calcAge(parseInt(d), parseInt(m), parseInt(y));

    console.log({ d, m, y });
});
