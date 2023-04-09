function renderMonster(monster){
    const monsterName = document.createElement('h1');
    const monsterAge = document.createElement('p');
    const monsterBio = document.createElement('p');

    monsterName.innerText = monster.name;
    monsterAge.innerText = 'Age: ' + monster.age;
    monsterAge.style.fontWeight = 'bold';
    monsterBio.innerText = 'Bio: ' + monster.description;

    const container = document.querySelector('#monster-container');
    container.append(monsterName, monsterAge, monsterBio);
}

document.addEventListener('DOMContentLoaded', e => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const createButton = document.createElement('button');

    nameInput.placeholder = 'name...';
    nameInput.id = 'name';
    ageInput.placeholder = 'age...';
    ageInput.id = 'age';
    descriptionInput.placeholder = 'description...';
    descriptionInput.id = 'bio'
    createButton.innerText = 'Create';

    const formContainer = document.querySelector('#create-monster');
    formContainer.append(form);
    form.append(nameInput, ageInput, descriptionInput, createButton);

    form.addEventListener('submit', e=> {
        e.preventDefault();

        const monsterObj = {
            name: form.querySelector('#name').value,
            age: form.querySelector('#age').value,
            description: form.querySelector('#bio').value
        }

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(monsterObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    })

    startingIndex = 0;
    endingIndex = 49;

    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(data => {
        const fifty = data.slice(startingIndex, endingIndex);
        for (monster of fifty){
            renderMonster(monster);
        }
    })

    document.querySelector('#forward').addEventListener('click', e => {
        document.querySelector('#monster-container').innerHTML = '';

        fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(data => {
                startingIndex += 50;
                endingIndex += 50;
            const fifty = data.slice((startingIndex), (endingIndex));
                for (monster of fifty){
                    renderMonster(monster);
            }
        })
    })

    document.querySelector('#back').addEventListener('click', e => {

        fetch('http://localhost:3000/monsters')
        .then(res => res.json())
        .then(data => {
            if (startingIndex >= 50){
                startingIndex -= 50;
                endingIndex -= 50;
            } else {
                return;
            }
            document.querySelector('#monster-container').innerHTML = '';
            const fifty = data.slice((startingIndex), (endingIndex));
            for (monster of fifty){
                renderMonster(monster);
            }
        })
    })
})