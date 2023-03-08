const users = [];
async function fetchUsers(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const user = await response.json();
    if (user.message) {
        console.log('Usuário não encontrado!');
    }
    else {
        users.push(user);
        console.log(`
        O usuário ${user.login} foi salvo.\n
        id: ${user.id}
        login: ${user.login}
        nome: ${user.name} 
        bio: ${user.bio}
        Repositórios públicos: ${user.public_repos}`);
    }
}
async function showUser(username) {
    const user = users.find(user => user.login === username);
    if (typeof user === 'undefined') {
        console.log("Usuario não encontrado!");
    }
    else {
        const response = await fetch(user.repos_url);
        const repos = await response.json();
        let message = `id: ${user.id}\n` +
            `\nLogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`;
        repos.forEach(repo => {
            message += `Nome: ${repo.name} 
            Descrição: ${repo.description}
            Estrelas: ${repo.stargazers_count}
            É um fork: ${repo.fork ? 'Sim' : 'Não'}`;
        });
        console.log(message);
    }
}
function showAllUsers() {
    let message = 'Usuários: \n';
    users.forEach(user => {
        message += `\n ${user.login}`;
    });
    console.log(message);
}
function showReposTotal() {
    const reposTotal = users.reduce((acc, user) => acc + user.public_repos, 0);
    console.log(`O grupo possui um total de ${reposTotal} repositórios publicos!`);
}
function showTopFive() {
    const topFive = users.slice().sort((userAtual, userSeguinte) => userSeguinte.public_repos - userAtual.public_repos).slice(0, 5);
    let message = 'Top 5 usuários com mais repositórios públicos: \n';
    topFive.forEach((user, index) => {
        message += ` ${index + 1} - ${user.login}: ${user.public_repos} repositórios`;
    });
    console.log(message);
}
async function main() {
    await fetchUsers('Railimaa');
    showAllUsers();
    showReposTotal();
    showTopFive();
}
