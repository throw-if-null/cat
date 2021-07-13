import { Directive, OnChanges, Input, ElementRef, SimpleChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[catHighlight]'
})
export class HighlightDirective implements OnChanges {

  @Input() searchedWord: string | undefined | null; // searchText
  @Input() content: string | undefined; // HTML content
  @Input() classToApply!: string; //class to apply for highlighting
  @Input() setTitle = false; //sets title attribute of HTML

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.content) {
      return;
    }

    if (this.setTitle) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'title',
        this.content
      );
    }

    if (!this.searchedWord || !this.searchedWord.length || !this.classToApply) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.content);
      return;
    }

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.getFormattedContent(this.content)
    );
  }

  getFormattedContent(content: any) {
    if (typeof content !== 'string') {
      return;
    }
    const re = new RegExp(`(${this.searchedWord})`, 'gi');
    return content.replace(re, `<span class='${ this.classToApply }'>$1</span>`);
  }

}
