import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  
})
export class BookDetailsComponent  implements OnInit {
  books!: Book[];
  id!: number;
  book!: Book;
  constructor(private route: ActivatedRoute, private bookService: BookService,private router: Router)
   {  this.books = [];}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.book = new Book();
    this.bookService.getBookById(this.id).subscribe( data => {
      this.book = data;
    });
  }
  
  updateBook(id: number){
    this.router.navigate(['update-book', id]);
  }

  deleteBook(id: number){
    this.bookService.deleteBook(id).subscribe( data => {
      console.log(data);
      this.getBooks();
    })
  }

  private getBooks(){
    this.bookService.getBooksList().subscribe(data => {
      this.books = data;
    });
  }
}
