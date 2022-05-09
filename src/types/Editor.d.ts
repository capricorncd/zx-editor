/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:41:45 (GMT+0900)
 */
import { ZxEditor } from '../index'

export type Selector = string | HTMLElement;

export interface Plugin {
  install: (e: ZxEditor) => void
}

export type EventEmitterFn = (...args: any[]) => void;

export type CSSProperties = Record<string, unknown>;
