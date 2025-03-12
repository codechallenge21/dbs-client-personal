
export type IconifyProps =
  | string
  | {
      width?: string | number;
      height?: string | number;
      rotate?: number;
      hFlip?: boolean;
      vFlip?: boolean;
      flip?: string;
    };

export interface LocalIconifyIcon {
  body: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  rotate?: number;
  hFlip?: boolean;
  vFlip?: boolean;
}
