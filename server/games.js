const games = [];
const GAME_MODE_WRITE = "GAME_MODE_WRITE";
const GAME_MODE_DRAW = "GAME_MODE_DRAW";
const GAME_MODE_GUESS = "GAME_MODE_GUESS";
const GAME_MODE_LOBBY = "GAME_MODE_LOBBY";
const GAME_MODE_DONE = "GAME_MODE_DONE";

function startGame(room, mode) {
    const game = { room, mode};
    games.push(game);
    return game;
}

function changeGameMode(room, mode) {
    for (game in games) {
        if (game.room == room) {
            game.mode = mode;
            return game;
        }
    }
}

module.exports = {
    startGame,
    changeGameMode,
};