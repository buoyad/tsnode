interface Book {
    readonly isbn: string
    readonly title: string
    readonly author: string
}

interface BookCopy extends Book {
    readonly id: string
}

enum BorrowerType {
    Student,
    Faculty
}

interface Borrower {
    readonly type: BorrowerType
    readonly id: string
    readonly name: string
}

interface BookLoan {
    readonly copy: BookCopy
    readonly borrower: Borrower
    readonly dueDate: Date
}

interface Library {
    readonly address: string
    books: BookCopy[]
    onLoan: BookLoan[]

    addBook(isbn: string, title: string, author: string): void
    borrow(book: BookCopy, borrower: Borrower): void
    return(book: BookCopy): void
    search(title?: string, author?: string): [BookCopy[], BookLoan[]]
}

export {
    Book,
    BookCopy,
    BorrowerType,
    Borrower,
    BookLoan,
    Library
}