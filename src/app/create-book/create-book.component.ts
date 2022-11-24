import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent  implements OnInit {
  uploadedImage!: File;
  book: Book = new Book();
  constructor(private bookService: BookService,
    private router: Router) { }
 
  ngOnInit(): void {
  }

  public onImageUpload(event ) {
    this.uploadedImage = event.target.files[0];
  }
  
  saveBook(){
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    imageFormData.append('name',this.book.name);
    imageFormData.append('price',this.book.price as unknown as Blob);
    imageFormData.append('pages',this.book.pages as unknown as Blob);
    imageFormData.append('description',this.book.description);
  
    this.bookService.createBook(imageFormData).subscribe( data =>{
      console.log(data);
      this.goToBookList();
    },
    error => console.log(error));
  }

  goToBookList(){
    this.router.navigate(['/books']);
  }
  
  onSubmit(){
    console.log(this.book);
    this.saveBook();
  }
}
