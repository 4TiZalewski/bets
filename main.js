// @ts-check

/**
 * @type {HTMLSelectElement}
 */
const hosts = get("#hosts");
/**
 * @type {HTMLSelectElement}
 */
const guests = get("#guests");

/**
 * @type {Map<String, String>}
 */
const map = new Map();
map.set("PL", "Polska");
map.set("AR", "Argentyna");
map.set("ME", "Meksyk");
map.set("AS", "Arabia Saudyjska");

let i = 0;

map.forEach(function(value, key) {
    /**
     * @type {HTMLOptionElement}
     */
    const element = document.createElement("option");
    element.value = key;
    element.innerText = value;

    if (i === 0) {
        element.selected = true;
    }

    if (i === 1) {
        element.disabled = true;
    }

    hosts.append(element);

    /**
     * @type {HTMLOptionElement}
     */
    const element2 = document.createElement("option");
    element2.value = key;
    element2.innerText = value;

    if (i === 0) {
        element2.disabled = true;
    }

    if (i === 1) {
        element2.selected = true;
    }

    guests.append(element2);
    i += 1;
});

hosts.addEventListener("change", function(event) {
    chose_team(this, guests);
});

guests.addEventListener("change", function(event) {
    chose_team(this, hosts);
});

/**
 * @type {HTMLElement}
 */
const display = get("#display");
/**
 * @type {HTMLInputElement}
 */
const hosts_score = get("#hosts-score");
/**
 * @type {HTMLInputElement}
 */
const guests_score = get("#guests-score");

/**
 * @type {HTMLButtonElement}
 */
const show_results_btn = get("#show-results");
show_results_btn.addEventListener("click", function(event) {
    event.preventDefault();

    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }

    let p = document.createElement("p");
    p.innerText = `Twój typ wyniku meczu ${map.get(hosts.value)} - ${map.get(guests.value)} to ${Math.max(Number(hosts_score.value), 0)} : ${Math.max(Number(guests_score.value), 0)}`;
    display.append(p);

    p = document.createElement("p");
    p.innerText = `Ponadto przwidujesz, że: `;
    display.append(p);

    /** @type {HTMLInputElement} */
    const overtime = get("#Yovertime");
    /** @type {HTMLInputElement} */
    const yellow_cards = get("#yellow-cards");
    /** @type {HTMLInputElement} */
    const red_cards = get("#red-cards");
    /** @type {HTMLInputElement} */
    const penalty_shots = get("#penalty-shots");

    const list = document.createElement("ul");
    const element = document.createElement("li");
    if (overtime.checked) {
        element.innerText = "będzie dogrywka";
    } else {
        element.innerText = "nie będzie dogrywki";
    }
    list.append(element);

    if (yellow_cards.checked) {
        extras("bedą żółte kartki", list);
    }

    if (red_cards.checked) {
        extras("bedą czerwone kartki", list);
    }

    if (penalty_shots.checked) {
        extras("bedą rzuty karne", list);
    }

    display.append(list);
});

/**
 * @param {String} description 
 * @param {HTMLUListElement} list 
 */
function extras(description, list) {
    const element = document.createElement("li");
    element.innerText = description;
    list.append(element);
}

/**
 * @type {HTMLButtonElement}
 */
const reset_btn = get("#reset");
reset_btn.addEventListener("click", function(event) {
    event.preventDefault();

    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
});

/**
 * @param {HTMLSelectElement} this_team 
 * @param {HTMLSelectElement} other_teams 
 */
function chose_team(this_team, other_teams) {
    for (let i = 0; i < other_teams.length; i++) {
        // We only expect to have options
        const option_value = /** @type {HTMLOptionElement} */ (other_teams[i]);
        if (this_team.value === option_value.value) {
            other_teams[i].disabled = true
        } else {
            other_teams[i].disabled = false
        }
    }
}

/**
 * @template [TheHTMLElement=Element]
 * @param {string} query 
 * @returns {TheHTMLElement}
 */
function get(query) {
    /**
     * @type {Element | null}
     */
    const element_nullable = document.querySelector(query);
    if (!element_nullable) {
        throw new Error(`Element "${query}" could not be found`);
    }

    const element = /** @type {TheHTMLElement} */ (element_nullable);
    return element;
}