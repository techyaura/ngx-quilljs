import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularlib';
  options = {
    // theme: 'bubble',
    placeholder: '',
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'image']
    ]
  };
  formObj: FormGroup;
  isSubmit = false;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // creating form
    this.formObj = this.fb.group({
      content: ['<b>hello WOrld</b>']
    });
  }

  get htmlProperty(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.formObj.value.content);
  }

  submit() {
    this.isSubmit = true;
  }
}
