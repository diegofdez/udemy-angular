interface AudioPlayer {
    volume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    volume: 90,
    songDuration: 36,
    song: 'Mess',
    details: {
        author: 'Ed Sheeran',
        year: 2017
    }
};

const { volume, songDuration, song, details } = audioPlayer;
const { author, year } = details;

//console.log({ volume, songDuration, song, author, year });

const dbz: string[] = ['Goku', 'Vegeta', 'Trunks'];
const [ , , p3 ] = dbz; 

console.log('Personajes:', p3 );

export {};