console.log("Minden okés!");
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

//window.addEventListener('contextmenu',function(f){f.preventDefault();}, false);
let sor = 5;
let oszlop = 5;
let aknaSzam = 5;
//palyaKeszit();
document.getElementById("urlap").onsubmit = function (f) {
    f.preventDefault();
    sor = Number(f.target.elements.sor.value);
    oszlop = Number(f.target.elements.oszlop.value);
    aknaSzam = Number(f.target.elements.ankaszam.value);
    console.log(sor, ";", oszlop, ";", aknaSzam);
    if (aknaSzam >= (sor * oszlop)) {
        document.querySelector("#setup h2").innerHTML = "Buta vagy!!!";
        document.getElementById("ankaszam").style.backgroundColor = "red";
        return false;
    }
    palyaKeszit();
};
function palyaKeszit() {
    document.getElementById("setup").style.display = "none";

    let palya = document.getElementById("palya");

    palya.innerHTML = "";
    console.log("Ciklus", sor, ";", oszlop, ";", aknaSzam);
    for (let i = 0; i < sor; i++) {
        let sorElem = document.createElement("div");
        sorElem.className = "sor";
        for (let j = 0; j < oszlop; j++) {
            let cella = document.createElement("div");
            cella.className = "cella";
            cella.onmousedown = katt;
            sorElem.appendChild(cella);
        };
        palya.appendChild(sorElem);
    };
    aknaElhelyez();
    let cellak = document.getElementsByClassName('cella');

    for (let i = 0; i < cellak.length; i++) {
        let asz = aknaSzamol(cellak[i]);
        cellak[i].dataset.aknaszam = asz;
        //cellak[i].innerHTML = (asz == 0 ? "" : asz);
    }
};

function aknaElhelyez() {
    for (let i = 0; i < aknaSzam; i++) {
        let x = Math.round(Math.random() * (sor - 1));
        let y = Math.round(Math.random() * (oszlop - 1));

        let c = document.getElementById("palya").children[x].children[y];
        console.log(c.dataset.akna);
        if (c.dataset.akna == "1") i--;
        else {
            c.dataset.akna = "1";
            //c.classList.add("akna");
        }

    }
};

function aknaSzamol(cella) {
    let aknakSzama = 0;

    if (!cella.dataset.akna) {
        if ((cella.previousElementSibling)
            && (cella.previousElementSibling.dataset.akna))
            aknakSzama++;

        if ((cella.nextElementSibling)
            && (cella.nextElementSibling.dataset.akna))
            aknakSzama++;

        let hanyadik = 0;
        let elozo = cella.previousElementSibling;
        while (elozo) {
            hanyadik++;
            elozo = elozo.previousElementSibling;
        }
        console.log("elem helye:", elozo);

        if (cella.parentNode.previousElementSibling) {
            let indul = (hanyadik - 1 >= 0) ? hanyadik - 1 : 0;
            let vege = (hanyadik + 1 < oszlop) ? hanyadik + 1 : hanyadik;

            for (let i = indul; i <= vege; i++) {
                if (cella.parentNode.previousElementSibling.children[i].dataset.akna)
                    aknakSzama++;
            }

        }
        if (cella.parentNode.nextElementSibling) {
            let indul = (hanyadik - 1 >= 0) ? hanyadik - 1 : 0;
            let vege = (hanyadik + 1 < oszlop) ? hanyadik + 1 : hanyadik;

            for (let i = indul; i <= vege; i++) {
                if (cella.parentNode.nextElementSibling.children[i].dataset.akna)
                    aknakSzama++;
            }

        }
    }

    return aknakSzama;

};

function katt(e) {
    // console.log(e.which);
    // console.log(this);
    // console.log(this.previousElementSibling);
    if (e.which > 1) this.classList.toggle("zaszlo");
    if (e.which == 1 && !this.classList.contains("zaszlo")) {
        if (this.dataset.akna) {
            let cellak = document.getElementsByClassName('cella');
            for (let i = 0; i < cellak.length; i++) {
                cellak[i].onmousedown = null;
                if (cellak[i].dataset.akna) cellak[i].classList.add("akna");
            };
            this.classList.remove("akna");
            this.classList.add("robban");
            document.getElementById("setup").style.display = "block";
            document.querySelector("#setup h2").innerHTML = "Sajnos meghaltál!";
        }
        else {
            kinyit(this);
        }
    };

}

function kinyit(cella) {
    if (!cella.classList.contains("ures")) {
        cella.classList.add("ures");
        if (cella.dataset.aknaszam && cella.dataset.aknaszam != 0) {
            cella.innerHTML = cella.dataset.aknaszam;
        }
        else {


            if (cella.dataset.aknaszam && cella.dataset.aknaszam == 0)
                cella.classList.add("ures");
            if (cella.previousElementSibling)
                kinyit(cella.previousElementSibling);
            let hanyadik =0;
            let elozo = cella.previousElementSibling;
            while (elozo) {
                hanyadik++;
                elozo = elozo.previousElementSibling;
            }
            if(cella.parentNode.previousElementSibling)
            kinyit(cella.parentNode.previousElementSibling.children[hanyadik]);


            if(cella.parentNode.previousElementSibling)
            kinyit(cella.parentNode.previousElementSibling.children[hanyadik]);
        }
    }
}
function setup(){
    console.log("Magasság:" ,window.innerHeight);
    console.log("Szélesség:" ,window.innerWidth);
    let szelesseg = Math.round (window.innerWidth*0.9/oszlop);
    
    for (let c of document.getElementsByClassName(cella)) 
    {
        c.clientWidth=szelesseg+"px";
        c.clientHeight = szelesseg+"px";
    }
}

window.onresize = function(){
    setup();
}