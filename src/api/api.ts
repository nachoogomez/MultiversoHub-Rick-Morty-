import { Character, CharactersResponse } from '../types/character';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (page: number = 1): Promise<CharactersResponse> => {
    const response = await fetch(`${API_URL}?page=${page}`);
    const data = await response.json();          
    return data;
}

export const getTwentyCharacters = async (): Promise<Character[]> => {
    const response = await fetch(`${API_URL}?page=1&per_page=20`);
    const data = await response.json();
    return data.results;
}

export const getCharacter = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
}