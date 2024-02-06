import * as L from './library'

describe('Library', () => {
    let testLibrary: L.Library
    beforeEach(() => {
        testLibrary = new L.Library('123 Main St')
    })

    it('should be instantiated with the expected properties', () => {
        expect(testLibrary).toBeInstanceOf(L.Library)
        expect(testLibrary.address).toBe('123 Main St')
    })

    it('should add books to the library', () => {
        testLibrary.addBook('123', 'Test Book', 'Test Author')
        expect(testLibrary.books.length).toBe(1)
        testLibrary.addBook('456', 'A brief history of time', 'Stephen Hawking')
        expect(testLibrary.books.length).toBe(2)
    })

    it('should throw an error if a book is already on loan', () => {
        testLibrary.addBook('123', 'Test Book', 'Test Author')
        const borrower = new L.Borrower(L.BorrowerType.Student, 'Test Student')
        testLibrary.borrow(testLibrary.books[0], borrower)
        expect(() => testLibrary.borrow(testLibrary.books[0], borrower)).toThrow()
    })
})