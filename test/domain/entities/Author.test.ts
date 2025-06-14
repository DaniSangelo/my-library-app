import { Author } from "src/domain/entities/Author";
import { faker } from '@faker-js/faker'

describe("Author entity", () => {
  it("should create an author", () => {
    const author = Author.create({
        name: faker.person.fullName(),
    });

    expect(author).toBeInstanceOf(Author);
    expect(author.id).toEqual(expect.any(String));
    expect(author.id).toBeTruthy()
    expect(author.name).toEqual(expect.any(String));
    expect(author.name).toBeTruthy()
  });

  it("should not create an author without name", () => {
    expect(() => {
      Author.create({
        name: "",
      });
    }).toThrowError();
  })
})