const taskCount = 3; // Количество заданий (можно менять при добавлении новых)

function createTaskList() {
    const taskListContainer = document.getElementById("task-list");
    for (let i = 1; i <= taskCount; i++) {
        const taskButton = document.createElement("button");
        taskButton.innerText = `Task ${i}`;
        taskButton.onclick = () => loadTask(`task${i}`);
        taskListContainer.appendChild(taskButton);
    }
}

function loadTask(task) {
    const container = document.getElementById("task-container");

    // Очистка предыдущего содержимого
    container.innerHTML = '';

    // Возможные названия файлов для HTML и CSS
    const htmlFiles = [`${task}/index.html`, `${task}/Index.html`];
    const cssFiles = [`${task}/style.css`, `${task}/Style.css`, `${task}/styles.css`, `${task}/Styles.css`];

    // Загрузка HTML-файла выбранного задания
    let htmlLoaded = false;
    for (let htmlFile of htmlFiles) {
        fetch(htmlFile)
            .then(response => {
                if (response.ok) {
                    htmlLoaded = true;
                    return response.text();
                }
                throw new Error("HTML файл не найден");
            })
            .then(html => {
                container.innerHTML = html;

                // Подключение CSS для выбранного задания
                let styleLink = document.querySelector('#dynamic-style');
                if (styleLink) {
                    styleLink.remove(); // Удаление старого стиля, если уже подключен
                }

                // Проверка наличия CSS файла
                for (let cssFile of cssFiles) {
                    fetch(cssFile)
                        .then(response => {
                            if (response.ok) {
                                styleLink = document.createElement('link');
                                styleLink.rel = 'stylesheet';
                                styleLink.href = cssFile;
                                styleLink.id = 'dynamic-style';
                                document.head.appendChild(styleLink);
                                return;
                            }
                        })
                        .catch(error => console.log("Ошибка при загрузке CSS:", error));
                }
            })
            .catch(error => {
                if (!htmlLoaded) {
                    console.log("Ошибка при загрузке HTML:", error);
                }
            });

        if (htmlLoaded) break;
    }
}

// Вызов функции для генерации списка задач
createTaskList();
