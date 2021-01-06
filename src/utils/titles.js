import image1 from '../images/Z1.jpg';
import image2 from '../images/Z2.jpg';

export const TITLES = {
    title: 'Flirty - поисковик друзей, компании, отношений',
    subtitle: 'Геймеры, Айтишники, стартапера, тик-токеры, поколение Z, миллениалы, центениалы',
    description: 'Этот сайт позволяет искать не только встречаться tet-a-tet со второй половинкой, но также искать команду, чтобы погамать, найти классных ребят, чтобы поиграть в антикафе, вместе поизучать IT',
    loginButtonName: 'Войти',
    logoutButtonName: 'Выйти',
    registrationButtonName: 'Регистрация',
}

export const REQUIREMENTS = {
    login: [{
            rule: 'Не менее 2 знаков',
            isValid: value => (value.length >= 2),
        },
        {
            rule: 'Содержит только буквы или цифры',
            isValid: value => !!value.match(/^[a-zA-Zа-яА-Я0-9]+$/),
        }
    ],
    email: [{
            rule: 'Пользователь с такой почтой уже существует',
            isValid: value => value,
        },
        {
            rule: 'Не менее 2 знаков',
            isValid: value => (value.length >= 2),
        },
        {
            rule: 'Содержит только буквы или цифры',
            isValid: value => !!value.match(/^[a-zA-Zа-яА-Я0-9]+$/),
        },
    ],
    password: [{
            rule: 'Длина должна быть более 8 знаков и менее 30',
            isValid: value => (value.length >= 8 && value.length <= 30),
        },
        {
            rule: 'Содержит как минимум 1 цифру',
            isValid: value => !!value.match(/[0-9]/),
        },
        {
            rule: 'Содержит как минимум 1 маленькую букву',
            isValid: value => !!value.match(/[a-z]/),
        },
        {
            rule: 'Содержит как минимум 1 большую букву',
            isValid: value => !!value.match(/[A-Z]/),
        },
        {
            rule: 'Содержит специальный знак (e.g. @ !)',
            isValid: value => !!value.match(/@/),
        },
    ],
    passwordRepeat: [{
        rule: 'Пароль должен совпадать с введённым ранее',
        isValid: value => value,
    }, ],
};

export const REVIEWS = [{
        name: 'Андрей',
        photo: image1,
        opinion: 'Здесь всегда есть люди, подхлдящие тебе по интересам, независимо от того, хочу ли я сегодня встретиться с девушкой, погамать или поизучать C++',
    },
    {
        name: 'Лена',
        photo: image2,
        opinion: 'Мне нравится, что здесь можно просто пойти в антикафе и поиграть в настолки с интересными людьми. Тебе не приходится вынужденно общаться с кем-то одним или придумывать темы для разговора, новые знакомства появляюся сами собой',
    },
    {
        name: 'Евгений',
        photo: image1,
        opinion: 'Это современный ресурс для молодежи, мне нравится, как тут происходит общение',
    },
    {
        name: 'Оксана',
        photo: image2,
        opinion: 'Мне нравится, что здесь можно просто пойти в антикафе и поиграть в настолки с интересными людьми. Тебе не приходится вынужденно общаться с кем-то одним или придумывать темы для разговора, новые знакомства появляюся сами собой',
    },
];

export const QUESTIONNAIRE = [{
        question: 'Вы мужчина или женщина?',
        parameter: 'gender',
        answers: ['мужчина', 'женщина']
    },
    {
        question: 'Вы ищете мужчину или женщину?',
        parameter: 'searchGender',
        answers: ['мужчина', 'женщина']
    },
    {
        question: 'Какие отношения вы сейчас ищете?',
        parameter: 'relationType',
        answers: ['Без обязательств', 'Серьезные отношения']
    },
    {
        question: 'Вопрос 3?',
        parameter: '3',
        answers: ['мужчина', 'женщина']
    },
    {
        question: 'Вопрос 4?',
        parameter: '4',
        answers: ['мужчина', 'женщина']
    },
    {
        question: 'Вы ищете мужчину или женщину?',
        parameter: '5',
        answers: ['мужчина', 'женщина']
    },
    {
        question: 'Вы ищете мужчину?',
        parameter: '6',
        answers: ['мужчина', 'женщина']
    }
];