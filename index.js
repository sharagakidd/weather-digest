async function main() {

const args = process.argv.slice(2); // slice обрасывает два служебных элемента (2)
let cities = [];
let days = 3;
const errors = [];

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg == "--city") {
    const value = args[i + 1];    // аргумент - город
    if (!value || value.startsWith("--")) { 
        errors.push("Ошибка: Параметр --city обязателен!"); // если в лог вылезает "--" - пишется в консоль ошибка
    } else {
    cities = value.split (',').map(c => c.trim()).filter(c => c.length > 0);   // перечисление городов + город должен состоять больше одного символ, иначе ошибка 
    i++;   
    }
    } else if (arg == "--days") {
        const value = args [i + 1];
        if (!value || value.startsWith ("--")) {
            console.log ("Подставлено значение по умолчанию - 3");
            } else {
        days = Number(value);
        i++;
    }
}
}
if (cities.length == 0) {     // город не указан - выкидывает ошибку
errors.push("Ошибка: Вы не указали город!");
}

if (days < 1 || days > 7) { // диапозон дней от 1 до 7, условие ИЛИ
    errors.push ("Ошибка: Параметр --days должен быть от 1 до 7!");
}
if (!Number.isInteger(days)) {
    errors.push ("Ошибка: Параметр --days должен быть целым числом!");
}

if (errors.length > 0) {
    errors.forEach (err => console.error ( `${err}`));
    process.exit(1);
}

const someCity =cities.length == 1 ? "Город" : "Города";
console.log(`${someCity}: ${cities.join(" , ")}`);
console.log(`Дней: ${days}`);
}

main().catch(error => {
    console.error ("Ошибка: ", error.message);
    process.exit(1);
});