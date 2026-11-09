/* Данные сети апартаментов «Светлый Дом»
   Источник: реальные карточки системы бронирования (Homereserve) сайта svetliidom.ru */

const SITE = {
  phone: "+7 901 349-07-92",
  phoneRaw: "+79013490792",
  whatsapp: "https://wa.me/79013490792",
  max: "https://max.ru/u/f9LHodD0cOJNkW-JemsRFSz0se-nJU8LJxaXXSZ8wQe9YVMer47oV98mtPc",
  vk: "https://vk.com/svetliidom_aparts",
  deposit: 3000
};

const LOCATIONS = {
  maryino: { label: "м. Марьино" },
  lyublino: { label: "м. Люблино / Волжская" },
  kashirskaya: { label: "м. Каширская" }
};

const APARTMENTS = [
  {
    slug: "ellada", id: 211341, name: "Эллада", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Каширская",
    size: 16, rooms: 1, beds: "2", price: 4602,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор", "Можно с детьми", "Холодильник"],
    photos: 5
  },
  {
    slug: "yalta", id: 221453, name: "Ялта", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Каширская",
    size: 15, rooms: 1, beds: "2", price: 4602,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор", "Можно с детьми", "Холодильник"],
    photos: 5
  },
  {
    slug: "schastye", id: 194491, name: "Счастье", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Каширская",
    size: 16, rooms: 1, beds: "2", price: 4484,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор", "Можно с детьми", "Холодильник"],
    photos: 5
  },
  {
    slug: "fiolent", id: 194502, name: "Фиолент", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Кантемировская",
    size: 16, rooms: 1, beds: "2", price: 4720,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор", "Можно с детьми", "Детская площадка"],
    photos: 5
  },
  {
    slug: "fortuna", id: 175152, name: "Фортуна", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Каширская",
    size: 16, rooms: 1, beds: "2", price: 4602,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор", "Можно с детьми", "Холодильник"],
    photos: 5
  },
  {
    slug: "garmoniya", id: 177107, name: "Гармония", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Каширская",
    size: 28, rooms: 1, beds: "2+1", price: 4956,
    amenities: ["Стиральная машина", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "СВЧ-печь"],
    desc: "Самая просторная студия локации: полноценная кухня с плитой и местом для третьего гостя.",
    photos: 5
  },
  {
    slug: "monte-karlo", id: 177110, name: "Монте-Карло", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Каширская",
    size: 14, rooms: 1, beds: "2", price: 4366,
    amenities: ["Стиральная машина", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "СВЧ-печь"],
    photos: 5
  },
  {
    slug: "monako", id: 228281, name: "Монако", loc: "kashirskaya",
    addr: "Каширское шоссе, 56к2", metro: "Каширская",
    size: 14, rooms: 1, beds: "2", price: 4366,
    amenities: ["Стиральная машина", "Телевизор", "Можно с детьми", "Холодильник", "Кухонная плита", "СВЧ-печь"],
    photos: 5
  },
  {
    slug: "liliya", id: 249949, name: "Лилия", loc: "lyublino",
    addr: "проспект 40 лет Октября, 12/10", metro: "Люблино",
    size: 16, rooms: 1, beds: "2", price: 3894,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор"],
    photos: 5
  },
  {
    slug: "lotos", id: 268020, name: "Лотос", loc: "lyublino",
    addr: "проспект 40 лет Октября, 12/10", metro: "Люблино",
    size: 22, rooms: 1, beds: "2+1", price: 4012,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор"],
    photos: 5
  },
  {
    slug: "kameliya", id: 154055, name: "Камелия", loc: "lyublino",
    addr: "проспект 40 лет Октября, 12/10", metro: "Люблино",
    size: 22, rooms: 1, beds: "2+1", price: 4012,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор"],
    photos: 5
  },
  {
    slug: "magnoliya", id: 154038, name: "Магнолия", loc: "lyublino",
    addr: "проспект 40 лет Октября, 12/10", metro: "Люблино",
    size: 16, rooms: 1, beds: "2", price: 3894,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор"],
    photos: 5
  },
  {
    slug: "zhasmin", id: 165638, name: "Жасмин", loc: "lyublino",
    addr: "проспект 40 лет Октября, 12/10", metro: "Люблино",
    size: 20, rooms: 1, beds: "2", price: 4012,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор"],
    photos: 5
  },
  {
    slug: "siciliya", id: 154037, name: "Сицилия", loc: "lyublino",
    addr: "улица Шкулева, 13/25с3", metro: "Волжская",
    size: 13, rooms: 1, beds: "2", price: 3776,
    amenities: ["Стиральная машина", "Интернет Wi-Fi", "Телевизор"],
    desc: "Самый доступный вариант сети — компактная студия для коротких поездок.",
    photos: 5
  },
  {
    slug: "sofiya", id: 154048, name: "София", loc: "maryino",
    addr: "улица Перерва, 8с1", metro: "Марьино",
    size: 30, rooms: 1, beds: "2+2", price: 4484,
    amenities: ["Кондиционер", "Стиральная машина", "Интернет Wi-Fi"],
    desc: "Просторные апартаменты 30 м² со спальным местом для четырёх гостей — идеально для семьи.",
    photos: 5
  },
  {
    slug: "rio", id: 154040, name: "Рио", loc: "maryino",
    addr: "улица Перерва, 8с1", metro: "Марьино",
    size: 30, rooms: 1, beds: "2+2", price: 4484,
    amenities: ["Кондиционер", "Стиральная машина", "Интернет Wi-Fi"],
    photos: 5
  },
  {
    slug: "skandinaviya", id: 154044, name: "Скандинавия", loc: "maryino",
    addr: "улица Перерва, 8с1", metro: "Марьино",
    size: 30, rooms: 1, beds: "2+1", price: 4366,
    amenities: ["Кондиционер", "Стиральная машина", "Интернет Wi-Fi"],
    photos: 5
  },
  {
    slug: "moskovskiy-briz", id: 367051, name: "Московский бриз", loc: "maryino",
    addr: "Донецкая улица, 30к1", metro: "Марьино",
    size: 39, rooms: 1, beds: "2+1", price: 4956,
    amenities: ["Кондиционер", "Стиральная машина", "Интернет Wi-Fi"],
    desc: "Квартира на набережной Москвы-реки: двухуровневые апартаменты 39 м² — флагман сети.",
    tag: "На набережной",
    photos: 5
  }
];

/* Порядок сортировки локаций в фильтре */
const FILTER_ORDER = ["all", "maryino", "lyublino", "kashirskaya"];
