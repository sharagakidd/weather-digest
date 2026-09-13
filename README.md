# Weather Digest

Консольная утилита Node.js для получения прогноза погоды через открытый API Open-Meteo. Принимает один или несколько городов, выводит прогноз в консоль и сохраняет отчет в JSON-файл. Поддерживает кэширование

## Требования

- **Node.js** версиии **20 и выше** (используется встроенный `fetch`)

## Установка 

git clone <URL>
cd weather-digest
cp. .env.example .env

## Переменные окружения

Все настройки внутри `.env`.

- GEOCODING_BASE_URL — адрес геокодинга (по умолчанию https://geocoding-api.open-meteo.com/v1/search)
- FORECAST_BASE_URL — адрес прогноза (по умолчанию https://api.open-meteo.com/v1/forecast)
- REQUEST_TIMEOUT — таймаут запроса в мс (по умолчанию 5000)
- REPORTS_DIR — папка отчётов (по умолчанию reports)

## Запуск 

node src/index.js --city "Москва"
node src/index.js --city "Москва" --days 5
node src/index.js --city "Москва,Санкт-Петербург" --days 3
node src/index.js --city "Москва" --no-cache

## Параметры

- `--city` - обязательный, город или список через запятую
- `--days` - от 1 до 7, по умолчанию 3
- `--no-cache` - игнорировать кэш

## Примеры вывода

Город: Москва
Дней: 3
    == Москва ==
    Координаты: { latitude: 55.75, longitude: 37.61, name: 'Москва', country: 'Россия' }
    Прогноз: {
      time: [ '2026-09-13', '2026-09-14', '2026-09-15' ],
      temperature_2m_max: [ 16.5, 18.6, 18.1 ],
      temperature_2m_min: [ 7.7, 9.3, 11 ],
      precipitation_sum: [ 0, 0, 0 ]
    }
    Отчет сохранен: reports/Москва-2026-09-13.json

## Кэш

Прогноз сохраняется в `reports/{город}-{дата}.json`. При повторном запуске за тот же день данные берутся из файла. Если `--days` другой - кэш сбрасывается, делается новый запрос. `--no-cache` принудительно игнорирует кэш.

## Ошибки

- Некорректные аргументы (нет `--city`, `--city` - пустой, `--days` вне 1-7 или не целое)
- Город не найден
- 4xx от API
- 5xx от API
- Нет сети
- Тайм-аут
- Неправильный JSON

## Коды выхода

- `0` - успех
- `1` - ошибка

## Структура

    weather-digest/
    -src/index.js   - логика
    -reports/       - отчеты
    -docs/postman/  - коллекция Postman
    -.env.example
    -.gitignore
    -package.json
    -README.md