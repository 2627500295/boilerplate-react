// JSON 导入支持
declare module "*.json" {
  const value: any;
  export default value;
}

// 媒体文件
declare module '*.mp4';
declare module '*.flv';
declare module '*.avi';
declare module '*.swf';

// 图片文件
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';

// declare module '*.png' {
//   const fileName: string;
//   export = fileName;
// }
