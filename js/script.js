// Находим форму и оба поля пароля по их id
const form = document.forms['test']; // Находим форму с name="test".
const passwordInput = document.getElementById('password'); // Находим поле ввода пароля.
const confirmPasswordInput = document.getElementById('confirmPassword'); // Находим поле подтверждения пароля.

// Разрешённые специальные символы: ! @ # $ % ^ & * _ -
const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-])[A-Za-z\d!@#$%^&*_\-]{4,20}$/;

// Функция checkPasswordStrength() проверяет сложность пароля.
function checkPasswordStrength(password) {
    // test() проверяет, соответствует ли строка регулярному выражению.
    return passwordPattern.test(password);
}

// Функция checkPasswordMatch() проверяет совпадение двух паролей.
function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const passwordsDoNotMatch = password !== confirmPassword;

    // classList.toggle() добавляет или убирает CSS-класс в зависимости от условия.
    // Если пароли различаются, добавляем класс password-error.
    passwordInput.classList.toggle('password-error', passwordsDoNotMatch);
    confirmPasswordInput.classList.toggle('password-error', passwordsDoNotMatch);

    // Возвращаем результат проверки: true — пароли совпадают.
    return !passwordsDoNotMatch;
}

// Добавляем обработчик события input для первого поля пароля.
passwordInput.addEventListener('input', function () {
    // remove() удаляет CSS-класс, поэтому красная подсветка ошибки исчезает.
    passwordInput.classList.remove('password-error');
    confirmPasswordInput.classList.remove('password-error');
});

// Добавляем обработчик события input для второго поля пароля.
confirmPasswordInput.addEventListener('input', function () {
    // При изменении подтверждения убираем прежнюю подсветку ошибки.
    passwordInput.classList.remove('password-error');
    confirmPasswordInput.classList.remove('password-error');
});

// Добавляем обработчик события submit — попытки отправить форму.
form.addEventListener('submit', function (event) {
    // Получаем значения обоих полей перед выполнением проверок.
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    //Проверяем сложность и длину пароля.
    if (!checkPasswordStrength(password)) {
        //отменяет стандартное действие браузера — отправку формы.
        event.preventDefault();
        //показывает окно с сообщением об ошибке.
        alert(
            'Пароль должен содержать от 4 до 20 символов, ' +
            'строчные и прописные латинские буквы, цифру ' +
            'и специальный символ из списка: ! @ # $ % ^ & * _ -'
        );
        //переводит курсор в указанное поле.
        passwordInput.focus();
        return;
    }
    //Проверяем совпадение паролей.
    if (!checkPasswordMatch()) {
        // Отменяем отправку формы, так как пароли различаются.
        event.preventDefault();
        // Показываем сообщение о несовпадении паролей.
        alert('Пароли не совпадают. Пожалуйста, проверьте ввод.');
        // Переводим курсор в поле подтверждения пароля.
        confirmPasswordInput.focus();
        // Завершаем обработчик, чтобы форма не отправилась.
        return;
    }

    // Если обе проверки пройдены, preventDefault() не вызывается.
});
