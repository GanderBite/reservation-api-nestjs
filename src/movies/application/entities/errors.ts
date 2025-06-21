export class MovieExistsError extends Error {
  constructor(title: string) {
    super(`Movie "${title}" already exists`);
  }
}

export class MovieNotFoundError extends Error {
  constructor(id: string) {
    super(`Movie "${id}" not found`);
  }
}
