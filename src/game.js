import React, { useState } from "react";

const defaulgame = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const hasSequence = (items) => /ooo|xxx/i.test(items.join(''));

const getWinner = (items) => {
    const joined = items.join('').toLowerCase();
    if (joined.includes('ooo')) return 'O';
    if (joined.includes('xxx')) return 'X';
    return null;
};

const checkBasicPattern = (acc, current, index, arr) => {
    if (acc.winner) return acc;

    const winnerHorizontal = getWinner(current);
    const winnerVertical = getWinner(arr.map(item => item[index]));

    if (winnerHorizontal) return { winner: winnerHorizontal };
    if (winnerVertical) return { winner: winnerVertical };

    return acc;
};

const checkDiagonal = (game) => {
    const winnerNormal = getWinner(game.map((el, index) => game[index][index]));
    const winnerReverse = getWinner(game.map((el, index) => game[index][game.length - 1 - index]));
    return winnerNormal || winnerReverse || null;
};

export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [game, setGame] = useState(defaulgame);
    const [winner, setWinner] = useState(null);

    const result = game.reduce(checkBasicPattern, { winner: null });
    const diagonalWinner = checkDiagonal(game);

    if (!winner && (result.winner || diagonalWinner)) {
        setWinner(result.winner || diagonalWinner);
    }

    const isGameOver = Boolean(winner);

    return (
        <section id="game">
            <header>
            <img
                src="https://upload.wikimedia.org/wikipedia/pt/thumb/f/ff/CRVG_logo.svg/1200px-CRVG_logo.svg.png"
                alt="Logo do Vasco da Gama"
            />
                <h1>Jogo da Velha</h1>
            </header>

            {isGameOver && (
                <p className="gameover">
                    Fim de jogo!
                </p>
            )}

            <div className="board">
                {game.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className="cell"
                                role="button"
                                onClick={() => {
                                    if (cell !== "" || isGameOver) return;

                                    setGame(game.map((rowItem, rowI) => {
                                        return rowItem.map((cellItem, cellI) => {
                                            if (rowI === rowIndex && cellI === cellIndex) {
                                                return currentPlayer;
                                            }
                                            return cellItem;
                                        });
                                    }));

                                    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
                                }}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="actions">
                <button type="button" onClick={() => {
                    setGame(defaulgame.map(row => [...row]));
                    setCurrentPlayer('X');
                    setWinner(null);
                }}>
                    Reiniciar jogo
                </button>
            </div>
        </section>
    );
}