import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  uploadedImage!: File;
  id!: number;
  book: Book = new Book();
  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.bookService.getBookById(this.id).subscribe(data => {
      this.book = data;
    }, error => console.log(error));
  }
 
  onSubmit(){
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    imageFormData.append('name',this.book.name);
    imageFormData.append('price',this.book.price as unknown as Blob);
    imageFormData.append('pages',this.book.pages as unknown as Blob);
    imageFormData.append('description',this.book.description); 
    this.bookService.updateBook2(this.id, imageFormData).subscribe( data =>{
      this.goToBookList();
    }
    , error => console.log(error));
  }
 
  goToBookList(){
    this.router.navigate(['/books']);
  }

  public onImageUpload(event ) {
    this.uploadedImage = event.target.files[0];
  }
  
}
