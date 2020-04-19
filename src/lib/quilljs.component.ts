import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  HostListener,
  forwardRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import Quill from 'quill';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ngx-quilljs',
  template: `
    <div #editor>
    </div>
  `,
  styleUrls: [
    './quilljs.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class QuillComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('editor')
  editor: ElementRef;

  @Input()
  options: any;

  private toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike', 'image'],  // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],                      // custom button values
    [{ list: 'ordered'}, { list: 'bullet' }],
    [{ script: 'sub'}, { script: 'super' }],             // superscript/subscript
    [{ indent: '-1'}, { indent: '+1' }],                 // outdent/indent
    [{ direction: 'rtl' }],                              // text direction
    [{ size: ['small', false, 'large', 'huge'] }],       // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],                 // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['clean']                                            // remove formatting button
  ];

  private quillInstance: any;
  private quillData: string;

  private defaultOptions = {
    theme: 'snow',
    toolbar: this.toolbarOptions,
    placeholder: ''
  };

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  ngAfterViewInit(): void {
    const quillConfig = this.options || this.defaultOptions;
    console.log(this.options);
    const editor = this.editor.nativeElement;
    this.quillInstance = new Quill(editor, {
      modules: {
        toolbar: quillConfig.toolbar || this.defaultOptions.toolbar
      },
      placeholder: quillConfig.placeholder || this.defaultOptions.placeholder,
      theme: quillConfig.theme || this.defaultOptions.theme
    });
    this.quillInstance.clipboard.dangerouslyPasteHTML(0, this.quillData);
  }

  @HostListener('keyup', ['$event.target'])
  emitKeyUp( e: any ) {
    // console.log(this.quillInstance.root.innerHTML, 'KEY UP');
    this.onChange(this.quillInstance.root.innerHTML);
  }

  @HostListener('click', ['$event.target'])
  emitMouseUp( e: any ) {
    // console.log(this.quillInstance.root.innerHTML, 'Mouse UP');
    this.onChange(this.quillInstance.root.innerHTML);
  }

  @HostListener('paste', ['$event.target'])
  emitPaste( e: any ) {
    // console.log(this.quillInstance.root.innerHTML, 'PASTE');
    this.onChange(this.quillInstance.root.innerHTML);
  }

  onChange = (text: any) => {};

  registerOnTouched( fn: any ) {
    console.log('Init Editor');
  }

  writeValue( value: null ) {
    this.quillData = value || '';
  }

  registerOnChange( fn: any ) {
    this.onChange = fn;
  }

}
