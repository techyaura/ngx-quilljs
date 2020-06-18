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
    // height: 'auto',
    placeholder: 'Please type something ...',
  };
  optionsBubble = {
    // height: 'auto',
    theme: 'bubble',
    placeholder: 'Please type something ...',
  };
  formObj: FormGroup;
  isSubmit = false;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // creating form
    this.formObj = this.fb.group({
      content: [''],
      contentBubble: ['']
    });
  }

  get htmlProperty(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.formObj.value.content);
  }

  get htmlPropertyBubble(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.formObj.value.contentBubble);
  }
}
