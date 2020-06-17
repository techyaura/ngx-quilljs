type Theme = 'snow' | 'bubble';
export interface IQuillJstoolbarOptionsObject<T> {
  list?: ((T)[]) | T;
  script?: ((T)[]) | T;
  indent?: ((T)[]) | T;
  direction?: ((T)[]) | T;
  size?: ((T)[]) | T;
  header?: ((T)[]) | T;
  color?: ((T)[]) | T;
  background?: ((T)[]) | T;
  font?: ((T)[]) | T;
  align?: ((T)[]) | T;
}

export interface IQuillJsToolbar {
  toolbar?: (IQuillJstoolbarOptionsObject<
    string |
    number |
    number[] |
    string[] |
    (
      (string |
      number |
      boolean)[]
    )
  >[][]) | string[][] | object;
}

export interface IQuillJsOptions extends IQuillJsToolbar {
  theme?: Theme;
  placeholder?: string;
  height?: string;
}
