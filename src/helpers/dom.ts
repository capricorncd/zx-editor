/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/05/05 10:55:25 (GMT+0900)
 */
import { slice, toSnakeCase, toCamelCase } from "./format";
import { CSSProperties } from "../types";

export const $ = <T extends HTMLElement>(
  selector: string | T,
  doc: Document | HTMLElement = document
): T | null => {
  if (selector instanceof HTMLElement) return selector;
  return doc.querySelector(selector);
};

// export const $$ = <T extends HTMLElement>(selector: string, doc: Document | HTMLElement = document): T[] => {
//   return Array.prototype.slice.call(doc.querySelectorAll(selector), 0)
// }

export const createElement = <T extends HTMLElement>(
  tag: string,
  attrs: Record<string, string> = {},
  innerHTML?: string
): T => {
  const el = document.createElement(tag) as T;
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, val);
  }
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
};

/**
 * 将样式对象转换为字符串
 * {color: 'red', fontSize: '16px'} => 'color:red;font-size:16px'
 * @param data
 * @param extendStyles
 */
export const createStyles = (
  data: CSSProperties,
  extendStyles?: CSSProperties
): string => {
  if (extendStyles) {
    // 防止extendStyles存在snake的属性，不能成功覆盖旧样式
    // data['lineHeight'] = 1.5, extendStyles['line-height'] = ''
    for (const [key, value] of Object.entries(extendStyles)) {
      data[toCamelCase(key)] = value;
    }
  }
  const arr: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value === "" || typeof value === "undefined" || value === null)
      continue;
    arr.push(`${toSnakeCase(key)}:${value}`);
  }
  return arr.join(";");
};

export const replaceHtmlTag = (
  input: string,
  oldNodeName: string,
  newNodeName: string
): string => {
  return input.replace(
    RegExp("(^<" + oldNodeName + ")|(" + oldNodeName + ">$)", "gi"),
    (match) =>
      match.toUpperCase().replace(oldNodeName, newNodeName.toLowerCase())
  );
};

export const isUlElement = (el: Element): boolean => {
  return /UL|OL/.test(el.nodeName);
};

/**
 * is <br> section
 * <section><br></section>
 * @param el
 */
export const isBrSection = (el: HTMLElement | Element | null): boolean => {
  if (!el) return false;
  const nodes = slice<Node, NodeList>(el.childNodes);
  return nodes.length === 1 && nodes[0].nodeName === "BR";
};

export const getStyles = (el: HTMLElement): CSSProperties => {
  const style = el.getAttribute("style") || "";
  return style.split(/\s?;\s?/).reduce<CSSProperties>((prev, s) => {
    const [key, val] = s.split(/\s?:\s?/);
    prev[toCamelCase(key)] = val;
    return prev;
  }, {});
};
