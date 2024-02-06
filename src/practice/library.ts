import * as T from './library-types';
import {v4 as uuidv4} from 'uuid';

const borrowerLoanDays = {
    [T.BorrowerType.Student]: 14,
    [T.BorrowerType.Faculty]: 28
}

class BookCopy implements T.BookCopy {
    readonly isbn: string;
    readonly title: string;
    readonly author: string;
    readonly id: string;
    constructor(isbn: string, title: string, author: string) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.id = uuidv4()
    }
}

export class Borrower implements T.Borrower {
    readonly type: T.BorrowerType;
    readonly id: string;
    readonly name: string;
    constructor(type: T.BorrowerType, name: string) {
        this.type = type;
        this.id = uuidv4();
        this.name = name;
    }
}

class BookLoan implements T.BookLoan {
    readonly copy: T.BookCopy;
    readonly borrower: T.Borrower;
    readonly dueDate: Date;
    constructor(copy: T.BookCopy, borrower: T.Borrower) {
        this.copy = copy;
        this.borrower = borrower;
        this.dueDate = new Date();
        this.dueDate.setDate(this.dueDate.getDate() + borrowerLoanDays[borrower.type]);
    }
}

export class Library implements T.Library {
    readonly address: string
    books: BookCopy[]
    onLoan: BookLoan[]

    constructor(address: string) {
        this.address = address;
        this.books = [];
        this.onLoan = [];
    }

    addBook(isbn: string, title: string, author: string) {
        this.books.push(new BookCopy(isbn, title, author));
    }

    private isOnLoan(book: BookCopy): boolean {
        return this.onLoan.some((b) => b.copy.id === book.id);
    }

    borrow(book: BookCopy, borrower: Borrower): void {
        if (this.isOnLoan(book)) {
            throw new Error('Book is already on loan');
        }
        this.onLoan.push(new BookLoan(book, borrower));
    }

    return(book: BookCopy): void {
        this.onLoan = this.onLoan.filter((b) => b.copy.id !== book.id);
    }

    search(title?: string, author?: string): [BookCopy[], BookLoan[]] {
        const results: Set<BookCopy> = new Set();
        const loans: Set<BookLoan> = new Set();

        const titleLower = title?.toLowerCase();
        const authorLower = author?.toLowerCase();

        if (titleLower) {
            this.books.forEach((book) => {
                if (book.title.toLowerCase().includes(titleLower)) {
                    results.add(book)
                }
            })
            this.onLoan.forEach((loan) => {
                if (loan.copy.title.toLowerCase().includes(titleLower)) {
                    loans.add(loan)
                }
            })
        }

        if (authorLower) {
            this.books.forEach((book) => {
                if (book.author.toLowerCase().includes(authorLower)) {
                    results.add(book)
                }
            })
            this.onLoan.forEach((loan) => {
                if (loan.copy.author.toLowerCase().includes(authorLower)) {
                    loans.add(loan)
                }
            })
        }

        return [[...results], [...loans]]
    }
}

export {BorrowerType} from './library-types'