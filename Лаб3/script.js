// Часть 1
let array = [
    { name: "apple", count: 5, price: 70 },
    { name: "orange", count: 10, price: 90 }
];

let sum = 0;

array.forEach((element) => {
    sum += element.count * element.price;
});

console.log(sum);

let newObject = {
    bill: array,
    result: sum
}

console.log(JSON.stringify(newObject));

let date = new Date();

console.log(`Текущая дата: ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);

// Часть 2
const copy = document.querySelector(".copy_paste");
const change = document.querySelector(".change_style");
const text = document.querySelector(".p");
const find = document.querySelector(".find");
const list = document.querySelectorAll(".item");
const links = document.querySelectorAll(".link");
const content = text.textContent;

let flag = false;


copy.addEventListener("click", () => {
    list.forEach((item) => {
        text.textContent += item.textContent + " ";
    });
});

change.addEventListener("click", () => {
    if (!flag) {
        links.forEach((item) => {
            item.classList.add("green");
            flag = true;
        });
    } else {
        links.forEach((item) => {
            item.classList.remove("green");
            flag = false;
        });
    }
});

find.addEventListener("input", () => {
    for (let link of links) {
        if (find.value === "") {
            link.classList.remove("back");
        } else {
            if (link.textContent.includes(find.value)) {
                link.classList.add("back");
            } else {
                link.classList.remove("back");
            }
        }
    }
});