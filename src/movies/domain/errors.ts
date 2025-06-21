export class MovieExistsError extends Error {
  constructor(title: string) {
    super(`Movie "${title}" already exists`);
  }
}
