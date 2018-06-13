import path from 'path';
import fs from 'fs';

/**
 * 获取命令执行目录
 */
export const appDirectory: string = fs.realpathSync(process.cwd());

/**
 * 基于命令执行目录获取相对路径
 *
 * @param target 文件路径
 * @returns 相对路径
 */
export function resolve(target?: string|null): string {
  let getTargetPath: string = '';

  if (target !== void 0 && target !== null) {
    getTargetPath = target;
  }

  return path.resolve(appDirectory, getTargetPath);
}

/**
 * 基于文件路径获取相对路径
 *
 * @param target 文件路径
 * @returns 相对路径
 */
export function resolveOwn(target?: string|null): string {
  let getTargetPath: string = '';

  if (target !== void 0 && target !== null) {
    getTargetPath = target;
  }

  return path.resolve(__dirname, '..', getTargetPath);
}
