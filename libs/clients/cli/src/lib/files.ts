import { readFile as fsReadFile, writeFile as fsWriteFile } from 'fs/promises';

export async function readFile(fileName: string): Promise<string> {
	return fsReadFile(fileName, { encoding: "utf8" });
}

export async function readJSONFile(fileName: string): Promise<any> {
	return JSON.parse(await readFile(fileName))
}

export async function writeFile(fileName: string, data: any) {
	return fsWriteFile(fileName, data, { encoding: "utf8" });
}
