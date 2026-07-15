// мой массив со студентами
let studenti = []

// когда страница открывается - загружаем данные
window.onload = function() {
    let dannie = localStorage.getItem("studenti")
    if (dannie != null) {
        studenti = JSON.parse(dannie)
    }
    pokazatTablecu()
}

// добавить студента
function dobavitStudenta() {
    let imya = document.getElementById("imya").value
    let vozrast = document.getElementById("vozrast").value
    let oblast = document.getElementById("oblast").value
    let napravlenie = document.getElementById("napravlenie").value

    // проверка
    if (imya == "") {
        alert("Введите имя!")
        return
    }
    if (vozrast == "") {
        alert("Введите возраст!")
        return
    }
    if (oblast == "") {
        alert("Выберите область!")
        return
    }
    if (napravlenie == "") {
        alert("Выберите направление!")
        return
    }

    // создаем обьект студента
    let student = {
        imya: imya,
        vozrast: vozrast,
        oblast: oblast,
        napravlenie: napravlenie
    }

    // добавляем в массив
    studenti.push(student)

    // сохраняем в браузер
    localStorage.setItem("studenti", JSON.stringify(studenti))

    // обновляем таблицу
    pokazatTablecu()

    // очищаем поля
    document.getElementById("imya").value = ""
    document.getElementById("vozrast").value = ""
    document.getElementById("oblast").value = ""
    document.getElementById("napravlenie").value = ""
}

// показать таблицу
function pokazatTablecu() {
    let poiskovoyTekst = document.getElementById("poisk").value.toLowerCase()

    let tablitsa = document.getElementById("tablitsa")
    tablitsa.innerHTML = ""

    for (let i = 0; i < studenti.length; i++) {
        let student = studenti[i]

        // поиск - если имя не совпадает то пропускаем
        if (student.imya.toLowerCase().indexOf(poiskovoyTekst) == -1) {
            continue
        }

        let strok = "<tr>"
        strok += "<td>" + (i + 1) + "</td>"
        strok += "<td>" + student.imya + "</td>"
        strok += "<td>" + student.vozrast + "</td>"
        strok += "<td>" + student.oblast + "</td>"
        strok += "<td>" + student.napravlenie + "</td>"
        strok += "<td><button onclick='udalit(" + i + ")'>Удалить</button></td>"
        strok += "</tr>"

        tablitsa.innerHTML += strok
    }
}

// удалить студента
function udalit(nomer) {
    studenti.splice(nomer, 1)
    localStorage.setItem("studenti", JSON.stringify(studenti))
    pokazatTablecu()
}

// поиск
function poiskStudent() {
    pokazatTablecu()
}

// сортировка по имени
function sortirovatPoImeni() {
    for (let i = 0; i < studenti.length; i++) {
        for (let j = i + 1; j < studenti.length; j++) {
            if (studenti[i].imya > studenti[j].imya) {
                let vremenniy = studenti[i]
                studenti[i] = studenti[j]
                studenti[j] = vremenniy
            }
        }
    }
    pokazatTablecu()
}

// сортировка по возрасту
function sortirovatPoVozrastu() {
    for (let i = 0; i < studenti.length; i++) {
        for (let j = i + 1; j < studenti.length; j++) {
            if (Number(studenti[i].vozrast) > Number(studenti[j].vozrast)) {
                let vremenniy = studenti[i]
                studenti[i] = studenti[j]
                studenti[j] = vremenniy
            }
        }
    }
    pokazatTablecu()
}
