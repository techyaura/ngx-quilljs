import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  HostListener,
  forwardRef,
  ViewChild,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import Quill from 'quill';
import { IQuillJsOptions } from './quilljs.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ngx-quilljs',
  template: `
    <div #editor [style]="{ 'height' : quillConfig?.height } ">
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
export class QuillComponent implements AfterViewInit, ControlValueAccessor, OnInit {

  @ViewChild('editor')
  editor: ElementRef;

  @Input()
  options: IQuillJsOptions;

  private quillInstance: Quill;
  private quillData: string;
  quillConfig: IQuillJsOptions;

  private toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike', 'image'],  // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],                    // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],             // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }],                 // outdent/indent
    [{ direction: 'rtl' }],                              // text direction
    [{ size: ['small', false, 'large', 'huge'] }],       // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],                 // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['clean']
  ];

  private defaultOptions: IQuillJsOptions = {
    theme: 'snow',
    toolbar: this.toolbarOptions,
    placeholder: '',
    height: '200px'
  };

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  ngOnInit() {
    this.quillConfig = {
      theme: this.options && this.options.theme || this.defaultOptions.theme,
      toolbar: this.options && this.options.toolbar || this.defaultOptions.toolbar,
      placeholder: this.options && this.options.placeholder || this.defaultOptions.placeholder,
      height: this.options && this.options.height || this.defaultOptions.height,
    };
  }

  ngAfterViewInit(): void {
    const editor = this.editor.nativeElement;
    this.quillInstance = new Quill(editor, {
      modules: {
        toolbar: this.quillConfig.toolbar
      },
      placeholder: this.quillConfig.placeholder,
      theme: this.quillConfig.theme
    });
    this.quillInstance.clipboard.dangerouslyPasteHTML(0, this.quillData);
  }

  @HostListener('keyup', ['$event.target'])
  emitKeyUp(e: any) {
    // console.log(this.quillInstance.root.innerHTML, 'KEY UP');
    this.onChange(this.quillInstance.root.innerHTML);
  }

  @HostListener('click', ['$event.target'])
  emitMouseUp(e: any) {
    // console.log(this.quillInstance.root.innerHTML, 'Mouse UP');
    this.onChange(this.quillInstance.root.innerHTML);
  }

  @HostListener('paste', ['$event.target'])
  emitPaste(e: any) {
    // console.log(this.quillInstance.root.innerHTML, 'PASTE');
    this.onChange(this.quillInstance.root.innerHTML);
  }

  onChange = (text: any) => { };

  registerOnTouched(fn: any) {
    console.log('Init Editor');
  }

  writeValue(value: null) {
    this.quillData = value || '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

}
