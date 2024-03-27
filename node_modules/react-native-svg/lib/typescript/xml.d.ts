import type { ComponentType } from 'react';
import React, { Component } from 'react';
import type { SvgProps } from './elements/Svg';
export declare const tags: {
    [tag: string]: ComponentType;
};
export interface AST {
    tag: string;
    style?: Styles;
    styles?: string;
    priority?: Map<string, boolean | undefined>;
    parent: AST | null;
    children: (AST | string)[] | (JSX.Element | string)[];
    props: {
        [prop: string]: Styles | string | undefined;
    };
    Tag: ComponentType<React.PropsWithChildren<{}>>;
}
export interface XmlAST extends AST {
    children: (XmlAST | string)[];
    parent: XmlAST | null;
}
export interface JsxAST extends AST {
    children: (JSX.Element | string)[];
}
export type AdditionalProps = {
    onError?: (error: Error) => void;
    override?: Object;
    onLoad?: () => void;
};
export type UriProps = SvgProps & {
    uri: string | null;
} & AdditionalProps;
export type UriState = {
    xml: string | null;
};
export type XmlProps = SvgProps & {
    xml: string | null;
} & AdditionalProps;
export type XmlState = {
    ast: JsxAST | null;
};
export type AstProps = SvgProps & {
    ast: JsxAST | null;
} & AdditionalProps;
export declare function SvgAst({ ast, override }: AstProps): JSX.Element | null;
export declare const err: (message?: any, ...optionalParams: any[]) => void;
export declare function SvgXml(props: XmlProps): JSX.Element | null;
export declare function fetchText(uri: string): Promise<string>;
export declare function SvgUri(props: UriProps): JSX.Element;
export declare class SvgFromXml extends Component<XmlProps, XmlState> {
    state: {
        ast: null;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: {
        xml: string | null;
    }): void;
    parse(xml: string | null): void;
    render(): JSX.Element;
}
export declare class SvgFromUri extends Component<UriProps, UriState> {
    state: {
        xml: null;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: {
        uri: string | null;
    }): void;
    fetch(uri: string | null): Promise<void>;
    render(): JSX.Element;
}
export declare const camelCase: (phrase: string) => string;
export type Styles = {
    [property: string]: string;
};
export declare function getStyle(string: string): Styles;
export declare function astToReact(value: AST | string, index: number): JSX.Element | string;
export type Middleware = (ast: XmlAST) => XmlAST;
export declare function parse(source: string, middleware?: Middleware): JsxAST | null;
//# sourceMappingURL=xml.d.ts.map