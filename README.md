# Домашнее задание к занятию «3.2. Yandex Cloud Functions»

**Переменные окружения**
* `DB_NAME=<имя БД mongoDB>`
* `DB_HOST=<FQDN хоста>:<порт>`
* `DB_USER=<имя пользователя БД mongoDB>`
* `DB_PASS=<пароль пользователя БД mongoDB>`
* `CACERT=<путь к сертификату>`


Метод | URL | Действие | Комментарий
--- | --- | ---  | ---
`GET` | `/api/characters` | Получить всех персонажей | Получаем массив всех персонажей
`GET` | `/api/character?id=1` | Получить персонажа по **ID** | Получаем объект персонажа, если запись «не найдено», вернём **Code: 404** 
`POST` | `/api/character` | Создать персонажа| Получаем объект персонажа 

Структура json в body для создания объекта персонажа:
```json
{
    name: "Имя персонажа",
    description: "описание...",
    modified: "2020-07-21",
    thumbnail: "http://...",
    comics: [
        {
            id: 1,
            name: "Spider-Man: 101 Ways to End the Clone Saga (1997) #1"
        }
    ]
}
```

Структура объекта персонажа:
```json
{
    id: 1,
    name: "Имя персонажа",
    description: "описание...",
    modified: "2020-07-21",
    thumbnail: "http://...",
    comics: [
        {
            id: 1,
            name: "Spider-Man: 101 Ways to End the Clone Saga (1997) #1"
        }
    ]
}
```
