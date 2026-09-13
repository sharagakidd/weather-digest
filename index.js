<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
async function fetchWithTimout(url, timeout = 5000) {
    
    const controller = new AboutController();
    const timer = setTimeout (() => controller.abort (), timeout);
    
    try {
        const response = await fetch (url, {signal: controller.signal});
        return response;
    } catch (error) {
        if (error.name == "AboutError") {
            throw new Error ("Превышено время ожидания от API");
        }
        throw new Error ("Сетевая ошибка: " + error.message);
    } finally {
        clearTimeout (timer);
    }
}

async function main() {
>>>>>>> 342bf31 (feat(api): add fetchWithTimeout with AbortController)



async function fetchWithTimout(url, timeout = 5000) {
    
    const timer = setTimeout (() => controller.abort (), timeout);
    
    try {
        const response = await fetch (url, {signal: controller.signal});
        return response;
    } catch (error) {
        if (error.name == "AboutError") {
            throw new Error ("Превышено время ожидания от API");
        }
        throw new Error ("Сетевая ошибка: " + error.message);
    } finally {
        clearTimeout (timer);
    }
}

>>>>>>> 1806006 (refactor(cli): fix day labels, reorder notices, add comments)
async function main() {
const args = process.argv.slice(2);     // slice обрасывает два служебных элемента (2)
let cities = [];
let days = 3;
const errors = []; 
const notices = []; 

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg == "--city") {
    const value = args[i + 1];    
    if (!value || value.startsWith("--")) { 
        errors.push("Ошибка: Параметр --city обязателен!");     // если в ввод "вылезает" "--" - выводится в консоль ошибка
    } else {
    cities = value.split (',').map(c => c.trim()).filter(c => c.length > 0);    // перечисление городов + город должен состоять больше одного символ, иначе ошибка 
    i++;   
    }
    } else if (arg == "--days") {
        const value = args [i + 1];
        if (!value || value.startsWith ("--")) {     // если пользователь пропускает поле - подставляется значение "3"
           notices.push ("Подставлено значение по умолчанию - 3"); 
            } else {
        days = Number(value);
        i++;
    }
}
}
if (cities.length == 0) {     // город не указан (пустое поле ввода) - выкидывает ошибку
errors.push("Ошибка: Вы не указали город!");
}

if (days < 1 || days > 7) { // диапазон дней от 1 до 7, условие ИЛИ
    errors.push ("Ошибка: Параметр --days должен быть от 1 до 7!");
}
if (!Number.isInteger(days)) { // параметры, не float, а именно числовое значение [0,1,2...]
    errors.push ("Ошибка: Параметр --days должен быть целым числом!");
}

if (errors.length > 0) { // итоги выброшенных ранее ошибок в консоль
    errors.forEach (err => console.error ( `${err}`));
    process.exit(1);
}
notices.forEach (notice => console.log ( `i: ${notice}`));

const someCity =cities.length == 1 ? "Город" : "Города"; // добавил корректность вывода ед. и мн. числа city
console.log(`${someCity}: ${cities.join(" , ")}`);
const someDay = days == 1 ? "День" : "Дней"; // добавил корректность вывода ед. и мн. числа days
console.log(`${someDay}: ${days}`);
}

main().catch(error => {
    console.error ("Ошибка: ", error.message);
    process.exit(1);
});